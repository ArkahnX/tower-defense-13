function defineTower(name, weapon, type, range, cost, health, from, to, red, green, blue, alpha) {
	var specifications = designTower(weapon, from, to, red, green, blue, alpha);
	return {
		is: "tower",
		name: name,
		weapon: weapon,
		width: specifications.width,
		height: specifications.height,
		depth: specifications.depth,
		path: specifications.path,
		color: specifications.color,
		image: recordTower(specifications),
		x: specifications.x,
		y: specifications.y,
		type: type,
		range: range,
		cost: cost,
		health: health,
		fullHealth: health,
		from: from,
		to: to,
		red: red,
		blue: blue,
		green: green,
		blue: blue,
		alpha: alpha || 1
	};
}

function designTower(weapon, from, to, red, green, blue, alpha) {
	var width = random(from, to);
	var height = random(from, to) + round(width / 1.5);
	var depth = random(from - 3, to - 3);
	var path = "rectangle";
	if (weapon === "beam" || weapon === "spread") {
		path = "triangle";
		depth = 0;
	}
	return {
		x: 0,
		y: 0,
		width: width,
		height: height,
		depth: depth,
		color: color(red, green, blue, alpha),
		path: path
	}
}

function recordTower(specifications) {
	var width = canvas[WIDTH];
	var height = canvas[HEIGHT];
	resetCanvas(specifications.width, specifications.height + specifications.depth);
	drawPath[specifications.path](specifications);
	var data = canvas[TO_DATA_URL]();
	resetCanvas(width, height);
	return data;
}

function makeSquare(specifications) {
	context.beginPath();
	context.rect(x, y, width, height);
	context.fillStyle = RGB + red + "," + green + "," + blue + ")";
	context.fill();
}

var drawPath = {
	triangle: function makeTriangle(specifications) {
		context.beginPath();
		context.moveTo(specifications.x + specifications.width / 2, specifications.y + specifications.depth); // Top Corner
		context.lineTo(specifications.x + specifications.width, specifications.y + specifications.height); // Bottom Right
		context.lineTo(specifications.x + specifications.depth, specifications.y + specifications.height); // Bottom Left
		context.closePath();
		context.fillStyle = specifications.color;
		context.fill();
	},
	rectangle: function makeRectangle(specifications) {
		// main tower
		makeSquare(specifications.x, specifications.y + (specifications.depth / 2), specifications.width, specifications.height, specifications.color);
		// tower roof
		makeSquare(specifications.x, specifications.y, specifications.width, specifications.depth, color(darken(specifications.red), darken(specifications.green), darken(specifications.blue)));
	}
};

function getBase() {
	if (base === null) {
		var coordinates = findNewBaseCoordinates();
		if (coordinates) {
			base = obstacles[coordinates.x][coordinates.y];
			return base;
		}
	}
	return false;
}

function findNewBaseCoordinates() {
	for (var x = 0; x < obstacles[LENGTH]; x++) {
		for (var y = 0; y < obstacles[x][LENGTH]; y++) {
			if (obstacles[x][y][NAME] === "base") {
				return {
					x: x,
					y: y
				};
			}

		}
	}
	return false;
}

function reachBase(enemy) {
	damage(getBase(), enemy.health)
}

function destroyStructure(x, y) {
	var thisTower = obstacles[x][y];
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
	bought = null;
	addMoney(ammount);
}