function setup() {
	perTileFunction.push(function(tile, tower) {
		context.drawImage(tile.image, centerSymmetrical(tile.x, tile.width), centerSymmetrical(tile.y, tile.height));
		if (tower !== 0) {
			context.drawImage(tower.image, centerSymmetrical(tower.x, tower.width), centerSymmetrical(tower.y, tower.height));
		}
	});
	perFrameFunction.push(function() {
		moveEnemies();
	});
}

function createObjects() {
	towers[PUSH](defineTower("Base", "none", "special", 0, 10000, 1000, 15, 25, 255, 0, 0, 1));
	towers[PUSH](defineTower("Turret", "cannon", "basic", 5, 100, 10, 10, 20, 200, 0, 0, 1));
	towers[PUSH](defineTower("Shotgun", "spead", "basic", 2, 200, 10, 10, 15, 125, 0, 0, 1));
	defineEnemies(1);
}