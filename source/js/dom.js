function hideLoading() {
	document[GET_ELEMENT_BY_ID]("loadingText")[CLASS_LIST].add("hidden")
	document[GET_ELEMENT_BY_ID]("message")[CLASS_LIST].remove("hidden")
}

function startGame() {
	document[GET_ELEMENT_BY_ID]("loading")[CLASS_LIST].add("hidden")
	animate();
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
		selectedTower = null;
		bought = container.getAttribute("data-name");
		removeMoney(getAll(towers, NAME, bought)[0].cost);
	}
}

function sellHandler(event) {
	doNothing(event);
	if (base.x !== mouse.x || base.y !== mouse.y) {
		sellStructure(selectedTower.x, selectedTower.y);
	}
	selectedTower = null;
}

function upgradeHandler(event) {
	doNothing(event);
	if (base.x !== mouse.x || base.y !== mouse.y) {
		upgradeStructure(selectedTower.x, selectedTower.y);
	}
}

function repairHandler(event) {
	doNothing(event);
	if (base.x !== mouse.x || base.y !== mouse.y) {
		repairStructure(selectedTower.x, selectedTower.y);
	}
}

function clickHandler(event) {
	doNothing(event);
	selectedTower = null;
	if (isBuilding() && canBuild()) {
		if (event.which === 2) {
			returnStructure();
		} else {
			towersBuilt++;
			var tower = cloneData(building(), ["x", "y", "weapon"], [tileCloneX, tileCloneY, cloneWeapon], [mouse.x, mouse.y]);
			obstacles[mouse.x][mouse.y] = tower;
			selectedTower = obstacles[mouse.x][mouse.y];
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
		} else {
			// select tower
			if (obstacles[mouse.x][mouse.y] === 0) {
				selectedTower = null;
			} else {
				selectedTower = obstacles[mouse.x][mouse.y];
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
	if (selectedTower !== null) {
		var x = selectedTower.x * 32;
		var y = selectedTower.y * 32;
		context.strokeStyle = "#FFF";
		context.lineWidth = 2;
		context.strokeRect(x, y, 32, 32);
		if (typeof selectedTower.weapon !== "string") {
			context.beginPath();
			context.arc(centerSymmetrical(selectedTower.x, 1), centerSymmetrical(selectedTower.y, 1), selectedTower.weapon.range * 32, 0, 2 * Math.PI, false);
			context.fillStyle = "rgba(255,255,255,0.3)";
			context.fill();
			var radius = (selectedTower.weapon.range * 32) - 1;
			var startAngle = 4 * Math.PI;
			var endAngle = 2 * Math.PI;

			context.beginPath();
			context.arc(centerSymmetrical(selectedTower.x, 1), centerSymmetrical(selectedTower.y, 1), radius, startAngle, endAngle, false);
			context.lineWidth = 2;
			// line color
			context.strokeStyle = "rgba(0,0,0,0.3)";
			context.stroke();
		}
	}
}

function keyListener() {
	addEvent(document, "keydown", keyPressed)
}

function keyPressed(event) {
	var keyCode = 0;
	if ((event.keyCode === 65 || event.keyCode === 83 || event.keyCode === 68 || event.keyCode === 70) && obstacles[mouse.x][mouse.y] === 0) {
		if (event.keyCode === 65) {
			if (money >= 100) {
				removeMoney(100);
				normalTile(event);
			}
		}
		if (event.keyCode === 83) {
			if (money >= 100) {
				removeMoney(100);
				slowTile(event);
			}
		}
		if (event.keyCode === 68) {
			if (money >= 100) {
				removeMoney(100);
				fastTile(event);
			}
		}
		if (event.keyCode === 70) {
			if (money >= 250) {
				removeMoney(250);
				wallTile(event);
			}
		}
	}
	if (event.keyCode - 48 >= 1 && event.keyCode - 48 <= 5) {
		keyCode = event.keyCode - 48;
	} else if (event.keyCode - 96 >= 1 && event.keyCode - 96 <= 5) {
		keyCode = event.keyCode - 96;
	}
	if (selectedTower) {
		if (event.keyCode === 81) {
			repairHandler(event);
		}
		if (event.keyCode === 87) {
			upgradeHandler(event);
		}
		if (event.keyCode === 69) {
			sellHandler(event);
		}
	}
	if (keyCode > 0) {
		doNothing(event);
		var containers = document[QUERY_SELECTOR_ALL](".container");
		var container = containers[keyCode - 1]
		if (!container[CLASS_LIST].contains("expensive") && !isBuilding()) {
			selectedTower = null;
			bought = towers[keyCode].name;
			removeMoney(getAll(towers, NAME, bought)[0].cost);
		}
	}
}