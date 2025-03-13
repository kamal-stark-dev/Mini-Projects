const loanAmount = document.getElementById("loan-amount");
const interestRate = document.getElementById("interest-rate");
const yearsToPay = document.getElementById("years-to-pay");

const submitBtn = document.getElementById("submit-btn");
const output = document.querySelector(".output");
let monthlyInstallments = document.getElementById("monthly-installments");

submitBtn.addEventListener("click", () => {
  monthlyInstallments.innerText = findInstallments();
  output.style.opacity = 1;
});

function findInstallments() {
  const loan = parseInt(loanAmount.value);
  const interest = parseInt(interestRate.value);
  const years = parseInt(yearsToPay.value);

  const total = loan + (loan * interest * years) / 100;
  const installments = (total / (years * 12)).toFixed(2);
  return "$" + installments.toString();
}
