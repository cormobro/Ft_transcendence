class Player{

	constructor(id, username){

		this.id = id;
		this.username = username;
		// this.matches = [];
		// this.tournaments = [];
	}

	// getPlayerMatches(player){

	// 	for (let match of matches){
	// 		if (match.player1 == this || match.player2 == this)
	// 			this.matches.push(match);
	// 	}	
	// }

	// getPlayerTournaments(matches, player){

	// 	for (let tournament of tournaments){
	// 		for (let i = tournament.startIndex; i < tournament.endIndex; i++){
	// 			if (matches[i].player1 == this|| matches[i].player2 == this)
	// 				this.tournaments.push(tournament);
	// 				break;
	// 		}
	// 	}
	// }

	getGlobalStats(){

		const playerMatches = [];

		for (let match of matchesInstances){
			if (match.hasAttended(this) === true)
				playerMatches.push(match);
		}

		let stats = {
			pointsWon : 0,
			pointsLost : 0,
			pointsPlayed : 0,
			matchsWon : 0,
			matchsLost : 0,
			matchsPlayed : 0
		};

		for (let match of playerMatches){
			// loop to retrieve all the matches played by the instance player, if (match.player1 == this || match.player2 == this)
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

		const playerMatches = [];

		for (let match of matchesInstances){
			if (match.hasAttended(this) === true)
				playerMatches.push(match);
		}

		const playerTournaments = [];

		for (let tournament of tournamentsInstances){
			if (tournament.hasAttended(this) === true)
				playerTournaments.push(tournament);
		}

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

		for (let match of playerMatches){
			// loop to retrieve all the matches played by the instance player, if (match.player1 == this || match.player2 == this)
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
		if (mode === 2){
			for (let tournament of playerTournaments){
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
