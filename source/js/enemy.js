/**
 * Define enemies for each level of difficulty.
 * @param  {Number} levels Number of levels of difficulty.
 */

function defineEnemies(levels) {
	for (var i = 1; i < levels + 1; i++) {
		var half = i / 2;
		var size = 7;
		if (half * 2 > size) {
			size = half * 2;
		}
		enemies.push({
			level: i,
			size: size,
			speed: half * 0.5,
			health: half * 5,
			fullHealth: half * 5,
			targetX: null,
			targetY: null,
			path: null,
			x: null,
			y: null,
			pixelX: null,
			pixelY: null,
			pathIndex: 0,
			color: "rgb(0,0,0)",
			red: 0,
			green: 0,
			blue: 0
		});
	}
}

/**
 * Function to move an enemy from the wave to the map. Will only spawn where the enemy can reach the base.
 */

function findSpawn(enemy) {
	var testPath;
	var times = 0;
	/**
	 * test paths until a
	 */
	do {
		do {
			// 0-3 top-left clockwise
			var x = 0;
			var y = 0;
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
			times++
			var testMap = compile();
		} while (testMap[x][y].speed === 0 /* && times < canvasWidth * canvasHeight*/ );

		data.x = x;
		data.y = y;
		data.pixelX = centerSymmetrical(x, data.size);
		data.pixelY = centerSymmetrical(y, data.size);
		testPath = getPaths([data], testMap);
	} while (!testPath.length)
	data.path = testPath;
	data.targetX = testPath[0].x;
	data.targetY = testPath[0].y;
	data.pathIndex = 0;
	return enemy;
}


function spawnEnemy() {
	if (waves[0] && base) {
		var data = waves[0].splice(0, 1)[0];
		var testPath;
		var times = 0;
		/**
		 * test paths until a
		 */
		do {
			do {
				var side = random(0, 3)
				// 0-3 top-left clockwise
				var x = 0;
				var y = 0;
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
				times++
				var testMap = compile();
			} while (testMap[x][y].speed === 0 /* && times < canvasWidth * canvasHeight*/ );
			data.x = x;
			data.y = y;
			data.pixelX = centerSymmetrical(x, data.size);
			data.pixelY = centerSymmetrical(y, data.size);
			testPath = getPaths([data], testMap);
		} while (!testPath.length)
		data.path = testPath;
		data.targetX = testPath[0].x;
		data.targetY = testPath[0].y;
		data.pathIndex = 0;
		onScreen.push(data);
	}
}

/**
 * Make enemy waves.
 * @param  {Number} levels Number of waves to make.
 */

function makeWaves(levels) {
	/**
	 * Make a wave for each level
	 */
	// for (var l = 1; l < levels + 1; l++) {
	// var wave = [];
	// var enemyId = 0;
	/**
	 * Start large, end small.
	 */
	// for (var e = l; e > 0; e--) {
	/**
	 * Enemy numbers, based off of previous value.
	 */
	// for (var n = 0; n < e * 2; n++) {
	/**
	 * EnemyId is increased after this loop is run, resulting in decreased enemies as they become more difficult.
	 */
	// var data = cloneData(enemies[enemyId]);
	// wave.push(data);
	// }
	// enemyId = round((l / levels) * (enemies.length - 1));
	// }
	// waves.push(wave);
	// }
	for (var l = 1; l < levels + 1; l++) {
		var wave = [];
		// var enemyId = 0;
		/**
		 * Start large, end small.
		 */
		for (var e = l; e > 0; e--) {
			/**
			 * Enemy numbers, based off of previous value.
			 */
			for (var n = 0; n < (e * 2) + 15; n++) {
				/**
				 * EnemyId is increased after this loop is run, resulting in decreased enemies as they become more difficult.
				 */
				var data = cloneData(enemies[l]);
				wave.push(data);
			}
			// enemyId = round((l / levels) * (enemies.length - 1));
		}
		waves.push(wave);
	}

}

/**
 * Function to manage cloning enemy X value. Refer to functions.js/cloneData.
 * @param  {Object} enemy     Enemy that is being cloned.
 * @param  {String} attribute Attribute that was targetted
 * @param  {Array}  other     Variables added when called.
 * @return {Number}           Changes the enemy[attribute] to the returned value.
 */

function xModifier(enemy, attribute, other) {
	return other[0];
}

/**
 * Function to manage cloning enemy Y value. Refer to functions.js/cloneData.
 * @param  {Object} enemy     Enemy that is being cloned.
 * @param  {String} attribute Attribute that was targetted
 * @param  {Array}  other     Variables added when called.
 * @return {Number}           Changes the enemy[attribute] to the returned value.
 */

function yModifier(enemy, attribute, other) {
	return other[1];
}

/**
 * Function to manage cloning enemy pixelX value. Refer to functions.js/cloneData.
 * @param  {Object} enemy     Enemy that is being cloned.
 * @param  {String} attribute Attribute that was targetted
 * @param  {Array}  other     Variables added when called.
 * @return {Number}           Changes the enemy[attribute] to the returned value.
 */

function pixelXModifier(enemy, attribute, other) {
	return centerSymmetrical(other[0], enemy.size);
}

/**
 * Function to manage cloning enemy pixelY value. Refer to functions.js/cloneData.
 * @param  {Object} enemy     Enemy that is being cloned.
 * @param  {String} attribute Attribute that was targetted
 * @param  {Array}  other     Variables added when called.
 * @return {Number}           Changes the enemy[attribute] to the returned value.
 */

function pixelYModifier(enemy, attribute, other) {
	return centerSymmetrical(other[1], enemy.size);
}

/**
 * Draw each onScreen enemy.
 */

function drawEnemies() {
	forEach(onScreen, function(index) {
		var enemy = this;
		if (enemy.health < 1) {
			destroyEnemy(enemy, index);
		} else {
			context.beginPath();
			context.strokeStyle = "white";
			context.lineWidth = 2;
			context.strokeRect(enemy.pixelX, enemy.pixelY, enemy.size, enemy.size);
			context.fillStyle = enemy.color;
			context.fillRect(enemy.pixelX, enemy.pixelY, enemy.size, enemy.size);
			context.fill();
			context.closePath();
			// draw enemy health
			var radius = 16 - 1;
			var fullHealth = enemy.fullHealth * 100;
			var health = enemy.health * 100;
			var healthCalc = ((fullHealth - health) / (fullHealth / 2)) + 1;
			if (health < fullHealth / 2) {
				healthCalc = (((fullHealth / 2) - health) / (fullHealth / 2));
			}
			var startAngle = healthCalc * Math.PI;
			var endAngle = 1 * Math.PI;

			context.beginPath();
			context.arc(enemy.pixelX + (enemy.size / 2), enemy.pixelY + (enemy.size / 2), radius, startAngle, endAngle, false);
			context.lineWidth = 2;
			// line color
			context.strokeStyle = "rgba(255,0,0,0.4)";
			context.stroke();
		}
	});
}

/**
 * Move enemies that are onScreen, until they reach the base.
 */

function moveEnemies() {
	forEach(onScreen, function(index) {
		var enemy = this;
		if (base && enemy.pathIndex < enemy[PATH][LENGTH]) {
			var target = enemy[PATH][enemy.pathIndex];
			enemy.x = modulus(enemy.pixelX + (enemy.size / 2), tileSize);
			enemy.y = modulus(enemy.pixelY + (enemy.size / 2), tileSize);
			enemy.targetX = target.x;
			enemy.targetY = target.y;
			var tile = map[enemy.x][enemy.y];
			var speed = enemy[SPEED] / tile[SPEED];
			var x = centerSymmetrical(enemy.targetX, enemy.size);
			var y = centerSymmetrical(enemy.targetY, enemy.size);
			if (round(enemy.pixelX) < x) {
				if (enemy.pixelX + speed > x) {
					enemy.pixelX = x
				} else {
					enemy.pixelX += speed;
				}
			} else if (round(enemy.pixelY) < y) {
				if (enemy.pixelY + speed > y) {
					enemy.pixelY = y
				} else {
					enemy.pixelY += speed;
				}
			} else if (round(enemy.pixelX) > x) {
				if (enemy.pixelX - speed < x) {
					enemy.pixelX = x
				} else {
					enemy.pixelX -= speed;
				}
			} else if (round(enemy.pixelY) > y) {
				if (enemy.pixelY - speed < y) {
					enemy.pixelY = y
				} else {
					enemy.pixelY -= speed;
				}
			}
			if (round(enemy.pixelX) === centerSymmetrical(enemy.targetX, enemy.size) && round(enemy.pixelY) === centerSymmetrical(enemy.targetY, enemy.size)) {
				enemy.pathIndex++;
			}
		}
		if (base && enemy.x === base.x && enemy.y === base.y) {
			reachBase(enemy);
			destroyEnemy(enemy, index, true);
		}
	});
}

/**
 * Remove an enemy from play. Either it's been destroyed or it reached the base.
 * @param  {Object} enemy Enemy to remove.
 * @param  {Number} index Index to use when splicing it from onScreen.
 */

function destroyEnemy(enemy, index, noMoney) {
	var x = enemy.pixelX;
	var y = enemy.pixelY;
	var modifier = enemy.size / 2;
	makeParticles(floor((enemy.health / enemy.fullHealth) * enemy.size) + 1, 60, [2, 7], [-2, 2, -2, 2], [x, y - modifier, x + modifier, y + modifier], [color(enemy.red, enemy.green, enemy.blue), color(darken(enemy.red), darken(enemy.green), darken(enemy.blue))]);
	if (!noMoney) {
		addMoney((enemy.fullHealth * 10) / (wave));
	}
	onScreen.splice(index, 1);
}

/**
 * Tests paths for enemies.
 * @param  {Array} enemies  Array of enemies to find paths for.
 * @param  {Array} map      Map to test against.
 * @return {Boolean}        Returns path on success, false on failure.
 */

function getPaths(enemies, map) {
	if (base) {
		var list = [];
		var path, enemy, compiledMap;
		forEach(enemies, function(index) {
			enemy = this;
			compiledMap = map || compile();
			path = astar.search(compiledMap, compiledMap[enemy.x][enemy.y], compiledMap[base.x][base.y]);
			list[PUSH]( !! path.length);
		});
		if (list.indexOf(false) > -1) {
			return false;
		}
		return path;
	}
}

function getAllPaths(enemies) {
	forEach(enemies, function(index) {
		var enemy = this;
		var path = getPaths([enemy]);
		enemy.path = path;
		enemy.pathIndex = 0;
		enemy.targetX = path[0].x;
		enemy.targetY = path[0].y;
	});
}

function nextWave() {
	for (var i = 0; i < waves[0].length; i++) {
		waves[1].push(waves[0][i]);
	}
	advanceWave = true;
}