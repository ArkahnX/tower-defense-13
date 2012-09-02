function makeStructures() {
	var types = [
		["base", "special", 1000, 100, 15, 25, 255, 0, 0],
		["turret", "basic", 100, 10, 10, 20, 200, 0, 0]
	];
	for (var i = 0; i < types.length; i++) {
		towers.push(defineTower(types[i][0], types[i][1], types[i][2], types[i][3], types[i][4], types[i][5], types[i][6], types[i][7], types[i][8]));
	}
}

function defineTower(name, type, cost, health, from, to, red, blue, green) {
	var width = random(from, to);
	var height = random(from, to) + Math.floor(width / 1.5);
	var depth = random(from-3, to-3);
	// main tower
	// makeSquare(x, y, w, h, red, green, blue);
	// tower roof
	// makeSquare(x, y, w, h, darken(red), darken(green), darken(blue))
	// context.clearRect(0, 0, canvas.width, canvas.height);
	canvas.width = 32;
	canvas.height = 32;
	context.clearRect(0, 0, canvas.width, canvas.height);
	makeStructure(0, 0, width, height, depth, red, green, blue)
	var image = new Image();
	image.src = canvas.toDataURL();
	canvas.width = canvasWidth * tileSize;
	canvas.height = canvasHeight * tileSize;
	return {
		name: name,
		is: type,
		cost: cost,
		health: health,
		color: [red, green, blue],
		image: image,
		width: width,
		height: height,
		depth: depth
	};
}

function drawTower(name, x, y) {
	var tower = getAll(towers, "name", name)[0];
	makeStructure(tileSize * x + ((tileSize / 2) - (tower.width / 2)), tileSize * y - tower.height + ((tileSize / 2)), tower.width, tower.height, tower.depth, tower.color[0], tower.color[1], tower.color[2])
}

function darken(color) {
	if (color - 50 < 0) {
		return color;
	}
	return color - 50;
}

function makeSquare(x, y, width, height, red, green, blue) {
	context.beginPath();
	context.rect(x, y, width, height);
	context.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
	context.fill();
}

function saveStructure() {
	var image = new Image();
	image.src = canvas.toDataURL();
	images.push(image);
}

function makeStructure(x, y, width, height, depth, red, blue, green) {
	// main tower
	makeSquare(x, y + (depth / 2), width, height, red, green, blue);
	// tower roof
	makeSquare(x, y, width, depth, darken(red), darken(green), darken(blue));
	// context.beginPath();
	// context.rect(32 * 2 + ((32 / 2) - (w / 2)), 32 * 2 - h + ((32 / 2) + (d / 2)), w, h);
	// context.fillStyle = '#550000';
	// context.fill();
	// context.beginPath();
	// context.rect(32 * 2 + ((32 / 2) - (w / 2)), 32 * 2 - h + ((32 / 2)), w, d);
	// context.fillStyle = '#FF0000';
	// context.fill();
}