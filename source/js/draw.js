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
	drawCursor();
	drawStructures();
	drawEnemies();
	setScore();
	moveEnemies();
}

function hideLoading() {
	document[GET_ELEMENT_BY_ID]("loading")[CLASS_LIST].add("hidden")
}