var log = console.log.bind(console);

log("Hello!");

window.onload = init;
window.onkeydown = keydown;

var canvas, ctx;
var width, height;
var gridUnit;
var x, y;
var xMax, yMax;
var squares;
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
  xMax = width/gridUnit;
  yMax = height/gridUnit;

  squares = new Array(xMax);
  for (var i = 0; i < xMax; i++) {
    squares[i] = new Array(yMax);
  }

  blocks = [];
  new Block(8, 4, "I");
  new Block(8, 9, "J");
  new Block(8, 13, "L");
  new Block(8, 17, "O");
  new Block(8, 21, "S");
  new Block(8, 25, "T");
  new Block(8, 29, "Z");

  x = 5;
  y = 5;

  new Square(3, 10, "red");
  new Square(4, 10, "orange");

  fallInterval = 1000;
  lastFallTime = Date.now();


  drawFrame();

}

var blockPositions = {
  "I": [ [-1,0], [ 0,0], [1,0], [2,0] ],
  "J": [ [-1,0], [ 0,0], [1,0], [1,1] ],
  "L": [ [-1,1], [-1,0], [0,0], [1,0] ],
  "O": [ [ 0,0], [ 1,0], [1,1], [0,1] ],
  "S": [ [-1,1], [ 0,1], [0,0], [1,0] ],
  "T": [ [-1,0], [ 0,0], [0,1], [1,0] ],
  "Z": [ [-1,0], [ 0,0], [0,1], [1,1] ]
}

var blockColors = {
  "I": "cyan",
  "J": "blue",
  "L": "orange",
  "O": "yellow",
  "S": "green",
  "T": "purple",
  "Z": "red"
}



function drawFrame() {
  ctx.clearRect(0, 0, width, height);
  drawGridDots();
  drawRect(x, y);
  drawSquares();
  if ((Date.now() - lastFallTime) > fallInterval) {
    log("Falling");
    updateBlockFall();
    lastFallTime = Date.now();
  }
  window.requestAnimationFrame(drawFrame);
}

function updateBlockFall() {
  for (var i = 0; i < blocks.length; i++) {
    var block = blocks[i];
    block.updateFall();
  }
}

function rotateBlocks() {
  for (var i = 0; i < blocks.length; i++) {
    var block = blocks[i];
    block.rotate();
  }
}

function drawSquares() {
  for (var x = 0; x < xMax; x++) {
    for (var y = 0; y < yMax; y++) {
      var square = squares[x][y];
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
  if (e.code == "Space") {
    rotateBlocks();
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
