class MatchStatsView{

	constructor(match, player1, player2){

		this.match = match;
		this.player1 = player1;
		this.player2 = player2;
		this.container1 = document.getElementById("matchStats");
		this.container2 = document.getElementById("player1Stats");
		this.container3 = document.getElementById("player2Stats");
		this.canvas;
	}

	render(){

		this.container1.innerHTML = `
				<h3 class="text-dark">Statistiques de la partie : ${this.player1.username} vs ${this.player2.username}</h3>
				<canvas class="bg-light" id="myMatchChart"></canvas>
				<div class="text-dark" for="myMatchChartLegend"></div>
				<p class="text-dark">Points gagnés par ${this.player1.username} : ${this.match.pointsWonByPlayer1}</p>
				<p class="text-dark">Points gagnés par ${this.player2.username} : ${this.match.pointsWonByPlayer2}</p>
				<p class="text-dark">Points joués : ${this.match.pointsWonByPlayer1 + this.match.pointsWonByPlayer2}</p>
				<p class="text-dark">Victoire de : ${this.match.resultPlayer1 === true ? this.player1.username : this.player2.username}</p>
		`;

		this.canvas = document.getElementById('myMatchChart');
		this.canvas.width = 500;
		this.canvas.height = 500;

		const chartOptions = {
			canvas: this.canvas,
			seriesName: "Répartition des points gagnés",
			padding: 40,
			data: {
				[`Points gagnés de ${this.player1.username}`]: this.match.pointsWonByPlayer1,
				[`Points gagnés de ${this.player2.username}`]: this.match.pointsWonByPlayer2
			},
			colors: ["#80DEEA", "#FFE082", "#FFAB91", "#CE93D8"]
		};

		var myPiechart = new PieChart(chartOptions);
		myPiechart.draw();

		const titleOptions = {
			canvas: this.canvas,
			seriesName: "Répartition des points gagnés",
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
			div: "myMatchChartLegend",
			data: {
				[`Points gagnés de ${this.player1.username}`]: this.match.pointsWonByPlayer1,
				[`Points gagnés de ${this.player2.username}`]: this.match.pointsWonByPlayer2
			},
			colors: ["#80DEEA", "#FFE082", "#FFAB91", "#CE93D8"]
		};
		var myPieChartLegend = new Legend(legendOptions);
		myPieChartLegend.drawLegend();

		this.container2.innerHTML = `
				<h3 class="text-dark">Statistiques de ${this.player1.username}</h3>
				<p class="text-dark">Points gagnés : ${this.match.pointsWonByPlayer1}</p>
				<p class="text-dark">Points perdus : ${this.match.pointsWonByPlayer2}</p>
				<p class="text-dark">Précision : ${Math.round(this.match.pointsWonByPlayer1/(this.match.pointsWonByPlayer1 + this.match.pointsWonByPlayer2)*100)}%</p>
		`;

		this.container3.innerHTML = `
				<h3 class="text-dark">Statistiques de ${this.player2.username}</h3>
				<p class="text-dark">Points gagnés : ${this.match.pointsWonByPlayer2}</p>
				<p class="text-dark">Points perdus : ${this.match.pointsWonByPlayer1}</p>
				<p class="text-dark">Précision : ${Math.round(this.match.pointsWonByPlayer2/(this.match.pointsWonByPlayer2 + this.match.pointsWonByPlayer1)*100)}%</p>
		`;
	}
}
