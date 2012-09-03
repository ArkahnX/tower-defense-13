var money = 0;

function addMoney(ammount) {
	money += ammount;
	checkAffordable();
}

function removeMoney(ammount) {
	money -= ammount;
	checkAffordable();
}

function checkAffordable() {
	var children = document[QUERY_SELECTOR_ALL](".container");
	for(var i=0;i<children[LENGTH];i++) {
		children[i][CLASS_LIST].remove("expensive");
		var cost = children[i][QUERY_SELECTOR](".cost").innerText.substring(1);
		if (parseInt(cost, 10) > money) {
			children[i][CLASS_LIST].add("expensive");
		}
	}
	// $("#buildmenu").children().each(function() {
	// 	$(this).removeClass().addClass("container");
	// 	var cost = $(this).find("[COST]").text().substring(1);
	// 	if (parseInt(cost, 10) > parseInt(money, 10)) {
	// 		$(this).addClass("expensive");
	// 	}
	// });
	// $(".money").text(money);
}