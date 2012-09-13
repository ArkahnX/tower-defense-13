var money = 0;

function addMoney(amount) {
	money += round(amount);
	checkAffordable();
}

function removeMoney(amount) {
	money -= round(amount);
	checkAffordable();
}

function checkAffordable() {
	var children = document[QUERY_SELECTOR_ALL](".container");
	for(var i=0;i<children[LENGTH];i++) {
		var item = children[i];
		var tower = towers[i];
		item[CLASS_LIST].remove("expensive");
		item[CLASS_LIST].remove("building");
		if (tower.cost > money) {
			item[CLASS_LIST].add("expensive");
		}
		if(building()) {
			item[CLASS_LIST].add("building");
		}
	}
	upgradeAffordability();
}

function upgradeAffordability() {
	if(canUpgrade()) {
		document.getElementById("upgrade").setAttribute("disabled", true)
	} else {
		document.getElementById("upgrade").removeAttribute("disabled");
	}
}