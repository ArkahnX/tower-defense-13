var canvasWidth = 20;
var canvasHeight = 20;
var tileSize = 32;
var HALF_TILE_SIZE = tileSize/2;
var canvas, context;
var id = 0;
var mouse = {
	x: 0,
	y: 0
};
var strokeColor = "black";
var money = 0;
var bought = NULL;

//arrays of data.
var map = [];
var obstacles = [];
var tiles = [];
var enemies = [];
var towers = [];
var particles = [];