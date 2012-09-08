function setScore() {
	var baseHealth = getBase().health;
	var statsList = ["money", money];
	var start = "<li>";
	var end = "</li>";
	var preStart = "<code>";
	var preEnd = "</code>"
	var stats = [];
	stats[PUSH]("Base Health: " + preStart + JSON.stringify(baseHealth) + preEnd)
	stats[PUSH]("money: " + preStart + money + preEnd);
	document[GET_ELEMENT_BY_ID]("data")[INNER_HTML] = "<ul>" + start + stats.join(end + start) + end + "</ul>";
}