log("Square class loaded!");

function Square(x, y, color) {
  this.x = x;
  this.y = y;
  this.color = color;
  squares[x][y] = this;
}

Square.prototype.draw = function() {
  ctx.save();
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x*gridUnit, this.y*gridUnit, gridUnit, gridUnit);
  ctx.strokeRect(this.x*gridUnit+0.5, this.y*gridUnit+0.5, gridUnit, gridUnit);
  ctx.restore();
}

Square.prototype.rotateAround = function (x, y) {
  log("Rotating square", this);
  var sx = this.x - x;
  var sy = this.y - y;
  var rx = -sy;
  var ry = sx;
  this.x = rx + x;
  this.y = ry + y;
}

Square.prototype.unRotateAround = function (x, y) {
  log("Rotating square", this);
  var sx = this.x - x;
  var sy = this.y - y;
  var rx = sy;
  var ry = -sx;
  this.x = rx + x;
  this.y = ry + y;
}
