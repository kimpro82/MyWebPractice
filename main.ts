// 2024.02.01

// Interface representing the structure of each link data
interface Link {
  category: string;
  title: string;
  date: string;
  url: string;
  comment: string;
}

// Function to fetch link data from links.json using XMLHttpRequest
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

// Event listener to trigger data fetching when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

// Function to render the link data into tables and append them to the linksContainer
const renderTable = (linksData: Link[]) => {
  const linksContainer = document.getElementById("linksContainer");

  linksData.forEach((link) => {
    // Create a new table for each link
    const table = document.createElement("table");
    table.classList.add("link-item");

    // Create the first row of the table
    const row1 = document.createElement("tr");
    row1.classList.add("row1");

    // Create cells for category, title, and date
    const categoryCell = document.createElement("td");
    const titleCell = document.createElement("td");
    const dateCell = document.createElement("td");

    // Add appropriate class names to the cells
    categoryCell.classList.add("category-cell");
    titleCell.classList.add("title-cell");
    dateCell.classList.add("date-cell");

    // Populate cell content with link data
    categoryCell.textContent = link.category;
    if (link.url.length > 0) {
      titleCell.innerHTML = `<a href="${link.url}" target="_blank">${link.title}</a>`;
    } else {
      titleCell.innerHTML = `${link.title}`;
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
      const row2 = document.createElement("tr");
      const commentCell = document.createElement("td");

      // Add appropriate class name to the comment cell
      row2.classList.add("row2");
      commentCell.classList.add("comment-cell");

      // Set colspan to cover all three columns in the second row
      commentCell.setAttribute("colspan", "3");

      // Populate cell content with link comment
      commentCell.innerHTML = `${link.comment}`;

      // Append the comment cell to the second row
      row2.appendChild(commentCell);

      // Append the second row to the table
      table.appendChild(row2);
    }

    // Append the table to the linksContainer
    linksContainer.appendChild(table);

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
