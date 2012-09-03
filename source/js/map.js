function makeMap(width, height) {
	for (var y = 0; y < height; y++) {
		map[y] = map[y] || [];
		obstacles[y] = obstacles[y] || [];
		for (var x = 0; x < width; x++) {
			var num = getWeightedRandom();
			var thisTile = tiles[num];
			thisTile.x = x;
			thisTile.y = y;
			thisTile.pos = {
				x: x,
				y: y
			};
			map[y][x] = new setTile(tiles[num], "imageList");
			obstacles[y][x] = 0;
		}
	}
	var base = random((width / 2) - 1, (height / 2) + 1);
	obstacles[base][base] = 1;
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
			if (obstacles[y][x] > 0) {
				drawTower(towers[obstacles[y][x] - 1][NAME], x, y);
			}
		}
	}
}