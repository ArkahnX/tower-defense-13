/**
 * Similar to jQuerys each(), runs callback with "this" defined as the array index.
 * @param  {Array}   list      Array or Object to loop through
 * @param  {Function} callback Function to call for each index.
 */

function forEach(list, callback) {
	var index;
	if (Array.isArray(list)) {
		for (index = 0; index < list.length; index++) {
			callback.call(list[index], index);
		}
	} else {
		for (index in list) {
			callback.call(list[index], index);
		}
	}
}

/**
 * Generate an RGBA string.
 * @param  {Number} red   Red value from 0-255.
 * @param  {Number} green Green value from 0-255.
 * @param  {Number} blue  Blue value from 0-255.
 * @param  {Number} alpha Alpha value from 0-1
 * @return {String}       Compiled RGBA string.
 */

function color(red, green, blue, alpha) {
	return "rgba(" + red + "," + green + "," + blue + "," + (alpha || 1) + ")";
}

/**
 * Function to clear and resize canvas to given values.
 * @param  {Number} width  Width in pixels to resize canvas.
 * @param  {Number} height Height in pixels to resize canvas.
 */

function resetCanvas(width, height) {
	canvas[WIDTH] = width;
	canvas[HEIGHT] = height;
	context.clearRect(0, 0, width, height);
}

/**
 * Clone an object, and optionally listen for values to change.
 * @param  {Object} data         Original object reference.
 * @param  {Array}  watchList    List of attributes to watch for.
 * @param  {Array}  functionList List of functions to call for attributes found. Must be in order of attributes.
 * @param  {Array}  other        List of other values to pass to the function in functionList.
 * @return {Object}              Compiled object.
 */

function cloneData(data, watchList, functionList, other) {
	var index;
	var object = Object.create(null);
	for (var attr in data) {
		if (watchList && functionList) {
			index = watchList.indexOf(attr);
			if (index > -1) {
				object[attr] = functionList[index](data, attr, other);
			} else {
				object[attr] = data[attr];
			}
		} else {
			object[attr] = data[attr];
		}
	}
	return object
}

/**
 * Simplistic darken function. Takes a 0-255 color and subtracts 50.
 * @param  {Number} color 0-255 color.
 * @return {Number}       Darker color.
 */

function darken(color) {
	if (color - 50 < 0) {
		return 0;
	}
	return color - 50;
}

/**
 * Get data of current tile that the mouse is hovering over.
 * @param  {Array}  map Map to search through.
 * @return {Object}     Tile data at current location.
 */

function thisTile(map) {
	return map[mouse.x][mouse.y];
}

/**
 * Cause damage to a target.
 * @param  {Object} target  Target to subtract health from.
 * @param  {Number} ammount Ammount of health to subtract.
 */

function damage(target, ammount) {
	target.health -= ammount;
}

/**
 * Shorthand Math.round.
 * @param  {Number} number Number to round.
 * @return {Number}        Rounded number.
 */

function round(number) {
	return WINDOW[MATH].round(number);
}

/**
 * Shorthand Math.floor.
 * @param  {Number} number Number to floor.
 * @return {Number}        Floored number.
 */

function floor(number) {
	return WINDOW[MATH][FLOOR](number);
}

/**
 * [centerTower description]
 * @param  {[type]} position [description]
 * @param  {[type]} size     [description]
 * @return {[type]}          [description]
 */

function centerTower(position, size) {
	return round(position * tileSize + HALF_TILE_SIZE - size);
}

/**
 * Calculate the pixel value required to center something on a tile.
 * @param  {Number} position Numerical position in tiles.
 * @param  {Number} size     Size in pixels.
 * @return {Number}          Rounded position.
 */

function centerSymmetrical(position, size) {
	return round(position * tileSize + (HALF_TILE_SIZE) - (size / 2));
}

/**
 * Random value between two numbers.
 * @param  {Number} from Minimum number.
 * @param  {Number} to   Maximum number.
 * @return {Number}      Floored random number.
 */

function random(from, to) {
	return floor(WINDOW[MATH].random() * (to - from + 1)) + from;
}

function getWeightedRandom() {
	var sum_of_weight = 0;
	for (var i = 0; i < tiles[LENGTH]; i++) {
		sum_of_weight += tiles[i].priority;
	}
	var num = random(0, sum_of_weight - 1);
	for (var i = 0; i < tiles[LENGTH]; i++) {
		if (num < tiles[i].priority) {
			return i;
		}
		num -= tiles[i].priority;
	}
	// shouldnt arrive here
	return false;
}

function getAll(array, property, value) {
	var list = [];
	for (var attr in array) {
		if (array[attr][property] === value) {
			list[PUSH](array[attr]);
		}
	}
	return list.length ? list : false;
}

function modulus(num, size) {
	var mod = num % size;
	return (num - mod) / size;
};

function randomFloat(from, to) {
	return (WINDOW[MATH].random() * (to - from + 1)) + from;
}