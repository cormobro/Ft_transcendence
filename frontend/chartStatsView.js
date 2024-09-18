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

		const soloStats = this.player.getModeStats(0);
		const duoStats = this.player.getModeStats(1);
		const tournamentStats = this.player.getModeStats(2);

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

		const playerMatches = [];

		for (let match of matchesInstances){
			if (match.hasAttended(player3) === true)
				playerMatches.push(match);
		}

		let pointsWonArray = [];

		for (let i = 0; i < playerMatches.length; i++){
			// loop to retrieve all the matches played by the instance player, if (match.player1 == this || match.player2 == this)
			if (i == 0)
				pointsWonArray.push(playerMatches[i].pointsWonByPlayer1);
			else{
				pointsWonArray.push(pointsWonArray[i - 1] + playerMatches[i].pointsWonByPlayer1);
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
