var log = console.log.bind(console);

log("Hello!");

window.onload = init;

var canvas, ctx;

function init() {
  log("Window Loaded!");

  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");

  log(canvas);
  log(ctx);

}
