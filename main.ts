// 2024.02.01

interface Link {
  category: string;
  title: string;
  date: string;
  url: string;
  comment: string;
}

const fetchData = () => {
  const dataUrl = "links.json";

  const xhr = new XMLHttpRequest();
  xhr.open("GET", dataUrl, true);
  xhr.responseType = "json";

  xhr.onload = function () {
    if (xhr.status === 200) {
      const linksData: Link[] = xhr.response;
      renderTable(linksData);
    } else {
      console.error("Error fetching links.json. Status:", xhr.status);
    }
  };

  xhr.send();
};

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

const renderTable = (linksData: Link[]) => {
  linksData.forEach((link) => {
    const table = document.createElement("table");

    const row1 = document.createElement("tr");

    const categoryCell = document.createElement("td");
    const titleCell = document.createElement("td");
    const dateCell = document.createElement("td");

    categoryCell.textContent = link.category;
    titleCell.innerHTML = `<a href="${link.url}" target="_blank">${link.title}</a>`;
    dateCell.textContent = link.date;

    row1.appendChild(categoryCell);
    row1.appendChild(titleCell);
    row1.appendChild(dateCell);

    table.appendChild(row1);

    if (link.comment.length > 0) {
      const row2 = document.createElement("tr");
      const commentCell = document.createElement("td");

      commentCell.setAttribute("colspan", "3");
      commentCell.textContent = link.comment;

      row2.appendChild(commentCell);
      table.appendChild(row2);
    }

    document.body.appendChild(table);
  });
};
