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
  drawCircle(endX, endY, 20);
}

function calcEndPoints(startX, startY, angle, length) {
  const endX = startX + length * Math.sin(angle);
  const endY = startY + length * Math.cos(angle);
  return { x: endX, y: endY };
}

let trace_queue = [];
const MAX_TRACE_LEN = 120;
const defaultColorRGBA = [237, 37, 78, 255];

function drawTrail(xPos, yPos) {
  trace_queue.push({ xPos, yPos });
  if (trace_queue.length > MAX_TRACE_LEN) {
    trace_queue.shift();
  }

  const curr_length = trace_queue.length;

  for (let i = 0; i < curr_length; i++) {
    const opacity = (i / curr_length) ** 2;
    const color = `rgba(237, 37, 78, ${opacity})`;

    drawCircle(trace_queue[i].xPos, trace_queue[i].yPos, 2, color);
  }
}

function drawDoublePendulum(startX, startY, angle1, length1, angle2, length2) {
  // first bob
  const { x: x1, y: y1 } = calcEndPoints(startX, startY, angle1, length1);

  // second bob
  const { x: x2, y: y2 } = calcEndPoints(x1, y1, angle2, length2);

  // rods
  drawLine(startX, startY, x1, y1, "white", 2);
  drawLine(x1, y1, x2, y2, "white", 2);

  // masses
  drawCircle(x1, y1, 20);
  drawCircle(x2, y2, 20);

  drawTrail(x2, y2);
}

let l1, l2, m1, m2, angle1, angle2, angle1_d, angle2_d;

// function init_vars(length1 = 200, length2 = 150, mass1 = 1, mass2 = 1) {
//   l1 = length1;
//   l2 = length2;

//   m1 = mass1;
//   m2 = mass2;

//   angle1 = getRandomAngle(-90, 90);
//   angle2 = getRandomAngle(0, 360);

//   angle1_d = 0;
//   angle2_d = 0;

//   // resetting trace
//   trace_queue = [];
// }

const G = 9.8;

function updateAngles(dt) {
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
  angle1_d += angle1_dd * dt;
  angle2_d += angle2_dd * dt;

  // new angles
  angle1 += angle1_d * dt;
  angle2 += angle2_d * dt;

  // Dampen velocity slightly over time to simulate air friction and prevent chaotic explosions
  const damping = 0.9995;
  // angle1_d *= damping;
  // angle2_d *= damping;
}

// 1. Define your target FPS and timing variables
const TARGET_FPS = 60;
const FRAME_INTERVAL = 1000 / TARGET_FPS; // Milliseconds per frame (~16.66ms)
let lastTime = 0;
let accumulator = 0;

function draw(timestamp = 0) {
  // 2. Calculate time passed since the last browser frame
  let elapsed = (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  // Track accumulated time
  accumulator += elapsed;

  const speed = 7;

  // 3. Only update angles when enough time has accumulated
  while (accumulator >= 1 / TARGET_FPS) {
    updateAngles((1 / TARGET_FPS) * speed);
    accumulator -= 1 / TARGET_FPS; // Decrease accumulator by one fixed frame step
  }

  // 4. Render every frame for smooth visuals
  clearRect();
  drawDoublePendulum(canvas.width / 2, 0, angle1, l1, angle2, l2);

  // 5. Loop
  requestAnimationFrame(draw);
}

// resize canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas(); // Initial call

// restart on SPACE
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    updateControls();
  }
});

// INPUTS
const length_1_slider = document.getElementById("length_1");
const length_2_slider = document.getElementById("length_2");

const mass_1_slider = document.getElementById("mass_1");
const mass_2_slider = document.getElementById("mass_2");

const angle_1_slider = document.getElementById("angle_1");
const angle_2_slider = document.getElementById("angle_2");

const length_1_value = document.getElementById("length_1_value");
const length_2_value = document.getElementById("length_2_value");

const mass_1_value = document.getElementById("mass_1_value");
const mass_2_value = document.getElementById("mass_2_value");

const angle_1_value = document.getElementById("angle_1_value");
const angle_2_value = document.getElementById("angle_2_value");

[
  length_1_slider,
  length_2_slider,
  mass_1_slider,
  mass_2_slider,
  angle_1_slider,
  angle_2_slider,
].forEach((slider) => {
  slider.addEventListener("input", updateControls);
});

updateControls();
requestAnimationFrame(draw);

function init_vars() {
  l1 = Number(length_1_slider.value);
  l2 = Number(length_2_slider.value);

  m1 = Number(mass_1_slider.value);
  m2 = Number(mass_2_slider.value);

  angle1 = Number(angle_1_slider.value) * DEG2RAD;
  angle2 = Number(angle_2_slider.value) * DEG2RAD;

  angle1_d = 0;
  angle2_d = 0;

  trace_queue = [];
}

function updateControls() {
  length_1_value.textContent = length_1_slider.value;
  length_2_value.textContent = length_2_slider.value;

  mass_1_value.textContent = mass_1_slider.value;
  mass_2_value.textContent = mass_2_slider.value;

  angle_1_value.textContent = angle_1_slider.value;
  angle_2_value.textContent = angle_2_slider.value;

  init_vars();
}
