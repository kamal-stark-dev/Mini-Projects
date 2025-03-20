const startEl = document.getElementById("start");
const stopEl = document.getElementById("stop");
const resetEl = document.getElementById("reset");

const timerEl = document.getElementById("timer");

let interval;
// let timeLeft = 1500; // 25 minutes
const desiredTime = 1500;
let timeLeft = desiredTime;

function updateTimer() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;

  const formattedTime =
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");

  timerEl.innerText = formattedTime;
}

function startTimer() {
  interval = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft === 0) {
      clearInterval(interval);
      timeLeft = desiredTime;
      updateTimer();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
}

function resetTimer() {
  clearInterval(interval);
  timeLeft = desiredTime;
  updateTimer();
}

startEl.addEventListener("click", startTimer);
stopEl.addEventListener("click", stopTimer);
resetEl.addEventListener("click", resetTimer);
