// 2024.02.01
var fetchData = function () {
    var dataUrl = "links.json";
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
document.addEventListener("DOMContentLoaded", function () {
    fetchData();
});
var renderTable = function (linksData) {
    var linksContainer = document.getElementById("linksContainer");
    linksData.forEach(function (link) {
        var table = document.createElement("table");
        table.classList.add("link-item");
        var row1 = document.createElement("tr");
        row1.classList.add("row1");
        var categoryCell = document.createElement("td");
        var titleCell = document.createElement("td");
        var dateCell = document.createElement("td");
        categoryCell.classList.add("category-cell");
        titleCell.classList.add("title-cell");
        dateCell.classList.add("date-cell");
        categoryCell.textContent = link.category;
        if (link.url.length > 0) {
            titleCell.innerHTML = "<a href=\"".concat(link.url, "\" target=\"_blank\">").concat(link.title, "</a>");
        }
        else {
            titleCell.innerHTML = "".concat(link.title);
        }
        dateCell.textContent = link.date;
        row1.appendChild(categoryCell);
        row1.appendChild(titleCell);
        row1.appendChild(dateCell);
        table.appendChild(row1);
        if (link.comment.length > 0) {
            var row2 = document.createElement("tr");
            var commentCell = document.createElement("td");
            commentCell.classList.add("comment-cell");
            commentCell.setAttribute("colspan", "3");
            commentCell.textContent = link.comment;
            row2.appendChild(commentCell);
            table.appendChild(row2);
        }
        linksContainer.appendChild(table);
    });
};
