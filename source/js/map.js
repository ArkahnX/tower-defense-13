/**
 * Generate a map using weighted tiles.
 * @param  {Number} width  Width in tiles to draw the map.
 * @param  {Number} height Height in tiles to draw the map.
 */

function makeMap(width, height) {
	for (var x = 0; x < width; x++) {
		map[x] = map[x] || [];
		obstacles[x] = obstacles[x] || [];
		for (var y = 0; y < height; y++) {
			var number = getWeightedRandom();
			var tile = cloneData(tiles[number], ["image", "x", "y"], [tileCloneImage, tileCloneX, tileCloneY], [x, y]);
			map[x][y] = tile;
			obstacles[x][y] = 0;
		}
	}
	base = cloneData(towers[0]);
	base.x = floor(random((width / 2) - 1, (height / 2) + 1));
	base.y = floor(random((width / 2) - 1, (height / 2) + 1));
	obstacles[base.x][base.y] = base;
}

/**
 * Map loop, draw loops should be included in setup.js/setup, as either perFrame, or perTile.
 */

function mapLoop() {
	var x, y, i, e;
	for (x = 0; x < map[LENGTH]; x++) {
		for (y = 0; y < map[x][LENGTH]; y++) {
			for (i = 0; i < tileFunction[LENGTH]; i++) {
				tileFunction[i](map[x][y], obstacles[x][y]);
			}
		}
	}
	for (x = 0; x < map[LENGTH]; x++) {
		for (y = 0; y < map[x][LENGTH]; y++) {
			for (i = 0; i < afterTileFunction[LENGTH]; i++) {
				afterTileFunction[i](map[x][y], obstacles[x][y]);
			}
		}
	}
	for (x = 0; x < map[LENGTH]; x++) {
		for (y = 0; y < map[x][LENGTH]; y++) {
			for (i = 0; i < afterTowerFunction[LENGTH]; i++) {
				afterTowerFunction[i](map[x][y], obstacles[x][y]);
			}
		}
	}
	for (e = 0; e < perFrameFunction[LENGTH]; e++) {
		perFrameFunction[e]();
	}
}

/**
 * Create a temporary map for the purpose of making sure the paths are accessible.
 * @param  {Number} tempX X value to set to 0 (wall).
 * @param  {Number} tempY Y value to set to 0 (wall).
 * @return {Array}        Map to use for pathfinding.
 */

function compile(tempX, tempY) {
	var compiledMap = [];
	for (var x = 0; x < canvasWidth; x++) {
		compiledMap[x] = compiledMap[x] || [];
		for (var y = 0; y < canvasHeight; y++) {
			var tile = cloneData(tiles[map[x][y].id], ["image", "x", "y"], [tileCloneImage, tileCloneX, tileCloneY], [x, y]);
			if (obstacles[x][y] && obstacles[x][y][NAME].toLowerCase() !== "base") {
				tile.speed = 0;
				if (obstacles[x][y].type === "trap") {
					tile.speed = 0.5;
				}
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

function getEdges(map) {
	var list = [];
	for (var x = 0; x < map.length; x++) {
		for (var y = 0; y < map[x].length; y++) {
			if (x === 0 || x === map.length - 1 || y === 0 || y === map[x].length - 1) {
				if (map[x][y].speed !== 0 && base) {
					var path = astar.search(map, map[x][y], map[base.x][base.y]);
					if (path.length) {
						list.push(true);
					}
				} else {
					list.push(false);
				}
			}
		}
	}
	return list;
}