log("Block class loaded!");

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

var nextBlockId = 1;

function Block(x, y, type) {
  this.x = x;
  this.y = y;
  this.type = this.nextBlockType();
  this.color = blockColors[this.type];
  this.squares = [];
  var positions = blockPositions[this.type];
  for (var i = 0; i < positions.length; i++) {
    var position = positions[i];
    var square = new Square(x+position[0], y+position[1], this.color);
    square.block = this;
    this.squares.push(square);
  }
  this.id = nextBlockId++;
}

Block.prototype.rotate = function() {
  if (this.type != "O") {
    for (var i = 0; i < this.squares.length; i++) {
      var square = this.squares[i];
      square.rotateAround(this.x, this.y);
    }
    Square.registerNewPositions();
  }
}

Block.prototype.offsetPosition = function(dx, dy) {
  this.x += dx;
  this.y += dy;
  for (var i = 0; i < this.squares.length; i++) {
    var square = this.squares[i];
    square.setXY(square.x+dx, square.y+dy);
  }
  if (this.collisionCheck()) {
    this.detach();
  }
  Square.registerNewPositions();
}

Block.prototype.collisionCheck = function() {
  for (var i = 0; i < this.squares.length; i++) {
    var square = this.squares[i];
    if (square.y >= yMax) {
      log(square.y, yMax);
      return true;
    }
    var squareBelow = Square.get(square.x, square.y+1);
    if ( (squareBelow != null) && (squareBelow.block != this) ) {
      log(squareBelow);
      return true;
    }
  }
  return false;
}

Block.prototype.detach = function() {
  fallingBlock = new Block(8, 33);
}

Block.prototype.nextBlockType = function() {
  var types = ["I", "J", "L", "O", "S", "T", "Z"];
  return types[Math.floor(Math.random()*types.length)];
}
