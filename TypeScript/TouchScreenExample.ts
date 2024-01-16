// Touch Screen Example
// 2024.01.16

const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
const context = canvas.getContext('2d');

const numRows = 3;
const numCols = 3;
const rectWidth = 100;
const rectHeight = 100;
const padding = 0;

// Initial rectangle properties
let rectangles: { x: number; y: number; width: number; height: number; color: string }[] = [];

// Call the initialization function
initializeRectangles();

// Initialize the canvas and draw rectangles
function drawRectangles() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw rectangles
    rectangles.forEach((rect) => {
        context.fillStyle = rect.color;
        context.fillRect(rect.x, rect.y, rect.width, rect.height);
    });
}

// Initialize grid rectangles
function initializeRectangles() {
    const totalWidth = numCols * (rectWidth + padding) - padding;
    const totalHeight = numRows * (rectHeight + padding) - padding;

    canvas.width = totalWidth;
    canvas.height = totalHeight;

    const startX = (canvas.width - totalWidth) / 2;
    const startY = (canvas.height - totalHeight) / 2;

    rectangles = [];

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const x = startX + col * (rectWidth + padding);
            const y = startY + row * (rectHeight + padding);
            const color = getRandomColor();

            rectangles.push({ x, y, width: rectWidth, height: rectHeight, color });
        }
    }

    drawRectangles();
}

// Handle canvas click and touch events
canvas.addEventListener('click', handleInput);
canvas.addEventListener('touchstart', handleInput, { passive: true });

// Handle click and touch events function
function handleInput(event: MouseEvent | TouchEvent) {
    // Get coordinates based on the event type
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;

    const rect = getClickedRectangle(clientX - canvas.offsetLeft, clientY - canvas.offsetTop);

    if (rect) {
        // Change the color of the clicked rectangle to a random RGB value
        rect.color = getRandomColor();

        // Redraw rectangles with the updated color
        drawRectangles();
    }
}

// Find the rectangle at the clicked position (temporary workaround for rectangles.find() error)
function getClickedRectangle(mouseX: number, mouseY: number) {
    for (let i = 0; i < rectangles.length; i++) {
        const rect = rectangles[i];
        if (
            mouseX >= rect.x &&
            mouseX <= rect.x + rect.width &&
            mouseY >= rect.y &&
            mouseY <= rect.y + rect.height
        ) {
            return rect;
        }
    }
    return null; // No rectangle found at the clicked position
}

// Generate a random RGB color value
function getRandomColor() {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}
