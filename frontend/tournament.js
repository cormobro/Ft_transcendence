class Tournament{

	constructor(id, winner, matches){

		this.id = id;
		this.winner = winner;
		this.matches = matches;
	}

	getPlayerStats(player){

		if (player === this.winner)
			return (true);
		else
			return (false);
	}
}
