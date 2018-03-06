#!/usr/bin/env node
const { exec } = require('child_process');
const INTERVAL = 3000;

checkStatus();
function checkStatus(){
  exec('spotify status', handleStatus)
  setTimeout(checkStatus, INTERVAL);
}

function handleStatus(err, stdout, stderr){
  let artist = parseArtist(stdout)
  artist.length == 0 ? mute() : unmute()
}

function mute(){
  console.log(`muting`);
  exec('spotify vol 0')
}

function unmute(){
  console.log(`unmuting`);
  exec('spotify vol 100')
}

function parseArtist(stdout){
  /* FORMAT OF SPOTIFY STATUS STDOUT
    Spotify is currently paused.
    Artist:
    Album:
    Track: Learn More
    Position: 0:01 / 0:29
  */
  let artistLine = stdout.split('\n')[1]
  return artistLine.split(':')[1].trim()
}