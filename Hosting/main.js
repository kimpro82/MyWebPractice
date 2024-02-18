// 2024.02.17
/**
 * Adds the recent update date to the top right corner of the links container.
 * @param {string} date The recent update date to be displayed.
 */
var addRecentUpdate = function (date) {
    var linksContainer = document.getElementById("dateContainer");
    linksContainer.textContent = "(".concat(date, ")");
};
/**
 * Renders the link data into tables and appends them to the links container.
 * @param {Link[]} linksData An array of link data to be rendered.
 */
var renderTable = function (linksData) {
    var linksContainer = document.getElementById("linksContainer");
    // Iterate over each link data
    linksData.forEach(function (link) {
        // Create a new table for each link
        var table = document.createElement("table");
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
        titleCell.innerHTML = "".concat(link.title);
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
        // Create an anchor element to wrap the table and provide link functionality
        var linkElement = document.createElement("a");
        linkElement.className = "link-item";
        linkElement.href = link.url;
        linkElement.target = link.url.length > 0 ? "_blank" : "_self"; // Open in new tab if URL exists
        linkElement.appendChild(table);
        // Append the link element to the links container
        linksContainer.appendChild(linkElement);
    });
};
/**
 * Fetches link data from links.json using XMLHttpRequest.
 * Triggers the rendering of link data upon successful fetch.
 */
var fetchData = function () {
    var dataUrl = "links.json";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", dataUrl, true);
    xhr.responseType = "json";
    xhr.onload = function () {
        if (xhr.status === 200) {
            var linksData = xhr.response;
            // Add recent update date to the top right corner of the links container
            addRecentUpdate(linksData[0].date);
            // Render the link data
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
