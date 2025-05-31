const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const ripple = document.getElementById("ripple");
const audio = document.getElementById("aud");

const streamUrl = "https://d3413g2ooyoexr.cloudfront.net/radiochinar.m3u8";
let isPlaying = false;

// Check for HLS support
let hls;
if (Hls.isSupported()) {
    hls = new Hls();
    hls.loadSource(streamUrl);
    hls.attachMedia(audio);
} else {
    audio.src = streamUrl;
}

// Play function
function play() {
    audio.play().then(() => {
        isPlaying = true;
        playButton.style.visibility = "hidden";
        pauseButton.style.visibility = "visible";
        ripple.classList.remove("d-none");
    }).catch((err) => {
        console.error("Play failed:", err);
    });
}

// Pause function
function pause() {
    audio.pause();
    isPlaying = false;
    playButton.style.visibility = "visible";
    pauseButton.style.visibility = "hidden";
    ripple.classList.add("d-none");
}

// Event listeners
playButton.onclick = play;
pauseButton.onclick = pause;
