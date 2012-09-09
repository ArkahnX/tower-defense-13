/**
 * Manages initialization.
 */

function setup() {
	/**
	 * Set up canvas and context global variables.
	 */
	canvas = document[GET_ELEMENT_BY_ID]("canvas");
	canvas[WIDTH] = canvasWidth * tileSize;
	canvas[HEIGHT] = canvasHeight * tileSize;
	context = canvas.getContext("2d");
	/**
	 * Set up functions that run once per tile. Refer to map.js/mapLoop.
	 * @param  {Object} tile  Tile data.
	 * @param  {Object} tower Tower data. 0 if there is no tower.
	 */
	perTileFunction.push(function(tile, tower) {
		context.drawImage(tile.image, centerSymmetrical(tile.x, tile.width), centerSymmetrical(tile.y, tile.height));
		if (tower !== 0) {
			context.drawImage(tower.image, centerSymmetrical(tower.x, tower.width), centerSymmetrical(tower.y, tower.height));
		}
	});
	/**
	 * Set up functions that run once per frame. Refer to map.js/mapLoop.
	 */
	perFrameFunction.push(function() {
		moveEnemies();
		timer++;
		if (timer === 60) {
			timer = 0;
			spawnEnemy();
		}
	});

	/**
	 * Initialize turrets, enemies, waves, and tiles.
	 */
	towers[PUSH](defineTower("Base", "none", "special", 0, 10000, 1000, 15, 25, 255, 0, 0, 1));
	towers[PUSH](defineTower("Turret", "cannon", "basic", 5, 100, 10, 10, 20, 200, 0, 0, 1));
	towers[PUSH](defineTower("Shotgun", "spead", "basic", 2, 200, 10, 10, 15, 125, 0, 0, 1));
	defineEnemies(5);
	makeWaves(30);
}