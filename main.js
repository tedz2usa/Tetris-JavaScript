var log = console.log.bind(console);

log("Hello!");

window.onload = init;
window.onkeydown = keydown;

var canvas, ctx;
var width, height;
var gridUnit;
var x, y;
var xMax, yMax;
var squaresToDraw;

function init() {
  log("Window Loaded!");

  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");

  log(canvas);
  log(ctx);

  width = canvas.width;
  height = canvas.height;

  gridUnit = 20;
  xMax = width/gridUnit;
  yMax = height/gridUnit;

  squaresToDraw = new Array(xMax);
  for (var i = 0; i < xMax; i++) {
    squaresToDraw[i] = new Array(yMax);
  }

  x = 5;
  y = 5;

  var s1 = new Square(3, 10, "red");
  var s2 = new Square(4, 10, "orange");

  drawFrame();

}

function Square(x, y, color) {
  this.x = x;
  this.y = y;
  this.color = color;
  squaresToDraw[x][y] = this;
}

function drawFrame() {
  ctx.clearRect(0, 0, width, height);
  drawGridDots();
  drawRect(x, y);
  drawSquares();
  window.requestAnimationFrame(drawFrame);
}

function drawSquares() {
  for (var x = 0; x < xMax; x++) {
    for (var y = 0; y < yMax; y++) {
      var square = squaresToDraw[x][y];
      if (square) {
        drawSquare(x, y, square.color);
      }
    }
  }
}

function drawSquare(x, y, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(x*gridUnit, y*gridUnit, gridUnit, gridUnit);
  ctx.strokeRect(x*gridUnit+0.5, y*gridUnit+0.5, gridUnit, gridUnit);
  ctx.restore();
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
  for (var x = 0; x < xMax; x++) {
    for (var y = 0; y < yMax; y++) {
      ctx.fillRect(x*gridUnit, y*gridUnit, 1, 1);
    }
  }
}

function drawRect(x, y) {
  ctx.strokeRect(x * gridUnit+0.5, y * gridUnit+0.5, gridUnit, gridUnit);
}
