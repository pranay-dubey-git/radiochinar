var playButton = document.getElementById("play");
var pauseButton = document.getElementById("pause");
var volumecontrol = document.getElementById("volume");


let globalstreamname = "https://d3413g2ooyoexr.cloudfront.net/radiochinar.m3u8";
var streamOne = "";

var isFlashSupported = 0;
var volume = 100;

var isPaused = false;
var isMute = 1;
var previousState = 0;
var html5Timer;
var html5Timer2;
var hls;
var pausederror = false;
var isPlaying = false;

var isFlashSupported = 0;
var storedData = [];
var datacounter = 0;


/* Functions
======================================*/

    function testFlash() {

        {

            if (Hls.isSupported()) {
                console.log("In TestFlash hls");
                //alert("HLS Support");
                isFlashSupported = 1;

                var videoPlayer = document.createElement('video');
                videoPlayer.id = "vid";
                videoPlayer.style.visibility = "hidden";
                document.getElementById("wrapper").appendChild(videoPlayer);
                hls = new Hls();

            } else {
                console.log("In TestFlash not hls");
                //alert("Not HLS Support");
                isFlashSupported = 0;

                var audioPlayer = document.createElement('audio');
                audioPlayer.src = "";
                audioPlayer.setAttribute("controls", "controls");
                audioPlayer.id = "aud";
                audioPlayer.style.visibility = "hidden";
                document.getElementById("wrapper").appendChild(audioPlayer);

                if ((navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/Dalvik/i)) || (navigator.userAgent.match(/GINGERBREAD/i)) || (navigator.userAgent.match(/Linux;.*Mobile Safari/i)) || (navigator.userAgent.match(/Linux 1\..*AppleWebKit/i)) || (navigator.userAgent.match(/iemobile/i)) || (navigator.userAgent.toLowerCase().indexOf("windows nt") != -1 &&
                        navigator.userAgent.toLowerCase().indexOf("touch") != -1 && navigator.userAgent.toLowerCase().indexOf("touch") != -1) || (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/iPod/i))) {
                    //alert("m3u8");
                    streamOne = globalstreamname;
                } else {
                    //alert("aac");
                    streamOne = "http://streamasiacdn.atc-labs.com/radiochinar.aac.xspf";
                }
            }



        }


        document.getElementById("pause").style.visibility = "hidden";
        setInterval(callphp, 5000);

        //play('0');
    }

    function callphp()
    {
        if(isPlaying == false)
        {
            return;
        }
        
        if(datacounter > 0)
        {
            var backupData = storedData[0];
            var titlename = backupData[0];
            var artistname = backupData[1];
            var ptstime = backupData[2];
            var d = new Date(),
                h = (d.getHours()<10?'0':'') + d.getHours(),
                m = (d.getMinutes()<10?'0':'') + d.getMinutes();
                s = (d.getSeconds()<10?'0':'') + d.getSeconds();
                var currenttime = h + ':' + m + ':' + s;

            if(ptstime <= currenttime)
            {
                if(titlename == "Unknown")
                {
                    
                }
                else if(artistname == "Unknown")
                {
                    
                }
                else
                {
               
                }
                storedData.shift();
                datacounter = datacounter - 1;
            }
            //return;
        }
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var respose = this.responseText;
                var res = respose.split("$*ATC*$");
                if(res.length == 3)
                {
                    var titlename = res[0];
                    var artistname = res[1];
                    var ptstime = res[2];
                    //var a = ptstime.split(':'); // split it at the colons

                    // minutes are worth 60 seconds. Hours are worth 60 minutes.
                    //var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
                    //var ptsms = seconds*1000;
                    var d = new Date(),
                        h = (d.getHours()<10?'0':'') + d.getHours(),
                        m = (d.getMinutes()<10?'0':'') + d.getMinutes();
                        s = (d.getSeconds()<10?'0':'') + d.getSeconds();
                    var currenttime = h + ':' + m + ':' + s;
                    //var currentdate = new Date(); 
                    //var currenttime = currentdate.getHours() + ":" + currentdate.getMinutes()  + ":" + currentdate.getSeconds(); // =>  30

                    //var currenttime = currentdate.getTime();
                    
                    if(ptstime > currenttime)
                    {
                        if(datacounter > 0)
                        {
                            var backupData = storedData[datacounter-1];
                            var ptstime1 = backupData[2];
                            if(ptstime1 == ptstime)
                            {
                                return;
                            }
                        }
                        storedData[datacounter] = res;
                        datacounter = datacounter + 1;
                        return;
                    }
                    else
                    {
                    //var titname = document.getElementById("animate");
                    //titname.innerHTML =  titlename;
                    //var artname = document.getElementById("animate");
                    //artname.innerHTML =  artistname;
                        if(titlename == "Unknown")
                        {
                            
                        }
                        else if(artistname == "Unknown")
                        {
                            
                        }
                        else
                        {
                        
                        }
                    }
                }
                else
                {
                    
                }
                
            }
        };
        xmlhttp.open("GET", "getinfo.php" , true);
        xmlhttp.send();
    }   

    playButton.onclick = function() {
        play(0);
    }
    pauseButton.onclick = function() {
        pauseStream();
    }

    function muteUnmute(btn) {
        try {
            if (isMute == 1) {
                if (isFlashSupported == 1) //flash
                {
                    //document.getElementById("flash").setRadioVolume(0);
                    document.getElementById("vid").volume = 0;
                    volumecontrol.value = 0;
                    //var volume = document.getElementById("volume").value = 0;
                    //console.log("My vol " + volume);

                } else //html5
                {
                    document.getElementById("aud").pause();
                    //document.getElementById("aud").volume = 0;
                }

                btn.src = "img/vol_mute.png";
                isMute = 0;


                // var val = audio.volume === 0 ? (lastVolume || 20) : 0
                // slider.val(val).change()
            } else {
                if (isFlashSupported == 1) //flash
                {
                    document.getElementById("vid").volume = volume / 100;
                    //document.getElementById("flash").setRadioVolume(volume);
                    //document.getElementById("vid").play();
                    volumecontrol.value = 20;
                } else //html5
                {
                    document.getElementById("aud").play();
                }

                btn.src = "img/vol.png";
                isMute = 1;
            }
        } catch (e) {
            //alert(e);
        }
    }



    function play(num) {
        try {


            if (isFlashSupported == 1) //flash
            {
                console.log("Inflash");
                try {


                    var video = document.getElementById("vid");


                    hls.loadSource(globalstreamname);
                    hls.attachMedia(document.getElementById("vid"));



                    document.getElementById("vid").play();
                } catch (e) {
                    alert(e);
                }
            } else //html5
            {
                console.log("Inhtml5");
                document.getElementById("aud").src = globalstreamname;
                var audio = document.getElementById("aud");
                audio.src = globalstreamname;
                document.getElementById("aud").play();
                document.getElementById("aud").volume = volume / 100;

            }

            isPlaying = true;
            document.getElementById("play").style.visibility = "hidden";
            document.getElementById("pause").style.visibility = "visible";
        } catch (e) {
            //alert(e);
        }
    }

    function pauseStream() {
        if (isFlashSupported == 1) //flash
        {
            document.getElementById("vid").pause();
            hls.stopLoad();
            hls.detachMedia();
            hls.destroy();
            hls = new Hls();

        } else //html5
        {
            document.getElementById("aud").pause();
        }

        isPaused = true;
        isPlaying = false;
        document.getElementById("play").style.visibility = "visible";
        document.getElementById("pause").style.visibility = "hidden";
        // document.getElementById("nowPlaying").innerHTML = "Radio9 89.6 FM";

    }

    function SetVolume(val) {
        var player = document.getElementById('vid');
        // console.log('Before: ' + player.volume);
        player.volume = val / 100;
        // console.log('After: ' + player.volume);
    }

    // volumecontrol.oninput = function() {
    //     SetVolume(this.value)
    // }

    // volumecontrol.onchange = function() {
    //     SetVolume(this.value)
    // }