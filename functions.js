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

var modulus = function(num, size) {
	var mod = num % size;
	return (num - mod) / size;
};

var currentTarget = function(event) {
	var leftOffset = $('#canvas').position().left;
	var topOffset = $('#canvas').position().top;
	var trueX = event.pageX - leftOffset;
	var trueY = event.pageY - topOffset;
	return [modulus(trueX, tileSize), modulus(trueY, tileSize)];
};