function hideAllContentDivs(){
	var contentDivs = document.getElementsByClassName('content');

	for (var i = 0; i < contentDivs.length; ++i) {
		var div = contentDivs[i];
		div.style.display='none';
	}
};

let	people = [
	{"name":"Player 1", "score":0, "alive":true},
	{"name":"Player 2", "score":0, "alive":true},
	{"name":"Player 3", "score":0, "alive":true},
	{"name":"Player 4", "score":0, "alive":true},
	{"name":"Player 5", "score":0, "alive":true},
	{"name":"Player 6", "score":0, "alive":true},
	{"name":"Player 7", "score":0, "alive":true},
	{"name":"Player 8", "score":0, "alive":true}
]

document.getElementById('currentMatchDisplay').textContent = people[0].name + ' and ' + people[1].name + ' are currently playing against each other';
document.getElementById('currentLeaderDisplay').textContent = people[0].name + ', with ' + people[0].score + ' points, leads the tournament';
