const pallet = document.querySelector(".js-pallet");

let palletHTML = ``;
for (let i = 0; i < 4; i++) {
  palletHTML += `<div class="color"><span>${randomColor()}</span></div>`;
}
pallet.innerHTML = palletHTML;

document.querySelectorAll(".color").forEach((colorEl) => {
  const bgColor = colorEl.innerText;
  colorEl.style.backgroundColor = bgColor;
  colorEl.style.color = getContrastYIQ(bgColor);
});

function getContrastYIQ(hexcolor) {
  hexcolor = hexcolor.replace("#", "");

  const r = parseInt(hexcolor.substr(0, 2), 16);
  const g = parseInt(hexcolor.substr(2, 2), 16);
  const b = parseInt(hexcolor.substr(4, 2), 16);

  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "black" : "white";
}

function randomColor() {
  const chars = "0123456789abcdef";
  const colorCodeLen = 6;
  let color = "#";
  for (let i = 0; i < colorCodeLen; i++) {
    const randomNum = Math.floor(Math.random() * chars.length);
    color += chars[randomNum];
  }
  return color;
}

console.log(randomColor());

document.querySelector("body").addEventListener("keydown", (event) => {
  //   event.preventDefault();
  if (event.key === " ") {
    location.reload();
  }
});

document.querySelectorAll(".color").forEach((color) => {
  color.addEventListener("click", () => copyToClipboard(color.innerText));
});

// copy to clipboard
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    console.log("Text Copied");
  });
}
