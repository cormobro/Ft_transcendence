// let matchesInstances = [];
// let tournamentsInstances = [];
// let playersInstances = [];

// let player3 = new Player(0, "John");
// let player4 = new Player(1, "Jane");

// playersInstances.push(player3);
// playersInstances.push(player4);

// let game1 = new Match(0, 2, "16 septembre 2025", 50, player3, player4, true, 10, 5);
// let game2 = new Match(1, 2, "16 septembre 2025", 58, player3, player4, false, 7, 10);
// let game3 = new Match(2, 2, "16 septembre 2025", 36, player3, player4, true, 10, 8);

// matchesInstances.push(game1);
// matchesInstances.push(game2);
// matchesInstances.push(game3);

// let tournament1 = new Tournament(0, player3, 0, 2);

// tournamentsInstances.push(tournament1);

//variables globales pour controler les vues de chaque joueur
let playersControllersInstances = [];
let currPlayerController;

//lorsqu'un match pong se termine
let myMatchController = new MatchController(game1, player3, player4);
myMatchController.updateMatchStatsView();

// event listener sur le bouton stats dans le menu
document.getElementById("globalStatsMenuButton").addEventListener('click', function(){

	let container = document.getElementById("playerStatsButton");

	for (let player of playersInstances){
		container.innerHTML += `
			<button class="btn btn-outline-light mt-5 me-3" id="${player.username}">${player.username}</button>
		`
	}
})

// event listener sur chaque bouton permettant de choisir les statistiques de quel joueur afficher
document.getElementById("playerStatsButton").addEventListener("click", function(e) {
	
	for (let player of playersInstances){

		if (e.target && e.target.id === player.username) {
			playersControllersInstances.push(new PlayerController(player));
			currPlayerController = playersControllersInstances[playersControllersInstances.length - 1];
			currPlayerController.updateGlobalStatsView();
		}
	}
})

// event listener du bouton permettant d'afficher les statistiques de l'utilisateur avec une portée globale
document.getElementById("globalStatsButton").addEventListener('click', function(){

	currPlayerController.updateGlobalStatsView();
})

// event listener du bouton permettant d'afficher les statistiques de l'utilisateur avec une portée en mode solo
document.getElementById("soloModeStatsButton").addEventListener('click', function(){

	currPlayerController.updateSoloModeStatsView();
})

// event listener du bouton permettant d'afficher les statistiques de l'utilisateur avec une portée en mode duo
document.getElementById("duoModeStatsButton").addEventListener('click', function(){

	currPlayerController.updateDuoModeStatsView();
})

// event listener du bouton permettant d'afficher les statistiques de l'utilisateur avec une portée en mode tournoi
document.getElementById("tournamentModeStatsButton").addEventListener('click', function(){

	currPlayerController.updateTournamentModeStatsView();
})

// event listener du bouton permettant d'afficher les statistiques de l'utilisateur avec une portée graphique "pie chart"
document.getElementById("pieChartButton").addEventListener('click', function(){

	currPlayerController.updateChartStatsView(0);
})

// event listener du bouton permettant d'afficher les statistiques de l'utilisateur avec une portée graphique "bar chart"
document.getElementById("barChartButton").addEventListener('click', function(){

	currPlayerController.updateChartStatsView(1);
})

// event listener du bouton permettant d'afficher les statistiques de l'utilisateur avec une portée graphique "plot chart"
document.getElementById("plotChartButton").addEventListener('click', function(){

	currPlayerController.updateChartStatsView(2);
})

// event listener du bouton permettant d'afficher les statistiques de l'utilisateur avec une portée historique
document.getElementById("historicalStatsButton").addEventListener('click', function(){

	const playerMatches = [];

	for (let match of matchesInstances){
		if (match.hasAttended(player3) === true)
			playerMatches.push(match);
	}

	for (let match of playerMatches){
		currPlayerController.updateHistoricalStatsView(playerMatches[0]);
	}
})

// event listener sur chaque bouton permettant de choisir l'affichage des parties d'un joueur
document.getElementById("playerStats").addEventListener("click", function(e) {

	const playerMatches = [];

	for (let match of matchesInstances){
		if (match.hasAttended(player3) === true)
			playerMatches.push(match);
	}

	let i = 0;

	for (let match of playerMatches){
		if (e.target && e.target.id === "match" + i) {
			currPlayerController.updateHistoricalStatsView(match);
		}
		i++;
	}
});
