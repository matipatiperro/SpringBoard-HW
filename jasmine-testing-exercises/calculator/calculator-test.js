it("should calculate the monthly rate correctly", function () {
  expect(calculateMonthlyPayment({ amount: 1000, years: 10, rate: 1 })).toEqual(
    "$83.34"
  );
});

it("should return a result with 2 decimal places", function () {
  let result = calculateMonthlyPayment({ amount: 1000, years: 10, rate: 1 });
  expect(result.slice(-3).charAt(0)).toEqual(".");
});

/// etc
