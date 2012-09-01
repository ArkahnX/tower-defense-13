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



function random(from, to) {
	return Math.floor(Math.random() * (to - from + 1)) + from;
}

function init() {
	canvas = document.getElementById("canvas");
	canvas.width = width * tileSize;
	canvas.height = height * tileSize;
	context = canvas.getContext("2d");
}

function getWeightedRandom() {
	var sum_of_weight = 0;
	for (var i = 0; i < tiles.length; i++) {
		sum_of_weight += tiles[i].priority;
	}
	var num = random(0, sum_of_weight-1);
	for (var i = 0; i < tiles.length; i++) {
		if (num < tiles[i].priority) {
			return i;
		}
		num -= tiles[i].priority;
	}
	// shouldnt arrive here
	return false;
}

function modulus(num, size) {
	var mod = num % size;
	return (num - mod) / size;
};

window.addEventListener("DOMContentLoaded", function() {
	init();
	makeSprites();
	var data = makeMap(width, height);
	map = data[0];
	obstacles = data[1];
	animate();
	hideLoading();
	// spriteTest();
}, true);