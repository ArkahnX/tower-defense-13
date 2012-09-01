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
	setStats();
}

function hideLoading() {
	document.getElementById("loading").classList.add("hidden")
}