function setScore() {
	var baseHealth = getBase().health;
	var start = "<li>";
	var end = "</li>";
	var preStart = "<code>";
	var preEnd = "</code>"
	var stats = [];
	stats[PUSH]("Base Health: " + preStart + baseHealth + preEnd)
	stats[PUSH]("Wave: " + preStart + wave + preEnd)
	stats[PUSH]("Enemies: " + preStart + waveLength + preEnd)
	stats[PUSH]("Enemies Remaining: " + preStart + (waves[0].length+onScreen.length) + preEnd)
	stats[PUSH]("Time until Next Wave: " + preStart + timeBeforeNextWave + preEnd)
	stats[PUSH]("money: " + preStart + money + preEnd);
	document[GET_ELEMENT_BY_ID]("data")[INNER_HTML] = "<ul>" + start + stats.join(end + start) + end + "</ul>";
}