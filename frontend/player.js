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
	}

	addSoloGame(game){

		this.gameHistory.push(game);
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

		this.gameHistory.push(game);
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

	addTournamentGame(){

		this.gameHistory.push(game);
	}

	addTournament(tournament){

		this.modeStats.tournament.pointsWon += tournament.pointsWon;
		this.modeStats.tournament.pointsLost += tournament.pointsLost;
		this.globalStats.pointsWon += tournament.pointsWon;
		this.globalStats.pointsLost += tournament.pointsLost;
		this.modeStats.tournament.pointsPlayed += tournament.pointsWon + tournament.pointsLost;
		this.globalStats.pointsPlayed += tournament.pointsWon + tournament.pointsLost;
		this.modeStats.tournament.gamesWon += tournament.gamesWon;
		this.modeStats.tournament.gamesLost += tournament.gamesLost;
		this.modeStats.tournament.gamesPlayed += tournament.gamesWon + tournament.gamesLost;
		this.globalStats.gamesPlayed += tournament.gamesWon + tournament.gamesLost;
		this.modeStats.tournament.tournamentsPlayed++;
		this.globalStats.tournamentsPlayed++;
		if (tournament.result == true)
			this.modeStats.tournament.tournamentsWon++;
		else
			this.modeStats.tournament.tournamentsLost++;
	}
}
