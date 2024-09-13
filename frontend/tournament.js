class Tournament{

	constructor(id, winner, matchs){

		this.id = id;
		this.winner = winner;
		this.matchs = matchs;
	}

	getPlayerStats(player){

		if (player === this.winner)
			return (true);
		else
			return (false);
	}

}