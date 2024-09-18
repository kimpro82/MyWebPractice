// Title  : SVG Practice / Shape Color Changer
// Author : kimpro82
// Date   : 2024.09.18

const svgObject = document.getElementById('svgObject') as HTMLObjectElement;
const changeRectColorBtn = document.getElementById('changeRectColor') as HTMLButtonElement;
const changeTriangleColorBtn = document.getElementById('changeTriangleColor') as HTMLButtonElement;
const changeCircleColorBtn = document.getElementById('changeCircleColor') as HTMLButtonElement;

/**
 * Generates a random hex color string.
 * 
 * @returns {string} - A random color in hex format (e.g., "#A1B2C3").
 */
function getRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * Changes the fill color of an SVG shape by its ID.
 * 
 * @param {string} shapeId - The ID of the SVG element to change the color of.
 */
function changeColor(shapeId: string) {
  const svgDoc = svgObject.contentDocument; // Access the embedded SVG document
  if (svgDoc) {
    const shape = svgDoc.getElementById(shapeId);
    if (shape) {
      shape.setAttribute('fill', getRandomColor()); // Set a new random color
    }
  }
}

// Add event listeners to each button to change the color of the corresponding SVG shape
changeRectColorBtn.addEventListener('click', () => changeColor('rect'));
changeTriangleColorBtn.addEventListener('click', () => changeColor('triangle'));
changeCircleColorBtn.addEventListener('click', () => changeColor('circle'));
