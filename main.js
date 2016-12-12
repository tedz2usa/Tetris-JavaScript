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
var fallingBlock;

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

  fallingBlock = new Block(8, 5, "I");
  fallingBlock = new Block(8, 8, "J");
  fallingBlock = new Block(8, 11, "L");
  fallingBlock = new Block(8, 14, "O");
  fallingBlock = new Block(8, 17, "S");
  fallingBlock = new Block(8, 20, "T");
  fallingBlock = new Block(8, 23, "Z");

  x = 5;
  y = 5;

  var s1 = new Square(3, 10, "red");
  var s2 = new Square(4, 10, "orange");

  drawFrame();

}

function Block(x, y, type) {
  this.x = x;
  this.y = y;
  this.type = type;
  this.squares = [];
  if (type == "I") {
    this.color = "cyan";
    new Square(x-1, y,   this.color);
    new Square(x,   y,   this.color);
    new Square(x+1, y,   this.color);
    new Square(x+2, y,   this.color);
  } else if (type == "J") {
    this.color = "blue";
    new Square(x-1, y,   this.color);
    new Square(x,   y,   this.color);
    new Square(x+1, y,   this.color);
    new Square(x+1, y+1, this.color);
  } else if (type == "L") {
    this.color = "orange";
    new Square(x-1, y+1, this.color);
    new Square(x-1, y,   this.color);
    new Square(x,   y,   this.color);
    new Square(x+1, y,   this.color);
  } else if (type == "O") {
    this.color = "yellow";
    new Square(x,   y,   this.color);
    new Square(x+1, y,   this.color);
    new Square(x+1, y+1, this.color);
    new Square(x,   y+1, this.color);
  }
}

function Square(x, y, color) {
  this.x = x;
  this.y = y;
  this.color = color;
  squaresToDraw[x][y] = this;
}

Square.prototype.draw = function() {
  ctx.save();
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x*gridUnit, this.y*gridUnit, gridUnit, gridUnit);
  ctx.strokeRect(this.x*gridUnit+0.5, this.y*gridUnit+0.5, gridUnit, gridUnit);
  ctx.restore();
}

function drawFrame() {
  ctx.clearRect(0, 0, width, height);
  drawGridDots();
  drawRect(x, y);
  updateFallingBlock();
  drawSquares();
  window.requestAnimationFrame(drawFrame);
}

function updateFallingBlock() {

}

function drawSquares() {
  for (var x = 0; x < xMax; x++) {
    for (var y = 0; y < yMax; y++) {
      var square = squaresToDraw[x][y];
      if (square) {
        square.draw();
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
      ctx.fillRect(x*gridUnit, y*gridUnit, 1, 1);
    }
  }
}

function drawRect(x, y) {
  ctx.strokeRect(x * gridUnit+0.5, y * gridUnit+0.5, gridUnit, gridUnit);
}
