function makeMap(width, height) {
	for (var x = 0; x < width; x++) {
		map[x] = map[x] || [];
		obstacles[x] = obstacles[x] || [];
		for (var y = 0; y < height; y++) {
			var number = getWeightedRandom();
			var tile = cloneData(tiles[number], ["image", "x", "y"], [tileCloneImage, tileCloneX, tileCloneY], [tempX, tempY]);
			map[x][y] = tile;
			obstacles[x][y] = 0;
		}
		base = new setStructure(towers[0]);
		base.x = random((width / 2) - 1, (height / 2) + 1);
		base.y = random((width / 2) - 1, (height / 2) + 1);
		obstacles[base.x][base.y] = base;
	}
}

function mapLoop() {
	var x, y, i, e;
	for (x = 0; x < map[LENGTH]; x++) {
		for (y = 0; y < map[x][LENGTH]; y++) {
			for (i = 0; i < perTileFunction[LENGTH]; i++) {
				perTileFunction[i].call(map[x][y], map[x][y], obstacles[x][y]);
			}
		}
	}
	for (e = 0; e < perFrameFunction[LENGTH]; e++) {
		perFrameFunction[e]();
	}
	temporaryFunction.length = 0;
}

function compile(tempX, tempY) {
	var compiledMap = [];
	for (var x = 0; x < map.length; x++) {
		compiledMap[x] = compiledMap[x] || [];
		for (var y = 0; y < map[x].length; y++) {
			var tile = map[x][y];
			if (obstacles[x][y] && obstacles[x][y][NAME] !== "base") {
				tile.speed = 0;
			}
			compiledMap[x][y] = tile;
		}
	}
	if (tempX !== undefined && tempY !== undefined) {
		compiledMap[tempX][tempY] = cloneData(tiles[compiledMap[tempX][tempY].id], ["image", "x", "y"], [tileCloneImage, tileCloneX, tileCloneY], [tempX, tempY]);
		compiledMap[tempX][tempY].speed = 0;
	}
	return compiledMap;
}