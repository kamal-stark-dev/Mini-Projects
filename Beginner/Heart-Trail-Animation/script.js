const body = document.querySelector("body");

body.addEventListener("mousemove", (event) => {
  const posX = event.offsetX;
  const posY = event.offsetY;

  const spanElem = document.createElement("span");
  spanElem.style.left = posX + "px";
  spanElem.style.top = posY + "px";

  const size = Math.random() * 50 + 10;
  spanElem.style.width = size + "px";
  spanElem.style.height = size + "px";
  body.appendChild(spanElem);

  setTimeout(() => {
    spanElem.remove();
  }, 2500);
});
