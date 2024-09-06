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
	ctx.stroke();
	pieChartCtx.restore();
}

/*
To determine the angle for each category slice, we use the formula:
slice angle = 2 * PI * category value / total value
*/

class Piechart { // appel d'une classe pour créer des objets

	constructor(options){ // appel du constructeur de la classe

		this.options = options;
		this.canvas = options.canvas;
		this.ctx = this.canvas.getContext("2d");
		this.colors = options.colors; // récupère les options de couleurs
		this.titleOptions = options.titleOptions; // récupère les options de titre
		this.totalValue = [...Object.values(this.options.data)].reduce((a, b) => a + b, 0);
		this.radius = Math.min(this.canvas.width / 2, this.canvas.height / 2) - options.padding; // détermine le rayon du graphique
	}

	drawSlices(){ // méthode responsable du dessin des tranches du graphique circulaire

		var colorIndex = 0;
		var startAngle = -Math.PI / 2;
		for (var categ in this.options.data) {
			var val = this.options.data[categ]; // récupère la valeur associée à la catégorie actuelle
			var sliceAngle = (2 * Math.PI * val) / this.totalValue; // calcule l'angle de la tranche pour chaque catégorie
			drawPieSlice(
				this.ctx,
				this.canvas.width / 2,
				this.canvas.height / 2,
				this.radius,
				startAngle,
				startAngle + sliceAngle,
				this.colors[colorIndex % this.colors.length]
			);
			startAngle += sliceAngle; // met à jour l'angle de départ pour la prochaine tranche
			colorIndex++; // incrémente l'index des couleurs pour la prochaine tranche
		}
	}

	drawLabels() {

		var colorIndex = 0;
		var startAngle = -Math.PI / 2; // commencer le tracé à partir du haut du cercle
		for (var categ in this.options.data) {
			var val = this.options.data[categ];
			var sliceAngle = (2 * Math.PI * val) / this.totalValue;
			var labelX =
			this.canvas.width / 2 +
			(this.radius / 2) * Math.cos(startAngle + sliceAngle / 2);
			var labelY =
			this.canvas.height / 2 +
			(this.radius / 2) * Math.sin(startAngle + sliceAngle / 2);
			var labelText = Math.round((100 * val) / this.totalValue); // calcule le pourcentage que représente la valeur actuelle val par rapport à la somme totale des valeurs du graphique. Il est arrondi à l'entier le plus proche
			this.ctx.fillStyle = "black"; // couleur de police
			this.ctx.font = "32px Khand"; // taille et style de police
			this.ctx.fillText(labelText + "%", labelX, labelY); // écrit un texte donné à la position (x, y) donnée
			startAngle += sliceAngle;
		}
	}

	/*
	Basically, polar coordinates use a radius and an angle to define the position of a point. The two formulas we will use are:
	x = R * cos(angle)
	y = R * sin(angle)
	*/

	drawLegend() {

		let pIndex = 0;
		let legend = document.querySelector("div[for='myPieChart']");
		let ul = document.createElement("ul");
		legend.append(ul);
		for (let ctg of Object.keys(this.options.data)) { // boucle à travers les clés (noms des catégories) de l'objet data de this.options
			let li = document.createElement("li");
			li.style.listStyle = "none"; // enlève le style de puce par défaut de la liste non ordonnée
			li.style.borderLeft =
			"20px solid " + this.colors[pIndex % this.colors.length];
			li.style.padding = "5px";
			li.textContent = ctg;
			ul.append(li);
			pIndex++;
		}
	}

	drawTitle() {

		this.ctx.save();

		this.ctx.textBaseline = "bottom";
		this.ctx.textAlign = this.titleOptions.align;
		this.ctx.fillStyle = this.titleOptions.fill;
		this.ctx.font = `${this.titleOptions.font.weight} ${this.titleOptions.font.size} ${this.titleOptions.font.family}`;

		let xPos = this.canvas.width / 2; // calcule la position X du texte pour l'alignement centré par défaut (au milieu du canevas)

		if (this.titleOptions.align == "left") {
			xPos = 10;
		}
		if (this.titleOptions.align == "right") {
			xPos = this.canvas.width - 10;
		}

		this.ctx.fillText(this.options.seriesName, xPos, this.canvas.height);

		this.ctx.restore();
	}

	draw(){

		this.drawSlices();
		this.drawLabels();
		this.drawTitle();
		this.drawLegend();
	}
}

var myPiechart = new Piechart( // crée une nouvelle instance
	{
		canvas: pieChartCanvas,
		seriesName: "Vinyl records",
		padding: 40, // espace autour du pie chart pour éviter qu'il touche les bords
		data: {
			"Classical Music": 16,
			"Alternative Rock": 12,
			"Pop": 18,
			"Jazz": 32
		},
		colors: ["#80DEEA", "#FFE082", "#FFAB91", "#CE93D8"],
		titleOptions: {
			align: "center",
			fill: "white",
			font: {
				weight: "bold",
				size: "18px",
				family: "Lato"
			}
		}
	}
);

myPiechart.draw();

var barChartCanvas = document.getElementById("myBarChart");
barChartCanvas.width = 500;
barChartCanvas.height = 500;

var barChartCtx = barChartCanvas.getContext("2d");
