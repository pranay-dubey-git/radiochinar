<?php

$stream_url = "http://streamasiacdn.atc-labs.com/radiochinar.aac.xspf";
// $xspf_url = $stream_url . ".xspf";
$xml = file_get_contents($stream_url);


if($xml){
    $data = simplexml_load_string($xml);
    $metadata = $data->trackList->track->title;
    echo $metadata;
  
}
else
{
	
}
?>