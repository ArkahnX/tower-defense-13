function makeMap(width, height) {
	for (var y = 0; y < height; y++) {
		map[y] = map[y] || [];
		obstacles[y] = obstacles[y] || [];
		for (var x = 0; x < width; x++) {
			var num = getWeightedRandom();
			var thisTile = new setTile(tiles[num], "imageList");
			thisTile.x = x;
			thisTile.y = y;
			thisTile.pos = {
				x: x,
				y: y
			};
			map[y][x] = thisTile;
			obstacles[y][x] = 0;
		}
	}
	var base = new setStructure(towers[0]);
	base.x = random((width / 2) - 1, (height / 2) + 1);
	base.y = random((width / 2) - 1, (height / 2) + 1);
	obstacles[base.x][base.y] = base;
	return [map, obstacles];
}

function drawMap() {
	for (var y = 0; y < map[LENGTH]; y++) {
		for (var x = 0; x < map[y][LENGTH]; x++) {
			context.drawImage(map[y][x].image, x * 32, y * 32);
		}
	}
}

function drawStructures() {
	for (var y = 0; y < map[LENGTH]; y++) {
		for (var x = 0; x < map[y][LENGTH]; x++) {
			if (typeof obstacles[y][x] === "object") {
				drawTower(obstacles[y][x], x, y);
			}
		}
	}
}

function compile(tempX, tempY) {
	var compiledMap = [];
	for (var y = 0; y < map.length; y++) {
		compiledMap[y] = compiledMap[y] || [];
		for (var x = 0; x < map[y].length; x++) {
			var tile = map[y][x];
			if (obstacles[y][x] && obstacles[y][x][NAME] !== "base") {
				tile.speed = 0;
			}
			compiledMap[y][x] = tile;
		}
	}
	if (tempX !== undefined && tempY !== undefined) {
		compiledMap[tempY][tempX] = setTile(tiles[compiledMap[tempY][tempX].id], "imageList");
		compiledMap[tempY][tempX].speed = 0;
	}
	return compiledMap;
}