const btnEl = document.querySelector("#roll-dice");
const diceEl = document.querySelector("#dice");

const rollHistoryList = document.querySelector("#roll-history");

let historyList = [];

function rollDice() {
  const rollResult = Math.floor(Math.random() * 6) + 1;
  const diceFace = getDiceFace(rollResult);
  diceEl.innerHTML = diceFace;

  historyList.push(diceFace);
  updateHistory();
}

function updateHistory() {
  rollHistoryList.innerHTML = "";
  for (let i = historyList.length - 1; i >= 0; i--) {
    const li = document.createElement("li");
    li.innerHTML = `Roll ${i + 1}: <span>${historyList[i]}</span>`;
    rollHistoryList.appendChild(li);
  }
}

function getDiceFace(rollResult) {
  switch (rollResult) {
    case 1:
      return "&#9856;";
    case 2:
      return "&#9857;";
    case 3:
      return "&#9858;";
    case 4:
      return "&#9859;";
    case 5:
      return "&#9860;";
    case 6:
      return "&#9861;";
    default:
      return "";
  }
}

btnEl.addEventListener("click", () => {
  diceEl.classList.add("roll-animation");
  rollDice();
});

diceEl.addEventListener("animationend", () => {
  diceEl.classList.remove("roll-animation");
});
