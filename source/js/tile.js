function makeTilePart(ammount, tileSize, colorStart, colorEnd, Red, Green, Blue) {
	var i, num;
	var x = [];
	var y = [];
	for (var e = 0; e < ammount; e++) {
		x.push(random(0, tileSize - 1, ammount));
		y.push(random(0, tileSize - 1, ammount));
	}
	for (i = 0; i < ammount; i++) {
		num = random(colorStart, colorEnd);
		context.fillStyle = "rgb(" + Math.floor(num / Red) + "," + Math.floor(num / Green) + "," + Math.floor(num / Blue) + ")";
		context.fillRect(x[i], y[i], 1, 1);
	}
}

function makeTile(name, type, priority, speed, dataArray, tileSize) {
	var images = [];
	canvas.width = 32;
	canvas.height = 32;
	for (var i = 0; i < 3; i++) {
		num = random(dataArray[0][1], dataArray[0][2]);
		context.fillStyle = "rgb(" + Math.floor(num / dataArray[0][3]) + "," + Math.floor(num / dataArray[0][4]) + "," + Math.floor(num / dataArray[0][5]) + ")";
		context.fillRect(0, 0, tileSize, tileSize);
		for (var e = 0; e < dataArray.length; e++) {
			makeTilePart(dataArray[e][0], tileSize, dataArray[e][1], dataArray[e][2], dataArray[e][3], dataArray[e][4], dataArray[e][5]);
		}
		var image = new Image();
		image.src = canvas.toDataURL();
		images.push(image);
		context.clearRect(0, 0, canvas.width, canvas.height);
	}
	var thisId = id;
	id++;
	canvas.width = canvasWidth * tileSize;
	canvas.height = canvasHeight * tileSize;
	return {
		name: name,
		is: type,
		imageList: images,
		images: images.length,
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
	return this.type == GraphNodeType.WALL;
};

function makeSprites() {
	tiles.push(makeTile("grass", "path", 7, 2, [
		[32 * 32, 175, 230, 1.3, 1, 2],
		[50, 200, 245, 1, 1.3, 1.5],
		[100, 125, 175, 2, 1, 2]
	], 32));
	tiles.push(makeTile("darkGrass", "path", 7, 2, [
		[32 * 32, 150, 205, 1.3, 1, 2],
		[50, 175, 220, 1, 1.3, 1.5],
		[100, 100, 150, 2, 1, 2]
	], 32));
	tiles.push(makeTile("road", "speed", 4, 1, [
		[32 * 32, 0, 0, 1, 1, 1],
		[600, 0, 50, 1, 1, 1]
	], 32));
	tiles.push(makeTile("water", "slow", 3, 3, [
		[32 * 32, 100, 200, 1.5, 1.5, 1],
		[600, 100, 200, 1.5, 1.5, 1]
	], 32));
}