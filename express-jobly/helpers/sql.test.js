const { sqlForPartialUpdate } = require("./sql");

// ex: {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
describe("test function sqlForPartialUpdate", function () {
  test("works: 1 item into 2", function () {
    const result = sqlForPartialUpdate(
      { data1: "firstOne" },
      { data_one: "first1", data_two: "second_one" }
    );
    expect(result).toEqual({
      setCols: '"data1"=$1',
      values: ["firstOne"],
    });
  });

  test("works: 2 items into 1", function () {
    const result = sqlForPartialUpdate(
      { data1: "firstOne", data2: "secondOne" },
      { data_one: "first1" }
    );
    console.log(result);
    expect(result).toEqual({
      setCols: '"data1"=$1, "data2"=$2',
      values: ["firstOne", "secondOne"],
    });
  });
});
