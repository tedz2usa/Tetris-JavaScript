var log = console.log.bind(console);

log("Hello!");

window.onload = init;
window.onkeydown = keydown;

var canvas, ctx;
var width, height;
var gridSpace;
var x, y;
var gridMaxX, gridMaxY;

function init() {
  log("Window Loaded!");

  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");

  log(canvas);
  log(ctx);

  width = canvas.width;
  height = canvas.height;

  gridSpace = 20;
  gridMaxX = width/gridSpace;
  gridMaxY = height/gridSpace;

  x = 5;
  y = 5;
  drawFrame();

}

function drawFrame() {
  ctx.clearRect(0, 0, width, height);
  drawGridDots();
  drawRect(x, y);
  window.requestAnimationFrame(drawFrame);
}

function keydown(e) {
  log(e.code);
  if (e.code == "ArrowLeft") {
    x -= 1;
  }
  if (e.code == "ArrowRight") {
    x += 1;
  }
  if (e.code == "ArrowUp") {
    y -= 1;
  }
  if (e.code == "ArrowDown") {
    y += 1;
  }

}

function drawGridDots() {
  for (var gridX = 0; gridX < gridMaxX; gridX++) {
    for (var gridY = 0; gridY < gridMaxY; gridY++) {
      ctx.fillRect(gridX*gridSpace, gridY*gridSpace, 1, 1);
    }
  }
}

function drawRect(gridX, gridY) {
  ctx.strokeRect(gridX * gridSpace+0.5, gridY * gridSpace+0.5, gridSpace, gridSpace);
}
