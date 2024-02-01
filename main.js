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
    linksData.forEach(function (link) {
        var table = document.createElement("table");
        var row1 = document.createElement("tr");
        var categoryCell = document.createElement("td");
        var titleCell = document.createElement("td");
        var dateCell = document.createElement("td");
        categoryCell.textContent = link.category;
        titleCell.innerHTML = "<a href=\"".concat(link.url, "\" target=\"_blank\">").concat(link.title, "</a>");
        dateCell.textContent = link.date;
        row1.appendChild(categoryCell);
        row1.appendChild(titleCell);
        row1.appendChild(dateCell);
        table.appendChild(row1);
        if (link.comment.length > 0) {
            var row2 = document.createElement("tr");
            var commentCell = document.createElement("td");
            commentCell.setAttribute("colspan", "3");
            commentCell.textContent = link.comment;
            row2.appendChild(commentCell);
            table.appendChild(row2);
        }
        document.body.appendChild(table);
    });
};
