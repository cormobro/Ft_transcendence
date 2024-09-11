class ChartStatsView{

	constructor(player) {

		this.player = player;
		this.canvas = document.getElementById('playerChart');
		this.ctx = this.canvas.getContext('2d');
	}

	init(){

		this.canvas.width = 500;
		this.canvas.height = 500;
	}

	render() {

		const options = {
			canvas: this.canvas,
			seriesName: "Répartition des résultats",
			padding: 40,
			data: {
				"Victoires": this.player.stats.gamesWon,
				"Défaites": this.player.stats.gamesLost,
			},
			colors: ["#80DEEA", "#FFE082"],
		};

		var myPiechart = new Piechart({
			options: options
		});

		myPiechart.draw();
	}
}
