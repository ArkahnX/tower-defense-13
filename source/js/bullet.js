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
				makeParticles(floor((thisBullet.damage / enemy.fullHealth) * enemy.size) + 1, 60, [2, 7], [-2, 2, -2, 2], [x, y - modifier, x + modifier, y + modifier], [color(enemy.red, enemy.green, enemy.blue), color(darken(enemy.red), darken(enemy.green), darken(enemy.blue))]);
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

function distance(object1, object2) {
	var dx = object1.x - object2.x;
	var dy = object1.y - object2.y;
	return dx + dy;
}

function closest(list) {
	if (list[0]) {
		var closest = list[0];
		var closestDistance = distance(base, list[0]);
		for (var i = 1; i < list.length; i++) {
			if (list[i] && distance(base, list[i]) < closestDistance) {
				closest = list[i];
				closestDistance = distance(base, list[i]);
			}
		}
		return closest;
	}
	return false;
}

function aim(tower) {
	if (tower.weapon.timer >= tower.weapon.delay) {
		var listOfTargets = [];
		var centerX = centerSymmetrical(tower.x, 1);
		var centerY = centerSymmetrical(tower.y, 1, tower.size) - tower.height;
		var modifier = tower.weapon.range * tileSize;
		forEach(onScreen, function(index) {
			var enemy = this;
			if (collision(centerX, centerY, modifier, enemy.pixelX, enemy.pixelY, enemy.size / 2)) {
				listOfTargets.push(enemy);
			}
		});
		if (tower.weapon.timer >= tower.weapon.delay) {
			var enemy = closest(listOfTargets);
			if (enemy) {
				tower.weapon.timer = 0;
				var targetX = centerX - enemy.pixelX;
				var targetY = centerY - enemy.pixelY;
				var angle = Math.atan(targetX / targetY);
				var dx = (tower.weapon.speed / 60) * Math.sin(angle);
				var dy = (tower.weapon.speed / 60) * Math.cos(angle);
				fireWeapon(tower, centerX, centerY, dx, dy, targetX, targetY);
			}
		}
	}
	tower.weapon.timer++;
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
		// for (var i = 0; i < 5; i++) {
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
		// }
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
				life: 35,
				maxLife: 35,
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