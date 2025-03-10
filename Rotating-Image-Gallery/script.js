const imageContainer = document.querySelector(".image-container");
const prevEl = document.getElementById("prev");
const nextEl = document.getElementById("next");
const autoEl = document.getElementById("auto");

let x = 0;
let intervalId;

prevEl.addEventListener("click", () => {
  x += 45;
  updateGallery(x);
});

nextEl.addEventListener("click", () => {
  x -= 45;
  updateGallery(x);
});

autoEl.addEventListener("click", () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    autoEl.textContent = "Auto";
  } else {
    intervalId = setInterval(() => {
      x -= 45;
      updateGallery(x);
    }, 2000);
    autoEl.textContent = "Stop";
  }
});

function updateGallery(x) {
  imageContainer.style.transform = `perspective(800px) rotateY(${x}deg)`;
}

// key handling
document.querySelector("body").addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    x += 45;
    updateGallery(x);
  } else if (event.key === "ArrowRight") {
    x -= 45;
    updateGallery(x);
  } else if (event.key === " ") {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
      autoEl.textContent = "Auto";
    } else {
      intervalId = setInterval(() => {
        x -= 45;
        updateGallery(x);
      }, 2000);
      autoEl.textContent = "Stop";
    }
  }
});
