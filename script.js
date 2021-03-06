// These are songs that exist on the index.html
var deadMau5 = document.getElementById("strobe");
var tritonal = document.getElementById("findyou");
var guetta = document.getElementById("bad");
var tiesto = document.getElementById("redlight");
// var yourSong = document.getElementById();

var songCount = 0;

function Jukebox(){
	this.tracks = [];
	this.addTracks = function(song){
		this.tracks.push(song);
	};
	this.getSong = function(){
		return this.tracks[songCount].track;
	};
	this.play = function(){
		this.tracks[songCount].track.play();
	};
	this.stop = function(){
		this.tracks[songCount].track.pause();
		this.tracks[songCount].track.currentTime = 0;
	};
	this.pause = function(){
		this.tracks[songCount].track.pause();
	};
	this.nextSong = function(){
		if(songCount == this.tracks.length - 1){
			this.tracks[songCount].track.pause();
			this.tracks[songCount].track.currentTime = 0;
			songCount = 0;
			this.tracks[songCount].track.play();
		} else {
			this.tracks[songCount].track.pause();
			this.tracks[songCount].track.currentTime = 0;
			songCount += 1;
			this.tracks[songCount].track.play();
		}
	};
	this.load = function(request){
		var loadTrack = new Song(request);//value of input here
		edm.addTracks(loadTrack);
	};
	this.random = function(){
		songCount = Math.floor(Math.random() * (edm.tracks.length));
		this.tracks[songCount].track.play();
	};
}

function Song(track){
	this.track = track;
}

// These are song objects that represent a song
// that is already in the html page.
var strobeTrack = new Song(deadMau5);
var findyouTrack = new Song(tritonal);
var redlight = new Song(tiesto);
var bad = new Song(guetta);


// This creates a new jukebox object and you can
// use the play/stop/load method on that certain
// jukebox.
var edm = new Jukebox();
edm.addTracks(findyouTrack);
edm.addTracks(strobeTrack);
edm.addTracks(redlight);
edm.addTracks(bad);

// When I click a button, I want to be able to play a song in the audio
// https://developer.mozilla.org/en-US/docs/Web/Events/click
// This click events allow me to play/pause/

var controls = document.getElementById("buttonWrapper");

controls.addEventListener("click", (e) => {
	switch(e.target.id) {
		case "play":
			edm.play(songCount);
			break;
		case "stop":
			edm.stop(songCount);
			break;
		case "pause":
			edm.pause(songCount);
			break;
		case "next":
			edm.nextSong(songCount);
			break;
	}
})

document.getElementById("loadButton").addEventListener("click",function(){
	var requestSong = document.getElementById("inputSong").value;
	document.getElementById("inputsong").src=requestSong;
	var inputId = document.getElementById("inputsong")
	console.log(inputId);
	var newRequest = new Song(inputId);
	edm.addTracks(newRequest);
});

document.getElementById("random").addEventListener("click",function(){
	edm.random(songCount);
});
