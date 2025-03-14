const upcomingYearEl = document.getElementById("upcoming-year");

const daysLeft = document.getElementById("days");
const hoursLeft = document.getElementById("hours");
const minutesLeft = document.getElementById("minutes");
const secondsLeft = document.getElementById("seconds");

upcomingYearEl.innerText = dayjs().add(1, "year").format("YYYY");

const newYearTime = new Date("Jan 1, 2026 00:00:00").getTime();

updateCountdown();

function updateCountdown() {
  const now = new Date().getTime();

  const gap = newYearTime - now;

  const second = 1000;
  const minute = 60 * second;
  const hour = 60 * minute;
  const day = 24 * hour;

  const d = Math.floor(gap / day);
  const h = Math.floor((gap % day) / hour);
  const m = Math.floor((gap % hour) / minute);
  const s = Math.floor((gap % minute) / second);

  daysLeft.innerText = d;
  hoursLeft.innerText = h;
  minutesLeft.innerText = m;
  secondsLeft.innerText = s;

  setInterval(updateCountdown, 1000);
}
