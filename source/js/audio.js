var shotgunAudio = initializeNewWebAudioContext();
shotgunAudio.loadSound('shotgun.mp3', 'shotgun');

function playAudio(name) {
	shotgunAudio.playSound(name);
}