// Touch Screen Example
// 2024.01.16
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var numRows = 3;
var numCols = 3;
var rectWidth = 100;
var rectHeight = 100;
var padding = 0;
// Initial rectangle properties
var rectangles = [];
// Call the initialization function
initializeRectangles();
// Initialize the canvas and draw rectangles
function drawRectangles() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Draw rectangles
    rectangles.forEach(function (rect) {
        context.fillStyle = rect.color;
        context.fillRect(rect.x, rect.y, rect.width, rect.height);
    });
}
// Initialize grid rectangles
function initializeRectangles() {
    var totalWidth = numCols * (rectWidth + padding) - padding;
    var totalHeight = numRows * (rectHeight + padding) - padding;
    canvas.width = totalWidth;
    canvas.height = totalHeight;
    var startX = (canvas.width - totalWidth) / 2;
    var startY = (canvas.height - totalHeight) / 2;
    rectangles = [];
    for (var row = 0; row < numRows; row++) {
        for (var col = 0; col < numCols; col++) {
            var x = startX + col * (rectWidth + padding);
            var y = startY + row * (rectHeight + padding);
            var color = getRandomColor();
            rectangles.push({ x: x, y: y, width: rectWidth, height: rectHeight, color: color });
        }
    }
    drawRectangles();
}
// Handle canvas click and touch events
canvas.addEventListener('click', handleInput);
canvas.addEventListener('touchstart', handleInput, { passive: true });
// Handle click and touch events function
function handleInput(event) {
    // Get coordinates based on the event type
    var clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    var clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
    var rect = getClickedRectangle(clientX - canvas.offsetLeft, clientY - canvas.offsetTop);
    if (rect) {
        // Change the color of the clicked rectangle to a random RGB value
        rect.color = getRandomColor();
        // Redraw rectangles with the updated color
        drawRectangles();
    }
}
// Find the rectangle at the clicked position (temporary workaround for rectangles.find() error)
function getClickedRectangle(mouseX, mouseY) {
    for (var i = 0; i < rectangles.length; i++) {
        var rect = rectangles[i];
        if (mouseX >= rect.x &&
            mouseX <= rect.x + rect.width &&
            mouseY >= rect.y &&
            mouseY <= rect.y + rect.height) {
            return rect;
        }
    }
    return null; // No rectangle found at the clicked position
}
// Generate a random RGB color value
function getRandomColor() {
    return "rgb(".concat(Math.floor(Math.random() * 256), ", ").concat(Math.floor(Math.random() * 256), ", ").concat(Math.floor(Math.random() * 256), ")");
}
