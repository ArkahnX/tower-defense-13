function animate() {
	draw();
	animationLoop = requestAnimationFrame(animate);
}

function draw() {
	resetCanvas(canvasWidth*tileSize, canvasHeight*tileSize);
	mapLoop();
}

