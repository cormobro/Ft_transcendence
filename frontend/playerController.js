class PlayerController {

	constructor(player) {

		this.player = player;
		this.globalStatsView = new GlobalStatsView(player);
		this.modeStatsView = new ModeStatsView(player);
		this.chartStatsView = new ChartStatsView(player);
		this.historicalStatsView = new HistoricalStatsView(player);
		this.profileView = new ProfileView(player);
	}

	init() {

		this.globalStatsView.render();
	}

	updateGlobalStatsView(){

		this.globalStatsView.render();
	}

	updateSoloModeStatsView(){

		this.modeStatsView.renderSolo();
	}

	updateDuoModeStatsView(){

		this.modeStatsView.renderDuo();
	}

	updateTournamentModeStatsView(){

		this.modeStatsView.renderTournament();
	}

	updateChartStatsView(type){

		this.chartStatsView.init();
		if (type == 0)
			this.chartStatsView.renderPieChart();
		if (type == 1)
			this.chartStatsView.renderBarChart();
		if (type == 2)
			this.chartStatsView.renderPlotChart();
	}

	updateHistoricalStatsView(match){

		this.historicalStatsView.render(match);
	}

	updateProfileView(){

		this.profileView.renderFriendsList();
		this.profileView.uploadAvatar();
	}
}
