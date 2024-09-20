class GlobalStatsView{

	constructor(player){

		this.player = player;
		this.container = document.getElementById("playerStats");
	}

	render(){

		const stats = this.player.getGlobalStats();

		this.container.innerHTML = `
			<h3 class="text-dark">Statistiques globales de ${this.player.username}</h3>
			<p class="text-dark">Points gagnés : ${stats.pointsWon}</p>
			<p class="text-dark">Points perdus : ${stats.pointsLost}</p>
			<p class="text-dark">Points joués : ${stats.pointsPlayed}</p>
			<p class="text-dark">Parties gagnées : ${stats.matchsWon}</p>
			<p class="text-dark">Parties perdues : ${stats.matchsLost}</p>
			<p class="text-dark">Parties jouées : ${stats.matchsPlayed}</p>
		`;
	}
}