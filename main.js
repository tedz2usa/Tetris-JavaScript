var log = console.log.bind(console);

log("Hello!");

window.onload = init;

var canvas, ctx;
var width, height;

function init() {
  log("Window Loaded!");

  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");

  log(canvas);
  log(ctx);

  ctx.strokeRect(20.5, 20.5, 100, 100);

  width = canvas.width;
  height = canvas.height;

}
