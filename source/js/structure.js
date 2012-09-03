function makeStructures() {
	var types = [
		["base", "special", 1000, 100, 15, 25, 255, 0, 0],
		["turret", "basic", 100, 10, 10, 20, 200, 0, 0]
	];
	for (var i = 0; i < types[LENGTH]; i++) {
		towers[PUSH](defineTower(types[i][0], types[i][1], types[i][2], types[i][3], types[i][4], types[i][5], types[i][6], types[i][7], types[i][8]));
	}
}

function defineTower(name, type, cost, health, from, to, red, blue, green) {
	var width = random(from, to);
	var height = random(from, to) + round(width / 1.5);
	var depth = random(from - 3, to - 3);
	// main tower
	// makeSquare(x, y, w, h, red, green, blue);
	// tower roof
	// makeSquare(x, y, w, h, darken(red), darken(green), darken(blue))
	// context.clearRect(0, 0, canvas[WIDTH], canvas[HEIGHT]);
	canvas[WIDTH] = 32;
	canvas[HEIGHT] = 32;
	context.clearRect(0, 0, canvas[WIDTH], canvas[HEIGHT]);
	makeStructure(0, 0, width, height, depth, red, green, blue)
	var image = new Image();
	image[SRC] = canvas[TO_DATA_URL]();
	canvas[WIDTH] = canvasWidth * tileSize;
	canvas[HEIGHT] = canvasHeight * tileSize;
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

function drawTower(tower, x, y) {
	tower.x = x;
	tower.y = y;
	makeStructure(tileSize * x + ((HALF_TILE_SIZE) - (tower[WIDTH] / 2)), tileSize * y - tower[HEIGHT] + ((HALF_TILE_SIZE)), tower[WIDTH], tower[HEIGHT], tower.depth, tower[COLOR][0], tower[COLOR][1], tower[COLOR][2])
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
	context.fillStyle = RGB + red + "," + green + "," + blue + ")";
	context.fill();
}

function saveStructure() {
	var image = new Image();
	image[SRC] = canvas[TO_DATA_URL]();
	images[PUSH](image);
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

function getBaseCoords() {
	for (var y = 0; y < obstacles[LENGTH]; y++) {
		for (var x = 0; x < obstacles[y][LENGTH]; x++) {
			if (obstacles[y][x][NAME] === "base") {
				return {
					x: x,
					y: y
				};
			}

		}
	}
	return false;
}

function setStructure(tower, watch) {
	var object = Object.create(null);
	for (var attr in tower) {
		object[attr] = tower[attr];
	}
	return object;
}