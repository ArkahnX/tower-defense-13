function makeEnemy() {
	enemyData.push(makefoes("Scoot", "normal", "FF0000", 12, 13, 125));
	enemyData.push(makefoes("Solly", "normal", "0FF000", 18, 8, 200));
	enemyData.push(makefoes("Pyro", "normal", "00FF00", 16, 10, 175));
	enemyData.push(makefoes("Demo", "normal", "000FF0", 16, 9, 125));
	enemyData.push(makefoes("Hoovey", "normal", "0000FF", 20, 7, 300));
	enemyData.push(makefoes("Engie", "normal", "FFFF00", 16, 10, 125));
	enemyData.push(makefoes("Medic", "normal", "0FFFF0", 14, 11, 150));
	enemyData.push(makefoes("Sniper", "normal", "00FFFF", 12, 10, 125));
	enemyData.push(makefoes("Spah", "normal", "FFFFFF", 10, 10, 125));
}

function makefoes(name, type, color, size, speed, health) {
	var side = Math.ceil(4 * Math.random());
	var x = 0;
	var y = 0;
	if (side === 1 || side === 3) {
		x = Math.floor(Math.random() * 32 * 19.5);
		if (side === 3) {
			y = 640 - size;
		}
	}
	if (side === 2 || side === 4) {
		y = Math.floor(Math.random() * 32 * 19.5);
		if (side === 2) {
			x = 640 - size;
		}
	}
	return {
		name: name,
		type: type,
		color: color,
		size: size,
		speed: speed,
		health: health,
		x: x,
		y: y,
		path: getpath(x, y)
	}
}
function getpath(x, y) {
	// FIRST, gets the tile of the enemy in question
	tilex = Math.round(x/32);
	tiley = Math.round(y/32);
	// SECOND, gets the path it must take
	move = astar.search(map,map[tilex][tiley],map[10][10]);
	return move
}
function enemies() {
	for (i = 0; i < enemyData.length; i++) {
		mook = enemyData[i];
		context.beginPath();
		context.fillStyle = mook.color;
		context.fillRect(mook.x, mook.y, mook.size, mook.size);
		context.fill();
	}
	// Movement function for these guys
	/*for (i = 0; i < enemyData.length; i++) {
		// FIRST, gets the tile of the enemy in question
		mook - enemyData[i];
		tilex = Math.round(mook.x/32)
		tiley = Math.round(mook.y/32)
		// SECOND, gets the path it must take
		move = astar.search(map,map[tilex][tiley],map[10][10]);
		// THIRD, moves it along the given path

	}*/
}