const imageContainer = document.querySelector(".image-container");
const prevEl = document.getElementById("prev");
const nextEl = document.getElementById("next");
const autoEl = document.getElementById("auto");

let x = 0;
let intervalId;

function rotateGallery(direction) {
  x += direction;
  updateGallery(x);
}

function toggleAutoRotate() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    autoEl.textContent = "Auto";
  } else {
    intervalId = setInterval(() => {
      rotateGallery(-30);
    }, 1600);
    autoEl.textContent = "Stop";
  }
}

prevEl.addEventListener("click", () => rotateGallery(30));
nextEl.addEventListener("click", () => rotateGallery(-30));
autoEl.addEventListener("click", toggleAutoRotate);

document.querySelector("body").addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    rotateGallery(30);
  } else if (event.key === "ArrowRight") {
    rotateGallery(-30);
  } else if (event.key === " ") {
    toggleAutoRotate();
  }
});

function updateGallery(x) {
  imageContainer.style.transform = `perspective(750px) rotateY(${x}deg)`;
}
