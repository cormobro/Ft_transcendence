class ChartStatsView{

	constructor(player) {

		this.player = player;
		this.canvas = document.getElementById('myChart');
	}

	init(){

		this.canvas.width = 500;
		this.canvas.height = 500;
	}

	render() {

		const chartOptions = {
			canvas: this.canvas,
			seriesName: "Répartition des résultats",
			padding: 40,
			data: {
				"Victoires": this.player.globalStats.gamesWon,
				"Défaites": this.player.globalStats.gamesLost
			},
			colors: ["#80DEEA", "#FFE082"]
		};

		var myPiechart = new PieChart(chartOptions);
		myPiechart.draw();

		const titleOptions = {
			canvas: this.canvas,
			seriesName: "Répartition des résultats",
			align: "center",
			fill: "white",
			font: {
				weight: "bold",
				size: "18px",
				family: "Lato"
			}
		};

		var myTitlePieChart = new Title(titleOptions);
		myTitlePieChart.drawTitle();

		const legendOptions = {
			canvas: this.canvas,
			div: "myChartLegend",
			data: {
				"Victoires": this.player.globalStats.gamesWon,
				"Défaites": this.player.globalStats.gamesLost
			},
			colors: ["#80DEEA", "#FFE082"]
		};
		var myPieChartLegend = new Legend(legendOptions);
		myPieChartLegend.drawLegend();
	}
}
