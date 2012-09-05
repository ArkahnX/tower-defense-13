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

/*
 * classList.js: Cross-browser full element.classList implementation.
 * 2011-06-15
 *
 * By Eli Grey, http://eligrey.com
 * Public Domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/

if (typeof document !== "undefined" && !("classList" in document.createElement("a"))) {

	(function(view) {

		"use strict";

		var
		classListProp = "classList",
			protoProp = "prototype",
			elemCtrProto = (view.HTMLElement || view.Element)[protoProp],
			objCtr = Object,
			strTrim = String[protoProp].trim ||
		function() {
			return this.replace(/^\s+|\s+$/g, "");
		}, arrIndexOf = Array[protoProp].indexOf ||
		function(item) {
			var
			i = 0,
				len = this.length;
			for (; i < len; i++) {
				if (i in this && this[i] === item) {
					return i;
				}
			}
			return -1;
		}
		// Vendors: please allow content code to instantiate DOMExceptions
		, DOMEx = function(type, message) {
			this.name = type;
			this.code = DOMException[type];
			this.message = message;
		}, checkTokenAndGetIndex = function(classList, token) {
			if (token === "") {
				throw new DOMEx("SYNTAX_ERR", "An invalid or illegal string was specified");
			}
			if (/\s/.test(token)) {
				throw new DOMEx("INVALID_CHARACTER_ERR", "String contains an invalid character");
			}
			return arrIndexOf.call(classList, token);
		}, ClassList = function(elem) {
			var
			trimmedClasses = strTrim.call(elem.className),
				classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [],
				i = 0,
				len = classes.length;
			for (; i < len; i++) {
				this.push(classes[i]);
			}
			this._updateClassName = function() {
				elem.className = this.toString();
			};
		}, classListProto = ClassList[protoProp] = [], classListGetter = function() {
			return new ClassList(this);
		};
		// Most DOMException implementations don't allow calling DOMException's toString()
		// on non-DOMExceptions. Error's toString() is sufficient here.
		DOMEx[protoProp] = Error[protoProp];
		classListProto.item = function(i) {
			return this[i] || null;
		};
		classListProto.contains = function(token) {
			token += "";
			return checkTokenAndGetIndex(this, token) !== -1;
		};
		classListProto.add = function(token) {
			token += "";
			if (checkTokenAndGetIndex(this, token) === -1) {
				this.push(token);
				this._updateClassName();
			}
		};
		classListProto.remove = function(token) {
			token += "";
			var index = checkTokenAndGetIndex(this, token);
			if (index !== -1) {
				this.splice(index, 1);
				this._updateClassName();
			}
		};
		classListProto.toggle = function(token) {
			token += "";
			if (checkTokenAndGetIndex(this, token) === -1) {
				this.add(token);
			} else {
				this.remove(token);
			}
		};
		classListProto.toString = function() {
			return this.join(" ");
		};

		if (objCtr.defineProperty) {
			var classListPropDesc = {
				get: classListGetter,
				enumerable: true,
				configurable: true
			};
			try {
				objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
			} catch (ex) { // IE 8 doesn't support enumerable:true
				if (ex.number === -0x7FF5EC54) {
					classListPropDesc.enumerable = false;
					objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
				}
			}
		} else if (objCtr[protoProp].__defineGetter__) {
			elemCtrProto.__defineGetter__(classListProp, classListGetter);
		}

	}(self));

}

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
	for (var i = 0; i < enemies.length; i++) {
		if (enemies[i][NAME] === name) {
			enemies.splice(i, 1);
		}
	}
}