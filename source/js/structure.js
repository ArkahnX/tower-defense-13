function makeStructures() {
	towers[PUSH](defineTower("base", "special", 10000, 1000, 15, 25, 255, 0, 0));
	towers[PUSH](defineTower("turret", "basic", 100, 10, 10, 20, 200, 0, 0));
	towers[PUSH](defineTower("ShotGun", "spread", 100, 10, 15, 15, 125, 0, 0));
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
	canvas[WIDTH] = width;
	canvas[HEIGHT] = height + depth;
	context.clearRect(0, 0, canvas[WIDTH], canvas[HEIGHT]);
	if (type === "spread" || type === "beam") {
		makeTriangle(0, 0, width, height, depth, red, green, blue)
	} else {
		makeStructure(0, 0, width, height, depth, red, green, blue)
	}
	var image = new Image();
	image[SRC] = canvas[TO_DATA_URL]();
	canvas[WIDTH] = canvasWidth * tileSize;
	canvas[HEIGHT] = canvasHeight * tileSize;
	return {
		name: name,
		is: type,
		cost: cost,
		health: health,
		fullHealth: health,
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
	if (tower.is === "spread" || tower.is === "beam") {
		makeTriangle(center(x, tower.width), tileSize * y - tower[HEIGHT] + ((HALF_TILE_SIZE)), tower[WIDTH], tower[HEIGHT], tower.depth, tower[COLOR][0], tower[COLOR][1], tower[COLOR][2])
	} else {
		makeStructure(center(x, tower.width), tileSize * y - tower[HEIGHT] + ((HALF_TILE_SIZE)), tower[WIDTH], tower[HEIGHT], tower.depth, tower[COLOR][0], tower[COLOR][1], tower[COLOR][2])
	}
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

function makeTriangle(x, y, width, height, depth, red, blue, green) {
	// var width = 32; // Triangle Width
	// var height = 32; // Triangle Height
	// var depth = 0;
	// Draw a path
	context.beginPath();
	context.moveTo(x + width / 2, y + 0); // Top Corner
	context.lineTo(x + width, y + height); // Bottom Right
	context.lineTo(x + 0, y + height); // Bottom Left
	context.closePath();

	// Fill the path
	context.fillStyle = RGB + red + "," + green + "," + blue + ")";
	context.fill();
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

function getBase() {
	for (var y = 0; y < obstacles[LENGTH]; y++) {
		for (var x = 0; x < obstacles[y][LENGTH]; x++) {
			if (obstacles[y][x][NAME] === "base") {
				return obstacles[y][x];
			}

		}
	}
	return false;
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

function reachBase(enemy) {
	damage(getBase(), enemy.health)
}

function destroyStructure(x, y) {
	var thisTower = obstacles[y][x];
	var towerY = center(y, tileSize);
	var startY = towerY - (thisTower.height / 2);
	var endY = towerY + (thisTower.height);
	var towerX = center(x, tileSize);
	var startX = towerX + HALF_TILE_SIZE - (thisTower.width / 2);
	var endX = towerX + (thisTower.width);
	makeParticles(20, 50, [2, 7], [-2, 2, -2, 2], [startX, startY, endX, endY], [thisTower.color[0], thisTower.color[1], thisTower.color[2]], true);
	obstacles[y][x] = 0;
}

function sellStructure(x, y) {
	var thisTower = obstacles[y][x];
	addMoney(thisTower.cost * (thisTower.health / thisTower.fullHealth) / 2);
	destroyStructure(x, y);
}

function returnStructure() {
	var ammount = building().cost;
	bought = "";
	addMoney(ammount);
}