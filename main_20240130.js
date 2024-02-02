// 2024.01.30
var fetchData = function () {
    var dataUrl = "links_20240117.json";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", dataUrl, true);
    xhr.responseType = "json";
    xhr.onload = function () {
        if (xhr.status === 200) {
            var linksData = xhr.response;
            renderLinks(linksData);
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
var renderLinks = function (linksData) {
    var linksContainer = document.getElementById("linksContainer");
    if (linksContainer) {
        linksData.forEach(function (link) {
            var linkItem = document.createElement("div");
            linkItem.classList.add("link-item");
            var linkAnchor = document.createElement("a");
            linkAnchor.href = link.url;
            linkAnchor.textContent = link.title;
            linkAnchor.target = "_blank";
            linkItem.appendChild(linkAnchor);
            linksContainer.appendChild(linkItem);
        });
    }
};
