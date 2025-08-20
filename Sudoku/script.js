var numSelected = null;

var tileSelected = null;

var errors = 0;

var board = [
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

var solution = [
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

window.onload = function () {
  setGame();
};

function setGame() {
  // digits 1 - 9
  for (let i = 1; i <= 9; i++) {
    let number = document.createElement("div");
    number.id = i;
    number.innerText = i;
    number.classList.add("number");
    number.addEventListener("click", selectNumber);

    document.getElementById("digits").appendChild(number);
  }

  // board
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let tile = document.createElement("div");
      tile.id = i.toString() + "-" + j.toString();
      tile.classList.add("tile");
      if (board[i][j] != "-") {
        tile.classList.add("tile-start");
        tile.innerText = board[i][j];
      }
      if (i == 2 || i == 5) {
        tile.classList.add("horizontal-line");
      }
      if (j == 2 || j == 5) {
        tile.classList.add("vertical-line");
      }
      tile.addEventListener("click", selectTile);

      document.getElementById("board").append(tile);
    }
  }
}

function selectNumber() {
  if (numSelected != null) {
    numSelected.classList.remove("number-selected");
  }
  numSelected = this;
  numSelected.classList.add("number-selected");
}

function selectTile() {
  if (numSelected && this.innerText == "") {
    // this.innerText = numSelected.id;

    let coords = this.id.split("-"); // ["7", "4"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (solution[r][c] == numSelected.id) {
      this.innerText = numSelected.id;
    } else {
      errors++;
      document.getElementById("errors").innerText = errors;
    }
  }
}
