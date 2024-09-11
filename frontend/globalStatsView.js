class GlobalStatsView{

	constructor(player){

		this.player = player;
		this.container = document.getElementById("playerStats");
	}

	render(){

		this.container.innerHTML = `
			<h3>Statistiques de ${this.player.name}</h3>
			<p>Parties jouées : ${this.player.globalStats.gamesPlayed}</p>
			<p>Parties gagnées : ${this.player.globalStats.gamesWon}</p>
			<p>Parties perdues : ${this.player.globalStats.gamesLost}</p>
			<p>Points totaux : ${this.player.globalStats.pointsPlayed}</p>
			<p>Tournois joués : ${this.player.globalStats.tournamentsPlayed}</p>
			<p>Tournois gagnés : ${this.player.modeStats.tournamentsWon}</p>
			<p>Tournois perdus : ${this.player.modeStats.tournamentsLost}</p>
		`;
	}
}
