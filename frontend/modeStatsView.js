class ModeStatsView{

	constructor(player){

		this.player = player;
		this.container = document.getElementById("playerStats");
	}

	renderSolo(){

		this.container.innerHTML = `
			<h3 class="text-dark">Statistiques de ${this.player.username} en mode solo</h3>
			<p class="text-dark">Parties jouées : ${this.player.modeStats.solo.gamesPlayed}</p>
			<p class="text-dark">Parties gagnées : ${this.player.modeStats.solo.gamesWon}</p>
			<p class="text-dark">Parties perdues : ${this.player.modeStats.solo.gamesLost}</p>
			<p class="text-dark">Points totaux : ${this.player.modeStats.solo.pointsPlayed}</p>
		`;
	}

	renderDuo(){

		this.container.innerHTML = `
			<h3 class="text-dark">Statistiques de ${this.player.username} en mode duo</h3>
			<p class="text-dark">Parties jouées : ${this.player.modeStats.duo.gamesPlayed}</p>
			<p class="text-dark">Parties gagnées : ${this.player.modeStats.duo.gamesWon}</p>
			<p class="text-dark">Parties perdues : ${this.player.modeStats.duo.gamesLost}</p>
			<p class="text-dark">Points totaux : ${this.player.modeStats.duo.pointsPlayed}</p>
		`;
	}

	renderTournament(){

		this.container.innerHTML = `
			<h3 class="text-dark">Statistiques de ${this.player.username} en mode tournoi</h3>
			<p class="text-dark">Tournois joués : ${this.player.globalStats.tournamentsPlayed}</p>
			<p class="text-dark">Tournois gagnés : ${this.player.modeStats.tournament.tournamentsWon}</p>
			<p class="text-dark">Tournois perdus : ${this.player.modeStats.tournament.tournamentsLost}</p>
		`;
	}
}
