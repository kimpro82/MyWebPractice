// 2024.01.30

interface Link {
  title: string;
  url: string;
  comment: string;
}

const fetchData = () => {
  const dataUrl = "links_20240117.json";

  const xhr = new XMLHttpRequest();
  xhr.open("GET", dataUrl, true);
  xhr.responseType = "json";

  xhr.onload = function () {
    if (xhr.status === 200) {
      const linksData: Link[] = xhr.response;
      renderLinks(linksData);
    } else {
      console.error("Error fetching links.json. Status:", xhr.status);
    }
  };

  xhr.send();
};

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

const renderLinks = (linksData: Link[]) => {
  const linksContainer = document.getElementById("linksContainer");

  if (linksContainer) {
    linksData.forEach((link) => {
      const linkItem = document.createElement("div");
      linkItem.classList.add("link-item");

      const linkAnchor = document.createElement("a");
      linkAnchor.href = link.url;
      linkAnchor.textContent = link.title;
      linkAnchor.target = "_blank";

      linkItem.appendChild(linkAnchor);
      linksContainer.appendChild(linkItem);
    });
  }
};
