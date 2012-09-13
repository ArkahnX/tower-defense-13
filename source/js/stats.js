function setScore() {
	var baseHealth = getBase().health || 0;
	var start = "<li>";
	var end = "</li>";
	var preStart = "<code>";
	var preEnd = "</code>"
	var stats = [];
	stats[PUSH]("Base Health: " + preStart + baseHealth + preEnd)
	stats[PUSH]("Wave: " + preStart + wave + preEnd)
	stats[PUSH]("Enemies: " + preStart + waveLength + preEnd)
	stats[PUSH]("Enemies Remaining: " + preStart + (waves[0].length + onScreen.length) + preEnd)
	stats[PUSH]("money: " + preStart + money + preEnd);
	document[GET_ELEMENT_BY_ID]("data")[INNER_HTML] = "<ul>" + start + stats.join(end + start) + end + "</ul>";
	var stats = [];
	stats[PUSH]("Mouse Position: " + preStart + mouse.x + ", " + mouse.y + preEnd)
	stats[PUSH]("Tile: " + preStart + thisTile(map).name + preEnd)
	stats[PUSH]("Can Build: " + preStart + canBuild() + preEnd)
	document[GET_ELEMENT_BY_ID]("selection")[INNER_HTML] = "<ul>" + start + stats.join(end + start) + end + "</ul>";
	if (selectedTower !== null) {
		var stats = [];
		stats.push("Name" + ": " + preStart + selectedTower.name + preEnd);
		stats.push("Level" + ": " + preStart + selectedTower.level + preEnd);
		stats.push("Health" + ": " + preStart + (selectedTower.health / selectedTower.fullHealth * 100) + "%" + preEnd);
		stats.push("Weapon Stats:");
		stats.push("Name" + ": " + preStart + selectedTower.weapon.name + preEnd);
		stats.push("Range" + ": " + preStart + selectedTower.weapon.range + preEnd);
		stats.push("Bullets Per Shot" + ": " + preStart + selectedTower.weapon.amount + preEnd);
		stats.push("Delay" + ": " + preStart + selectedTower.weapon.delay + preEnd);
		stats.push("Damage" + ": " + preStart + selectedTower.weapon.damage + preEnd);

		document[GET_ELEMENT_BY_ID]("tower")[INNER_HTML] = "<ul>" + start + stats.join(end + start) + end + "</ul>";
		disableAll();
		if (selectedTower.name !== "Base") {
			document[GET_ELEMENT_BY_ID]("sell").removeAttribute("disabled");
			addEvent(document[GET_ELEMENT_BY_ID]("sell"), "click", sellHandler);
			document[GET_ELEMENT_BY_ID]("upgrade").value = "Upgrade Tower ($" + upgradeCost(selectedTower) + ")";
			if (canUpgrade()) {
				document[GET_ELEMENT_BY_ID]("upgrade").removeAttribute("disabled");
				addEvent(document[GET_ELEMENT_BY_ID]("upgrade"), "click", upgradeHandler);
			}
		}
		if (selectedTower.health < selectedTower.fullHealth) {
			document[GET_ELEMENT_BY_ID]("repair").value = "Repair Tower ($" + repairCost(selectedTower) + ")";
			document[GET_ELEMENT_BY_ID]("repair").removeAttribute("disabled");
			addEvent(document[GET_ELEMENT_BY_ID]("repair"), "click", repairHandler);
		}

	} else {
		disableAll();
	}
	if (obstacles[mouse.x][mouse.y] === 0) {
		if (thisTile(map).type !== "wall" && money >= 250) {
			document[GET_ELEMENT_BY_ID]("wallTile").removeAttribute("disabled");
			addEvent(document[GET_ELEMENT_BY_ID]("wallTile"), "click", wallTile);
		}
		if (thisTile(map).type !== "normal" && money >= 100) {
			document[GET_ELEMENT_BY_ID]("normalTile").removeAttribute("disabled");
			addEvent(document[GET_ELEMENT_BY_ID]("normalTile"), "click", normalTile);
		}
		if (thisTile(map).type !== "slow" && money >= 100) {
			document[GET_ELEMENT_BY_ID]("slowTile").removeAttribute("disabled");
			addEvent(document[GET_ELEMENT_BY_ID]("slowTile"), "click", slowTile);
		}
		if (thisTile(map).type !== "fast" && money >= 100) {
			document[GET_ELEMENT_BY_ID]("fastTile").removeAttribute("disabled");
			addEvent(document[GET_ELEMENT_BY_ID]("fastTile"), "click", fastTile);
		}
	}
}

function disableAll() {
	document[GET_ELEMENT_BY_ID]("upgrade").value = "Upgrade Tower";
	document[GET_ELEMENT_BY_ID]("repair").value = "Repair Tower";
	document[GET_ELEMENT_BY_ID]("upgrade").setAttribute("disabled", true);
	document[GET_ELEMENT_BY_ID]("sell").setAttribute("disabled", true);
	document[GET_ELEMENT_BY_ID]("repair").setAttribute("disabled", true);
	removeEvent(document[GET_ELEMENT_BY_ID]("sell"), "click", sellHandler);
	removeEvent(document[GET_ELEMENT_BY_ID]("upgrade"), "click", upgradeHandler);
	removeEvent(document[GET_ELEMENT_BY_ID]("repair"), "click", repairHandler);

	document[GET_ELEMENT_BY_ID]("normalTile").setAttribute("disabled", true);
	document[GET_ELEMENT_BY_ID]("slowTile").setAttribute("disabled", true);
	document[GET_ELEMENT_BY_ID]("fastTile").setAttribute("disabled", true);
	document[GET_ELEMENT_BY_ID]("wallTile").setAttribute("disabled", true);
	removeEvent(document[GET_ELEMENT_BY_ID]("normalTile"), "click", normalTile);
	removeEvent(document[GET_ELEMENT_BY_ID]("slowTile"), "click", slowTile);
	removeEvent(document[GET_ELEMENT_BY_ID]("fastTile"), "click", fastTile);
	removeEvent(document[GET_ELEMENT_BY_ID]("wallTile"), "click", wallTile);
}