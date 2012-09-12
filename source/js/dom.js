function hideLoading() {
	document[GET_ELEMENT_BY_ID]("loading")[CLASS_LIST].add("hidden")
}

function bindBuyClicks() {
	var containers = document[QUERY_SELECTOR_ALL](".container");
	for (var i = 0; i < containers[LENGTH]; i++) {
		addEvent(containers[i], "click", buyHandler);
	}
}

function doNothing(event) {
	event.preventDefault();
}

function buyHandler(event) {
	doNothing(event);
	var container = this;
	if (!container[CLASS_LIST].contains("expensive") && !isBuilding()) {
		bought = container[QUERY_SELECTOR]("span").innerText;
		removeMoney(getAll(towers, NAME, bought)[0].cost);
	}
}

function clickHandler(event) {
	doNothing(event);
	if (isBuilding() && canBuild()) {
		if (event.which === 2) {
			returnStructure();
		} else {
			var tower = cloneData(building(), ["x","y"],[tileCloneX, tileCloneY], [mouse.x,mouse.y]);
			obstacles[mouse.x][mouse.y] = tower;
			bought = null;
			checkAffordable();
			if (onScreen.length) {
				getAllPaths(onScreen);
			}
		}
	}
	if (canBuild() === null) {
		//middle click sell
		if (event.which === 2) {
			if (base.x !== mouse.x || base.y !== mouse.y) {
				sellStructure(mouse.x, mouse.y);
			}
		}
	}
}

function moveHandler(event) {
	mouse.x = event.pageX - canvas.offsetLeft;
	mouse.y = event.pageY - canvas.offsetTop;
	mouse.x = modulus(mouse.x, tileSize);
	mouse.y = modulus(mouse.y, tileSize);
}

function cursorColor() {
	strokeColor = "black";
	if (canBuild() && isBuilding()) {
		strokeColor = "green";
	} else if (canBuild() === NULL) {
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
	context.strokeStyle = strokeColor;
	context.lineWidth = 2;
	context.strokeRect(x, y, 32, 32);
	context.strokeStyle = "#FFF";
	context.strokeRect(x - 2, y - 2, 36, 36);
}