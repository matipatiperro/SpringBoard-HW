const { BadRequestError } = require("../expressError");

/**
 * A helper function for selective update
 * takes request body data (for user or company), returns the number of fields present in the
 * the data body and replaces existing specified data, then returns it in SQL language
 * so that it can be used in a SET SQL query
 *
 * @param dataToUpdate {Object} {field1: newVal, field2: newVal, ...}, updated json body
 * @param jsToSql {Object} database column names to use in the mapping

 * ex: {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
 * @returns {Object} {sqlSetCols, dataToUpdate}
 * 
 */
function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map(
    (colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
