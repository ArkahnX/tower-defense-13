function createParticle(startX, startY, endX, endY, speed, dimention1, dimention2, path1, path2, path3, path4, red, green, blue, alpha) {
	var halfspeed = speed / 3;
	var life = (tileSize / 60) * random(speed + halfspeed, speed - halfspeed);
	return {
		x: random(startX, endX),
		y: random(startY, endY),
		w: random(dimention1, dimention2),
		h: random(dimention1, dimention2),
		dx: randomFloat(path1, path2),
		dy: randomFloat(path3, path4),
		life: life,
		lifespan: life,
		red: red,
		green: green,
		blue: blue,
		alpha:alpha
	}
}


function explode() {
	for (var i = 0; i < particles.length; i++) {
		var thisParticle = particles[i];
		context.beginPath();
		context.fillStyle = "rgba(" + thisParticle.red + "," + thisParticle.green + "," + thisParticle.blue + "," + 1 + ")";
		context.fillRect(thisParticle.x, thisParticle.y, thisParticle.w, thisParticle.h);
		context.fill();
		thisParticle.life = thisParticle.life - 1;
		if (thisParticle.life > 0) {
			thisParticle.x = thisParticle.x + thisParticle.dx;
			thisParticle.y = thisParticle.y + thisParticle.dy;
		} else {
			particles.splice(i, 1);
		}
	}
}

function makeParticles(particleCount, speed, dimentions, path, areaArray, colorArray) {
	for (var i = 0; i < particleCount; i++) {
		particles.push(createParticle(areaArray[0], areaArray[1], areaArray[2], areaArray[3], speed, dimentions[0], dimentions[1], path[0], path[1], path[2], path[3], colorArray[0], colorArray[1], colorArray[2]));
	}
}

function staggerParticles(particleData) {
	var index = 0;
	var length = particleData.length;
	if (waitForParticles) {

	}
}