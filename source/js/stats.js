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
	stats[PUSH]("Time until Next Wave: " + preStart + timeBeforeNextWave + preEnd)
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
		if (selectedTower.name !== "Base") {
			document[GET_ELEMENT_BY_ID]("sell").removeAttribute("disabled");
			addEvent(document[GET_ELEMENT_BY_ID]("sell"), "click", sellHandler);
			document[GET_ELEMENT_BY_ID]("upgrade").value = "Upgrade Tower ($" + upgradeCost(selectedTower) + ")";
			if (canUpgrade()) {
				document[GET_ELEMENT_BY_ID]("upgrade").removeAttribute("disabled");
				addEvent(document[GET_ELEMENT_BY_ID]("upgrade"), "click", upgradeHandler);
			} else {
				document[GET_ELEMENT_BY_ID]("upgrade").setAttribute("disabled", true);
				removeEvent(document[GET_ELEMENT_BY_ID]("upgrade"), "click", upgradeHandler);
			}
		}
	} else {
		document[GET_ELEMENT_BY_ID]("tower")[INNER_HTML] = "";
		document[GET_ELEMENT_BY_ID]("upgrade").setAttribute("disabled", true);
		document[GET_ELEMENT_BY_ID]("sell").setAttribute("disabled", true);
		removeEvent(document[GET_ELEMENT_BY_ID]("sell"), "click", sellHandler);
		removeEvent(document[GET_ELEMENT_BY_ID]("upgrade"), "click", upgradeHandler);
	}
}