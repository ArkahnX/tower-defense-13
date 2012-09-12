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
	tileFunction.push(function(tile, tower) {
		context.drawImage(tile.image, centerSymmetrical(tile.x, tileSize), centerSymmetrical(tile.y, tileSize));
	});
	afterTileFunction.push(function(tile, tower) {
		if (tower !== 0) {
			context.drawImage(tower.image, centerSymmetrical(tower.x, tower.width), centerTower(tower.y, tower.height));
			aim(tower);
		}
	})
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
		if (waves[0].length && timer === (60 * 2)) {
			timer = 0;
			for (var i = 0; i < round(wave / 2); i++) {
				spawnEnemy();
			}
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
	towers[PUSH](defineTower("Base", "none", "special", 0, 10000, 1000, 0, 0, [
		[10, 15],
		[20, 30],
		[10, 15]
	], [rgb(225, 0, 0), rgb(darken(225), 0, 0)]));
	towers[PUSH](defineTower("Cannon", "cannon", "basic", 7, 50, 10, 10, 15, [
		[10, 15],
		[10, 15],
		[5, 10]
	], [rgb(200, 0, 0), rgb(darken(200), 0, 0)]));
	towers[PUSH](defineTower("Shotgun", "spread", "basic", 5, 250, 10, 50, 20, [
		[15, 20],
		[15, 20],
		[10, 15]
	], [rgb(125, 0, 0), rgb(darken(125), darken(125), 0)]));
	towers[PUSH](defineTower("Explode", "explode", "basic", 5.5, 500, 10, 50, 20, [
		[25, 30],
		[25, 30],
		[20, 25]
	], [rgb(125, 0, 0), rgb(0, darken(125), darken(125))]));
	towers[PUSH](defineTower("Gatling", "beam", "basic", 5, 1000, 10, 0, 20, [
		[20, 25],
		[20, 25],
		[15, 20]
	], [rgb(125, 0, 0), rgb(0, 0, 125)]));

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
	defineEnemies(10);
	makeWaves(13);
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