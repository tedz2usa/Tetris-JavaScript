var log = console.log.bind(console);

log("Hello!");

window.onload = init;
window.onkeydown = keydown;

var canvas, ctx;
var width, height;
var gridUnit;
var x, y;
var xMax, yMax;
var squares, squaresXY;
var blocks;
var fallInterval, lastFallTime;


function init() {
  log("Window Loaded!");

  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");

  log(canvas);
  log(ctx);

  width = canvas.width;
  height = canvas.height;

  gridUnit = 20;
  xMax = width/gridUnit-1;
  yMax = height/gridUnit-1;

  squares = [];
  squaresXY = new Array(xMax);
  for (var i = 0; i < xMax; i++) {
    squaresXY[i] = new Array();
  }

  blocks = [];
  new Block(8, 2, "I");
  new Block(8, 8, "J");
  new Block(8, 13, "L");
  new Block(8, 18, "O");
  new Block(8, 23, "S");
  new Block(8, 28, "T");
  new Block(8, 33, "Z");

  fallInterval = 1000;
  lastFallTime = Date.now();

  drawFrame();

}


function drawFrame() {
  ctx.clearRect(0, 0, width, height);
  drawGridDots();
  drawRect(x, y);
  drawSquares();
  if ((Date.now() - lastFallTime) > fallInterval) {
    offsetBlockPositions(0, 1);
    lastFallTime = Date.now();
  }
  window.requestAnimationFrame(drawFrame);
}

function offsetBlockPositions(dx, dy) {
  for (var block_id in blocks) {
    var block = blocks[block_id];
    block.offsetPosition(dx, dy);
    if (block.collisionCheck()) {
      block.detach();
      // log("Collision!");
    }
  }
  Square.registerNewPositions();
}

function rotateBlocks() {
  for (var block_id in blocks) {
    var block = blocks[block_id];
    block.rotate();
  }
  Square.registerNewPositions();
}

function drawSquares() {
  for (var square_id in squares) {
    var square = squares[square_id];
    square.draw();
  }
}

function keydown(e) {
  log(e.code);
  if (e.code == "ArrowLeft") {
    offsetBlockPositions(-1, 0);
  }
  if (e.code == "ArrowRight") {
    offsetBlockPositions(1, 0);
  }
  if (e.code == "ArrowUp") {
    offsetBlockPositions(0, -1);
  }
  if (e.code == "ArrowDown") {
    offsetBlockPositions(0, 1);
  }
  if (e.code == "Space") {
    rotateBlocks();
  }

}

function drawGridDots() {
  for (var x = 0; x <= xMax; x++) {
    for (var y = 0; y <= yMax; y++) {
      ctx.fillRect(x*gridUnit, y*gridUnit, 1, 1);
    }
  }
}

function drawRect(x, y) {
  ctx.strokeRect(x * gridUnit+0.5, y * gridUnit+0.5, gridUnit, gridUnit);
}
