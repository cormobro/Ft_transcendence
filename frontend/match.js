class Match{

	// CONSTRUCTOR
	constructor(id, mode, date, matchTime, player1, player2, resultPlayer1, pointsWonByPlayer1, pointsWonByPlayer2){

		// INSTANCE PROPERTIES
		this.id = id;
		this.mode = mode;
		this.date = date;
		this.matchTime = matchTime;
		this.player1 = player1;
		this.player2 = player2;
		this.resultPlayer1 = resultPlayer1;
		this.pointsWonByPlayer1 = pointsWonByPlayer1;
		this.pointsWonByPlayer2 = pointsWonByPlayer2;
	}

	// METHOD DEFINITIONS
	// Return true if a specific player played the match else return false
	hasAttended(player){

		if (player === this.player1 || player === this.player2)
			return (true);
		return (false);
	}

	// Get the match stats for a specific player
	getPlayerStats(player){

		let stats = {
			pointsWon : 0,
			pointsLost : 0,
			pointsPlayed : 0,
			matchsWon : 0,
			matchsLost : 0
		};
		if (player === this.player1){
			stats.pointsWon = this.pointsWonByPlayer1;
			stats.pointsLost = this.pointsWonByPlayer2;
			stats.pointsPlayed = this.pointsWonByPlayer1 + this.pointsWonByPlayer2;
			if (this.resultPlayer1 === true)
				stats.matchsWon++;
			else
				stats.matchsLost++;
			return (stats);
		}
		else if (player === this.player2){
			stats.pointsWon = this.pointsWonByPlayer2;
			stats.pointsLost = this.pointsWonByPlayer1;
			stats.pointsPlayed = this.pointsWonByPlayer1 + this.pointsWonByPlayer2;
			if (this.resultPlayer1 === false)
				stats.matchsWon++;
			else
				stats.matchsLost++;
			return (stats);
		}
	}
}
