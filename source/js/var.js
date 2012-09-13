function roundNumber(num, dec) {
	var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
	return result;
}
/**
 * Random value between two numbers.
 * @param  {Number} from Minimum number.
 * @param  {Number} to   Maximum number.
 * @return {Number}      Floored random number.
 */

function random(from, to) {
	return Math.floor(Math.random() * (to - from + 1)) + from;
}
var canvas, context;
var animationLoop = null;

var base = null;
var timer = 0;
var canvasWidth = 26;
var canvasHeight = 26;
var tileSize = 32;
var id = 0;
var bought = null;
var mouse = {
	x: 0,
	y: 0
};
var wave = 1;
var waveLength = 0;
var selectedTower = null;
var advanceWave = false;
var oldMouseCoords = "";
var canBuildCache = true;

//stats
var timeLasted = 0;
var towersBuilt = 0;
var towersUpgraded = 0;
var towersSold = 0;
var baseRepaired = 0;
var wavesSkipped = 0;
var moneySpent = 0;


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