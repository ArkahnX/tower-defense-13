var audioBuffer = null;
var audio = new webkitAudioContext();

function playSound(buffer) {
	var source = audio.createBufferSource(); // creates a sound source
	source.buffer = buffer; // tell the source which sound to play
	source.connect(audio.destination); // connect the source to the audio's destination (the speakers)
	source.noteOn(0); // play the source now
}

function loadAudio(url) {
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType = 'arraybuffer';

	// Decode asynchronously
	request.onload = function() {
		audio.decodeAudioData(request.response, function(buffer) {
			audioBuffer = buffer;
		});
	}
	request.send();
}

loadAudio("shotgun.mp3");