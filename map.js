function makeMap(width, height) {
	var map = [];
	var obstacles = [];
	for (var y = 0; y < height; y++) {
		map[y] = map[y] || [];
		obstacles[y] = obstacles[y] || [];
		for (var x = 0; x < width; x++) {
			map[y][x] = random(0, tiles.length - 1);
			obstacles[y][x] = 0;
		}
	}
	return [map, obstacles];
}

function drawMap() {
	for (var y = 0; y < map.length; y++) {
		for (var x = 0; x < map[y].length; x++) {
			context.drawImage(tiles[map[y][x]], x * 32, y * 32);
		}
	}
}