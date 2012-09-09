/**
 * Create a tower.
 * @param  {String} name   Name to refer the tower to the player
 * @param  {String} weapon Weapon type the structure uses.
 * @param  {String} type   Type of tower.
 * @param  {Number} range  Number in tiles that the tower searches for enemies within.
 * @param  {Number} cost   Cost to construct the tower.
 * @param  {Number} health How much damage the tower can sustain.
 * @param  {Number} from   Minimum tower dimentions.
 * @param  {Number} to     Maximum tower dimentions.
 * @param  {Number} red    0-255 value for red.
 * @param  {Number} green  0-255 value for green.
 * @param  {Number} blue   0-255 value for blue.
 * @param  {Number} alpha  0-1 value for alpha.
 * @return {Object}        Tower definition.
 */

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

/**
 * Calculate values for some parts of the tower.
 * @param  {String} weapon Weapon type the structure uses.
 * @param  {Number} from   Minimum tower dimentions.
 * @param  {Number} to     Maximum tower dimentions.
 * @param  {Number} red    0-255 value for red.
 * @param  {Number} green  0-255 value for green.
 * @param  {Number} blue   0-255 value for blue.
 * @param  {Number} alpha  0-1 value for alpha.
 * @return {Object}        Calculated values for tower.
 */

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

/**
 * Save an image of the tower for drawing.
 * @param  {Object} specifications Specifications from designTower.
 * @return {Image}                 Image Object.
 */

function recordTower(specifications) {
	var width = canvas[WIDTH];
	var height = canvas[HEIGHT];
	resetCanvas(specifications.width, specifications.height + specifications.depth);
	drawPath[specifications.path](specifications);
	var data = canvas[TO_DATA_URL]();
	resetCanvas(width, height);
	var image = new Image();
	image[SRC] = data;
	return image;
}

/**
 * Shortcut function to draw a square on canvas.
 * @param  {Object} specifications Specifications from designTower.
 */

function makeSquare(specifications) {
	context.beginPath();
	context.rect(x, y, width, height);
	context.fillStyle = RGB + red + "," + green + "," + blue + ")";
	context.fill();
}

var drawPath = {
	/**
	 * Draw a triangle on canvas.
	 * @param  {Object} specifications Specifications from designTower.
	 */
	triangle: function makeTriangle(specifications) {
		context.beginPath();
		context.moveTo(specifications.x + specifications.width / 2, specifications.y + specifications.depth); // Top Corner
		context.lineTo(specifications.x + specifications.width, specifications.y + specifications.height); // Bottom Right
		context.lineTo(specifications.x + specifications.depth, specifications.y + specifications.height); // Bottom Left
		context.closePath();
		context.fillStyle = specifications.color;
		context.fill();
	},
	/**
	 * Draw a rectangle on canvas.
	 * @param  {Object} specifications Specifications from designTower.
	 */
	rectangle: function makeRectangle(specifications) {
		// main tower
		makeSquare(specifications.x, specifications.y + (specifications.depth / 2), specifications.width, specifications.height, specifications.color);
		// tower roof
		makeSquare(specifications.x, specifications.y, specifications.width, specifications.depth, color(darken(specifications.red), darken(specifications.green), darken(specifications.blue)));
	}
};

/**
 * return base, or find a base if there isn't one set.
 * @return {Boolean} Whether a base was found or not.
 */

function getBase() {
	if (base !== null) {
		return base;
	} else if (base === null) {
		var coordinates = findNewBaseCoordinates();
		if (coordinates) {
			base = obstacles[coordinates.x][coordinates.y];
			return base;
		}
	}
	return false;
}

/**
 * Search the map to find a base.
 * @return {Object} Coordinates for the new base.
 */

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

/**
 * Called when an enemy reaches the base.
 * @param  {Object} enemy Enemy that reached the base.
 */

function reachBase(enemy) {
	damage(base, enemy.health);
	if (base.health < 1) {
		destroyStructure(base.x, base.y)
		var result = getBase();
		if (!result) {
			gameOver();
		}
	}
}

/**
 * Function to destroy a structure.
 * @param  {Number} x X coordinate of the structure.
 * @param  {Number} y Y coordinate of the structre.
 */

function destroyStructure(x, y) {
	var thisTower = obstacles[x][y];
	var towerY = centerSymmetrical(y, tileSize);
	var startY = towerY - (thisTower.height / 2);
	var endY = towerY + (thisTower.height);
	var towerX = centerSymmetrical(x, tileSize);
	var startX = towerX + HALF_TILE_SIZE - (thisTower.width / 2);
	var endX = towerX + (thisTower.width);
	makeParticles(20, 50, [2, 7], [-2, 2, -2, 2], [startX, startY, endX, endY], [thisTower.color[0], thisTower.color[1], thisTower.color[2]], true);
	obstacles[x][y] = 0;
}

/**
 * Selling a structure that has already been built.
 * @param  {Number} x X coordinate of the structure.
 * @param  {Number} y Y coordinate of the structre.
 */

function sellStructure(x, y) {
	var thisTower = obstacles[x][y];
	addMoney(thisTower.cost * (thisTower.health / thisTower.fullHealth) / 2);
	destroyStructure(x, y);
}

/**
 * Return a structure before it is built for a full refund.
 */

function returnStructure() {
	var ammount = building().cost;
	bought = null;
	addMoney(ammount);
}