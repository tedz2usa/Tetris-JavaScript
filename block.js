log("Block class loaded!");

function Block(x, y, type) {
  this.x = x;
  this.y = y;
  this.type = type;
  this.color = blockColors[type];
  this.squares = [];
  var positions = blockPositions[type];
  for (var i = 0; i < 4; i++) {
    var position = positions[i];
    this.squares.push(new Square(x+position[0], y+position[1], this.color));
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
