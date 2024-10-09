/*-----------------------------------##### CLASSES #####-----------------------------------*/
/*------------------------------########## TITLE ##########------------------------------*/

// Title class
class Title {
	constructor(options){
		this.options = options;
		this.canvas = options.canvas;
		this.ctx = this.canvas.getContext("2d");
		this.seriesName = options.seriesName;
		this.align = options.align;
		this.fill = options.fill;
		this.font = options.font;
	}

	drawTitle() {

		this.ctx.save();
		this.ctx.textBaseline = "bottom";
		this.ctx.textAlign = this.align;
		this.ctx.fillStyle = this.fill;
		this.ctx.font = `${this.font.weight} ${this.font.size} ${this.font.family}`;
		let xPos = this.canvas.width / 2;
		if (this.align == "left") {
			xPos = 10;
		}
		if (this.align == "right") {
			xPos = this.canvas.width - 10;
		}
		this.ctx.fillText(this.seriesName, xPos, this.canvas.height);
		this.ctx.restore();
	}
}

/*------------------------------########## LEGEND ##########------------------------------*/

// Legend class
class Legend{

	constructor(options){
		this.options = options;
		this.canvas = options.canvas;
		this.div = options.div;
		this.data = options.data;
		this.colors = options.colors;
	}

	drawLegend() {

		let pIndex = 0;
		let legend = document.querySelector("div[for='"+this.div+"']");
		let ul = document.createElement("ul");
		legend.append(ul);
		for (let ctg of Object.keys(this.options.data)) {
			let li = document.createElement("li");
			li.style.listStyle = "none";
			li.style.borderLeft =
				"20px solid " + this.colors[pIndex % this.colors.length];
			li.style.padding = "5px";
			li.textContent = ctg;
			ul.append(li);
			pIndex++;
		}
	}
}

/*------------------------------########## PIE CHART ##########------------------------------*/

// helper JS functions
function drawArc(ctx, centerX, centerY, radius, startAngle, endAngle, color){ // toutes les variables pour tracer l'arc de cercle avec x et y les coordonnées du centre et radius la coordonnée x de la fin de la ligne

	ctx.save();
	ctx.strokeStyle = color;
	ctx.beginPath();
	ctx.arc(centerX, centerY, radius, startAngle, endAngle); // ajoute un arc de cercle au tracé, en le centrant aux positions (x, y) et avec un rayon r qui démarre à angleDépart et qui finit à angleFin, dans la direction de sensAntiHoraire
	ctx.stroke();
	ctx.restore();
}

function drawPieSlice(ctx, centerX, centerY, radius, startAngle, endAngle, fillColor, strokeColor) { // toutes les variables pour remplir la part de tarte avec fillColor et strokeColor respectivement la couleur du remplissage et du périmètre

	ctx.save();
	ctx.fillStyle = fillColor; // spécifie la couleur ou style à utiliser à l'intérieur des formes
	ctx.strokeStyle = strokeColor;
	ctx.beginPath();
	ctx.moveTo(centerX, centerY);
	ctx.arc(centerX, centerY, radius, startAngle, endAngle, strokeColor);
	ctx.closePath(); // provoque le retour du stylo au point de départ du sous-traçé courant
	ctx.fill(); // remplit le chemin courant ou donné avec la couleur de fond en cours
	// ctx.stroke();
	ctx.restore();
}

// Pie chart class
class PieChart { // appel d'une classe pour créer des objets

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

	draw(){

		this.drawSlices();
		// this.drawLabels();
	}
}

/*------------------------------########## BAR CHART ##########------------------------------*/

// helper JS functions
function drawBarLine(ctx, startX, startY, endX, endY, color){ // toutes les variables pour tracer la ligne

	ctx.save(); //save et restore sont appelés pour éviter que les modifications faites au ctx dans cette fonction n'affecte d'autres dessins du même ctx
	ctx.strokeStyle = color;
	ctx.beginPath(); //informe le ctx qu'un nouveau dessin arrive
	ctx.moveTo(startX,startY);
	ctx.lineTo(endX,endY);
	ctx.stroke(); //lance le dessin selon les paramètres précisé ultérieurement
	ctx.restore();
}

function drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height, color){ //width est la largeur de la bar et height sa hauteur

	ctx.save();
	ctx.fillStyle = color;
	ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height); //dessine un rectangle plein aux coordonnées (x, y), aux dimensions déterminées par largeur et hauteur et au style déterminé par l'attribut fillStyle
	ctx.restore();
}

// Bar chart class
class BarChart {

	constructor(options) {

		this.options = options;
		this.canvas = options.canvas;
		this.ctx = this.canvas.getContext("2d");
		this.colors = options.colors;
		this.titleOptions = options.titleOptions;
		this.maxValue = Math.max(...Object.values(this.options.data));
	}

	drawGridLines() {

		var canvasActualHeight = this.canvas.height - this.options.padding * 2;
		var canvasActualWidth = this.canvas.width - this.options.padding * 2;
		var gridValue = 0;
		while (gridValue <= this.maxValue) { //boucle pour tracer chaque ligne de la grille, à chaque itération une ligne est tracée
			var gridY = //position verticale de chaque ligne de la grille
				canvasActualHeight * (1 - gridValue / this.maxValue) + // dépend de la hauteur du canva, de la ligne à laquelle on se trouve et de la présence de padding
				this.options.padding;
			drawBarLine( //trace une ligne horizontale sur tout le canevas, du côté gauche (0) au côté droit (largeur totale du canevas)
				this.ctx,
				0,
				gridY,
				this.canvas.width,
				gridY,
				this.options.gridColor
			);
			drawBarLine( //trace une ligne verticale près du bord gauche du canevas (coordonnée x = 15) allant du haut du canevas à la position gridY
				this.ctx,
				15,
				this.options.padding/2,
				15,
				gridY + this.options.padding/2,
				this.options.gridColor
			);
			this.ctx.save();
			this.ctx.fillStyle = this.options.gridColor;
			this.ctx.textBaseline = "bottom";
			this.ctx.font = "bold 10px Arial";
			this.ctx.fillText(gridValue, 0, gridY - 2);
			this.ctx.restore();
			gridValue += this.options.gridScale;
		}
	}

	drawBars() {

		var canvasActualHeight = this.canvas.height - this.options.padding * 2;
		var canvasActualWidth = this.canvas.width - this.options.padding * 2;
		var barIndex = 0;
		var numberOfBars = Object.keys(this.options.data).length; // nombre de bar à dessiner
		var barSize = canvasActualWidth / numberOfBars; //calcule les tailles de chaque bar selon la largeur disponible
		var values = Object.values(this.options.data);
		for (let val of values) { //boucle pour dessiner chaque bar
			var barHeight = Math.round((canvasActualHeight * val) / this.maxValue); // calcule hauteur des bar selon la valeur des données passées en arguments de la classe
			drawBar(
				this.ctx,
				this.options.padding + barIndex * barSize, // position x de la barre
				this.canvas.height - barHeight - this.options.padding, //position y de la barre
				barSize, // largeur de la barre
				barHeight, // hauteur de la barre
				this.colors[barIndex % this.colors.length]
			);
			barIndex++;
		}
	}

	draw() {

		// this.drawGridLines();
		this.drawBars();
	}
}

/*------------------------------########## PLOT CHART ##########------------------------------*/

// helper JS functions
function drawPlotLine(ctx, lineWidth, startX, startY, endX, endY, color){

	ctx.save();
	ctx.strokeStyle = color;
	ctx.lineWidth = lineWidth;
	ctx.beginPath();
	ctx.moveTo(startX,startY);
	ctx.lineTo(endX,endY);
	ctx.stroke();
	ctx.restore();
}

// Plot chart class
class PlotChart{

	constructor(options){
		this.options = options;
		this.canvas = options.canvas;
		this.ctx = this.canvas.getContext("2d");
		this.colors = options.colors;
		this.maxValue = Math.max(...Object.values(this.options.data));
	}

	drawGridLines() {

		var canvasActualHeight = this.canvas.height - this.options.padding * 2;
		var canvasActualWidth = this.canvas.width - this.options.padding * 2;
		var gridValue = 0;
		while (gridValue <= this.maxValue) {
			var gridY =
				canvasActualHeight * (1 - gridValue / this.maxValue) +
				this.options.padding;
			drawBarLine(
				this.ctx,
				0,
				gridY,
				this.canvas.width,
				gridY,
				this.options.gridColor
			);
			drawBarLine(
				this.ctx,
				15,
				this.options.padding/2,
				15,
				gridY + this.options.padding/2,
				this.options.gridColor
			);
			this.ctx.save();
			this.ctx.fillStyle = this.options.gridColor;
			this.ctx.textBaseline = "bottom";
			this.ctx.font = "bold 10px Arial";
			this.ctx.fillText(gridValue, 0, gridY - 2);
			this.ctx.restore();
			gridValue += this.options.gridScale;
		}
	}

	drawPlots(){

		var canvasActualHeight = this.canvas.height - this.options.padding * 2;
		var canvasActualWidth = this.canvas.width - this.options.padding * 2;
		var oldPointX = 0 + this.options.padding; // garder la coordonnée X du précédent point qui servira comme point de départ au point actuel
		var oldPointY = this.canvas.height - this.options.padding; //garder la coordonnée Y du précédent point qui servira comme point de départ au point actuel
		var pointIndex = 0.5;
		var colorIndex = 0; // chaque donnée aura sa propre couleur
		var numberOfPoints = Object.keys(this.options.data).length;
		var emptySpaceSize = canvasActualWidth / numberOfPoints; //distance horizontale qui séparera chaque point
		var values = Object.values(this.options.data);
		for (let val of values) { //boucle pour dessiner chaque bar
			var pointX = this.options.padding + (emptySpaceSize * pointIndex);
			var pointY = Math.round(canvasActualHeight - (canvasActualHeight * val) / this.maxValue);
			drawPlotLine(
				this.ctx,
				this.options.linePlotWidth, //largeur de la ligne séparant chaque point
				oldPointX,
				oldPointY,
				pointX,
				pointY,
				this.colors[colorIndex % this.colors.length]
			);
			oldPointX = pointX;
			oldPointY = pointY;
			pointIndex = pointIndex + 0.5;
			colorIndex++;
		}
	}

	draw() {

		// this.drawGridLines();
		this.drawPlots();
	}
}


/*-----------------------------------##### MAIN #####-----------------------------------*/

/*
var pieChartCanvas = document.getElementById("myPieChart");

pieChartCanvas.width = 500;
pieChartCanvas.height = 500;

var pieChartCtx = pieChartCanvas.getContext("2d");

var myPiechart = new PieChart( // crée une nouvelle instance avec ses options
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
	}
);

var myPieChartTitle = new Title(
	{
		canvas:pieChartCanvas		,
		seriesName:"Vinyl records",
		align: "center",
		fill: "white",
		font: {
			weight: "bold",
			size: "18px",
			family: "Lato"
		}
	}
);

var myPieChartLegend = new Legend(
	{
		canvas:pieChartCanvas,
		div:"myPieChartLegend",
		data: {
			"Classical Music": 16,
			"Alternative Rock": 12,
			"Pop": 18,
			"Jazz": 32,
		},
		colors: ["#80DEEA", "#FFE082", "#FFAB91", "#CE93D8"]
	}
);

myPiechart.draw();
myPieChartTitle.drawTitle();
myPieChartLegend.drawLegend();

var barChartCanvas = document.getElementById("myBarChart");
barChartCanvas.width = 500;
barChartCanvas.height = 500;

var barChartCtx = barChartCanvas.getContext("2d");

var myBarchart = new BarChart(
	{
		canvas:barChartCanvas,
		seriesName:"Vinyl records",
		padding:20,
		gridScale:5,
		gridColor:"#eeeeee",
		data: {
			"Classical Music": 16,
			"Alternative Rock": 12,
			"Pop": 18,
			"Jazz": 32,
		},
		colors: ["#80DEEA", "#FFE082", "#FFAB91", "#CE93D8"]
	}
);

var myBarChartTitle = new Title(
	{
		canvas:barChartCanvas		,
		seriesName:"Vinyl records",
		align: "center",
		fill: "white",
		font: {
			weight: "bold",
			size: "18px",
			family: "Lato"
		}
	}
);

var myBarChartLegend = new Legend(
	{
		canvas:barChartCanvas,
		div:"myBarChartLegend",
		data: {
			"Classical Music": 16,
			"Alternative Rock": 12,
			"Pop": 18,
			"Jazz": 32,
		},
		colors: ["#80DEEA", "#FFE082", "#FFAB91", "#CE93D8"]
	}
);

myBarchart.draw();
myBarChartTitle.drawTitle();
myBarChartLegend.drawLegend();

var plotChartCanvas = document.getElementById("myPlotChart");
plotChartCanvas.width = 500;
plotChartCanvas.height = 500;

var plotChartCtx = plotChartCanvas.getContext("2d");

var myPlotChart = new PlotChart(
	{
		canvas:plotChartCanvas,
		seriesName:"Vinyl records",
		padding:20,
		gridScale:5,
		gridColor:"white",
		lineGridWidth:1,
		linePlotWidth:5,
		data: {
			"Classical Music": 16,
			"Alternative Rock": 12,
			"Pop": 18,
			"Jazz": 32,
		},
		colors: ["#80DEEA", "#FFE082", "#FFAB91", "#CE93D8"]
	}
);

var myPlotChartTitle = new Title(
	{
		canvas:plotChartCanvas,
		seriesName:"Vinyl records",
		align: "center",
		fill: "white",
		font: {
			weight: "bold",
			size: "18px",
			family: "Lato"
		}
	}
);

var myPlotChartLegend = new Legend(
	{
		canvas:plotChartCanvas,
		div:"myPlotChartLegend",
		data: {
			"Classical Music": 16,
			"Alternative Rock": 12,
			"Pop": 18,
			"Jazz": 32,
		},
		colors: ["#80DEEA", "#FFE082", "#FFAB91", "#CE93D8"]
	}
);

myPlotChart.draw();
myPlotChartTitle.drawTitle();
myPlotChartLegend.drawLegend();
*/
