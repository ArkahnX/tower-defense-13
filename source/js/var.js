var canvas, context;
var animationLoop = null;

var base = null;
var timer = 0;
var canvasWidth = 20;
var canvasHeight = 20;
var tileSize = 32;
var id = 0;
var bought = null;
var mouse = {
	x: 0,
	y: 0
};
var wave = 1;
var waveLength = 0;
var timeBeforeNextWave = 0;
var selectedTower = null;
var advanceWave = false;
var oldMouseCoords = "";
var canBuildCache = true;
var timeLasted = 0;

var tileFunction = [];
var afterTileFunction = [];
var perFrameFunction = [];
var map = [];
var obstacles = [];
var towers = [];
var waves = [];
var tiles = [];
var towers = [];
var enemies = [];
var onScreen = [];
var particles = [];
var bullets = [];
var weapons = {};