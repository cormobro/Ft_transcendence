let player3 = new Player(1, "John");
let player4 = new Player(2, "Jane");
let myPlayerController = new PlayerController(player3);

let game1 = new Match(1, "tournament", player3, player4, true, 10, 5);
let game2 = new Match(2, "tournament", player3, player4, false, 7, 10);
let game3 = new Match(3, "tournament", player3, player4, true, 10, 8);

let tournament = new Tournament(1, [game1, game2, game3]);

player3.addMatch(game1);
player3.addMatch(game2);
player3.addMatch(game3);
player4.addMatch(game1);
player4.addMatch(game2);
player4.addMatch(game3);

player3.addTournament(tournament);
player4.addTournament(tournament);

player3.addMatch(new Match(4, "solo", player3, null, true, 10, 2));
player3.addMatch(new Match(5, "duo", player3, player4, false, 3, 10));

var container = document.getElementById("matchStats");

container.innerHTML = `
		<h3 class="text-dark">Statistiques de la partie : ${player3.username} vs ${player4.username}</h3>
		<p class="text-dark">Points gagnés par ${player3.username} : ${game1.pointsWonByPlayer1}</p>
		<p class="text-dark">Points gagnés par ${player4.username} : ${game1.pointsWonByPlayer2}</p>
		<p class="text-dark">Points joués : ${game1.pointsWonByPlayer1 + game1.pointsWonByPlayer2}</p>
		<p class="text-dark">Victoire de : ${game1.resultPlayer1 === true ? player3.username : player4.username}</p>
`;

var container = document.getElementById("player1Stats");

container.innerHTML = `
		<h3 class="text-dark">Statistiques de ${player3.username}</h3>
		<p class="text-dark">Points gagnés : ${game1.pointsWonByPlayer1}</p>
		<p class="text-dark">Points perdus : ${game1.pointsWonByPlayer2}</p>
		<p class="text-dark">Précision : ${Math.round(game1.pointsWonByPlayer1/(game1.pointsWonByPlayer1 + game1.pointsWonByPlayer2)*100)}%</p>
`;

var container = document.getElementById("player2Stats");

container.innerHTML = `
		<h3 class="text-dark">Statistiques de ${player4.username}</h3>
		<p class="text-dark">Points gagnés : ${game1.pointsWonByPlayer2}</p>
		<p class="text-dark">Points perdus : ${game1.pointsWonByPlayer1}</p>
		<p class="text-dark">Précision : ${Math.round(game1.pointsWonByPlayer2/(game1.pointsWonByPlayer2 + game1.pointsWonByPlayer1)*100)}%</p>
`;

document.getElementById("globalStatsMenuButton").addEventListener('click', function(){

	myPlayerController.updateGlobalStatsView();
})

document.getElementById("globalStatsButton").addEventListener('click', function(){

	myPlayerController.updateGlobalStatsView();
})

document.getElementById("soloModeStatsButton").addEventListener('click', function(){

	myPlayerController.updateSoloModeStatsView();
})

document.getElementById("duoModeStatsButton").addEventListener('click', function(){

	myPlayerController.updateDuoModeStatsView();
})

document.getElementById("tournamentModeStatsButton").addEventListener('click', function(){

	myPlayerController.updateTournamentModeStatsView();
})

document.getElementById("pieChartButton").addEventListener('click', function(){

	myPlayerController.updateChartStatsView(0);
})

document.getElementById("barChartButton").addEventListener('click', function(){

	myPlayerController.updateChartStatsView(1);
})

document.getElementById("plotChartButton").addEventListener('click', function(){

	myPlayerController.updateChartStatsView(2);
})

document.getElementById("historicalStatsButton").addEventListener('click', function(){

	myPlayerController.updateHistoricalStatsView();
})

document.getElementById("playerStats").addEventListener("click", function(e) {

	for (let i = 0; i < player3.matchHistory.length; i++){
		if (e.target && e.target.id === "match" + player3.matchHistory[i].id) {
			console.log(i);
			myPlayerController.updateHistoricalStatsView(i);
		}
	}
});
