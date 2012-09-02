function makeStructures() {
	var types = [
		["turret", "basic", 255, 0, 0]
	];
	for (var i = 0; i < types.length; i++) {
		defineTower(types[i][0], types[i][1], types[i][2], types[i][3], types[i][4]);
	}
}

function defineTower(name, type, red, blue, green) {
	var width = random(10, 20);
	var height = random(10, 20) + width / 1.5;
	var depth = random(7, 15);
	// main tower
	// makeSquare(x, y, w, h, red, green, blue);
	// tower roof
	// makeSquare(x, y, w, h, darken(red), darken(green), darken(blue))
	// context.clearRect(0, 0, canvas.width, canvas.height);
	return {
		name: name,
		is: type,
		color: [red, blue, green],
		width: width,
		height: height,
		depth: depth
	};
}

function drawTower(name, x, y) {
	var tower = getAll(towers, "name", name)[0];
	makeStructure(tileSize * x + ((tileSize / 2) - (tower.width / 2)), tileSize * y - height + ((tileSize / 2)), tower.width, tower.height, tower.color[0], tower.color[1], tower.color[2])
}

function darken(color) {
	if (color - 50 < 0) {
		return color;
	}
	return color - 50;
}

function makeSquare(x, y, w, h, red, green, blue) {
	context.beginPath();
	context.rect(x, y, w, h);
	context.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
	context.fill();
}

function makeStructure(x, y, width, height, depth, red, blue, green) {
	// main tower
	makeSquare(x, y, w, h + (depth / 2), red, green, blue);
	// tower roof
	makeSquare(x, y, w, h, darken(red), darken(green), darken(blue))
	// context.beginPath();
	// context.rect(32 * 2 + ((32 / 2) - (w / 2)), 32 * 2 - h + ((32 / 2) + (d / 2)), w, h);
	// context.fillStyle = '#550000';
	// context.fill();
	// context.beginPath();
	// context.rect(32 * 2 + ((32 / 2) - (w / 2)), 32 * 2 - h + ((32 / 2)), w, d);
	// context.fillStyle = '#FF0000';
	// context.fill();
}

function animate() {
	requestAnimationFrame(animate);
	draw();
}

function draw() {

}

function hideLoading() {
	document.getElementById("loading").classList.add("hidden")
}

function random(from, to) {
	return Math.floor(Math.random() * (to - from + 1)) + from;
}
var canvas, context;
var width = 20;
var height = 20;
var tileSize = 32;

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
	var num = random(0, sum_of_weight - 1);
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
	makeStructures();
	// animate();
	// spriteTest();
}, true);