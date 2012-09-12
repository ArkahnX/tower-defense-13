function createParticle(startX, startY, endX, endY, speed, dimention1, dimention2, path1, path2, path3, path4, colorArray) {
	var halfspeed = speed / 3;
	var life = (tileSize / 60) * random(speed + halfspeed, speed - halfspeed);
	var colorIndex = random(0, colorArray.length);
	return {
		x: random(startX, endX),
		y: random(startY, endY),
		w: random(dimention1, dimention2),
		h: random(dimention1, dimention2),
		dx: randomFloat(path1, path2),
		dy: randomFloat(path3, path4),
		life: life,
		lifespan: life,
		color:colorArray[colorIndex]
	}
}


function explode() {
	for (var i = 0; i < particles.length; i++) {
		var thisParticle = particles[i];
		context.beginPath();
		context.fillStyle = thisParticle.color;
		context.fillRect(thisParticle.x, thisParticle.y, thisParticle.w, thisParticle.h);
		context.fill();
		context.closePath();
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
		particles.push(createParticle(areaArray[0], areaArray[1], areaArray[2], areaArray[3], speed, dimentions[0], dimentions[1], path[0], path[1], path[2], path[3], colorArray));
	}
}

function staggerParticles(particleData) {
	var index = 0;
	var length = particleData.length;
	if (waitForParticles) {

	}
}