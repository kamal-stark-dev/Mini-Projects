const displayEl = document.querySelector("#display");

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
      // Reset everything
      displayStr = "";
      num1 = null;
      operation = null;
      num2 = null;
      displayEl.innerText = "0";
    } else if (value === "=") {
      // Perform calculation
      if (num1 !== null && operation && displayStr) {
        num2 = parseFloat(displayStr);
        const result = operate(num1, operation, num2);
        displayEl.innerText = result;
        displayStr = ""; // Reset display string for next input
        num1 = null; // Reset stored values
        operation = null;
        num2 = null;
      }
    } else if (["+", "-", "*", "/"].includes(value)) {
      // Store the first number and operation
      if (displayStr) {
        num1 = parseFloat(displayStr);
        operation = value;
        displayStr = ""; // Clear display string for the next number
      }
    } else {
      // Append numbers or decimal point to the display string
      displayStr += value;
      displayEl.innerText = displayStr;
    }
  });
});
