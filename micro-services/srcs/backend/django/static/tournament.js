class Tournament{

	// CONSTRUCTOR
	constructor(id, winner, startIndex, endIndex){

		// INSTANCE PROPERTIES
		this.id = id;
		this.winner = winner;
		this.startIndex = startIndex;
		this.endIndex = endIndex;
	}

	// METHOD DEFINITIONS
	// Return true if a specific player played the tournament else return false
	hasAttended(player){

		for (let i = this.startIndex; i <= this.endIndex; i++){
			if (player === matchesInstances[i].player1 || player === matchesInstances[i].player2)
				return (true);
		}
		return (false);
	}

	// Return true if a specific player won the tournament else return false
	getPlayerStats(player){

		if (player === this.winner)
			return (true);
		else
			return (false);
	}
}
