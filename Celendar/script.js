const dateEl = document.getElementById("date");
const dayEl = document.getElementById("week-day");
const monthEl = document.getElementById("month");
const yearEl = document.getElementById("year");

const date = new Date();

dateEl.innerText = date.getDate();
dayEl.innerText = date.toLocaleDateString("en", { weekday: "long" });
yearEl.innerText = date.getFullYear();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currMonth = date.toLocaleDateString("en", { month: "long" });
if (monthEl) {
  monthEl.src = `./assets/months/${currMonth.toLowerCase()}.png`;
}

const body = document.querySelector("body");
months.forEach((month) => {
  if (currMonth === month) {
    body.classList.add(currMonth.toLowerCase());
    // for debugging
    // body.classList.add("december");
  }
});
