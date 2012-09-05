function createParticle(x, y, speed, red, green, blue) {
	return {
		x: center(x, 1),
		y: center(y, 1),
		w: random(2, 7),
		h: random(2, 7),
		dx: randomFloat(-2, 2),
		dy: randomFloat(-2, 2),
		life: (tileSize / 60) * speed,
		lifespan: (tileSize / 60) * speed,
		red: red,
		green: green,
		blue: blue
	}
}


function explode() {
	for (var i = 0; i < particles.length; i++) {
		var thisParticle = particles[i];
		context.beginPath();
		context.fillStyle = "rgba("+thisParticle.red+","+thisParticle.green+","+thisParticle.blue+"," + (thisParticle.life / thisParticle.lifespan) + ")";
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

function makeParticles(x, y, speed, red, green, blue) {
	for (var i = 0; i < 20; i++) {
		particles.push(createParticle(x, y, speed, red, green, blue));
	}
}