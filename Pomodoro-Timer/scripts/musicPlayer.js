const song = document.getElementById("song");

const playPause = document.getElementById("playPause");

playPause.addEventListener("click", () => {
  playPauseSong();
});

document.querySelector("body").addEventListener("keydown", (event) => {
  if (event.key === " ") {
    playPauseSong();
  }
});

function playPauseSong() {
  if (song.paused) {
    song.play();
  } else {
    song.pause();
  }
}
