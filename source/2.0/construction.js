function isBuilding() {
	return building() ? true : false;
}

function building() {
	if(bought === NULL) {
		return false;
	} else {
		return getAll(towers, NAME, bought)[0];
	}
}

function canBuild() {
	/**
	 *   ===  RULES  ===
	 *   Cannot build on structures
	 *   Can build when building nothing (?)
	 *   Cannot build on enemies
	 *   Cannot prevent enemies from reaching the base
	 *   Can build on any terrain if we are building terrain
	 *   Can build on basic land
	 *   Can build traps on fast land
	 */

	// hovering over a structure
	if (thisTile(obstacles) !== 0) {
		return NULL;
	}
	// not building anything
	if (!isBuilding()) {
		return true;
	}
	// enemies on current tile
	var enemy = getAll(enemies, "x", mouse.x);
	if (enemy[LENGTH]) {
		if (getAll(enemy, "y", mouse.y)[LENGTH]) {
			return false;
		}
	}
	// if it stops the enemy from getting to the base
	var testMap = compile(mouse.x, mouse.y);
	if(!getPaths(testMap)) {
		return false;
	}
	// if we are building terrain
	if (building().is === "terrain") {
		return true;
	}
	// if this tile is a basic land
	if (thisTile(map).is === PATH) {
		return true;
	}
	// if we are building a trap on fast tiles
	if (building().is === "trap" && thisTile(map).is === "fast") {
		return true;
	}
	return false;
};

function fillBuildMenu() {
	if (document[GET_ELEMENT_BY_ID](TOWERS).children[LENGTH] > 0) {
		document[GET_ELEMENT_BY_ID](TOWERS)[INNER_HTML] = "";
	}
	var structures = [];
	for (var i = 0; i < towers[LENGTH]; i++) {
		var item = towers[i];
		var name = START_SPAN+">" + item[NAME] + CLOSE_SPAN;
		var cost = START_SPAN+" class='cost'>$" + item.cost + CLOSE_SPAN;
		var image = "<img src='" + item.image.src + "'>";
		var container = START_DIV+" class='container' title='" + item.is + ": " + item[NAME] + " ($" + item.cost + ")" + "'>" + image + name + cost + CLOSE_DIV;
		structures.push("" + container + "")
	}
	document[GET_ELEMENT_BY_ID](TOWERS)[INNER_HTML] = structures.join("");
	bindBuyClicks();
}