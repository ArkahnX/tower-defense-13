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
	for (var i = 0; i < 5; i++) {
		tiles.push(makeTile([
			[32 * 32, [175, 230],
				[1.3, 1, 2]
			],
			[50, [200, 245],
				[1, 1.3, 1.5]
			],
			[100, [125, 175],
				[2, 1, 2]
			]
		], 32));
	}
	for (var i = 0; i < 3; i++) {
		tiles.push(makeTile([
			[32 * 32, [0, 0],
				[1, 1, 1]
			],
			[600, [0, 50],
				[1, 1, 1]
			]
		], 32));
	}
	for (var i = 0; i < 2; i++) {
		tiles.push(makeTile([
			[32 * 32, [100, 200],
				[1.5, 1.5, 1]
			],
			[600, [100, 200],
				[1.5, 1.5, 1]
			]
		], 32));
	}
}