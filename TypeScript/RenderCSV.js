/**
 * @fileoverview Fetches and displays data from a CSV file in an HTML table format.
 * @author kimpro82
 * @date 2025.05.06
 *
 * This script fetches a CSV file, parses its contents, and dynamically generates an HTML table.
 * The first row of the CSV file is used for the table's headers, and the remaining rows are used
 * as the table body content. The PapaParse library is used to parse the CSV data.
 *
 * The generated table is inserted into an HTML element specified by its ID.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Constants for the CSV file name and the table element ID
const CSV_FILE_NAME = 'Dinosaurs.csv';
const TABLE_ELEMENT_ID = 'dino-table';
/**
 * Fetches the CSV file, parses the content, and generates an HTML table.
 * The first row of the CSV is used as table headers, and the remaining rows as table body content.
 *
 * @returns {Promise<void>} Resolves when the table is populated with data.
 */
function loadCSV() {
    return __awaiter(this, void 0, void 0, function* () {
        // Fetch the CSV file
        const response = yield fetch(CSV_FILE_NAME);
        const csvText = yield response.text();
        // Parse the CSV content using PapaParse library, skipping empty lines
        // @ts-ignore: Papa is loaded globally
        const result = Papa.parse(csvText, { skipEmptyLines: true });
        // Destructure the headers and rows from the parsed data
        const [headers, ...rows] = result.data;
        // Get the table element by its ID
        const table = document.getElementById(TABLE_ELEMENT_ID);
        // Clear any existing content in the table
        table.innerHTML = '';
        // Create a table header and populate it with CSV headers
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);
        // Create table rows for each CSV row and populate with cells
        const tbody = document.createElement('tbody');
        rows.forEach(row => {
            const tr = document.createElement('tr');
            row.forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
    });
}
// Call the function to load and display the CSV data in the table
loadCSV();
