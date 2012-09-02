function makeEnemy() {
	var used = [];
	enemyData.push(makefoes("Scoot", "normal", "FF0000", 12, .013, 125, used));
	enemyData.push(makefoes("Solly", "normal", "0FF000", 18, .008, 200, used));
	enemyData.push(makefoes("Pyro", "normal", "00FF00", 16, .010, 175, used));
	enemyData.push(makefoes("Demo", "normal", "000FF0", 16, .009, 125, used));
	enemyData.push(makefoes("Hoovey", "normal", "0000FF", 20, .007, 300, used));
	enemyData.push(makefoes("Engie", "normal", "FFFF00", 16, .010, 125, used));
	enemyData.push(makefoes("Medic", "normal", "0FFFF0", 14, .011, 150, used));
	enemyData.push(makefoes("Sniper", "normal", "00FFFF", 12, .010, 125, used));
	enemyData.push(makefoes("Spah", "normal", "FFFFFF", 10, .010, 125, used));
}

function uniqueSpawn(x, y, used) {
	for (var i = 0; i < used.length; i++) {
		if (used[i][0] === x && used[i][1] === y) {
			return false
		}
	}
	return true;
}

function makefoes(name, type, color, size, speed, health, used) {
	var side = random(0, 3)
	// 0-3 top-left clockwise
	var x = 0;
	var y = 0;
	do {
		if (side === 0 || side === 2) {
			x = random(0, canvasWidth - 1);
			if (side === 2) {
				y = canvasWidth - 1;
			}
		} else if (side === 1 || side === 3) {
			y = random(0, canvasHeight - 1);
			if (side === 1) {
				x = canvasHeight - 1;
			}
		}
	} while (!uniqueSpawn(x, y, used));
	used.push([x, y]);
	return {
		name: name,
		type: type,
		color: color,
		size: size,
		speed: speed,
		health: health,
		x: x,
		y: y,
		path: getpath(x, y),
		next: 0
	}
}

function getpath(x, y) {
	base = getBase();
	return astar.search(map, map[y][x], map[base.x][base.y]);
}

function enemies() {
	for (i = 0; i < enemyData.length; i++) {
		var mook = enemyData[i];
		context.beginPath();
		context.fillStyle = mook.color;
		context.fillRect(mook.x * tileSize + (tileSize / 2) - (mook.size / 2), mook.y * tileSize + (tileSize / 2) - (mook.size / 2), mook.size, mook.size);
		context.fill();
		/*function draw() {
			for (x in enemies) {
				canvas.draw(img, enemyData[x].x, enemyData[x].y, enemyData[x].size, enemyData[x].size)
			}
		}*/
	}
}

function moveThings() {
	for (x in enemyData) {
		if (enemyData[x].x < enemyData[x].path[enemyData[x].next].x) {
			enemyData[x].x += enemyData[x].speed;
		}
		else if (enemyData[x].y < enemyData[x].path[enemyData[x].next].y) {
			enemyData[x].y += enemyData[x].speed;
		}
		else if (enemyData[x].x > enemyData[x].path[enemyData[x].next].x) {
			enemyData[x].x -= enemyData[x].speed;
		}
		else if (enemyData[x].y > enemyData[x].path[enemyData[x].next].y) {
			enemyData[x].y -= enemyData[x].speed;
		}
		if (Math.round(enemyData[x].x) === Math.round(enemyData[x].path[enemyData[x].next].x) && enemyData[x].y === Math.round(enemyData[x].path[enemyData[x].next].y)) {
			enemyData[x].next++;
		}

		if (enemyData[x].next > enemyData[x].path.length) {
			enemyData[x].next = enemyData[x].path.length;
		}
	}
}