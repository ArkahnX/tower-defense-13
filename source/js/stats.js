function setStats() {
	var statsList = ["canBuild", "isBuilding", "building", "mouse", "money"];
	var start = "<li>";
	var end = "</li>";
	var preStart = "<pre>";
	var preEnd = "</pre>"
	var stats = [];
	for (var i = 0; i < statsList.length; i++) {
		if (typeof this[statsList[i]] === "function") {
			stats.push(statsList[i] + ": " + preStart + JSON.stringify(this[statsList[i]]()) + preEnd);
		} else {
			stats.push(statsList[i] + ": " + preStart + JSON.stringify(this[statsList[i]]) + preEnd);
		}
	}
	if (document.getElementById("stats")) {
		document.getElementById("stats").innerHTML = "<ul>" + start + stats.join(end + start) + end + "</ul>";
	}
}
function setScore() {
	var statsList = ["money"];
	var start = "<li>";
	var end = "</li>";
	var preStart = "<code>";
	var preEnd = "</code>"
	var stats = [];
	for (var i = 0; i < statsList.length; i++) {
		if (typeof this[statsList[i]] === "function") {
			stats.push(statsList[i] + ": " + preStart + JSON.stringify(this[statsList[i]]()) + preEnd);
		} else {
			stats.push(statsList[i] + ": " + preStart + JSON.stringify(this[statsList[i]]) + preEnd);
		}
	}
	document.getElementById("data").innerHTML = "<ul>" + start + stats.join(end + start) + end + "</ul>";
}