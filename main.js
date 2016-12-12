var log = console.log.bind(console);

log("Hello!");

window.onload = init;
window.onkeydown = keydown;

var canvas, ctx;
var width, height;
var gridSpace;
var x, y;
var xMax, yMax;
var squaresToDraw;

var RED = 1;
var ORANGE = 2;
var YELLOW = 3;
var GREEN = 4;
var BLUE = 5;
var PURPLE = 6;
var CYAN = 7;

function init() {
  log("Window Loaded!");

  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");

  log(canvas);
  log(ctx);

  width = canvas.width;
  height = canvas.height;

  gridSpace = 20;
  xMax = width/gridSpace;
  yMax = height/gridSpace;

  squaresToDraw = new Array(xMax);
  for (var i = 0; i < xMax; i++) {
    squaresToDraw[i] = new Array(yMax);
  }

  x = 5;
  y = 5;

  var s = new Square(3, 10, RED);

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
      if (squaresToDraw[x][y]) {
        drawRect(x, y);
      }
    }
  }
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
      ctx.fillRect(x*gridSpace, y*gridSpace, 1, 1);
    }
  }
}

function drawRect(x, y) {
  ctx.strokeRect(x * gridSpace+0.5, y * gridSpace+0.5, gridSpace, gridSpace);
}
