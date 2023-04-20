// const canvas=document.getElementById('draw');
// const toolbar = document.getElementById('toolbar');
// const ctx = canvas.getContext("2d");

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
    
// ctx.strokeStyle = '#ff0000';
// ctx.linejoin = 'round';
// ctx.lineCap = 'round';
// let isDrawing = false;
// let lastX = 0;
// let lastY = 0;
// let hue = 0;
// ctx.lineWidth = 100;
// let direction = true;

// function draw(e){
//     if (!isDrawing) return;
//     ctx.beginPath();
//     ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
//     ctx.moveTo(lastX,lastY);
//     ctx.lineTo(e.offsetX,e.offsetY);
//     ctx.stroke();
//     [lastX,lastY]=[e.offsetX,e.offsetY];  // shorthand for lastX = e.offsetX;  lastY = e.offsetY;

//     hue++;
//     if (hue >= 360) {
//         hue = 0;
//     }

//     if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
//     direction = !direction;
//     }
//     if(direction) {
//     ctx.lineWidth++;
//     } else {
//     ctx.lineWidth--;
//     }
// }

// canvas.addEventListener('mousedown', (e) => {
//     isDrawing = true;
//     [lastX,lastY]=[e.offsetX,e.offsetY];
// });
// canvas.addEventListener('mousemove',draw)
// canvas.addEventListener('mouseup', () => isDrawing = false);
// canvas.addEventListener('mouseout', () => isDrawing = false);












const canvas = document.getElementById('draw');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext("2d");

function resizeCanvas(){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
}
resizeCanvas();
// window.addEventListener('resize', resizeCanvas); resizing loses content.

ctx.linejoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 5;
let isDrawing = false;
let lastX = 0;
let lastY = 0;

function draw(e){
    if (!isDrawing) return;
    
    // Calculate the position of the canvas relative to the viewport
    const rect = canvas.getBoundingClientRect();
    
    // Calculate the position of the touch or mouse pointer relative to the canvas
    let x, y;
    if (e.touches) {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
    } else {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
    }
    
    // Draw a line from the last position to the current position
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    
    // Update the last position
    lastX = x;
    lastY = y;
}

canvas.addEventListener('mousedown', (e) => {
    // Set the drawing flag and update the last position
    isDrawing = true;
    lastX = e.clientX - canvas.offsetLeft ;
    lastY = e.clientY - canvas.offsetTop;
});

canvas.addEventListener('touchstart', (e) => {
    // Set the drawing flag and update the last position
    isDrawing = true;
    lastX = e.touches[0].clientX - canvas.offsetLeft;
    lastY = e.touches[0].clientY - canvas.offsetTop;
});

canvas.addEventListener('mousemove', draw);

canvas.addEventListener('touchmove', (e) => {
    // Prevent scrolling
    e.preventDefault();
    
    // Call the draw function with the touch event
    draw(e.touches[0]);
});

canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
canvas.addEventListener('touchend', () => isDrawing = false);

toolbar.addEventListener('change', (e) => {
  if (e.target.id === 'Color') {
    ctx.strokeStyle = e.target.value;
  }
  if (e.target.id === 'lineWidth') {
    ctx.lineWidth = e.target.value;
  }
});
toolbar.addEventListener('click', (e) => {
  if (e.target.id === 'clear') {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
});

const saveButton = document.getElementById("save-button");

saveButton.addEventListener("click", () => {
  const dataURL = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = "canvas.png";
  link.href = dataURL;
  link.click();
});