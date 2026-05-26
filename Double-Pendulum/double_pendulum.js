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

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomAngle(min, max) {
  return getRandom(min, max) * DEG2RAD;
}

// constants
const DEG2RAD = Math.PI / 180;

// drawing pendulum
function drawPendulum(startX, startY, angle, length) {
  const { x: endX, y: endY } = calcEndPoints(startX, startY, angle, length);

  drawLine(startX, startY, endX, endY, "white", 2);
  drawCircle(endX, endY, 25);
}

function calcEndPoints(startX, startY, angle, length) {
  const endX = startX + length * Math.sin(angle);
  const endY = startY + length * Math.cos(angle);
  return { x: endX, y: endY };
}

function drawDoublePendulum(startX, startY, angle1, length1, angle2, length2) {
  const { x: endX, y: endY } = calcEndPoints(startX, startY, angle1, length1);
  drawPendulum(endX, endY, angle2, length2);

  // drawing first one later so that it comes on top of second one
  drawPendulum(startX, startY, angle1, length1);
}

let l1, l2, m1, m2, angle1, angle2, angle1_d, angle2_d;

function init_vars(length1 = 200, length2 = 150, mass1 = 1, mass2 = 1) {
  l1 = length1;
  l2 = length2;

  m1 = mass1;
  m2 = mass2;

  angle1 = getRandomAngle(-90, 90);
  angle2 = getRandomAngle(0, 360);

  angle1_d = 0;
  angle2_d = 0;
}

// const G = 9.8;
const G = 0.2;

function updateAngles() {
  // angular acceleration
  let angle1_dd =
    (-G * (2 * m1 + m2) * Math.sin(angle1) -
      m2 * G * Math.sin(angle1 - 2 * angle2) -
      2 *
        Math.sin(angle1 - angle2) *
        m2 *
        (angle2_d ** 2 * l2 + angle1_d ** 2 * l1 * Math.cos(angle1 - angle2))) /
    (l1 * (2 * m1 + m2 - m2 * Math.cos(2 * angle1 - 2 * angle2)));

  let angle2_dd =
    (2 *
      Math.sin(angle1 - angle2) *
      (angle1_d ** 2 * l1 * (m1 + m2) +
        G * (m1 + m2) * Math.cos(angle1) +
        angle2_d ** 2 * l2 * m2 * Math.cos(angle1 - angle2))) /
    (l2 * (2 * m1 + m2 - m2 * Math.cos(2 * angle1 - 2 * angle2)));

  // angular velocity
  angle1_d += angle1_dd;
  angle2_d += angle2_dd;

  // new angles
  angle1 += angle1_d;
  angle2 += angle2_d;

  // Dampen velocity slightly over time to simulate air friction and prevent chaotic explosions
  // angle1_d *= 0.999;
  // angle2_d *= 0.999;
}

// 1. Define your target FPS and timing variables
const TARGET_FPS = 60;
const FRAME_INTERVAL = 1000 / TARGET_FPS; // Milliseconds per frame (~16.66ms)
let lastTime = 0;
let accumulator = 0;

function draw(timestamp = 0) {
  // 2. Calculate time passed since the last browser frame
  let elapsed = timestamp - lastTime;
  lastTime = timestamp;

  // Track accumulated time
  accumulator += elapsed;

  // 3. Only update angles when enough time has accumulated
  while (accumulator >= FRAME_INTERVAL) {
    updateAngles();
    accumulator -= FRAME_INTERVAL; // Decrease accumulator by one fixed frame step
  }

  // 4. Render every frame for smooth visuals
  clearRect();
  drawDoublePendulum(canvas.width / 2, 0, angle1, l1, angle2, l2);

  // 5. Loop
  requestAnimationFrame(draw);
}

// Start the loop
init_vars();
requestAnimationFrame(draw);

// resize canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  draw(); // draw the contents
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas(); // Initial call

// restart on SPACE
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    init_vars();
    draw();
  }
});
