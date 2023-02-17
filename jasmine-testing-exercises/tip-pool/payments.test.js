beforeEach(function () {
  // initialization logic
  billAmtInput.value = 100;
  tipAmtInput.value = 10;
});

it("should add add payment table row on submitPaymentInfo()", function () {
  submitPaymentInfo();
  const newPaymentTableRow = document.getElementById("payment1");

  expect(newPaymentTableRow.cells[0].innerHTML).toEqual("$100");
  expect(newPaymentTableRow.cells[1].innerHTML).toEqual("$10");
  expect(newPaymentTableRow.cells[2].innerHTML).toEqual("10%");
  expect(newPaymentTableRow.cells[3]).toEqual(undefined);
});

afterEach(function () {
  // teardown logic
  billAmtInput.value = "";
  tipAmtInput.value = "";
  paymentTbody.innerHTML = "";
  // document.getElementById("paymentTable").deleteRow(0);
  summaryTds[0].innerHTML = "";
  summaryTds[1].innerHTML = "";
  summaryTds[2].innerHTML = "";
});
