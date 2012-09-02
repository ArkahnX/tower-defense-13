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
	var children = document.querySelectorAll(".container");
	for(var i=0;i<children.length;i++) {
		children[i].classList.remove("expensive");
		var cost = children[i].querySelector(".cost").innerText.substring(1);
		if (parseInt(cost, 10) > money) {
			children[i].classList.add("expensive");
		}
	}
	// $("#buildmenu").children().each(function() {
	// 	$(this).removeClass().addClass("container");
	// 	var cost = $(this).find(".cost").text().substring(1);
	// 	if (parseInt(cost, 10) > parseInt(money, 10)) {
	// 		$(this).addClass("expensive");
	// 	}
	// });
	// $(".money").text(money);
}