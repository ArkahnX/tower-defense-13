var buildList = {
	"images/drain.png": {
		"type": "trap",
		"name": "drain",
		"src": "images/drain.png",
		"stats": {
			"health": "",
			"cost": "10"
		}
	},
	"images/scorpion.png": {
		"type": "structure",
		"name": "scorpion",
		"src": "images/scorpion.png",
		"stats": {
			"health": "100",
			"cost": "100"
		}
	}
};

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

var canBuild = function() {
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