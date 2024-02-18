// 2024.02.17

/**
 * Interface representing the structure of each link data.
 */
interface Link {
  category: string; // The category of the link.
  title: string;    // The title of the link.
  date: string;     // The date when the link was added or updated.
  url: string;      // The URL of the link.
  comment: string;  // Any additional comments or notes about the link.
}

/**
 * Adds the recent update date to the top right corner of the links container.
 * @param {string} date The recent update date to be displayed.
 */
const addRecentUpdate = (date: string) => {
  const linksContainer = document.getElementById("dateContainer");
  linksContainer.textContent = `(${date})`;
};

/**
 * Renders the link data into tables and appends them to the links container.
 * @param {Link[]} linksData An array of link data to be rendered.
 */
const renderTable = (linksData: Link[]) => {
  const linksContainer = document.getElementById("linksContainer");

  // Iterate over each link data
  linksData.forEach((link) => {
    // Create a new table for each link
    const table = document.createElement("table");

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
    titleCell.innerHTML = `${link.title}`;
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

    // Create an anchor element to wrap the table and provide link functionality
    const linkElement = document.createElement("a");
    linkElement.className = "link-item";
    linkElement.href = link.url;
    linkElement.target = link.url.length > 0 ? "_blank" : "_self";              // Open in new tab if URL exists; Cool!
    linkElement.appendChild(table);

    // Append the link element to the links container
    linksContainer.appendChild(linkElement);
  });
};

/**
 * Fetches link data from links.json using XMLHttpRequest.
 * Triggers the rendering of link data upon successful fetch.
 */
const fetchData = () => {
  const dataUrl = "links.json";

  const xhr = new XMLHttpRequest();
  xhr.open("GET", dataUrl, true);
  xhr.responseType = "json";

  xhr.onload = function () {
    if (xhr.status === 200) {
      const linksData: Link[] = xhr.response;
      // Add recent update date to the top right corner of the links container
      addRecentUpdate(linksData[0].date);
      // Render the link data
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
