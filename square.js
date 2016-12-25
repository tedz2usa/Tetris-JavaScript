log("Square class loaded!");

var nextSquareId = 1;

function Square(x, y, color) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.id = nextSquareId++;
  squares[this.id] = this;
}

Square.prototype.draw = function() {
  ctx.save();
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x*gridUnit, this.y*gridUnit, gridUnit, gridUnit);
  ctx.strokeRect(this.x*gridUnit+0.5, this.y*gridUnit+0.5, gridUnit, gridUnit);
  ctx.restore();
}

Square.prototype.rotateAround = function (x, y) {
  var sx = this.x - x;
  var sy = this.y - y;
  var rx = -sy;
  var ry = sx;
  this.x = rx + x;
  this.y = ry + y;
}

Square.prototype.setXY = function(x, y) {
  // squares[this.x][this.y] = null;
  // squares[x][y] = this;
  this.x = x;
  this.y = y;
}

Square.registerNewPositions = function() {
  for (var i = 0; i < xMax; i++) {
    squaresXY[i] = new Array();
  }
  for (var square_id in squares) {
    var square = squares[square_id];
    squaresXY[square.x][square.y] = square;
  }
}

Square.get = function(x, y) {
  return squaresXY[x][y];
}
