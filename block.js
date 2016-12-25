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

function Block(x, y, type) {
  this.x = x;
  this.y = y;
  this.type = type;
  this.color = blockColors[type];
  this.squares = [];
  var positions = blockPositions[type];
  for (var i = 0; i < positions.length; i++) {
    var position = positions[i];
    var square = new Square(x+position[0], y+position[1], this.color);
    square.block = this;
    this.squares.push(square);
  }
  blocks.push(this);
}

Block.prototype.rotate = function() {
  if (this.type != "O") {
    for (var i = 0; i < this.squares.length; i++) {
      var square = this.squares[i];
      square.rotateAround(this.x, this.y);
    }
  }
}

Block.prototype.updateFall = function() {
  this.y++;
  for (var i = 0; i < this.squares.length; i++) {
    var square = this.squares[i];
    square.y++;
  }
}
