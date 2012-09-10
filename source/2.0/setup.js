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
		context.drawImage(tile.image, centerSymmetrical(tile.x, tileSize), centerSymmetrical(tile.y, tileSize));
		if (tower !== 0) {
			context.drawImage(tower.image, centerSymmetrical(tower.x, tower.width), centerTower(tower.y, tower.height));
			aim(tower);
		}
	});
	/**
	 * Set up functions that run once per frame. Refer to map.js/mapLoop.
	 */
	perFrameFunction.push(function() {
		setScore();
		cursorColor();
		drawCursor();
		drawEnemies();
		drawBullets();
		moveEnemies();
		explode();
		timer++;
		timeBeforeNextWave--;
		if (waves[0].length && timer === 60 * 2) {
			timer = 0;
			spawnEnemy();
		} else if (timer === 600) {
			wave++;
			waves.splice(0, 1);
			waveLength = waves[0].length;
			timeBeforeNextWave = ((waveLength * (60 * 2)) + 600);
			timer = 0;
		}
	});

	/**
	 * Initialize turrets, enemies, waves, and tiles.
	 */
	towers[PUSH](defineTower("Base", "none", "special", 0, 10000, 1000, 15, 25, 255, 0, 0, 1));
	towers[PUSH](defineTower("Turret", "cannon", "basic", 5, 100, 10, 10, 20, 200, 0, 0, 1));
	towers[PUSH](defineTower("Shotgun", "spread", "basic", 2, 200, 10, 10, 15, 125, 0, 0, 1));
	tiles.push(makeTile("grass", PATH, 7, 1, pixelData([
		[32 * 32, 175, 230, 1.3, 1, 2],
		[50, 200, 245, 1, 1.3, 1.5],
		[100, 125, 175, 2, 1, 2]
	])));
	tiles.push(makeTile("darkGrass", PATH, 7, 1, pixelData([
		[32 * 32, 150, 205, 1.3, 1, 2],
		[50, 175, 220, 1, 1.3, 1.5],
		[100, 100, 150, 2, 1, 2]
	])));
	tiles.push(makeTile("road", "fast", 4, 0.5, pixelData([
		[32 * 32, 0, 0, 1, 1, 1],
		[600, 0, 50, 1, 1, 1]
	])));
	tiles.push(makeTile("water", "slow", 3, 1.5, pixelData([
		[32 * 32, 100, 200, 1.5, 1.5, 1],
		[600, 100, 200, 1.5, 1.5, 1]
	])));
	defineEnemies(5);
	makeWaves(30);
	waveLength = waves[0].length;
	timeBeforeNextWave = ((waveLength * (60 * 2)) + 600);
}

WINDOW.addEventListener("DOMContentLoaded", function() {
	setup();
	fillBuildMenu();
	makeMap(canvasWidth, canvasHeight);
	addMoney(500);
	addEvent(canvas, "mousemove", moveHandler);
	addEvent(canvas, "mousedown", clickHandler);
	addEvent(canvas, "contextmenu", doNothing);
	animate();
	hideLoading();
	// spriteTest();
});