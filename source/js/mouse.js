window.addEventListener("DOMContentLoaded", function() {
	addEvent(canvas, "mousemove", moveHandler);
	addEvent(canvas, "click", clickHandler);
}, true);

function bindBuyClicks() {
	var containers = document.querySelectorAll(".container");
	for (var i = 0; i < containers.length; i++) {
		addEvent(containers[i], "click", buyHandler);
	}
}

function buyHandler(event) {
	var container = this;
	if (!container.hasClass("expensive")) {
		tile.css({
			left: event.pageX - 16,
			top: event.pageY - 40
		}).removeClass("hidden").addClass("drain");
		whatToBuild = container.find("img").attr("src");
		console.log("remove")
		removeMoney(buildList[whatToBuild].stats.cost);
	}
}

function clickHandler(event) {

}

function moveHandler(event) {
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
}

function addEvent(target, handler, callback) {
	removeEvent(target, handler, callback);
	target.addEventListener(handler, callback, true);
}

function removeEvent(target, handler, callback) {
	target.removeEventListener(handler, callback);
}


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