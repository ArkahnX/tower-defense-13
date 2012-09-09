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