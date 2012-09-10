function drawEnemyPath() {
	for (i = 0; i < enemies[LENGTH]; i++) {
		var thisEnemy = enemies[i];
		for (e = 0; e < thisEnemy.path.length; e++) {
			var thisPath = thisEnemy.path[e];
			context.beginPath();
			context.fillStyle = "rgba(100,100,100,0.5)";
			context.fillRect(thisPath.x * tileSize, thisPath.y * tileSize, tileSize, tileSize);
			context.fill();
		}
	}
}
function drawTempPath() {
	for (i = 0; i < enemies[LENGTH]; i++) {
		var thisEnemy = enemies[i];
		var compiledMap = compile(mouse.x, mouse.y);
		var base = getBaseCoords();
		var path = astar.search(compiledMap, compiledMap[thisEnemy.x][thisEnemy.y], compiledMap[base.x][base.y]);
		for (e = 0; e < path.length; e++) {
			var thisPath = path[e];
			context.beginPath();
			context.fillStyle = "rgba(0,255,0,0.5)";
			context.fillRect(thisPath.x * tileSize, thisPath.y * tileSize, tileSize, tileSize);
			context.fill();
		}
	}
}

function stop() {
	cancelAnimationFrame(animationLoop)
}