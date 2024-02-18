// 2024.02.01
// Function to fetch link data from links.json using XMLHttpRequest
var fetchData = function () {
    var dataUrl = "links_20240201.json";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", dataUrl, true);
    xhr.responseType = "json";
    xhr.onload = function () {
        if (xhr.status === 200) {
            var linksData = xhr.response;
            renderTable(linksData);
        }
        else {
            console.error("Error fetching links.json. Status:", xhr.status);
        }
    };
    xhr.send();
};
// Event listener to trigger data fetching when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    fetchData();
});
// Function to render the link data into tables and append them to the linksContainer
var renderTable = function (linksData) {
    var linksContainer = document.getElementById("linksContainer");
    linksData.forEach(function (link) {
        // Create a new table for each link
        var table = document.createElement("table");
        table.classList.add("link-item");
        // Create the first row of the table
        var row1 = document.createElement("tr");
        row1.classList.add("row1");
        // Create cells for category, title, and date
        var categoryCell = document.createElement("td");
        var titleCell = document.createElement("td");
        var dateCell = document.createElement("td");
        // Add appropriate class names to the cells
        categoryCell.classList.add("category-cell");
        titleCell.classList.add("title-cell");
        dateCell.classList.add("date-cell");
        // Populate cell content with link data
        categoryCell.textContent = link.category;
        if (link.url.length > 0) {
            titleCell.innerHTML = "<a href=\"".concat(link.url, "\" target=\"_blank\">").concat(link.title, "</a>");
        }
        else {
            titleCell.innerHTML = "".concat(link.title);
        }
        dateCell.textContent = link.date;
        // Append cells to the first row
        row1.appendChild(categoryCell);
        row1.appendChild(titleCell);
        row1.appendChild(dateCell);
        // Append the first row to the table
        table.appendChild(row1);
        // Check if the link has a comment, and if so, create a second row for it
        if (link.comment.length > 0) {
            var row2 = document.createElement("tr");
            var commentCell = document.createElement("td");
            // Add appropriate class name to the comment cell
            row2.classList.add("row2");
            commentCell.classList.add("comment-cell");
            // Set colspan to cover all three columns in the second row
            commentCell.setAttribute("colspan", "3");
            // Populate cell content with link comment
            commentCell.innerHTML = "".concat(link.comment);
            // Append the comment cell to the second row
            row2.appendChild(commentCell);
            // Append the second row to the table
            table.appendChild(row2);
        }
        // Append the table to the linksContainer
        linksContainer.appendChild(table);
        // The commented-out section below was an alternative approach but is currently not used in the code.
        // if (link.url.length > 0) {
        //   const linkForTable = document.createElement("a");
        //   // linkForTable.classList.add("link-item");
        //   linkForTable.href = link.url;
        //   linkForTable.target = "_blank";
        //   linkForTable.appendChild(table);
        //   linksContainer.appendChild(linkForTable);
        // } else {
        //   table.classList.add("link-item");
        //   linksContainer.appendChild(table);
        // }
    });
};
