var log = console.log.bind(console);

log("Hello!");

window.onload = init;

var canvas, ctx;
var width, height;
var gridSpace;

function init() {
  log("Window Loaded!");

  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");

  log(canvas);
  log(ctx);

  width = canvas.width;
  height = canvas.height;
  gridSpace = 20;

  drawGridDots();
  drawRect(1, 1);

}

function drawGridDots() {
  for (var gridX = 0; gridX < width/gridSpace; gridX++) {
    for (var gridY = 0; gridY < height/gridSpace; gridY++) {
      ctx.fillRect(gridX*gridSpace, gridY*gridSpace, 1, 1);
    }
  }
}

function drawRect(gridX, gridY) {
  ctx.strokeRect(gridX * gridSpace+0.5, gridY * gridSpace+0.5, gridSpace, gridSpace);
}
