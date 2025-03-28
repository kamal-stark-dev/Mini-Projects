const displayEl = document.querySelector("#display");
const miniDisplayEl = document.querySelector("#mini-display");

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const power = (a, b) => a ** b;

// will be used to update the display
let num1, operation, num2;

function operate(a, op, b) {
  switch (op) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      const result = divide(a, b);
      return Number.isInteger(result) ? result : result.toFixed(5);
    default:
      return console.error("Invalid Operation");
  }
}

function getVal(id) {
  switch (id) {
    case "zero":
      return "0";
    case "one":
      return "1";
    case "two":
      return "2";
    case "three":
      return "3";
    case "four":
      return "4";
    case "five":
      return "5";
    case "six":
      return "6";
    case "seven":
      return "7";
    case "eight":
      return "8";
    case "nine":
      return "9";
    case "add":
      return "+";
    case "subtract":
      return "-";
    case "multiply":
      return "*";
    case "divide":
      return "/";
    case "percent":
      return "%";
    case "equal":
      return "=";
    case "clear":
      return "clear";
    case "decimal-point":
      return ".";
    case "all-cut":
      return "AC";
    default:
      return ""; // Return empty string for invalid ids
  }
}

// button listners
buttons = document.querySelectorAll("button");

let displayStr = "";
buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const value = getVal(event.currentTarget.id);

    if (value === "AC") {
      displayStr = "";
      num1 = null;
      operation = null;
      num2 = null;
      displayEl.innerText = "0";
      miniDisplayEl.innerText = ""; // Clear mini-display
    } else if (value === "=") {
      if (num1 !== null && operation && displayStr) {
        num2 = parseFloat(displayStr);
        const result = operate(num1, operation, num2);
        miniDisplayEl.innerText = `${num1} ${operation} ${num2} =`; // Update mini-display
        displayEl.innerText = result;
        displayStr = "";
        num1 = null;
        operation = null;
        num2 = null;
      }
    } else if (["+", "-", "*", "/"].includes(value)) {
      if (displayStr) {
        num1 = parseFloat(displayStr);
        operation = value;
        miniDisplayEl.innerText = `${num1} ${operation}`; // Update mini-display
        displayStr = "";
      }
    } else if (value === "%") {
      if (displayStr) {
        const percentValue = parseFloat(displayStr) / 100;
        displayStr = percentValue.toString();
        displayEl.innerText = displayStr;
      }
    } else {
      displayStr += value;
      displayEl.innerText = displayStr;
    }
  });
});

document.addEventListener("keydown", (event) => {
  const keyMap = {
    0: "zero",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
    "+": "add",
    "-": "subtract",
    "*": "multiply",
    "/": "divide",
    "%": "percent",
    ".": "decimal-point",
    Enter: "equal",
    "=": "equal",
    Backspace: "clear",
    Escape: "all-cut",
  };

  const buttonId = keyMap[event.key];
  if (buttonId) {
    const button = document.getElementById(buttonId);
    if (button) {
      button.click(); // Simulate a button click
    }
  }
});
