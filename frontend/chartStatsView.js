class ChartStatsView{

	constructor(player) {

		this.player = player;
		this.canvas;
		this.container = document.getElementById("playerStats");
	}

	init(){

		this.container.innerHTML = `
			<h3 class="text-dark">Statistiques graphiques de ${this.player.username}</h3>
			<div class="d-flex align-item-center">
			<canvas class="bg-light" id="myChart"></canvas><br>
			<div class="text-dark" for="myChartLegend"></div>
			</div>
		`;

		this.canvas = document.getElementById('myChart');
		this.canvas.width = 500;
		this.canvas.height = 500;
	}

	renderPieChart() {

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
			fill: "dark",
			font: {
				weight: "bold",
				size: "18px",
				family: "Lato"
			}
		};

		var myPieChartTitle = new Title(titleOptions);
		myPieChartTitle.drawTitle();

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

	renderBarChart() {

		var gridScaleValue = Math.ceil(this.player.modeStats.solo.gamesWon +
			this.player.modeStats.duo.gamesWon +
			this.player.modeStats.tournament.gamesWon / 3);
		console.log(gridScaleValue);
		const barChartOptions = {
			canvas:this.canvas,
			seriesName:"Répartition des victoires par mode de jeux",
			padding: 20,
			gridScale: gridScaleValue,
			gridColor:"#0X33E31",
			data: {
				"Solo": this.player.modeStats.solo.gamesWon,
				"Duo": this.player.modeStats.duo.gamesWon,
				"Tournoi": this.player.modeStats.tournament.gamesWon,
			},
			colors: ["#80DEEA", "#FFE082", "#FFAB91"]
		};

		var myBarChart = new BarChart(barChartOptions);
		myBarChart.draw();

		const titleOptions = {
			canvas: this.canvas,
			seriesName: "Répartition des victoires par mode de jeux",
			align: "center",
			fill: "dark",
			font: {
				weight: "bold",
				size: "18px",
				family: "Lato"
			}
		};

		var myBarChartTitle = new Title(titleOptions);
		myBarChartTitle.drawTitle();

		const legendOptions = {
			canvas: this.canvas,
			div: "myChartLegend",
			data: {
				"Solo": this.player.modeStats.solo.gamesWon,
				"Duo": this.player.modeStats.duo.gamesWon,
				"Tournoi": this.player.modeStats.tournament.gamesWon,
			},
			colors: ["#80DEEA", "#FFE082", "#FFAB91"]
		};
		var myBarChartLegend = new Legend(legendOptions);
		myBarChartLegend.drawLegend();
	}
}
