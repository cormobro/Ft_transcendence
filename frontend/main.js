var myPlayer = new Player(19, "John");
var myPlayerController = new PlayerController(myPlayer);

// Solo games
myPlayer.addSoloGame(new Game(101, "solo", true, "AI", 15, 7));
myPlayer.addSoloGame(new Game(102, "solo", false, "AI", 10, 12));
myPlayer.addSoloGame(new Game(103, "solo", true, "AI", 20, 18));
myPlayer.addSoloGame(new Game(104, "solo", true, "AI", 9, 6));

// Duo games
myPlayer.addDuoGame(new Game(201, "duo", false, "Player 2", 12, 14));
myPlayer.addDuoGame(new Game(202, "duo", true, "Player 2", 21, 19));
myPlayer.addDuoGame(new Game(203, "duo", false, "Player 2", 18, 20));

// Tournament games
myPlayer.addTournament(new Tournament(301, true, 5, 3, 25, 20));
myPlayer.addTournament(new Tournament(302, false, 4, 4, 22, 22));

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
