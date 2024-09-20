document.getElementById("matchInfoButton").addEventListener('click', function() {

	var container = document.getElementById("collapseContent");

	container.innerHTML = `
		<h3 class ="text-center">${player1} (${leftScore}) - ${player2} (${rightScore})</h3>
	`;
})

document.getElementById("leaderboardButton").addEventListener('click', function() {

	var container = document.getElementById("collapseContent");

	if (!playersInstances){
		container.innerHTML = `<p>Pas de joueurs</p>`;
		return;
	}

	let bestPlayer;
	let bestPlayers = [];
	let tempPlayersInstances = [];
	bestPlayer = playersInstances[0];

	for (let player of tempPlayersInstances){
		for (let player of tempPlayersInstances){
			const statsBestPlayer = bestPlayer.getGlobalStats();
			const statsPlayer = player.getGlobalStats();
			if (statsBestPlayer.pointsWon < statsPlayer.pointsWon)
				bestPlayer = player;
		}
		tempPlayersInstances.filter(bestPlayer);
		bestPlayers.push(bestPlayer);
	}

	container.innerHTML = `
		<h3 class ="text-center">1 - ${bestPlayer.username}</h3>
	`;
})
