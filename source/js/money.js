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
		children[i][CLASS_LIST].remove("expensive");
		children[i][CLASS_LIST].remove("building");
		var cost = children[i].querySelector(".cost").innerText.substring(1);
		if (parseInt(cost, 10) > money) {
			children[i][CLASS_LIST].add("expensive");
		}
		if(building()) {
			children[i][CLASS_LIST].add("building");
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