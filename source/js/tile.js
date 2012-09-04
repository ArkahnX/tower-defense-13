function makeTilePart(ammount, tileSize, colorStart, colorEnd, Red, Green, Blue) {
	var i, num;
	var x = [];
	var y = [];
	for (var e = 0; e < ammount; e++) {
		x[PUSH](random(0, tileSize - 1, ammount));
		y[PUSH](random(0, tileSize - 1, ammount));
	}
	for (i = 0; i < ammount; i++) {
		num = random(colorStart, colorEnd);
		context.fillStyle = RGB + round(num / Red) + "," + round(num / Green) + "," + round(num / Blue) + ")";
		context.fillRect(x[i], y[i], 1, 1);
	}
}

function makeTile(name, type, priority, speed, dataArray, tileSize) {
	var images = [];
	canvas[WIDTH] = 32;
	canvas[HEIGHT] = 32;
	for (var i = 0; i < 3; i++) {
		num = random(dataArray[0][1], dataArray[0][2]);
		context.fillStyle = RGB + round(num / dataArray[0][3]) + "," + round(num / dataArray[0][4]) + "," + round(num / dataArray[0][5]) + ")";
		context.fillRect(0, 0, tileSize, tileSize);
		for (var e = 0; e < dataArray[LENGTH]; e++) {
			makeTilePart(dataArray[e][0], tileSize, dataArray[e][1], dataArray[e][2], dataArray[e][3], dataArray[e][4], dataArray[e][5]);
		}
		var image = new Image();
		image[SRC] = canvas[TO_DATA_URL]();
		images[PUSH](image);
		context.clearRect(0, 0, canvas[WIDTH], canvas[HEIGHT]);
	}
	var thisId = id;
	id++;
	canvas[WIDTH] = canvasWidth * tileSize;
	canvas[HEIGHT] = canvasHeight * tileSize;
	return {
		name: name,
		is: type,
		imageList: images,
		images: images[LENGTH],
		priority: priority,
		id: thisId,
		speed: speed
	};
}

function setTile(tile, watch) {
	for (var attr in tile) {
		if (attr === watch) {
			this.image = tile[watch][random(0, tile.images - 1)];
		} else {
			this[attr] = tile[attr];
		}
	}
	return this;
}

setTile.prototype.toString = function() {
	return "[" + this.x + " " + this.y + "]";
};

setTile.prototype.isWall = function() {
	return this.type === 0;
};

function makeSprites() {
	tiles[PUSH](makeTile("grass", PATH, 7, 1, [
		[32 * 32, 175, 230, 1.3, 1, 2],
		[50, 200, 245, 1, 1.3, 1.5],
		[100, 125, 175, 2, 1, 2]
	], 32));
	tiles[PUSH](makeTile("darkGrass", PATH, 7, 1, [
		[32 * 32, 150, 205, 1.3, 1, 2],
		[50, 175, 220, 1, 1.3, 1.5],
		[100, 100, 150, 2, 1, 2]
	], 32));
	tiles[PUSH](makeTile("road", "speed", 4, 0.5, [
		[32 * 32, 0, 0, 1, 1, 1],
		[600, 0, 50, 1, 1, 1]
	], 32));
	tiles[PUSH](makeTile("water", "slow", 3, 1.5, [
		[32 * 32, 100, 200, 1.5, 1.5, 1],
		[600, 100, 200, 1.5, 1.5, 1]
	], 32));
}