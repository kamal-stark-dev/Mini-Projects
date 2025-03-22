const container = document.querySelector(".container");
const instrumentsEl = document.querySelector(".instruments");

const instruments = ["tambourine", "drum", "kick-drum", "cymbal-crash"];

instruments.forEach((instrument) => {
  const instrumentEl = document.createElement("div");

  const img = document.createElement("img");
  img.src = `./assets/${instrument}.jpg`;
  instrumentEl.appendChild(img);

  const name = document.createElement("span");
  name.innerText = `${instrument
    .replace(/-/g, " ")
    .replace(/(^\w|\s\w)/g, (match) => match.toUpperCase())}`;
  instrumentEl.appendChild(name);

  const song = document.createElement("audio");
  song.src = `./assets/${instrument}.mp3`;
  instrumentEl.appendChild(song);

  img.addEventListener("click", () => {
    song.currentTime = 0;
    song.play();
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === instrument[0].toLowerCase()) {
      song.currentTime = 0;
      song.play();
    }
  });

  instrumentsEl.appendChild(instrumentEl);
});

const bgMusicEl = document.querySelector(".background-music");
const bgSong = document.querySelector("#bg-song");

bgMusicEl.addEventListener("click", () => {
  bgMusicEl.classList.toggle("clicked");
  if (bgSong.paused) {
    bgSong.play();
  } else {
    bgSong.pause();
  }
});
