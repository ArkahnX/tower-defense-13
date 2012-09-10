function drawBullets() {
	for (var i = 0; i < bullets.length; i++) {
		var thisBullet = bullets[i];
		if (thisBullet.x > canvas.width || thisBullet.y > canvas.height || thisBullet.x < canvas.width || thisBullet.y < canvas.height) {
			bullets.splice(i, 1);
		} else {
			var enemy = checkCollision(thisBullet);
			if (enemy) {
				bullets.splice(i, 1);
				damage(enemy, bulletDamage(thisBullet));
			} else {

				context.beginPath();
				context.fillStyle = "rgba(" + thisBullet.red + "," + thisBullet.green + "," + thisBullet.blue + "," + thisBullet.alpha + ")";
				context.arc(thisBullet.x, thisBullet.y, thisBullet.radius, 0, 2 * Math.PI, false);
				context.fill();
				if (thisBullet.life > 0 || thisBullet.life < 0) {
					thisBullet.x += thisBullet.dx;
					thisBullet.y += thisBullet.dy;
					thisBullet.life = thisBullet.life - 1;
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
			var centerY = centerSymmetrical(tower.y, 1);
			var modifier = tower.range * tileSize;
			if (collision(centerX, centerY, modifier, enemy.pixelX, enemy.pixelY, enemy.size / 2)) {
				var dx = centerX - enemy.pixelX;
				var dy = centerY - enemy.pixelY;
				makeBullet(500, 10, centerX, centerY, 1,1, 255, 255, 255, 1);
				console.log(bullets)
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

function makeBullet(life, radius, x, y, dx, dy, red, green, blue, alpha) {
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
		life: life
	})
}

function checkCollision(bullet) {
	for (var i = 0; i < enemies.length; i++) {
		var thisEnemy = enemies[i];
		if (collision(thisEnemy.pixelX,thisEnemy.pixelY,thisEnemy.size/2,bullet.x,bullet.y,bullet.radius)) {
			return thisEnemy;
		}
	}
	return false;
}