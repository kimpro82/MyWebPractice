// Touch Screen Example
// 2024.01.16
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var numRows = 3;
var numCols = 3;
var rectWidth = 100;
var rectHeight = 100;
var padding = 0;
// 초기 사각형 속성
var rectangles = [];
// 초기화 함수 호출
initializeRectangles();
// Canvas 초기화 및 사각형 그리기
function drawRectangles() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    // 사각형 그리기
    rectangles.forEach(function (rect) {
        context.fillStyle = rect.color;
        context.fillRect(rect.x, rect.y, rect.width, rect.height);
    });
}
// 격자 사각형 초기화 함수
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
// Canvas 클릭 및 터치 이벤트 처리
canvas.addEventListener('click', handleInput);
canvas.addEventListener('touchstart', handleInput, { passive: true });
// 클릭 및 터치 이벤트 처리 함수
function handleInput(event) {
    // 이벤트의 타입에 따라서 좌표 정보를 가져오기
    var clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    var clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
    var rect = getClickedRectangle(clientX - canvas.offsetLeft, clientY - canvas.offsetTop);
    if (rect) {
        // 랜덤한 RGB 값을 생성하여 클릭된 사각형의 색상 변경
        rect.color = getRandomColor();
        // 변경된 색상으로 사각형 다시 그리기
        drawRectangles();
    }
}
// 클릭된 위치에 있는 사각형 찾기 : rectangles.find()의 에러 발생에 따른 임시방편
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
// 랜덤한 RGB 값을 생성하는 함수
function getRandomColor() {
    return "rgb(".concat(Math.floor(Math.random() * 256), ", ").concat(Math.floor(Math.random() * 256), ", ").concat(Math.floor(Math.random() * 256), ")");
}
