class Player{

	constructor(id, username){

		this.id = id;
		this.username = username;
		this.globalStats = {
			pointsWon : 0,
			pointsLost : 0,
			pointsPlayed : 0,
			gamesWon : 0,
			gamesLost : 0,
			gamesPlayed : 0,
			tournamentsPlayed : 0
		}
		this.modeStats = {
			solo: {
				pointsWon : 0,
				pointsLost : 0,
				pointsPlayed : 0,
				gamesWon : 0,
				gamesLost : 0,
				gamesPlayed : 0
			},
			duo: {
				pointsWon : 0,
				pointsLost : 0,
				pointsPlayed : 0,
				gamesWon : 0,
				gamesLost : 0,
				gamesPlayed : 0
			},
			tournament: {
				pointsWon : 0,
				pointsLost : 0,
				pointsPlayed : 0,
				gamesWon : 0,
				gamesLost : 0,
				gamesPlayed : 0,
				tournamentsWon : 0,
				tournamentsLost : 0,
				tournamentsPlayed : 0
			}
		};
		this.gameHistory = [];
		this.tournamentHistory = [];
	}

	addSoloGame(game){

		this.modeStats.solo.pointsWon += game.pointsWon;
		this.modeStats.solo.pointsLost += game.pointsLost;
		this.globalStats.pointsWon += game.pointsWon;
		this.globalStats.pointsLost += game.pointsLost;
		this.modeStats.solo.pointsPlayed += game.pointsWon + game.pointsLost;
		this.globalStats.pointsPlayed += game.pointsWon + game.pointsLost;
		this.modeStats.solo.gamesPlayed++;
		this.globalStats.gamesPlayed++;
		if (game.result == true)
		{
			this.modeStats.solo.gamesWon++;
			this.globalStats.gamesWon++;
		}
		else
		{
			this.modeStats.solo.gamesLost++;
			this.globalStats.gamesLost++;
		}
	}

	addDuoGame(game){

		this.modeStats.duo.pointsWon += game.pointsWon;
		this.modeStats.duo.pointsLost += game.pointsLost;
		this.globalStats.pointsWon += game.pointsWon;
		this.globalStats.pointsLost += game.pointsLost;
		this.modeStats.duo.pointsPlayed += game.pointsWon + game.pointsLost;
		this.globalStats.pointsPlayed += game.pointsWon + game.pointsLost;
		this.modeStats.duo.gamesPlayed++;
		this.globalStats.gamesPlayed++;
		if (game.result == true)
		{
			this.modeStats.duo.gamesWon++;
			this.globalStats.gamesWon++;
		}
		else
		{
			this.modeStats.duo.gamesLost++;
			this.globalStats.gamesLost++;
		}
	}

	addTournamentGame(game){

		this.modeStats.tournament.pointsWon += game.pointsWon;
		this.modeStats.tournament.pointsLost += game.pointsLost;
		this.globalStats.pointsWon += game.pointsWon;
		this.globalStats.pointsLost += game.pointsLost;
		this.modeStats.tournament.pointsPlayed += game.pointsWon + game.pointsLost;
		this.globalStats.pointsPlayed += game.pointsWon + game.pointsLost;
		this.modeStats.tournament.gamesPlayed++;
		this.globalStats.gamesPlayed++;
		if (game.result == true)
		{
			this.modeStats.tournament.gamesWon++;
			this.globalStats.gamesWon++;
		}
		else
		{
			this.modeStats.tournament.gamesLost++;
			this.globalStats.gamesLost++;
		}	
	}

	updateGameStats(){

		for (Game game in this.gameHistory){
			if (game.mode == "solo")
				addSoloGame(game);
			if (game.mode == "duo")
				addDuoGame(game);
			if (game.mode == "tournament")
				addTournamentGame(game);
		}
	}

	updateTournamentStats(){

		for (Tournament tourn in this.tournamentHistory){
			this.modeStats.tournament.tournamentsPlayed++;
			this.globalStats.tournamentsPlayed++;
			if (tournament.result == true)
				this.modeStats.tournament.tournamentsWon++;
			else
				this.modeStats.tournament.tournamentsLost++;
		}
	}
}
