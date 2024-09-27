document.getElementById("nextMatchButton").addEventListener('click', function() {

	var container = document.getElementById("collapseContent");

	container.innerHTML = `
		<h3 class ="text-center">${player1} (${leftScore}) - ${player2} (${rightScore})</h3>
	`;
})

document.getElementById("leaderboardButton").addEventListener('click', function() {

	var container = document.getElementById("collapseContent");
	container.innerHTML = null;

	if (!playersInstances){
		container.innerHTML = `<p>Pas de joueurs</p>`;
		return;
	}

	let tempPlayersInstances = [];
	for (let player of playersInstances)
		tempPlayersInstances.push(player);

	let i = 0;
	while (i < tempPlayersInstances.length)
	{
		let j = 0;
		while (j + 1 < tempPlayersInstances.length){
			const player1Stats = tempPlayersInstances[j].getGlobalStats();
			const player2Stats = tempPlayersInstances[j + 1].getGlobalStats();
			if (player1Stats.pointsWon < player2Stats.pointsWon){
				let temp = tempPlayersInstances[j];
				tempPlayersInstances [j] = tempPlayersInstances[j + 1];
				tempPlayersInstances[j + 1] = temp;
			}
			j++;
		}
		i++;
	}

	for (let i = 0; i < tempPlayersInstances.length && i < 10; i++){
		if (i == 0)
			container.innerHTML += `<h3 class ="text-center text-primary">${i + 1} - ${tempPlayersInstances[i].username} (${tempPlayersInstances[i].getGlobalStats().pointsWon})</h3>`;
		else
			container.innerHTML += `<h3 class ="text-center">${i + 1} - ${tempPlayersInstances[i].username} (${tempPlayersInstances[i].getGlobalStats().pointsWon})</h3>`;
	}
})
