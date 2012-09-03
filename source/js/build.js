function isBuilding() {
	return building() ? true : false;
}

function building() {
	if(bought === NULL) {
		return false;
	} else {
		return getAll(structures, NAME, bought)
	}
}

function canBuild() {
	var currentTile = map[mouse.y][mouse.x];
	if (obstacles[mouse.y][mouse.x] !== 0) {
		return NULL;
	}
	var enemy = getAll(enemies, "y", mouse.y);
	if (enemy[LENGTH]) {
		if (getAll(enemy, "x", mouse.x)[LENGTH]) {
			return false;
		}
	}
	if (!isBuilding()) {
		return true;
	}
	if (building().is === "terrain") {
		return true;
	}
	if (currentTile.is === PATH) {
		return true;
	}
	if (building().is === "trap" && currentTile.is === "fast") {
		return true;
	}
	return false;
};

function emptyBuildMenu() {
	document[GET_ELEMENT_BY_ID](TOWERS)[INNER_HTML] = "";
}

function setConstructibles() {
	if (document[GET_ELEMENT_BY_ID](TOWERS).children[LENGTH] > 0) {
		emptyBuildMenu()
	}
	var structures = [];
	for (var i = 0; i < towers[LENGTH]; i++) {
		var item = towers[i];
		var name = START_SPAN+">" + item[NAME] + CLOSE_SPAN;
		var cost = START_SPAN+" class='cost'>$" + item[COST] + CLOSE_SPAN;
		var image = "<img src='" + item.image[SRC] + "'>";
		var container = START_DIV+" class='container' title='" + item.is + ": " + item[NAME] + " ($" + item[COST] + ")" + "'>" + image + name + cost + CLOSE_DIV;
		structures[PUSH]("" + container + "")
	}
	document[GET_ELEMENT_BY_ID](TOWERS)[INNER_HTML] = structures.join("");
	bindBuyClicks();
}

function fillBuildMenu() {
	if (menu.children()[LENGTH] > 0) {
		emptyBuildMenu()
	}
	for (var attr in buildList) {
		var item = buildList[attr];
		var container = $(START_DIV+" class='container'>"+CLOSE_DIV);
		var name = $(START_SPAN+">" + item[NAME] + CLOSE_SPAN);
		var cost = $(START_SPAN+" class='cost'>$" + item.stats[COST] + CLOSE_SPAN);
		var image = new Image();
		container.append(image);
		container.append(name);
		container.append(cost);
		image[SRC] = item[SRC];
		image.title = item.type + ": " + item[NAME] + " ($" + item.stats[COST] + ")";
		menu.append(container);
		applyClicks();
	}
	var leftOffset = $('#canvas').position().left;
	var topOffset = $('#canvas').position().top;
	target.css({
		left: leftOffset - 3,
		top: topOffset - 3
	});
}