const song = document.getElementById("song");

const playPause = document.getElementById("playPause");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const songTitleEl = document.getElementById("song-title");

const rewindEl = document.getElementById("rewind10");
const forwardEl = document.getElementById("forward10");

playPause.addEventListener("click", () => {
  playPauseSong();
});

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
});

// song title
songTitleEl.innerText = getSongTitle();

// song volume
song.volume = 0.4;

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
    playPause.classList.toggle("ri-pause-fill");
    playPause.classList.toggle("ri-play-fill");
    song.play();
  } else {
    playPause.classList.toggle("ri-pause-fill");
    playPause.classList.toggle("ri-play-fill");
    song.pause();
  }
}

console.log(song.getElementsByTagName("source")[0].src);

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
