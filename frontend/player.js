class Player{

	constructor(id, username){

		this.id = id;
		this.username = username;
		this.matchHistory = [];
		this.tournamentHistory = [];
	}

	addMatch(match) {

		this.matchHistory.push(match);
	}

	addTournament(tournament) {

		this.tournamentHistory.push(tournament);
	}

	getGlobalStats(){

		let stats = {
			pointsWon : 0,
			pointsLost : 0,
			pointsPlayed : 0,
			matchsWon : 0,
			matchsLost : 0,
			matchsPlayed : 0
		};

		for (let match of this.matchHistory){
			const playerStats = match.getPlayerStats(this);
			stats.pointsWon += playerStats.pointsWon;
			stats.pointsLost += playerStats.pointsLost;
			stats.pointsPlayed += playerStats.pointsPlayed;
			stats.matchsWon += playerStats.matchsWon;
			stats.matchsLost += playerStats.matchsLost;
			stats.matchsPlayed++;
		}
		return (stats);
	}

	getModeStats(mode){

		let stats = {
			pointsWon : 0,
			pointsLost : 0,
			pointsPlayed : 0,
			matchsWon : 0,
			matchsLost : 0,
			matchsPlayed : 0,
			tournamentsWon : 0,
			tournamentsLost : 0,
			tournamentsPlayed : 0
		};

		for (let match of this.matchHistory){
			if (mode === match.mode){
				const playerStats = match.getPlayerStats(this);
				stats.pointsWon += playerStats.pointsWon;
				stats.pointsLost += playerStats.pointsLost;
				stats.pointsPlayed += playerStats.pointsPlayed;
				stats.matchsWon += playerStats.matchsWon;
				stats.matchsLost += playerStats.matchsLost;
				stats.matchsPlayed++;
			}
		}
		if (mode === "tournament"){
			for (let tournament of this.tournamentHistory){
				if (tournament.getPlayerStats(this) === true)
					stats.tournamentsWon++;
				else
					stats.tournamentsLost++;
				stats.tournamentsPlayed++;
			}
		}
		return (stats);
	}
}
