document.getElementById("globalStats").addEventListener('click', function(){

	var myPlayer = new Player(19, "John");
	var myGame = new Game(0, "solo", true, "AI", 10, 2);
	var myPlayerController = new PlayerController(myPlayer);

	myPlayer.addSoloGame(myGame);
	myPlayerController.updateGlobalStatsView();
})

document.getElementById("soloModeStats").addEventListener('click', function(){

	var myPlayer = new Player(19, "John");
	var myGame = new Game(0, "solo", true, "AI", 10, 2);
	var myPlayerController = new PlayerController(myPlayer);

	myPlayer.addSoloGame(myGame);
	myPlayerController.updateSoloModeStatsView();
})

document.getElementById("duoModeStats").addEventListener('click', function(){

	var myPlayer = new Player(19, "John");
	var myGame = new Game(0, "solo", true, "AI", 10, 2);
	var myPlayerController = new PlayerController(myPlayer);

	myPlayer.addSoloGame(myGame);
	myPlayerController.updateDuoModeStatsView();
})

document.getElementById("tournamentModeStats").addEventListener('click', function(){

	var myPlayer = new Player(19, "John");
	var myGame = new Game(0, "solo", true, "AI", 10, 2);
	var myPlayerController = new PlayerController(myPlayer);

	myPlayer.addSoloGame(myGame);
	myPlayerController.updateTournamentModeStatsView();
})

document.getElementById("chartStats").addEventListener('click', function(){

	var myPlayer = new Player(19, "John");
	var myGame1 = new Game(0, "solo", true, "AI", 10, 2);
	var myGame2 = new Game(1, "duo", true, "Alice", 10, 6);
	var myGame3 = new Game(2, "solo", false, "AI", 0, 10);
	var myGame4 = new Game(3, "solo", true, "AI", 10, 6);
	var myPlayerController = new PlayerController(myPlayer);

	myPlayer.addSoloGame(myGame1);
	myPlayer.addSoloGame(myGame2);
	myPlayer.addSoloGame(myGame3);
	myPlayer.addSoloGame(myGame4);
	myPlayerController.updateChartStatsView();
})
