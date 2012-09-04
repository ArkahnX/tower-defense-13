/**
 * draw.js
 * Main draw loop.
 */

function animate() {
	requestAnimationFrame(animate);
	draw();
}

function draw() {
	drawMap();
	cursorColor();
	drawCursor();
	drawEnemies();
	moveEnemies();
	drawStructures();
	setScore();
}

function hideLoading() {
	document[GET_ELEMENT_BY_ID]("loading")[CLASS_LIST].add("hidden")
}