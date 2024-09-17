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

let player5 = new Player(3, "AI");

player3.addMatch(new Match(4, "solo", player3, player5, true, 10, 2));
player3.addMatch(new Match(5, "duo", player3, player4, false, 3, 10));

let myMatchController = new MatchController(game2, player3, player4);
myMatchController.updateMatchStatsView();

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
			myPlayerController.updateHistoricalStatsView(i);
		}
	}
});
