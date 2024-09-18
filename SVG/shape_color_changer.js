// Title  : SVG Practice / Shape Color Changer
// Author : kimpro82
// Date   : 2024.09.18
var svgObject = document.getElementById('svgObject');
var changeRectColorBtn = document.getElementById('changeSquareColor');
var changeTriangleColorBtn = document.getElementById('changeTriangleColor');
var changeCircleColorBtn = document.getElementById('changeCircleColor');
/**
 * Generates a random hex color string.
 *
 * @returns {string} - A random color in hex format (e.g., "#A1B2C3").
 */
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
/**
 * Changes the fill color of an SVG shape by its ID.
 *
 * @param {string} shapeId - The ID of the SVG element to change the color of.
 */
function changeColor(shapeId) {
    var svgDoc = svgObject.contentDocument; // Access the embedded SVG document
    if (svgDoc) {
        var shape = svgDoc.getElementById(shapeId);
        if (shape) {
            shape.setAttribute('fill', getRandomColor()); // Set a new random color
        }
    }
}
// Add event listeners to each button to change the color of the corresponding SVG shape
changeRectColorBtn.addEventListener('click', function () { return changeColor('square'); });
changeTriangleColorBtn.addEventListener('click', function () { return changeColor('triangle'); });
changeCircleColorBtn.addEventListener('click', function () { return changeColor('circle'); });
