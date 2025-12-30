// logic goes brrr...

const WIDTH = 800;
const HEIGHT = 800;

canvas.width = WIDTH;
canvas.height = HEIGHT;

const BACKGROUND = "#333333";
const FOREGROUND = "#EDF2F4";

const ctx = canvas.getContext("2d");

function line(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function circle(x, y, radius, startAngle, endAngle, counter_clockwise=false) {
  ctx.beginPath();
  ctx.arc(x, y, radius, startAngle, endAngle, counter_clockwise);
  ctx.stroke();
}

function font(text, x, y, font="32px Arial", style="normal") {
  ctx.font = font;
  if (style == "normal") {
    ctx.fillText(text, x, y);
  }
  else if (style == "stroke") {
    ctx.strokeText(text, x, y);
  }
  else {
    console.log("Invalid style selected.");
  }
}

function image(path, x, y, scale=1, alpha=1) {
  const img = new Image();
  img.src = path;

  const w = img.width * scale;
  const h = img.height * scale;

  img.onload = () => {
    ctx.globalAlpha = alpha;
    ctx.drawImage(img, x, y, w, h);
    ctx.globalAlpha = 1.0;
  }
}
