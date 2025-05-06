// Practice to Render JSON
// 2024.01.30

/**
 * Performs an HTTP GET request to fetch JSON data from the specified URL.
 * If the request is successful, it calls the renderTable function with the retrieved JSON data.
 * @param {string} url - The URL from which to fetch JSON data.
 */
const fetchData = (url: string): void => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "json";

  xhr.onload = function () {
    if (xhr.status === 200) {
      const jsonData: any[] = xhr.response;

      // Call the renderTable function with the retrieved JSON data.
      renderTable(jsonData);
    } else {
      // Log an error if the HTTP request is not successful.
      console.error("Error fetching JSON data. Status:", xhr.status);
    }
  };
  xhr.send();
};

/**
 * Renders a table in the HTML document based on the provided JSON data.
 * If the JSON data is an array, it creates table rows and cells to display the data.
 * The first row contains the keys as column headers.
 * @param {any[]} jsonData - The JSON data to be displayed in the table.
 */
const renderTable = (jsonData: any[]): void => {
  // Create a table in the HTML document.
  const table = document.createElement("table");
  table.classList.add("my-table");

  // Create table rows.
  jsonData.forEach((general, index) => {
    // Create table cells.
    if (index === 0) {
      // If it is the first row, use keys as column headers.
      const row = document.createElement("tr");
      for (const key of Object.keys(general)) {
        const cell = document.createElement("td");
        cell.textContent = key;
        row.appendChild(cell);
      }
      table.appendChild(row);
    }

    const row = document.createElement("tr");
    for (const key in general) {
      const cell = document.createElement("td");
      // If the value is a number, align it to the right.
      if (!isNaN(general[key])) {
        cell.style.textAlign = "right";
      }
      cell.textContent = general[key];
      row.appendChild(cell);
    }

    table.appendChild(row);
  });

  // Append the table to the HTML document.
  document.body.appendChild(table);
};

// URL for fetching JSON data.
const dataUrl = "RenderJSON.json";

// Fetch JSON data and render the table.
fetchData(dataUrl);
