class ModeStatsView{

	constructor(player){

		this.player = player;
		this.container = document.getElementById("playerStats");
	}

	renderSolo(){

		const stats = this.player.getModeStats(0);

		this.container.innerHTML = `
			<h3 class="text-dark">Statistiques de ${this.player.username} en mode solo</h3>
			<p class="text-dark">Points gagnés : ${stats.pointsWon}</p>
			<p class="text-dark">Points perdus : ${stats.pointsLost}</p>
			<p class="text-dark">Points joués : ${stats.pointsPlayed}</p>
			<p class="text-dark">Parties gagnées : ${stats.matchsWon}</p>
			<p class="text-dark">Parties perdues : ${stats.matchsLost}</p>
			<p class="text-dark">Parties jouées : ${stats.matchsPlayed}</p>
		`;
	}

	renderDuo(){

		const stats = this.player.getModeStats(1);

		this.container.innerHTML = `
			<h3 class="text-dark">Statistiques de ${this.player.username} en mode duo</h3>
			<p class="text-dark">Points gagnés : ${stats.pointsWon}</p>
			<p class="text-dark">Points perdus : ${stats.pointsLost}</p>
			<p class="text-dark">Points joués : ${stats.pointsPlayed}</p>
			<p class="text-dark">Parties gagnées : ${stats.matchsWon}</p>
			<p class="text-dark">Parties perdues : ${stats.matchsLost}</p>
			<p class="text-dark">Parties jouées : ${stats.matchsPlayed}</p>
		`;
	}

	renderTournament(){

		const stats = this.player.getModeStats(2);

		this.container.innerHTML = `
			<h3 class="text-dark">Statistiques de ${this.player.username} en mode tournoi</h3>
			<p class="text-dark">Points gagnés : ${stats.pointsWon}</p>
			<p class="text-dark">Points perdus : ${stats.pointsLost}</p>
			<p class="text-dark">Points joués : ${stats.pointsPlayed}</p>
			<p class="text-dark">Parties gagnées : ${stats.matchsWon}</p>
			<p class="text-dark">Parties perdues : ${stats.matchsLost}</p>
			<p class="text-dark">Parties jouées : ${stats.matchsPlayed}</p>
			<p class="text-dark">Tournois gagnés : ${stats.tournamentsWon}</p>
			<p class="text-dark">Tournois perdus : ${stats.tournamentsLost}</p>
			<p class="text-dark">Tournois joués : ${stats.tournamentsPlayed}</p>
		`;
	}
}
