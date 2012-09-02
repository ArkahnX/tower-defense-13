var canvasWidth = 20;
var canvasHeight = 20;
var tileSize = 32;
var canvas, context;
var tiles = [];
var map;
var obstacles;
var id = 0;
var mouse = {
	x: 0,
	y: 0
};
var enemyData = [];
var towers = [];
var strokeColor = "black";
var GraphNodeType = {
	OPEN: 1,
	WALL: 0
};
var money = 0;
var buildList = {
	"images/drain.png": {
		"type": "trap",
		"name": "drain",
		"src": "images/drain.png",
		"stats": {
			"health": "",
			"cost": "10"
		}
	},
	"images/scorpion.png": {
		"type": "structure",
		"name": "scorpion",
		"src": "images/scorpion.png",
		"stats": {
			"health": "100",
			"cost": "100"
		}
	}
};