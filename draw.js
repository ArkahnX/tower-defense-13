/**
 * draw.js
 * Main draw loop.
 */

(function() {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
		var currTime = new Date().getTime();
		var timeToCall = Math.max(0, 16 - (currTime - lastTime));
		var id = window.setTimeout(function() {
			callback(currTime + timeToCall);
		}, timeToCall);
		lastTime = currTime + timeToCall;
		return id;
	};

	if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
		clearTimeout(id);
	};
}());

var width = 20;
var height = 20;
var tileSize = 32;
var canvas, context;
var tiles = [];
var map;
var obstacles;
var id = 0;
var mouse = {
	x:0,
	y:0
};
var strokeColor = "black";

function animate() {
	requestAnimationFrame(animate);
	draw();
}

function draw() {
	drawMap();
	drawCursor();
}

function hideLoading() {
	document.getElementById("loading").classList.add("hidden")
}


window.addEventListener("DOMContentLoaded", function() {
	init();
	makeSprites();
	var data = makeMap(width, height);
	map = data[0];
	obstacles = data[1];
	hideLoading();
	animate();
	// spriteTest();
}, true);