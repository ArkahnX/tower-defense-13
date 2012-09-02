function makeStructures() {
	var types = [
		["turret", "basic", 255, 0, 0]
	];
	for (var i = 0; i < types.length; i++) {
		towers.push(defineTower(types[i][0], types[i][1], types[i][2], types[i][3], types[i][4]));
	}
}

function defineTower(name, type, red, blue, green) {
	var width = random(10, 20);
	var height = random(10, 20) + Math.floor(width / 1.5);
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