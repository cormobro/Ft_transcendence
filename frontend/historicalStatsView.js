class HistoricalStatsView{

	constructor(player){

		this.player = player;
		this.container = document.getElementById("playerStats");
	}

	// init(){

	// 	this.container.innerHTML = `
	// 		<h3 class="text-dark">Statistiques par partie de ${this.player.username}</h3>
	// 	`;

	// 	for (let match of this.player.matchHistory){
	// 		this.container.innerHTML += `
	// 			<div class="btn btn-outline-dark mt-3 mb-3" id="match${match.id}">Match ${match.id}</div>
	// 		`;
	// 	}

	// 	var match = this.player.matchHistory[0];

	// 	this.container.innerHTML += `
	// 		<h3 class="text-dark">Statistiques de la partie #${match.id}</h3>
	// 		<p class="text-dark">Mode : ${match.mode}</p>
	// 		<p class="text-dark">Joueur 1 : ${match.player1.username}</p>
	// 		<p class="text-dark">Joueur 2 : ${match.player2.username}</p>
	// 		<p class="text-dark">Victoire de : ${match.resultPlayer1 === true ? match.player1.username : match.player2.username}</p>
	// 		<p class="text-dark">Points gagnés par ${match.player1.username} : ${match.pointsWonByPlayer1}</p>
	// 		<p class="text-dark">Points gagnés par ${match.player2.username} : ${match.pointsWonByPlayer2}</p>
	// 	`;
	// }

	render(match){

		this.container.innerHTML = `
			<h3 class="text-dark">Statistiques par partie de ${this.player.username}</h3>
		`;

		let i = 0;
		for (let match of this.player.matchHistory){
			// loop to retrieve all the matches played by the instance player, if (match.player1 == this || match.player2 == this)
			this.container.innerHTML += `
				<button class="btn btn-outline-dark mt-3 mb-3" id="match${i}">Match ${i}</button>
			`;
			i++;
		}

		this.container.innerHTML += `
			<h3 class="text-dark">Statistiques de la partie</h3>
			<p class="text-dark">Mode : ${match.mode}</p>
			<p class="text-dark">Joueur 1 : ${match.player1.username}</p>
			<p class="text-dark">Joueur 2 : ${match.player2.username}</p>
			<p class="text-dark">Victoire de : ${match.resultPlayer1 === true ? match.player1.username : match.player2.username}</p>
			<p class="text-dark">Points gagnés par ${match.player1.username} : ${match.pointsWonByPlayer1}</p>
			<p class="text-dark">Points gagnés par ${match.player2.username} : ${match.pointsWonByPlayer2}</p>
		`;
	}
}
