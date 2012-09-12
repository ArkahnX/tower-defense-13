/**
 * Create a tower.
 * @param  {String} name       Name to refer the tower to the player
 * @param  {String} weapon     Weapon type the structure uses.
 * @param  {String} type       Type of tower.
 * @param  {Number} range      Number in tiles that the tower searches for enemies within.
 * @param  {Number} cost       Cost to construct the tower.
 * @param  {Number} health     How much damage the tower can sustain.
 * @param  {Number} dimentions Array of dimentions [Width, Height, Depth].
 * @param  {Number} to         Maximum tower dimentions.
 * @param  {Number} red        0-255 value for red.
 * @param  {Number} green      0-255 value for green.
 * @param  {Number} blue       0-255 value for blue.
 * @param  {Number} alpha      0-1 value for alpha.
 * @return {Object}            Tower definition.
 */

function defineTower(name, weapon, type, range, cost, health, delay, speed, dimentions, colors) {
	var specifications = designTower(weapon, dimentions, colors);
	return {
		is: "tower",
		name: name,
		weapon: weapon,
		width: specifications.width,
		height: specifications.height,
		depth: specifications.depth,
		path: specifications.path,
		colors: specifications.colors,
		image: recordTower(specifications),
		x: specifications.x,
		y: specifications.y,
		type: type,
		range: range,
		delay: delay,
		speed: speed,
		timer: 0,
		cost: cost,
		health: health,
		fullHealth: health
	};
}

/**
 * Calculate values for some parts of the tower.
 * @param  {String} weapon     Weapon type the structure uses.
 * @param  {Number} dimentions Array of dimentions [Width, Height, Depth].
 * @param  {Number} red        0-255 value for red.
 * @param  {Number} green      0-255 value for green.
 * @param  {Number} blue       0-255 value for blue.
 * @param  {Number} alpha      0-1 value for alpha.
 * @return {Object}            Calculated values for tower.
 */

function designTower(weapon, dimentions, colors) {
	var width = random(dimentions[0][0], dimentions[0][1]);
	var height = random(dimentions[1][0], dimentions[1][1]);
	var depth = random(dimentions[2][0], dimentions[2][1]);
	var path = "rectangle";
	if (weapon !== "none") {
		path = "triangle";
	}
	return {
		x: 0,
		y: 0,
		width: width,
		height: height,
		depth: depth,
		colors: colors,
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
	var image = new Image();
	image[SRC] = canvas[TO_DATA_URL]();
	resetCanvas(width, height);
	return image;
}

/**
 * Shortcut function to draw a square on canvas.
 * @param  {Object} specifications Specifications from designTower.
 */

function makeSquare(x, y, width, height, color, depth) {
	context.beginPath();
	context.rect(x, y, width, height);
	context.fillStyle = color;
	context.fill();
	context.closePath();
}

function makeTriangle(topX, topY, leftX, leftY, rightX, rightY, color) {
	context.beginPath();
	// top point
	context.moveTo(topX, topY);
	// Bottom Right
	context.lineTo(rightX, rightY);
	// Bottom Left
	context.lineTo(leftX, leftY);
	context.closePath();
	context.fillStyle = color;
	context.fill();
	context.closePath();
}

var drawPath = {
	/**
	 * Draw a triangle on canvas.
	 * @param  {Object} specifications Specifications from designTower.
	 */
	triangle: function(specifications) {
		var x = specifications.x;
		var y = specifications.y;
		var depth = specifications.depth;
		var width = specifications.width;
		var height = specifications.height;
		var halfWidth = width / 2;
		var colors = specifications.colors;
		makeTriangle(halfWidth + x, y, x, y + height, x + halfWidth, y + height + depth, color(colors[0].red, colors[0].green, colors[0].blue));
		makeTriangle(halfWidth + x - 1, y, halfWidth + x - 1, y + height + depth, x + width, y + height, color(colors[1].red, colors[1].green, colors[1].blue));
	},
	/**
	 * Draw a rectangle on canvas.
	 * @param  {Object} specifications Specifications from designTower.
	 */
	rectangle: function(specifications) {
		var colors = specifications.colors;
		// main tower
		makeSquare(specifications.x, specifications.y + (specifications.depth / 2), specifications.width, specifications.height, color(colors[0].red, colors[0].green, colors[0].blue));
		// tower roof
		makeSquare(specifications.x, specifications.y, specifications.width, specifications.depth, color(colors[1].red, colors[1].green, colors[1].blue));
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
	removeMoney(enemy.health);
	damage(base, enemy.health);
	if (base.health < 1) {
		destroyStructure(base.x, base.y);
		base = null;
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
	var colors = [];
	for (var index = 0; index < thisTower.colors.length; index++) {
		var thisColor = thisTower.colors[index];
		colors.push(color(thisColor.red, thisColor.green, thisColor.blue))
	}
	makeParticles(20, 50, [2, 7], [-2, 2, -2, 2], [startX, startY, endX, endY], colors, true);
	obstacles[x][y] = 0;
}

/**
 * Selling a structure that has already been built.
 * @param  {Number} x X coordinate of the structure.
 * @param  {Number} y Y coordinate of the structre.
 */

function sellStructure(x, y) {
	var thisTower = obstacles[x][y];
	addMoney(thisTower.cost * (thisTower.health / thisTower.fullHealth) * 0.75);
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