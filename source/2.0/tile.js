/**
 * Generate a tile with three random variations.
 * @param  {String} name      Tile name, used for player reference.
 * @param  {String} type      Tile type. Should be [path, fast, slow]
 * @param  {Number} priority  How likely is this tile to appear.
 * @param  {Number} speed     The speed at which enemies can cross this tile.
 * @param  {Array}  pixelData See the return result of pixelData().
 * @return {Object}           Compiled tile.
 */
function makeTile(name, type, priority, speed, pixelData) {
	var images = [];
	resetCanvas(32, 32);
	var uniqueTiles = 3;
	/**
	 * Loop to make unique tiles.
	 */
	for (var i = 0; i < uniqueTiles; i++) {
		var colorCode = random(pixelData[0].fromColor, pixelData[0].toColor);
		context.fillStyle = color(round(colorCode / pixelData[0].redFactor), round(colorCode / pixelData[0].greenFactor), round(colorCode / pixelData[0].blueFactor));
		context.fillRect(0, 0, tileSize, tileSize);
		for (var e = 0; e < pixelData[LENGTH]; e++) {
			drawPixels(pixelData[e]);
		}
		var image = new Image();
		image[SRC] = canvas[TO_DATA_URL]();
		images[PUSH](image);
		resetCanvas(canvasWidth * tileSize, canvasHeight * tileSize);
	}
	id++;
	canvas[WIDTH] = canvasWidth * tileSize;
	canvas[HEIGHT] = canvasHeight * tileSize;
	return {
		name: name,
		is: "terrain",
		type:type,
		imageList: images,
		images: images[LENGTH],
		priority: priority,
		id: thisId,
		speed: speed
	};
}

/**
 * Draw pixel noise on canvas.
 * @param  {Object} data Noise data to use.
 */
function drawPixels(data) {
	var i, colorCode;
	var x = 0;
	var y = 0;
	for (i = 0; i < data.pixels; i++) {
		x = random(0, tileSize - 1);
		y = random(0, tileSize - 1);
		colorCode = random(pixelData[0].fromColor, pixelData[0].toColor);
		context.fillStyle = color(round(colorCode / pixelData[0].redFactor), round(colorCode / pixelData[0].greenFactor), round(colorCode / pixelData[0].blueFactor));
		context.fillRect(x, y, 1, 1);
	}
}

/**
 * Map array values to object names for easier reference.
 * @param  {Array}  dataArray Array of data.
 * @return {Array}            Array of pixelData objects.
 */
function pixelData(dataArray) {
	var list = [];
	for (var i = 0; i < dataArray.length; i++) {
		list.push({
			pixels: dataArray[i][0],
			fromColor: dataArray[i][1],
			toColor: dataArray[i][2],
			redFactor: dataArray[i][3],
			greenFactor: dataArray[i][4],
			blueFactor: dataArray[i][5]
		});
	}
	return list;
}

/**
 * Define tiles used in the game here.
 */
function makeTiles() {
	tiles.push(makeTile("grass", PATH, 7, 1, pixelData([
		[32 * 32, 175, 230, 1.3, 1, 2],
		[50, 200, 245, 1, 1.3, 1.5],
		[100, 125, 175, 2, 1, 2]
	])));
	tiles.push(makeTile("darkGrass", PATH, 7, 1, pixelData([
		[32 * 32, 150, 205, 1.3, 1, 2],
		[50, 175, 220, 1, 1.3, 1.5],
		[100, 100, 150, 2, 1, 2]
	])));
	tiles.push(makeTile("road", "fast", 4, 0.5, pixelData([
		[32 * 32, 0, 0, 1, 1, 1],
		[600, 0, 50, 1, 1, 1]
	])));
	tiles.push(makeTile("water", "slow", 3, 1.5, pixelData([
		[32 * 32, 100, 200, 1.5, 1.5, 1],
		[600, 100, 200, 1.5, 1.5, 1]
	])));
}

/**
 * Function to manage cloning tile image. Refer to functions.js/cloneData.
 * @param  {Object} tile      Tile that is being cloned.
 * @param  {String} attribute Attribute that was targetted
 * @param  {Array}  other     Variables added when called.
 * @return {Image}            Changes the tile[attribute] to the returned value.
 */

function tileCloneImage(tile, attribute, other) {
	return tile[attribute][random(0, tile.images - 1)];
}

/**
 * Function to manage cloning tile X value. Refer to functions.js/cloneData.
 * @param  {Object} tile      Tile that is being cloned.
 * @param  {String} attribute Attribute that was targetted
 * @param  {Array}  other     Variables added when called.
 * @return {Number}           Changes the tile[attribute] to the returned value.
 */

function tileCloneX(tile, attribute, other) {
	return other[0];
}

/**
 * Function to manage cloning tile Y value. Refer to functions.js/cloneData.
 * @param  {Object} tile      Tile that is being cloned.
 * @param  {String} attribute Attribute that was targetted
 * @param  {Array}  other     Variables added when called.
 * @return {Number}           Changes the tile[attribute] to the returned value.
 */

function tileCloneY(tile, attribute, other) {
	return other[1];
}