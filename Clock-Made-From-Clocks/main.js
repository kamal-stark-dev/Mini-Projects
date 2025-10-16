const digits = document.querySelectorAll(".digit");

const tickSound = new Audio("assets/clock-tik.mp3");
tickSound.volume = 0.5;

const angles = {
  tr: [0, 270],
  rd: [0, 90],
  dl: [90, 180],
  lt: [180, 270],
  "|": [90, 270],
  "--": [0, 180],
  " ": [135, 135], // inactive
};

const digitMap = {
  0: [
    "rd",
    "--",
    "--",
    "dl",
    "|",
    "rd",
    "dl",
    "|",
    "|",
    "|",
    "|",
    "|",
    "|",
    "|",
    "|",
    "|",
    "|",
    "tr",
    "lt",
    "|",
    "tr",
    "--",
    "--",
    "lt",
  ],

  1: [
    "rd",
    "--",
    "dl",
    "",
    "tr",
    "dl",
    "|",
    "",
    "",
    "|",
    "|",
    "",
    "",
    "|",
    "|",
    "",
    "rd",
    "lt",
    "tr",
    "dl",
    "tr",
    "--",
    "--",
    "lt",
  ],

  2: [
    "rd",
    "--",
    "--",
    "dl",
    "tr",
    "--",
    "dl",
    "|",
    "rd",
    "--",
    "lt",
    "|",
    "|",
    "rd",
    "--",
    "lt",
    "|",
    "tr",
    "--",
    "dl",
    "tr",
    "--",
    "--",
    "lt",
  ],

  3: [
    "rd",
    "--",
    "--",
    "dl",
    "tr",
    "--",
    "dl",
    "|",
    "",
    "rd",
    "lt",
    "|",
    "",
    "tr",
    "dl",
    "|",
    "rd",
    "--",
    "lt",
    "|",
    "tr",
    "--",
    "--",
    "lt",
  ],

  4: [
    "rd",
    "dl",
    "rd",
    "dl",
    "|",
    "|",
    "|",
    "|",
    "|",
    "tr",
    "lt",
    "|",
    "tr",
    "--",
    "dl",
    "|",
    "",
    "",
    "|",
    "|",
    "",
    "",
    "tr",
    "lt",
  ],

  5: [
    "rd",
    "--",
    "--",
    "dl",
    "|",
    "rd",
    "--",
    "lt",
    "|",
    "tr",
    "--",
    "dl",
    "tr",
    "--",
    "dl",
    "|",
    "rd",
    "--",
    "lt",
    "|",
    "tr",
    "--",
    "--",
    "lt",
  ],

  6: [
    "rd",
    "--",
    "--",
    "dl",
    "|",
    "rd",
    "--",
    "lt",
    "|",
    "tr",
    "--",
    "dl",
    "|",
    "rd",
    "dl",
    "|",
    "|",
    "tr",
    "lt",
    "|",
    "tr",
    "--",
    "--",
    "lt",
  ],

  7: [
    "rd",
    "--",
    "--",
    "dl",
    "tr",
    "--",
    "dl",
    "|",
    "",
    "",
    "|",
    "|",
    "",
    "",
    "|",
    "|",
    "",
    "",
    "|",
    "|",
    "",
    "",
    "tr",
    "lt",
  ],

  8: [
    "rd",
    "--",
    "--",
    "dl",
    "|",
    "rd",
    "dl",
    "|",
    "|",
    "tr",
    "lt",
    "|",
    "|",
    "rd",
    "dl",
    "|",
    "|",
    "tr",
    "lt",
    "|",
    "tr",
    "--",
    "--",
    "lt",
  ],

  9: [
    "rd",
    "--",
    "--",
    "dl",
    "|",
    "rd",
    "dl",
    "|",
    "|",
    "tr",
    "lt",
    "|",
    "tr",
    "--",
    "dl",
    "|",
    "rd",
    "--",
    "lt",
    "|",
    "tr",
    "--",
    "--",
    "lt",
  ],
};

function createDigit(digit, clock) {
  for (let i = 0; i < 23; i++) {
    const clone = clock.cloneNode(true); // true -> deep clone (include hands)
    digit.appendChild(clone);
  }
}

function updateDigit(digit, num) {
  const clocks = digit.querySelectorAll(".clock");
  const map = digitMap[num];

  clocks.forEach((clock, i) => {
    const symbol = map[i] || " ";
    const [angle1, angle2] = angles[symbol];

    const [hand1, hand2] = clock.querySelectorAll(".hand");
    hand1.style.rotate = `${angle1}deg`;
    hand2.style.rotate = `${angle2}deg`;

    if (symbol.trim() !== "") {
      // 1. ACTIVE/FILLED Cell: Full color, full opacity
      clock.classList.add("filled");
      clock.classList.remove("dim"); // Remove dim in case it was previously inactive
    } else {
      // 2. INACTIVE/EMPTY Cell: Default background, 0.5 opacity (dim)
      clock.classList.remove("filled");
      clock.classList.add("dim");
    }
  });
}

digits.forEach((digit) => {
  const clock = digit.querySelector(".clock");
  createDigit(digit, clock);
});

setInterval(() => {
  const time = new Date()
    .toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    .replace(/\D/g, "")
    .split("");

  digits.forEach((digit, i) => {
    updateDigit(digit, time[i]);
  });

  tickSound.play();
}, 1000);
