const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// generic functions
const defaultColor = "#ED254E";

function clearRect() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawLine(
  startX,
  startY,
  endX,
  endY,
  color = defaultColor,
  thickness = 1,
) {
  ctx.beginPath();

  ctx.strokeStyle = color;
  ctx.lineWidth = thickness;

  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);

  ctx.closePath();
  ctx.stroke();
}

function drawCircle(centerX, centerY, radius, fill = defaultColor) {
  ctx.beginPath();

  ctx.fillStyle = fill;
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.fill();

  ctx.closePath();
}

function drawText(
  text = "Hello, World!",
  startX = 0,
  startY = 24,
  color = defaultColor,
  size = 24,
  font = "Arial",
) {
  ctx.font = size + "px " + font;
  ctx.fillStyle = color;
  ctx.fillText(text, startX, startY);
}

// constants
const DEG2RAD = Math.PI / 180;

// drawing pendulum
function drawPendulum(startX, startY, angle, length) {
  end = calcEndPoints(startX, startY, angle, length);

  drawLine(startX, startY, end.x, end.y, "white", 2);
  drawCircle(end.x, end.y, 25);
}

function calcEndPoints(startX, startY, angle, length) {
  const endX = startX + length * Math.cos(angle);
  const endY = startY + length * Math.sin(angle);
  return { x: endX, y: endY };
}

function drawDoublePendulum(startX, startY, angle1, length1, angle2, length2) {
  end = calcEndPoints(startX, startY, angle1, length1);
  drawPendulum(end.x, end.y, angle2, length2);

  // drawing first one later so that it comes on top of second one
  drawPendulum(startX, startY, angle1, length1);
}

function draw() {
  //   drawPendulum(canvas.width / 2, 0, 60 * DEG2RAD, 200);

  drawDoublePendulum(canvas.width / 2, 0, 60 * DEG2RAD, 200, 30 * DEG2RAD, 150);
}

// resize canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  draw(); // draw the contents
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas(); // Initial call
