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
let currPlayer;

//lorsqu'un match pong se termine
// let myMatchController = new MatchController(game1, player3, player4);
// myMatchController.updateMatchStatsView();

// event listener sur le bouton stats dans le menu
document.getElementById("statsMenuButton").addEventListener('click', function(){

	let startingListIndex = 0;
	let endingListIndex = 4;
	let container = document.getElementById("playerStatsButton");

	container.innerHTML = null;
	container.innerHTML += `<button class="btn btn-outline-light mt-5 me-3" id="previousPlayerButton">Précédent</button>`;
	for (let i = startingListIndex; i < endingListIndex; i++)
		container.innerHTML += `<button class="btn btn-outline-light mt-5 me-3" id="${playersInstances[i].username}PlayerButton">${playersInstances[i].username}</button>`
	container.innerHTML += `<button class="btn btn-outline-light mt-5 me-3" id="nextPlayerButton">Suivant</button>`;
	updatePlayersList(startingListIndex, endingListIndex);
})

function updatePlayersList(startingListIndex, endingListIndex){
	document.getElementById("playerStatsButton").addEventListener("click", function(e) {

		if (e.target && e.target.id === "previousPlayerButton")
		{
			if (startingListIndex > 0)
			{
				startingListIndex--;
				endingListIndex--;
			}
		}
		if (e.target && e.target.id === "nextPlayerButton")
		{
			if (endingListIndex < playersInstances.length)
			{
				startingListIndex++;
				endingListIndex++;
			}
		}
		let container = document.getElementById("playerStatsButton");
		container.innerHTML = null;
		container.innerHTML += `<button class="btn btn-outline-light mt-5 me-3" id="previousPlayerButton">Précédent</button>`;
		for (let i = startingListIndex; i < endingListIndex; i++)
			container.innerHTML += `<button class="btn btn-outline-light mt-5 me-3" id="${playersInstances[i].username}PlayerButton">${playersInstances[i].username}</button>`
		container.innerHTML += `<button class="btn btn-outline-light mt-5 me-3" id="nextPlayerButton">Suivant</button>`;
	})
}
// event listener sur chaque bouton permettant de choisir les statistiques de quel joueur afficher
document.getElementById("playerStatsButton").addEventListener("click", function(e) {

	for (let player of playersInstances){

		if (e.target && e.target.id === player.username+"PlayerButton") {
			currPlayer = player;
			playersControllersInstances.push(new PlayerController(player));
			currPlayerController = playersControllersInstances[playersControllersInstances.length - 1];
			currPlayerController.updateGlobalStatsView();
		}
	}
})

// event listener du bouton permettant d'afficher les statistiques de l'utilisateur avec une portée globale
document.getElementById("globalStatsButton").addEventListener('click', function(){

	if (!currPlayerController){
		document.getElementById("playerStats").innerHTML = `
			<p class="text-dark">Pas de joueur sélectionné.</p>
		`;
		return;
	}
	currPlayerController.updateGlobalStatsView();
})

// event listener du bouton permettant d'afficher les statistiques de l'utilisateur avec une portée en mode solo
document.getElementById("soloModeStatsButton").addEventListener('click', function(){

	if (!currPlayerController){
		document.getElementById("playerStats").innerHTML = `
			<p class="text-dark">Pas de joueur sélectionné.</p>
		`;
		return;
	}
	currPlayerController.updateSoloModeStatsView();
})

// event listener du bouton permettant d'afficher les statistiques de l'utilisateur avec une portée en mode duo
document.getElementById("duoModeStatsButton").addEventListener('click', function(){

	if (!currPlayerController){
		document.getElementById("playerStats").innerHTML = `
			<p class="text-dark">Pas de joueur sélectionné.</p>
		`;
		return;
	}
	currPlayerController.updateDuoModeStatsView();
})

// event listener du bouton permettant d'afficher les statistiques de l'utilisateur avec une portée en mode tournoi
document.getElementById("tournamentModeStatsButton").addEventListener('click', function(){

	if (!currPlayerController){
		document.getElementById("playerStats").innerHTML = `
			<p class="text-dark">Pas de joueur sélectionné.</p>
		`;
		return;
	}
	currPlayerController.updateTournamentModeStatsView();
})

// event listener du bouton permettant d'afficher les statistiques de l'utilisateur avec une portée graphique "pie chart"
document.getElementById("pieChartButton").addEventListener('click', function(){

	if (!currPlayerController){
		document.getElementById("playerStats").innerHTML = `
			<p class="text-dark">Pas de joueur sélectionné.</p>
		`;
		return;
	}
	currPlayerController.updateChartStatsView(0);
})

// event listener du bouton permettant d'afficher les statistiques de l'utilisateur avec une portée graphique "bar chart"
document.getElementById("barChartButton").addEventListener('click', function(){

	if (!currPlayerController){
		document.getElementById("playerStats").innerHTML = `
			<p class="text-dark">Pas de joueur sélectionné.</p>
		`;
		return;
	}
	currPlayerController.updateChartStatsView(1);
})

// event listener du bouton permettant d'afficher les statistiques de l'utilisateur avec une portée graphique "plot chart"
document.getElementById("plotChartButton").addEventListener('click', function(){

	if (!currPlayerController){
		document.getElementById("playerStats").innerHTML = `
			<p class="text-dark">Pas de joueur sélectionné.</p>
		`;
		return;
	}
	currPlayerController.updateChartStatsView(2);
})

// event listener du bouton permettant d'afficher les statistiques de l'utilisateur avec une portée historique
document.getElementById("historicalStatsButton").addEventListener('click', function(){

	if (!currPlayerController){
		document.getElementById("playerStats").innerHTML = `
			<p class="text-dark">Pas de joueur sélectionné.</p>
		`;
		return;
	}

	const playerMatches = [];

	for (let match of matchesInstances){
		if (match.hasAttended(currPlayer) === true)
			playerMatches.push(match);
	}

	if (!playerMatches[0]){
		document.getElementById("playerStats").innerHTML = `
			<p class="text-dark">Pas d'historique.</p>
		`;
		return;
	}

	for (let match of playerMatches){
		currPlayerController.updateHistoricalStatsView(playerMatches[0]);
	}
})

// event listener sur chaque bouton permettant de choisir l'affichage des parties d'un joueur
document.getElementById("playerStats").addEventListener("click", function(e) {

	if (!currPlayerController){
		document.getElementById("playerStats").innerHTML = `
			<p class="text-dark">Pas de joueur sélectionné.</p>
		`;
		return;
	}

	const playerMatches = [];

	for (let match of matchesInstances){
		if (match.hasAttended(currPlayer) === true)
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
