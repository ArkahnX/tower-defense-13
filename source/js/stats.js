function setScore() {
	var statsList = ["money"];
	var start = "<li>";
	var end = "</li>";
	var preStart = "<code>";
	var preEnd = "</code>"
	var stats = [];
	for (var i = 0; i < statsList[LENGTH]; i++) {
		if (typeof this[statsList[i]] === "function") {
			stats[PUSH](statsList[i] + ": " + preStart + JSON.stringify(this[statsList[i]]()) + preEnd);
		} else {
			stats[PUSH](statsList[i] + ": " + preStart + JSON.stringify(this[statsList[i]]) + preEnd);
		}
	}
	document[GET_ELEMENT_BY_ID]("data")[INNER_HTML] = "<ul>" + start + stats.join(end + start) + end + "</ul>";
}