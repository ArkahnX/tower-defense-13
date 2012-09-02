function makeMap(width, height) {
	var map = [];
	var obstacles = [];
	for (var y = 0; y < height; y++) {
		map[y] = map[y] || [];
		obstacles[y] = obstacles[y] || [];
		for (var x = 0; x < width; x++) {
			var num = getWeightedRandom();
			var thisTile = tiles[num];
			map[y][x] = new setTile(tiles[num], "imageList");
			obstacles[y][x] = 0;
		}
	}
	var base = random(width / 2, height / 2);
	obstacles[base][base] = 1;
	return [map, obstacles];
}

function drawMap() {
	for (var y = 0; y < map.length; y++) {
		for (var x = 0; x < map[y].length; x++) {
			context.drawImage(map[y][x].image, x * 32, y * 32);
			if (obstacles[y][x] > 0) {
				// context.drawImage(obstacles[y][x].image, x * 32, y * 32);
			}
		}
	}
}