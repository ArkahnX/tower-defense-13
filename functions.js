function random(from, to) {
	return Math.floor(Math.random() * (to - from + 1)) + from;
}

function unique(from, to, max) {
	var tempUsed = []
	var used = [];
	while (used.length < max) {
		var num = random(from, to);
		while (tempUsed.indexOf(num) > -1) {
			num = random(from, to);
		}
		used.push(num);
		tempUsed.push(num);
		if (tempUsed.length >= to) {
			tempUsed.length = 0;
		}
	}
	return used;
}

function init() {
	canvas = document.getElementById("canvas");
	canvas.width = width * tileSize;
	canvas.height = height * tileSize;
	context = canvas.getContext("2d");
}