class MatchController {

	constructor(match, player1, player2) {

		this.match = match;
		this.player1 = player1;
		this.player2 = player2;
		this.matchStatsView = new MatchStatsView(match, player1, player2);
	}

	updateMatchStatsView(){

		this.matchStatsView.render();
	}
}
