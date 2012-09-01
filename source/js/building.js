function isBuilding() {
	return building() ? true : false;
}

function getAll(property, value) {
	var list = [];
	for (var attr in buildList) {
		if (buildList[attr][property] === value) {
			list.push(buildList[attr]);
		}
	}
	return list;
}

function building() {
	return getAll("name", "scorpion")[0];
}

function canBuild() {
	var currentTile = map[mouse.y][mouse.x];
	if (obstacles[mouse.y][mouse.x] !== 0) {
		return null;
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