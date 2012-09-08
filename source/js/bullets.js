function drawBullets() {
	for (var i = 0; i < bullets.length; i++) {
		var thisBullet = bullets[i];
		if (thisBullet.x > canvas.width && thisBullet.y > canvas.width) {
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

function bulletDamage() {
	return 1;
}

function makeBullet(life, width, height, x, y, dx, dy, red, green, blue, alpha) {
	bullets.push({
		radius: width,
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
		if (collision(thisEnemy.pixelX,thisEnemy.pixelY,thisEnemy.size,bullet.x,bullet.y,bullet.radius)) {
			return thisEnemy;
		}
	}
	return false;
}

function collision(x1, y1, size1, x2, y2, size2) {
	var bottom1, bottom2, left1, left2, right1, right2, top1, top2;
	left1 = x1;
	right1 = x1 + size1;
	top1 = y1;
	bottom1 = y1 + size1;
	left2 = x2;
	right2 = x2 + size2;
	top2 = y2;
	bottom2 = y2 + size2;
	return !(left1 > right2 || left2 > right1 || top1 > bottom2 || top2 > bottom1);
}