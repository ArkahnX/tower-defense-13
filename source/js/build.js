function isBuilding() {
	return building() ? true : false;
}

function building() {
	return getAll(buildList, "name", "scorpion")[0];
}

function canBuild() {
	var currentTile = map[mouse.y][mouse.x];
	if (obstacles[mouse.y][mouse.x] !== 0) {
		return null;
	}
	var enemy = getAll(enemyData, "y", mouse.y)
	if (enemy.length) {
		if (getAll(enemy, "x", mouse.x).length) {
			return false;
		}
	}
	if (!isBuilding()) {
		return true;
	}
	if (building().is === "terrain") {
		return true;
	}
	if (currentTile.is === "path") {
		return true;
	}
	if (building().is === "trap" && currentTile.is === "fast") {
		return true;
	}
	return false;
};

function emptyBuildMenu() {
	document.getElementById("towers").innerHTML = "";
}

function setConstructibles() {
	if (document.getElementById("towers").children.length > 0) {
		emptyBuildMenu()
	}
	var structures = [];
	for (var i = 0; i < towers.length; i++) {
		var item = towers[i];
		var name = "<span>" + item.name + "</span>";
		var cost = "<span class='cost'>$" + item.cost + "</span>";
		var image = "<img src='" + item.image.src + "'>";
		var container = "<div class='container' title='" + item.is + ": " + item.name + " ($" + item.cost + ")" + "'>" + image + name + cost + "</div>";
		structures.push("" + container + "")
	}
	document.getElementById("towers").innerHTML = structures.join("");
	bindBuyClicks();
}

function fillBuildMenu() {
	if (menu.children().length > 0) {
		emptyBuildMenu()
	}
	for (var attr in buildList) {
		var item = buildList[attr];
		var container = $("<div class='container'></div>");
		var name = $("<span>" + item.name + "</span>");
		var cost = $("<span class='cost'>$" + item.stats.cost + "</span>");
		var image = new Image();
		container.append(image);
		container.append(name);
		container.append(cost);
		image.src = item.src;
		image.title = item.type + ": " + item.name + " ($" + item.stats.cost + ")";
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