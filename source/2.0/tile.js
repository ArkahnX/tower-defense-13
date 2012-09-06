function tileCloneImage(tile, attribute, other) {
	return tile[attribute][random(0, tile.images - 1)];
}
function tileCloneX(tile, attribute, other) {
	return other[0];
}
function tileCloneY(tile, attribute, other) {
	return other[1];
}
