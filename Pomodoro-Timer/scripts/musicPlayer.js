import { songs } from "../data/songs.js";

const song = document.getElementById("song");

const playPause = document.getElementById("playPause");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const songTitleEl = document.getElementById("song-title");

const rewindEl = document.getElementById("rewind10");
const forwardEl = document.getElementById("forward10");

const prevSongEl = document.getElementById("prevSong");
const nextSongEl = document.getElementById("nextSong");

const trackImageEl = document.getElementById("track-image");

document.querySelector("body").addEventListener("keydown", (event) => {
  if (event.key === " ") {
    playPauseSong();
  }
  if (event.key === "ArrowRight") {
    forward10seconds();
  }
  if (event.key === "ArrowLeft") {
    rewind10seconds();
  }
  if (event.ctrlKey) {
    if (event.key === "ArrowLeft") {
      idx = (idx - 1 + songsLength) % songsLength;
      changeSong(idx);
    }
    if (event.key === "ArrowRight") {
      idx = (idx + 1) % songsLength;
      changeSong(idx);
    }
  }
});

// song link
let idx = 0;
const songsLength = songs.length;

function changeSong(idx = 0) {
  trackImageEl.src = songs[idx].bannerLink;
  song.getElementsByTagName("source")[0].src = songs[idx].songLink;
  song.load(); // to load the new song
  songTitleEl.innerText = getSongTitle();

  playPause.classList.remove("ri-play-fill");
  playPause.classList.add("ri-pause-fill");
  song.play();
}
// changeSong(idx);

prevSongEl.addEventListener("click", () => {
  idx = (idx - 1 + songsLength) % songsLength;
  changeSong(idx);
});

nextSongEl.addEventListener("click", () => {
  idx = (idx + 1) % songsLength;
  changeSong(idx);
});

// song title
songTitleEl.innerText = getSongTitle();

// song volume
song.volume = 0.4;

playPause.addEventListener("click", () => {
  playPauseSong();
});

song.addEventListener("loadedmetadata", () => {
  durationEl.innerText = formatTime(song.duration);
});

song.addEventListener("timeupdate", () => {
  currentTimeEl.innerText = formatTime(song.currentTime);
});

// rewind and forward - 10 seconds
rewindEl.addEventListener("click", () => {
  rewind10seconds();
});

forwardEl.addEventListener("click", () => {
  forward10seconds();
});

function playPauseSong() {
  if (song.paused) {
    playPause.classList.remove("ri-play-fill");
    playPause.classList.add("ri-pause-fill");
    song.play();
  } else {
    playPause.classList.remove("ri-pause-fill");
    playPause.classList.add("ri-play-fill");
    song.pause();
  }
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function getSongTitle() {
  const songLink = song.getElementsByTagName("source")[0].src;
  const songName = songLink
    .substring(songLink.lastIndexOf("/") + 1, songLink.lastIndexOf("."))
    .replace(/%20/g, " ");
  return songName;
}

function forward10seconds() {
  song.currentTime = Math.min(song.duration, song.currentTime + 10);
}

function rewind10seconds() {
  song.currentTime = Math.max(0, song.currentTime - 10);
}
