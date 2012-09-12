function drawBullets() {
	for (var i = 0; i < bullets.length; i++) {
		var thisBullet = bullets[i];
		if (thisBullet.x + (thisBullet.radius) > canvas.width || thisBullet.y + (thisBullet.radius) > canvas.height || thisBullet.x < 0 || thisBullet.y < 0) {
			bullets.splice(i, 1);
		} else {
			var enemy = checkCollision(thisBullet);
			if (enemy) {
				bullets.splice(i, 1);
				damage(enemy, thisBullet.damage);
				var x = enemy.pixelX;
				var y = enemy.pixelY;
				var modifier = enemy.size / 2;
				makeParticles(floor((thisBullet.damage/enemy.maxHealth)*enemy.size), 60, [2, 7], [-2, 2, -2, 2], [x, y - modifier, x + modifier, y + modifier], [color(enemy.red, enemy.green, enemy.blue), color(darken(enemy.red), darken(enemy.green), darken(enemy.blue))]);
			} else {
				context.beginPath();
				context.fillStyle = "rgba(" + thisBullet.red + "," + thisBullet.green + "," + thisBullet.blue + "," + (thisBullet.life / thisBullet.maxLife) + ")";
				context.arc(thisBullet.x, thisBullet.y, thisBullet.radius, 0, 2 * Math.PI, false);
				context.fill();
				context.closePath();
				if (thisBullet.life > 0 || thisBullet.life < 0) {
					if (thisBullet.targetX > 0 && thisBullet.targetY > 0) {
						thisBullet.x -= thisBullet.speed * thisBullet.dx;
						thisBullet.y -= thisBullet.speed * thisBullet.dy;
					} else if (thisBullet.targetX < 0 && thisBullet.targetY > 0) {
						thisBullet.x -= thisBullet.speed * thisBullet.dx;
						thisBullet.y -= thisBullet.speed * thisBullet.dy;
					} else {
						thisBullet.x += thisBullet.speed * thisBullet.dx;
						thisBullet.y += thisBullet.speed * thisBullet.dy;
					}
					thisBullet.life--;
				}
				if (thisBullet.life === 0) {
					bullets.splice(i, 1);
				}
			}
		}
	}
}

function aim(tower) {
	if (tower.timer >= tower.delay) {
		forEach(onScreen, function(index) {
			var enemy = this;
			var centerX = centerSymmetrical(tower.x, 1);
			var centerY = centerSymmetrical(tower.y, 1+tower.height);
			var modifier = tower.range * tileSize;
			if (collision(centerX, centerY, modifier, enemy.pixelX, enemy.pixelY, enemy.size / 2) && tower.timer >= tower.delay) {
				var x = centerX - enemy.pixelX;
				var y = centerY - enemy.pixelY;
				var angle = Math.atan(x / y);
				var dx = (tower.speed / 60) * Math.sin(angle);
				var dy = (tower.speed / 60) * Math.cos(angle);
				var red = random(200, 255);
				var green = random(0, 100);
				var blue = random(0, 100);
				makeBullet(tower.weapon, x, y, 50, 3, tower.speed, centerX, centerY, dx, dy, red, blue, green, 1, 1);
				tower.timer = 0;
			}
		});
	}
	tower.timer++;
}

function collision(c1X, c1Y, c1R, c2X, c2Y, c2R) {
	var dx = c1X - c2X;
	var dy = c1Y - c2Y;
	var dist = c1R + c2R;

	return (dx * dx + dy * dy <= dist * dist)
}

function makeBullet(type, targetX, targetY, life, radius, speed, x, y, dx, dy, red, green, blue, alpha, damage) {
	if (type === "cannon") {
		bullets.push({
			radius: radius,
			x: x,
			y: y,
			dx: dx,
			dy: dy,
			red: red,
			green: green,
			blue: blue,
			alpha: alpha,
			life: life,
			maxLife: life,
			speed: speed,
			targetX: targetX,
			targetY: targetY,
			damage: damage || 1
		});
	} else if (type === "spread") {
		for (var i = 0; i < 5; i++) {
			var red = random(0, 100);
			var green = random(0, 100);
			var blue = random(100, 255);
			makeBullet("cannon", targetX, targetY, 25, 3, speed, x, y, randomFloat(dx - (dx / 2), dx + (dx / 2)), randomFloat(dy - (dy / 2), dy + (dy / 2)), red, green, blue, alpha, 2);
		}
	} else if (type === "beam") {
		for (var i = 0; i < 5; i++) {
			bullets.push({
				radius: radius,
				x: x,
				y: y,
				dx: randomFloat(dx - (dx / 2), dx + (dx / 2)),
				dy: randomFloat(dy - (dy / 2), dy + (dy / 2)),
				red: red,
				green: green,
				blue: blue,
				alpha: alpha,
				life: 1000,
				maxLife: 100,
				speed: 20,
				targetX: targetX,
				targetY: targetY,
				damage: 1
			});
		}
	} else if (type === "explode") {
		for (var i = 0; i < 25; i++) {
			bullets.push({
				radius: radius,
				x: x,
				y: y,

				dx: randomFloat(-2, 2) / 60,
				dy: randomFloat(-2, 2) / 60,
				red: red,
				green: green,
				blue: blue,
				alpha: alpha,
				life: 25,
				maxLife: 25,
				speed: 120,
				targetX: targetX,
				targetY: targetY,
				damage: 5
			});
		}
	}
}

function checkCollision(bullet) {
	for (var i = 0; i < onScreen.length; i++) {
		var thisEnemy = onScreen[i];
		if (collision(thisEnemy.pixelX, thisEnemy.pixelY, thisEnemy.size / 2, bullet.x, bullet.y, bullet.radius)) {
			return thisEnemy;
		}
	}
	return false;
}