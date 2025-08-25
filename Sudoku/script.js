let selectedNumber = null;
let errors = 0;

const board = [
  "--74916-5",
  "2---6-3-9",
  "-----7-1-",
  "-586----4",
  "--3----9-",
  "--62--187",
  "9-4-7---2",
  "67-83----",
  "81--45---",
];

const solution = [
  "387491625",
  "241568379",
  "569327418",
  "758619234",
  "123784596",
  "496253187",
  "934176852",
  "675832941",
  "812945763",
];

// number usage counts (0-based: counts[0] = count of 1s, counts[8] = count of 9s)
let numberCounts = getNumberCounts(board);

// cache digit elements for efficiency
let digitElements = {};

window.onload = () => {
  setGame();
  renderCounts(); // hide already-completed numbers if any
};

function setGame() {
  // digits 1 - 9
  const digitsContainer = document.getElementById("digits");
  for (let i = 1; i <= 9; i++) {
    const number = document.createElement("div");
    number.id = `digit-${i}`;
    number.innerText = i;
    number.classList.add("number");
    number.addEventListener("click", () => selectNumber(i, number));

    digitElements[i] = number; // cache reference
    digitsContainer.appendChild(number);
  }

  // board
  const boardContainer = document.getElementById("board");
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const tile = document.createElement("div");
      tile.id = `${r}-${c}`;
      tile.classList.add("tile");
      tile.addEventListener("click", () => selectTile(r, c, tile));

      // pre-filled cells
      if (board[r][c] !== "-") {
        tile.classList.add("tile-start");
        tile.innerText = board[r][c];
      }

      // box separators
      if (r === 2 || r === 5) tile.classList.add("horizontal-line");
      if (c === 2 || c === 5) tile.classList.add("vertical-line");

      boardContainer.appendChild(tile);
    }
  }
}

function selectNumber(value, element) {
  if (selectedNumber !== null) {
    digitElements[selectedNumber].classList.remove("number-selected");
  }
  selectedNumber = value;
  element.classList.add("number-selected");
}

function selectTile(r, c, tile) {
  if (!selectedNumber) return; // must pick a number first
  if (tile.classList.contains("tile-start")) return; // can't override original clues

  // overwrite tile with the new number
  tile.innerText = selectedNumber;
  tile.classList.remove("wrong-tile"); // clear previous state

  if (solution[r][c] == selectedNumber) {
    tile.classList.remove("wrong-tile");
  } else {
    tile.classList.add("wrong-tile");
    errors++;
    document.getElementById("errors").innerText = errors;
    checkErrors();
  }

  // recalc counts from current board after any change
  numberCounts = getNumberCountsFromBoard();
  renderCounts();
}

function getNumberCounts(board) {
  const counts = new Array(9).fill(0);
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const char = board[r][c];
      if (char !== "-") counts[char - 1]++;
    }
  }
  return counts;
}

function getNumberCountsFromBoard() {
  const counts = new Array(9).fill(0);
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const tile = document.getElementById(`${r}-${c}`);
      const val = tile.innerText;
      if (val >= "1" && val <= "9" && solution[r][c] === val) {
        counts[val - 1]++;
      }
    }
  }
  return counts;
}

function renderCounts() {
  for (let i = 1; i <= 9; i++) {
    if (numberCounts[i - 1] >= 9) {
      digitElements[i].style.visibility = "hidden";
    } else {
      digitElements[i].style.visibility = "visible";
    }
  }
}

function checkErrors() {
  if (errors < 3) return;

  // disable all input
  document.querySelectorAll(".tile").forEach(
    (tile) => tile.replaceWith(tile.cloneNode(true)) // removes all listeners
  );
  document
    .querySelectorAll(".number")
    .forEach((num) => num.replaceWith(num.cloneNode(true)));

  // show game over message
  const gameOverMsg = document.createElement("div");
  gameOverMsg.innerText = "Game Over!!";
  gameOverMsg.style.color = "red";
  document.body.appendChild(gameOverMsg);
}
