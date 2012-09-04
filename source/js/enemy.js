function makeEnemies() {
	var used = [];
	enemies[PUSH](makeEnemy("Scoot", "normal", "FFF000", 12, 1, 125, used));
	// enemies[PUSH](makefoes("Solly", "normal", "0FF000", 18, 1, 200, used));
	// enemies[PUSH](makefoes("Pyro", "normal", "00FF00", 16, 1, 175, used));
	// enemies[PUSH](makefoes("Demo", "normal", "000FF0", 16, 1, 125, used));
	// enemies[PUSH](makefoes("Hoovey", "normal", "0000FF", 20, 1, 300, used));
	// enemies[PUSH](makefoes("Engie", "normal", "FFFF00", 16, 1, 125, used));
	// enemies[PUSH](makefoes("Medic", "normal", "0FFFF0", 14, 1, 150, used));
	// enemies[PUSH](makefoes("Sniper", "normal", "00FFFF", 12, 1, 125, used));
	// enemies[PUSH](makefoes("Spah", "normal", "FFFFFF", 10, 1, 125, used));
	getPaths();
}

function uniqueSpawn(x, y, used) {
	for (var i = 0; i < used[LENGTH]; i++) {
		if (used[i][0] === x && used[i][1] === y) {
			return false
		}
	}
	return true;
}

function makeEnemy(name, type, color, size, speedModifier, health, used) {
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
	return {
		name: name,
		type: type,
		color: color,
		size: size,
		speed: speed,
		health: health,
		targetX: null,
		targetY: null,
		path: null,
		x: x,
		y: y,
		pixelX: center(x, size),
		pixelY: center(y, size),
		pathIndex: 0
	}
}

function drawEnemies() {
	if (enemies[LENGTH]) {
		for (i = 0; i < enemies[LENGTH]; i++) {
			var thisEnemy = enemies[i];
			context.beginPath();
			context.fillStyle = thisEnemy[COLOR];
			context.fillRect(thisEnemy.pixelX, thisEnemy.pixelY, thisEnemy.size, thisEnemy.size);
			context.fill();
		}
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
			var tile = map[thisEnemy.y][thisEnemy.x];
			var speed = thisEnemy[SPEED] / tile[SPEED];
			var x = center(thisEnemy.targetX, thisEnemy.size);
			var y = center(thisEnemy.targetY, thisEnemy.size);
			if (round(thisEnemy.pixelX) < x) {
				if (thisEnemy.pixelX + speed > x) {
					thisEnemy.pixelX = x
				} else {
					thisEnemy.pixelX += speed;
				}
			} else if (round(thisEnemy.pixelY) < y) {
				if (thisEnemy.pixelY + speed > y) {
					thisEnemy.pixelY = y
				} else {
					thisEnemy.pixelY += speed;
				}
			} else if (round(thisEnemy.pixelX) > x) {
				if (thisEnemy.pixelX - speed < x) {
					thisEnemy.pixelX = x
				} else {
					thisEnemy.pixelX -= speed;
				}
			} else if (round(thisEnemy.pixelY) > y) {
				if (thisEnemy.pixelY - speed < y) {
					thisEnemy.pixelY = y
				} else {
					thisEnemy.pixelY -= speed;
				}
			}
			if (round(thisEnemy.pixelX) === center(thisEnemy.targetX, thisEnemy.size) && round(thisEnemy.pixelY) === center(thisEnemy.targetY, thisEnemy.size)) {
				thisEnemy.pathIndex++;
			}
		}
		var base = getBaseCoords()
		if (thisEnemy.x === base.x && thisEnemy.y === base.y) {
			reachBase(thisEnemy);
			destroyUnit(thisEnemy[NAME])
		}
	}
}

function getPaths(testMap) {
	var list = [];
	for (var i = 0; i < enemies.length; i++) {
		var compiledMap = testMap || compile();
		var thisEnemy = enemies[i];
		var base = getBaseCoords();
		var path = astar.search(compiledMap, compiledMap[thisEnemy.y][thisEnemy.x], compiledMap[base.y][base.x]);
		if (testMap) {
			list[PUSH](!!path.length);
		} else {
			thisEnemy.path = path;
			thisEnemy.targetX = path[0].x;
			thisEnemy.targetY = path[0].y;
			thisEnemy.pathIndex = 0;
		}
	}
	if (testMap) {
		if(list.indexOf(false)>-1) {
			return false;
		}
	}
	return true;
}

function stop() {
	cancelAnimationFrame(animationLoop)
}