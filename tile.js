function makeTilePart(ammount, tileSize, colorArray, modifiersArray) {
	var i, num;
	var x = unique(0, tileSize - 1, ammount);
	var y = unique(0, tileSize - 1, ammount);
	for (i = 0; i < ammount; i++) {
		num = random(colorArray[0], colorArray[1]);
		context.fillStyle = "rgb(" + Math.floor(num / modifiersArray[0]) + "," + Math.floor(num / modifiersArray[1]) + "," + Math.floor(num / modifiersArray[2]) + ")";
		context.fillRect(x[i], y[i], 1, 1);
	}
}

function makeTile(dataArray, tileSize) {
	context.clearRect(0, 0, canvas.width, canvas.height);
	num = random(dataArray[0][1][0], dataArray[0][1][1]);
	context.fillStyle = "rgb(" + Math.floor(num / dataArray[0][2][0]) + "," + Math.floor(num / dataArray[0][2][1]) + "," + Math.floor(num / dataArray[0][2][2]) + ")";
	context.fillRect(0, 0, tileSize, tileSize);
	for (var i = 0; i < dataArray.length; i++) {
		makeTilePart(dataArray[i][0], tileSize, dataArray[i][1], dataArray[i][2]);
	}
	var image = new Image();
	image.src = canvas.toDataURL();
	return image;
}

function makeSprites() {
	tiles.push(makeTile([
		[32 * 32, [175, 225],
			[1.5, 1, 2]
		],
		[100, [200, 245],
			[1, 1.3, 1.5]
		],
		[100, [125, 175],
			[2, 1, 2]
		]
	], 32));
	tiles.push(makeTile([
		[32 * 32, [0, 0],
			[1, 1, 1]
		],
		[600, [0, 50],
			[1, 1, 1]
		]
	], 32));
}

function spriteTest() {
	var y = 0;
	var x = 0;
	for (var i = 0; i < tiles.length; i++) {
		if ((x * 32) + 32 > canvas.width) {
			x = 0;
			y++;
		}
		context.drawImage(tiles[i], x * 32, y * 32);
		x++;
	}
}




function oldBuildTiles() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	// grass
	for (var i = 0; i < 32; i++) {
		for (var j = 0; j < 32; j++) {
			var num = random(175, 225);
			context.fillStyle = "rgb(" + Math.floor(num / 1.5) + "," + num + "," + Math.floor(num / 2) + ")";
			context.fillRect(i, j, 1, 1);
		}
	}
	// dirt
	for (var i = 0; i < 100; i++) {
		var x = random(0, 31);
		var y = random(0, 31);
		var num = random(200, 245);
		// 8B5742
		context.fillStyle = "rgb(" + Math.floor(num) + "," + Math.floor(num / 1.3) + "," + Math.floor(num / 1.5) + ")";
		context.fillRect(x, y, 1, 1);
	}
	// dark grass
	for (var i = 0; i < 100; i++) {
		var x = random(0, 31);
		var y = random(0, 31);
		var num = random(125, 175);
		// 8B5742
		context.fillStyle = "rgb(" + Math.floor(num / 2) + "," + num + "," + Math.floor(num / 2) + ")";
		context.fillRect(x, y, 1, 1);
	}
	tiles.push(canvas.toDataURL());
	context.clearRect(0, 0, canvas.width, canvas.height);
	// road
	for (var i = 0; i < 32; i++) {
		for (var j = 0; j < 32; j++) {
			var num = random(0, 0);
			context.fillStyle = "rgb(" + Math.floor(num / 1) + "," + num + "," + Math.floor(num / 1) + ")";
			context.fillRect(i, j, 1, 1);
		}
	}
	// moar road
	for (var i = 0; i < 600; i++) {
		var x = random(0, 31);
		var y = random(0, 31);
		var num = random(0, 50);
		// 8B5742
		context.fillStyle = "rgb(" + Math.floor(num) + "," + Math.floor(num / 1) + "," + Math.floor(num / 1) + ")";
		context.fillRect(x, y, 1, 1);
	}
	tiles.push(canvas.toDataURL());
}