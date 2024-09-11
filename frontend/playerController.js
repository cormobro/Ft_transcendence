class PlayerController {

	constructor(player) {

		this.player = player;
		this.globalStatsView = new GlobalStatsView(player);
		this.modeStatsView = new ModeStatsView(player);
		this.chartStatsView = new ChartStatsView(player);
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

	updateChartStatsView(){

		this.chartStatsView.render();
	}
}
