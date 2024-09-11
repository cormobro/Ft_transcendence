class ModeStatsView{

	constructor(player){

		this.player = player;
		this.container = document.getElementById("playerStats");
	}

	renderSolo(){

		this.container.innerHTML = `
			<h3>Statistiques de ${this.player.name} en mode solo</h3>
			<p>Parties jouées : ${this.player.modeStats.solo.gamesPlayed}</p>
			<p>Parties gagnées : ${this.player.modeStats.solo.gamesWon}</p>
			<p>Parties perdues : ${this.player.modeStats.solo.gamesLost}</p>
			<p>Points totaux : ${this.player.modeStats.solo.pointsPlayed}</p>
		`;
	}

	renderDuo(){

		this.container.innerHTML = `
			<h3>Statistiques de ${this.player.name} en mode duo</h3>
			<p>Parties jouées : ${this.player.modeStats.duo.gamesPlayed}</p>
			<p>Parties gagnées : ${this.player.modeStats.duo.gamesWon}</p>
			<p>Parties perdues : ${this.player.modeStats.duo.gamesLost}</p>
			<p>Points totaux : ${this.player.modeStats.duo.pointsPlayed}</p>
		`;
	}

	renderTournament(){

		this.container.innerHTML = `
			<h3>Statistiques de ${this.player.name} en mode tournoi</h3>
			<p>Tournois joués : ${this.player.globalStats.tournamentsPlayed}</p>
			<p>Tournois gagnés : ${this.player.modeStats.tournamentsWon}</p>
			<p>Tournois perdus : ${this.player.modeStats.tournamentsLost}</p>
		`;
	}
}
