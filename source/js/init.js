(function() {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for (var x = 0; x < vendors[LENGTH] && !WINDOW.requestAnimationFrame; ++x) {
		WINDOW.requestAnimationFrame = WINDOW[vendors[x] + 'RequestAnimationFrame'];
		WINDOW.cancelAnimationFrame = WINDOW[vendors[x] + 'CancelAnimationFrame'] || WINDOW[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	if (!WINDOW.requestAnimationFrame) WINDOW.requestAnimationFrame = function(callback, element) {
		var currTime = new Date().getTime();
		var timeToCall = WINDOW[MATH].max(0, 16 - (currTime - lastTime));
		var id = WINDOW.setTimeout(function() {
			callback(currTime + timeToCall);
		}, timeToCall);
		lastTime = currTime + timeToCall;
		return id;
	};

	if (!WINDOW.cancelAnimationFrame) WINDOW.cancelAnimationFrame = function(id) {
		clearTimeout(id);
	};
}());

function clone(object) {
	var newObj = (object instanceof Array) ? [] : {};
	for (i in object) {
		if (i === 'clone') {
			continue;
		}
		if (object[i] && typeof object[i] === "object" && !Array.isArray(object[i]) && !object[i].nodeType) {
			newObj[i] = clone(object[i]);
		} else {
			newObj[i] = object[i];
		}
	}
	return newObj;
};


function getAll(array, property, value, cloneResult) {
	var list = [];
	for (var attr in array) {
		if (array[attr][property] === value) {
			cloneResult ? list[PUSH](clone(array[attr])) : list[PUSH](array[attr]);
		}
	}
	return list.length ? list : false;
}


function random(from, to) {
	return floor(WINDOW[MATH].random() * (to - from + 1)) + from;
}

function init() {
	canvas = document[GET_ELEMENT_BY_ID]("canvas");
	canvas[WIDTH] = canvasWidth * tileSize;
	canvas[HEIGHT] = canvasHeight * tileSize;
	context = canvas.getContext("2d");
	addEvent(canvas, "mousemove", moveHandler);
	addEvent(canvas, "mousedown", clickHandler);
	addEvent(canvas, "contextmenu", doNothing);
}

function getWeightedRandom() {
	var sum_of_weight = 0;
	for (var i = 0; i < tiles[LENGTH]; i++) {
		sum_of_weight += tiles[i].priority;
	}
	var num = random(0, sum_of_weight - 1);
	for (var i = 0; i < tiles[LENGTH]; i++) {
		if (num < tiles[i].priority) {
			return i;
		}
		num -= tiles[i].priority;
	}
	// shouldnt arrive here
	return false;
}

function damage(target, ammount) {
	target.health -= ammount;
}

function modulus(num, size) {
	var mod = num % size;
	return (num - mod) / size;
};

WINDOW.addEventListener("DOMContentLoaded", function() {
	init();
	makeSprites();
	makeStructures();
	setConstructibles();
	var data = makeMap(canvasWidth, canvasHeight);
	map = data[0];
	obstacles = data[1];
	addMoney(500);
	makeEnemies();
	animate();
	hideLoading();
	// spriteTest();
});

function destroyUnit(name) {
	for(var i=0;i<enemies.length;i++) {
		if(enemies[i][NAME] === name) {
			enemies.splice(i, 1);
		}
	}
}