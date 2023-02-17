window.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +document.getElementById("loan-amount").value,
    years: +document.getElementById("loan-years").value,
    rate: +document.getElementById("loan-rate").value,
  };
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const defaultAmount = (document.getElementById(
    "loan-amount"
  ).placeholder = 10000);
  const defaultYears = (document.getElementById("loan-years").placeholder = 10);
  const defaultInterest = (document.getElementById(
    "loan-rate"
  ).placeholder = 5);

  const defaultObj = {
    amount: defaultAmount,
    years: defaultYears,
    rate: defaultInterest,
  };
  // not sure why we were asked to call this
  calculateMonthlyPayment(defaultObj);
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const obj = getCurrentUIValues();
  let monthlyPayment = calculateMonthlyPayment(obj);
  updateMonthly(monthlyPayment);
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
// monthly payment = (loan amount * monthly interest rate) / (1-(1+monthly interest rate) ^ -(total num of payments))
function calculateMonthlyPayment(values) {
  let numerator = (values.amount * values.rate) / 12;
  let denominator = 1 - Math.pow(1 + values.rate / 12, -1 * values.years * 12);

  return "$" + (numerator / denominator).toFixed(2);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const monthlyTextAmount = document.createElement("h2");
  monthlyTextAmount.innerText = monthly;
  document.getElementById("monthly-payment").appendChild(monthlyTextAmount);
}
