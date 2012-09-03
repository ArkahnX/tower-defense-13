function makeEnemies() {
	var used = [];
	enemies[PUSH](makefoes("Scoot", "normal", "FF0000", 12, 3, 125, used));
	// enemies[PUSH](makefoes("Solly", "normal", "0FF000", 18, 1, 200, used));
	// enemies[PUSH](makefoes("Pyro", "normal", "00FF00", 16, 1, 175, used));
	// enemies[PUSH](makefoes("Demo", "normal", "000FF0", 16, 1, 125, used));
	// enemies[PUSH](makefoes("Hoovey", "normal", "0000FF", 20, 1, 300, used));
	// enemies[PUSH](makefoes("Engie", "normal", "FFFF00", 16, 1, 125, used));
	// enemies[PUSH](makefoes("Medic", "normal", "0FFFF0", 14, 1, 150, used));
	// enemies[PUSH](makefoes("Sniper", "normal", "00FFFF", 12, 1, 125, used));
	// enemies[PUSH](makefoes("Spah", "normal", "FFFFFF", 10, 1, 125, used));
}

function uniqueSpawn(x, y, used) {
	for (var i = 0; i < used[LENGTH]; i++) {
		if (used[i][0] === x && used[i][1] === y) {
			return false
		}
	}
	return true;
}


function makeEnemy() {

}

function makefoes(name, type, color, size, speedModifier, health, used) {
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
	used[PUSH]([x, y]);
	var speed = (tileSize / 60) * speedModifier;
	var base = getBaseCoords();
	var path = astar.search(map, map[y][x], map[base.y][base.x]);
	return {
		name: name,
		type: type,
		color: color,
		size: size,
		speed: speed,
		health: health,
		targetX: path[0].x,
		targetY: path[0].y,
		path: path,
		x: x,
		y: y,
		pixelX: center(x, size),
		pixelY: center(y, size),
		pathIndex: 0
	}
}

function drawEnemies() {
	for (i = 0; i < enemies[LENGTH]; i++) {
		var thisEnemy = enemies[i];
		context.beginPath();
		context.fillStyle = thisEnemy[COLOR];
		context.fillRect(thisEnemy.pixelX, thisEnemy.pixelY, thisEnemy.size, thisEnemy.size);
		context.fill();
	}
}

function round(number) {
	return WINDOW[MATH].round(number);
}
function floor(number) {
	return WINDOW[MATH][FLOOR](number);
}

function center(position, size) {
	return round(position * tileSize + (HALF_TILE_SIZE) - (size / 2));
}

function moveEnemies() {
	for (var i = 0; i < enemies.length; i++) {
		var thisEnemy = enemies[i];
		if (thisEnemy.pathIndex < thisEnemy[PATH][LENGTH]) {
			var target = thisEnemy[PATH][thisEnemy.pathIndex];
			thisEnemy.x = modulus(thisEnemy.pixelX + (thisEnemy.size / 2), tileSize);
			thisEnemy.y = modulus(thisEnemy.pixelY + (thisEnemy.size / 2), tileSize);
			thisEnemy.targetX = target.x;
			thisEnemy.targetY = target.y;
			// console.log(thisEnemy.pixelX < thisEnemy[PATH][thisEnemy.pathIndex].x)
			if (round(thisEnemy.pixelX) < center(thisEnemy.targetX, thisEnemy.size)) {
				thisEnemy.pixelX += thisEnemy[SPEED];
			} else if (round(thisEnemy.pixelY) < center(thisEnemy.targetY, thisEnemy.size)) {
				thisEnemy.pixelY += thisEnemy[SPEED];
			} else if (round(thisEnemy.pixelX) > center(thisEnemy.targetX, thisEnemy.size)) {
				thisEnemy.pixelX -= thisEnemy[SPEED];
			} else if (round(thisEnemy.pixelY) > center(thisEnemy.targetY, thisEnemy.size)) {
				thisEnemy.pixelY -= thisEnemy[SPEED];
			}
			if (round(thisEnemy.pixelX) === center(thisEnemy.targetX, thisEnemy.size) && round(thisEnemy.pixelY) === center(thisEnemy.targetY, thisEnemy.size)) {
				thisEnemy.pathIndex++;
			}
		}
	}
}