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
	var baseLocation = random((width / 2) - 1, (height / 2) + 1);
	var base = new setStructure(towers[0]);
	base.x = base.y = baseLocation;
	obstacles[baseLocation][baseLocation] = base;
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