class GlobalStatsView{

	constructor(player){

		this.player = player;
		this.container = document.getElementById("playerStats");
	}

	render(){

		this.container.innerHTML = `
			<h3 class="text-dark">Statistiques globales de ${this.player.username}</h3>
			<p class="text-dark">Parties jouées : ${this.player.globalStats.gamesPlayed}</p>
			<p class="text-dark">Parties gagnées : ${this.player.globalStats.gamesWon}</p>
			<p class="text-dark">Parties perdues : ${this.player.globalStats.gamesLost}</p>
			<p class="text-dark">Points totaux : ${this.player.globalStats.pointsPlayed}</p>
			<p class="text-dark">Tournois joués : ${this.player.globalStats.tournamentsPlayed}</p>
			<p class="text-dark">Tournois gagnés : ${this.player.modeStats.tournament.tournamentsWon}</p>
			<p class="text-dark">Tournois perdus : ${this.player.modeStats.tournament.tournamentsLost}</p>
		`;
	}
}
