const ExcelJS = require("exceljs");

const createSQlFromExcel = () => {
  const workbook = new ExcelJS.Workbook();
  workbook.xlsx
    .readFile("./pattern_five_tens_and_nine.xlsx")
    .then(() => {
      // Get the first worksheet
      const worksheet = workbook.getWorksheet(1);

      let insertQueries = [];

      // Iterate over rows starting from the second row (assuming the first row is headers)
      worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
        if (rowNumber > 1) {
          // Skip the header row
          // Extract data from the row
          const rowData = [];
          for (let i = 1; i <= 8; i++) {
            // Assuming data is in the first 6 columns
            rowData.push(row.getCell(i).text);
          }

          // Generate the INSERT query
          const insertQuery = `INSERT INTO pattern_five_tens_nine (pattern_thirty_twentynine_id, column_1, column_2, column_3, column_4, column_5, column_6, total_combination) VALUES (${rowData.join(
            ", "
          )});`;
          insertQueries.push(insertQuery);
        }
      });

      // Write insert queries to .sql file
      const fs = require("fs");
      fs.writeFileSync("insert_queries.sql", insertQueries.join("\n"));
      console.log(
        "Insert queries have been written to insert_queries.sql file."
      );
    })
    .catch((error) => {
      console.error("Error reading Excel file:", error);
    });
};
