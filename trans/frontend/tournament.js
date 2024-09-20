class Tournament{

	constructor(id, winner, startIndex, endIndex){

		this.id = id;
		this.winner = winner;
		this.startIndex = startIndex;
		this.endIndex = endIndex;
	}

	hasAttended(player){

		for (let i = this.startIndex; i < this.endIndex; i++){
			if (player === matchesInstances[i].player1 || player === matchesInstances[i].player2)
				return (true);
		}
		return (false);
	}

	getPlayerStats(player){

		if (player === this.winner)
			return (true);
		else
			return (false);
	}
}