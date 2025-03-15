const song = document.getElementById("song");

const playPause = document.getElementById("playPause");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const songTitleEl = document.getElementById("song-title");

playPause.addEventListener("click", () => {
  playPauseSong();
});

document.querySelector("body").addEventListener("keydown", (event) => {
  if (event.key === " ") {
    playPauseSong();
  }
});

// song title
songTitleEl.innerText = getSongTitle();

song.addEventListener("loadedmetadata", () => {
  durationEl.innerText = formatTime(song.duration);
});

song.addEventListener("timeupdate", () => {
  currentTimeEl.innerText = formatTime(song.currentTime);
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
