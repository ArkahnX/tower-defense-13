function designWeapon(name, amount, speed, damage, delay, range, life, radius, rgb, directionFunction) {
	weapons[name] = {
		name: name,
		radius: radius,
		amount: amount,
		directionFunction: directionFunction,
		x: null,
		y: null,
		dx: null,
		dy: null,
		level: 1,
		red: rgb.red,
		green: rgb.green,
		blue: rgb.blue,
		alpha: 1,
		life: life,
		maxLife: life,
		speed: speed,
		targetX: null,
		targetY: null,
		range: range,
		delay: delay,
		timer: 0,
		damage: damage || 1
	};
}

function mapUpgrade(tower) {
	if (tower.level !== tower.weapon.level) {
		if (tower.weapon.name === "spread" || tower.weapon.name === "gatling" || tower.weapon.name === "explode") {
			var amountFunction = function(amount) {
				return amount + tower.level;
			}
		} else {
			var amountFunction = function(amount) {
				return amount;
			}
		}
		var speedFunction = function(speed) {
			return speed;
		}
		tower.weapon = upgradeWeapon(tower.weapon, {
			amount: amountFunction,
			range: function(range) {
				return range + (tower.level * 0.5);
			},
			life: function(life) {
				return life + (tower.level * 10);
			},
			maxLife: function(maxLife) {
				return maxLife + (tower.level * 10);
			},
			damage: function(damage) {
				return damage + tower.level;
			},
			delay: function(delay) {
				if (delay - tower.level > -1) {
					return delay - tower.level;
				}
				return 0;
			},
			speed: speedFunction
		});
	}
}

function fireWeapon(tower, x, y, dx, dy, targetX, targetY) {
	for (var i = 0; i < tower.weapon.amount; i++) {
		var bullet = cloneData(tower.weapon);
		bullets.push(upgradeWeapon(bullet, {
			x: x,
			y: y,
			dx: tower.weapon.directionFunction(dx),
			dy: tower.weapon.directionFunction(dy),
			targetX: targetX,
			targetY: targetY
		}));
	}

}

function upgradeWeapon(weapon, stats) {
	for (var attr in stats) {
		if (weapon[attr] !== undefined) {
			if (typeof stats[attr] === "function") {
				weapon[attr] = stats[attr](weapons[weapon.name][attr]);
			} else {
				weapon[attr] = stats[attr];
			}
		}
	}
	return weapon;
}

var weaponFeatures = {

}