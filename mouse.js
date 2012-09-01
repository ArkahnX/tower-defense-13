canvas.addEventListener("mousemove", function(event) {
	mouse.x = event.pageX - canvas.offsetLeft;
	mouse.y = event.pageY - canvas.offsetTop;
	mouse.x = modulus(mouse.x, tileSize);
	mouse.y = modulus(mouse.y, tileSize);
	strokeColor = "black";
	if (canBuild() && isBuilding()) {
		strokeColor = "green";
	} else if (canBuild() === null) {
		strokeColor = "blue";
	} else if (!canBuild()) {
		strokeColor = "red";
	}

}, true);

function drawCursor() {
	var x = mouse.x * 32;
	var y = mouse.y * 32;
	var xEnd = x + 32;
	var yEnd = y + 32;
	context.strokeStyle = strokeColor;
	context.lineWidth = 2;
	context.strokeRect(x, y, 32, 32);
	context.strokeStyle = "#FFF";
	context.strokeRect(x - 2, y - 2, 36, 36);
}