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
			<canvas class="bg-light" id="myPlayerChart"></canvas>
			<div class="text-dark" for="myPlayerChartLegend"></div>
			</div>
		`;

		this.canvas = document.getElementById('myPlayerChart');
		this.canvas.width = 500;
		this.canvas.height = 500;
	}

	renderPieChart() {

		const globalStats = this.player.getGlobalStats();

		const chartOptions = {
			canvas: this.canvas,
			seriesName: "Répartition des résultats",
			padding: 40,
			data: {
				"Victoires": globalStats.matchsWon,
				"Défaites": globalStats.matchsLost
			},
			colors: ["#80DEEA", "#FFE082", "#FFAB91", "#CE93D8"]
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
				family: "system-ui"
			}
		};

		var myPieChartTitle = new Title(titleOptions);
		myPieChartTitle.drawTitle();

		const legendOptions = {
			canvas: this.canvas,
			div: "myPlayerChartLegend",
			data: {
				"Victoires": globalStats.matchsWon,
				"Défaites": globalStats.matchsLost
			},
			colors: ["#80DEEA", "#FFE082", "#FFAB91", "#CE93D8"]
		};
		var myPieChartLegend = new Legend(legendOptions);
		myPieChartLegend.drawLegend();
	}

	renderBarChart() {

		const soloStats = this.player.getModeStats("solo");
		const duoStats = this.player.getModeStats("duo");
		const tournamentStats = this.player.getModeStats("tournament");

		var gridScaleValue = Math.ceil(soloStats.matchsWon +
			duoStats.matchsWon +
			tournamentStats.matchsWon / 3);
		const barChartOptions = {
			canvas:this.canvas,
			seriesName:"Répartition des victoires par mode de jeux",
			padding: 20,
			gridScale: gridScaleValue,
			gridColor:"#0X33E31",
			data: {
				"Solo": soloStats.matchsWon,
				"Duo": duoStats.matchsWon,
				"Tournoi": tournamentStats.matchsWon,
			},
			colors: ["#80DEEA", "#FFE082", "#FFAB91", "#CE93D8"]
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
				family: "system-ui"
			}
		};

		var myBarChartTitle = new Title(titleOptions);
		myBarChartTitle.drawTitle();

		const legendOptions = {
			canvas: this.canvas,
			div: "myPlayerChartLegend",
			data: {
				"Solo": soloStats.matchsWon,
				"Duo": duoStats.matchsWon,
				"Tournoi": tournamentStats.matchsWon,
			},
			colors: ["#80DEEA", "#FFE082", "#FFAB91", "#CE93D8"]
		};
		var myBarChartLegend = new Legend(legendOptions);
		myBarChartLegend.drawLegend();
	}

	renderPlotChart(){

		let pointsWonArray = new Array(this.player.matchHistory.length).fill(0);

		for (let i = 0; i < this.player.matchHistory.length; i++){
			if (i == 0)
				pointsWonArray[i] += this.player.matchHistory[i].pointsWonByPlayer1;
			else{
				pointsWonArray[i] += pointsWonArray[i - 1] + this.player.matchHistory[i].pointsWonByPlayer1;
			}
		}

		var dataPointsWon = {};

		for (let i = 0; i < pointsWonArray.length; i++) {
			dataPointsWon["Match " + i] = pointsWonArray[i];
		}

		const plotChartOptions = {
			canvas: this.canvas,
				seriesName:"Points gagnés au cours des parties",
				padding:20,
				gridScale:10,
				gridColor:"black",
				lineGridWidth:1,
				linePlotWidth:5,
				data: dataPointsWon,
				colors: ["#80DEEA", "#FFE082", "#FFAB91", "#CE93D8"]
		};

		var myPlotChart = new PlotChart(plotChartOptions);
		myPlotChart.draw();

		const titleOptions = {
			canvas: this.canvas,
			seriesName: "Points gagnés au cours des parties",
			align: "center",
			fill: "dark",
			font: {
				weight: "bold",
				size: "18px",
				family: "system-ui"
			}
		};

		var myPlotChartTitle = new Title(titleOptions);
		myPlotChartTitle.drawTitle();

		const legendOptions = {
			canvas: this.canvas,
			div: "myPlayerChartLegend",
			data: dataPointsWon,
			colors: ["#80DEEA", "#FFE082", "#FFAB91", "#CE93D8"]
		};

		var myPlotChartLegend = new Legend(legendOptions);
		myPlotChartLegend.drawLegend();
	}
}
