function forEach(list, callback) {
	var index;
	if (Array.isArray(list)) {
		for (index = 0; index < list.length; index++) {
			callback.call(list[index], index);
		}
	} else {
		for (index in list) {
			callback.call(list[index], index);
		}
	}
}

function color(red, green, blue, alpha) {
	return "rgba(" + red + "," + green + "," + blue + "," + alpha || 1 + ")";
}

function resetCanvas(width, height) {
	canvas[WIDTH] = width;
	canvas[HEIGHT] = height;
	context.clearRect(0, 0, width, height);
}

function cloneData(data, watchList, functionList, add) {
	var index;
	var object = Object.create(null);
	for (var attr in data) {
		if (watchList && functionList) {
			index = watchList.indexOf(attr);
			if (index > -1) {
				object[attr] = functionList[index](data, attr, add);
			} else {
				object[attr] = data[attr];
			}
		} else {
			object[attr] = data[attr];
		}
	}
	return object
}

function darken(color) {
	if (color - 50 < 0) {
		return color;
	}
	return color - 50;
}

function thisTile(map) {
	return map[mouse.x][mouse.y];
}

function damage(target, ammount) {
	target.health -= ammount;
}

function round(number) {
	return WINDOW[MATH].round(number);
}

function floor(number) {
	return WINDOW[MATH][FLOOR](number);
}

function center(position, size) {
	return round(position * tileSize + (HALF_TILE_SIZE) - (size / 2));
}

function centerTower(position, size) {
	return round(position * tileSize + HALF_TILE_SIZE - size);
}

function centerSymmetrical(position, size) {
	return round(position * tileSize + (HALF_TILE_SIZE) - (size / 2));
}

function random(from, to) {
	return floor(WINDOW[MATH].random() * (to - from + 1)) + from;
}