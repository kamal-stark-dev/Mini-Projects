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
    playPause.classList.toggle("ri-pause-fill");
    playPause.classList.toggle("ri-play-fill");
    song.play();
  } else {
    playPause.classList.toggle("ri-pause-fill");
    playPause.classList.toggle("ri-play-fill");
    song.pause();
  }
}
