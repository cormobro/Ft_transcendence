/*const players = []

const player = {
	id: "unique_player_id",  // Identifiant unique du joueur
	username: "player_name", // Nom du joueur
	globalStats: {
		totalPoints: { won: 0, lost: 0, played: 0 }, // Points globaux sur tous les modes
		totalMatches: { won: 0, lost: 0, played: 0 }, // Matchs globaux
		totalTournaments: { won: 0, lost: 0, played: 0 } // Tournois globaux
	},
	modeStats: {
		solo: {
			totalPoints: { won: 0, lost: 0, played: 0 }, // Points solo contre IA
			totalMatches: { won: 0, lost: 0, played: 0 }, // Matchs solo contre IA
			games: [] // Historique des parties solo
		},
		duo: {
			totalPoints: { won: 0, lost: 0, played: 0 }, // Points en duo
			totalMatches: { won: 0, lost: 0, played: 0 }, // Matchs en duo
			games: [] // Historique des parties duo
		},
		tournament: {
			totalPoints: { won: 0, lost: 0, played: 0 }, // Points en tournoi
			totalMatches: { won: 0, lost: 0, played: 0 }, // Matchs en tournoi
			totalTournaments: { won: 0, lost: 0, played: 0 }, // Tournois en tournoi
			games: [] // Historique des parties tournoi
		}
	}
};

const game = {
	id: "unique_game_id",
	opponent: "player2",
	points: { won: 7, lost: 11 },
	win: false
};*/

var pieChartCanvas = document.getElementById("myPieChart");

pieChartCanvas.width = 500;
pieChartCanvas.height = 500;

var pieChartCtx = pieChartCanvas.getContext("2d");

function drawLine(pieChartCtx, startX, startY, endX, endY, color){ //toutes les variables pour tracer la ligne

	pieChartCtx.save(); //enregistre l'état complet du canvas
	pieChartCtx.strokeStyle = color; //spécifie la couleur ou le style à utiliser pour dessiner les lignes autour des formes
	pieChartCtx.beginPath(); //commence un nouveau chemin en vidant la liste des sous-chemins
	pieChartCtx.moveTo(startX,startY); //déplace le point de départ d'un nouveau sous-chemin vers les coordonnées (x, y)
	pieChartCtx.lineTo(endX,endY); //connecte le dernier point du sous-chemin en cours aux coordonnées x, y spécifiées avec une ligne droite
	pieChartCtx.stroke(); //dessine le chemin actuel ou donné avec le style de trait actuel
	pieChartCtx.restore(); //rétablit l'état par défaut
}

function drawArc(pieChartCtx, centerX, centerY, radius, startAngle, endAngle, color){ // toutes les variables pour tracer l'arc de cercle avec x et y les coordonnées du centre et radius la coordonnée x de la fin de la ligne

	pieChartCtx.save();
	pieChartCtx.strokeStyle = color;
	pieChartCtx.beginPath();
	pieChartCtx.arc(centerX, centerY, radius, startAngle, endAngle); // ajoute un arc de cercle au tracé, en le centrant aux positions (x, y) et avec un rayon r qui démarre à angleDépart et qui finit à angleFin, dans la direction de sensAntiHoraire
	pieChartCtx.stroke();
	pieChartCtx.restore();
}

function drawPieSlice(pieChartCtx, centerX, centerY, radius, startAngle, endAngle, fillColor, strokeColor) { // toutes les variables pour remplir la part de tarte avec fillColor et strokeColor respectivement la couleur du remplissage et du périmètre

	pieChartCtx.save();
	pieChartCtx.fillStyle = fillColor; // spécifie la couleur ou style à utiliser à l'intérieur des formes
	pieChartCtx.strokeStyle = strokeColor;
	pieChartCtx.beginPath();
	pieChartCtx.moveTo(centerX, centerY);
	pieChartCtx.arc(centerX, centerY, radius, startAngle, endAngle, strokeColor);
	pieChartCtx.closePath(); // provoque le retour du stylo au point de départ du sous-traçé courant
	pieChartCtx.fill(); // remplit le chemin courant ou donné avec la couleur de fond en cours
	pieChartCtx.restore();
}

drawLine(pieChartCtx, 200, 200, 300, 300, "#000");
drawArc(pieChartCtx, 250, 250, 150, 0, Math.PI/3, "#000");
drawPieSlice(pieChartCtx, 250, 250, 150, Math.PI/2, Math.PI/2 + Math.PI/3, "#F00", "#000");

/*
To determine the angle for each category slice, we use the formula:
slice angle = 2 * PI * category value / total value
*/

class Piechart {

	constructor(options){

		this.options = options;
		this.canvas = options.canvas;
		this.ctx = this.canvas.getContext("2d");
		this.colors = options.colors;
		this.titleOptions = options.titleOptions;
		this.totalValue = [...Object.values(this.options.data)].reduce((a, b) => a + b, 0);
		this.radius = Math.min(this.canvas.width / 2, this.canvas.height / 2) - options.padding;
	}

	drawSlices(){

		var colorIndex = 0;
		var startAngle = -Math.PI / 2;
		for (var categ in this.options.data) {
			var val = this.options.data[categ];
			var sliceAngle = (2 * Math.PI * val) / this.totalValue;
			drawPieSlice(
				this.ctx,
				this.canvas.width / 2,
				this.canvas.height / 2,
				this.radius,
				startAngle,
				startAngle + sliceAngle,
				this.colors[colorIndex % this.colors.length]
			);
			startAngle += sliceAngle;
			colorIndex++;
		}
	}
}

var myPiechart = new Piechart(
	{
		canvas: myCanvas,
		padding: 40,
		data: {
			"Classical Music": 16,
			"Alternative Rock": 12,
			"Pop": 18,
			"Jazz": 32
		},
		colors: ["#80DEEA", "#FFE082", "#FFAB91", "#CE93D8"]
	}
);

myPiechart.drawSlices();

