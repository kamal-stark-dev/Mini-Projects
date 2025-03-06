const imageContainer = document.querySelector(".image-container");

const btnEl = document.querySelector(".btn");

btnEl.addEventListener("click", () => {
  addImages(4);
});

function addImages(imgCount) {
  for (let i = 0; i < imgCount; i++) {
    const img = document.createElement("img");
    img.src = `https://picsum.photos/300?random=${Math.floor(
      Math.random() * 1000
    )}`;
    imageContainer.appendChild(img);
  }
}
