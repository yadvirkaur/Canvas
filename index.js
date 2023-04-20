const canvas=document.getElementById('draw');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
  }
  resizeCanvas();
window.addEventListener('resize', resizeCanvas);

ctx.lineCap = 'round';
ctx.lineWidth=5;
let isDrawing = false;
let lastX = 0;
let lastY = 0;

//let hue = 0;
// ctx.lineWidth = 100;
// let direction = true;

function draw(e){
    if (!isDrawing) return;
    ctx.beginPath();
    //ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.moveTo(lastX,lastY);

    if (e.touches) {  //e.touches[0] refers to the first touch point in the array, which is the first touch point that was detected. 
        // const rect = canvas.getBoundingClientRect();
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        ctx.lineTo(touchX, touchY);
        lastX = touchX;
        lastY = touchY;
      } else {
        ctx.lineTo(e.offsetX,e.offsetY);
      lastX = e.offsetX;
      lastY = e.offsetY;
      // [lastX,lastY]=[e.offsetX,e.offsetY];
    }
    ctx.stroke();

    // hue++;
    // if (hue >= 360) {
    //     hue = 0;
    // }

    // if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    // direction = !direction;
    // }
    // if(direction) {
    // ctx.lineWidth++;
    // } else {
    // ctx.lineWidth--;
    // }
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX || e.touches[0].clientX, e.offsetY || e.touches[0].clientY];
  });
  
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isDrawing = true;
    [lastX, lastY] = [e.touches[0].clientX, e.touches[0].clientY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchmove', draw);

canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
canvas.addEventListener('touchend', () => isDrawing = false);


toolbar.addEventListener('change', e => {
    if(e.target.id === 'Color') {
        ctx.strokeStyle = e.target.value;
    }

    if(e.target.id === 'lineWidth') {
       ctx.lineWidth = e.target.value;
    }
    
});


toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //ctx.lineWidth=5;
        //ctx.strokeStyle = "black";
    }
});