document.addEventListener("DOMContentLoaded", async function() {
	// Appeler la fonction await backendPost ici
	await backendPost("/get/currentuser/");

	// Vérifier le résultat et modifier le bouton en conséquence
	if (buffer.error === "You're not logged in") {
		document.getElementById("logInButton").innerHTML = `
			<a class="nav-link" href="#login">Log in</a>
		`;
	} else if (buffer.error) {
		document.getElementById("logInButton").innerHTML = buffer.error;
	} else {
		document.getElementById("logInButton").innerHTML = `
			<a class="nav-link" href="#profile" onclick="displayProfilePage()">Profile</a>
		`;
	}
});

function displayNextMatch() {

	document.getElementById('informationOutput').innerText = `${player1} - ${player2}`;
}

async function displayLeaderboard() {

	await backendPost("/get/bestplayers/");
	if (buffer.error){
		document.getElementById('informationOutput').innerText = buffer.error;
		return;
	}
	const playersList = buffer.message
	if (playersList.length === 0){
		document.getElementById('informationOutput').innerText = "No players found.";
	}
	else{
		document.getElementById('informationOutput').innerText = null;
	for (let i = 0; i < playersList.length && playersList; i++){
		document.getElementById('informationOutput').innerText += `${i} - ${playersList[i].username} (${playersList[i].matches_won} ${playersList[i].matches_won < 1 ? "win" : "wins"})\n`;
	}
	}
}

function displayCurrentMatchStats(){

	document.getElementById("matchStatsOutput").innerHTML = `
		<h3 class="text-dark">Statistiques de la partie : ${player1} - ${player2}</h3>
		<p class="text-dark">Points gagnés par ${player1} : ${leftScore}</p>
		<p class="text-dark">Points gagnés par ${player2} : ${rightScore}</p>
		<p class="text-dark">Points joués : ${leftScore + rightScore}</p>
		<p class="text-dark">Victoire de : ${leftScore > rightScore ? player1 : player2}</p>
	`;
	document.getElementById("player1StatsOutput").innerHTML = `
		<h3 class="text-dark">Statistiques de ${player1}</h3>
		<p class="text-dark">Points gagnés : ${leftScore}</p>
		<p class="text-dark">Points perdus : ${rightScore}</p>
		<p class="text-dark">Précision : ${Math.round(leftScore/(rightScore + leftScore)*100)}%</p>
	`;
	document.getElementById("player2StatsOutput").innerHTML = `
		<h3 class="text-dark">Statistiques de ${player2}</h3>
		<p class="text-dark">Points gagnés : ${rightScore}</p>
		<p class="text-dark">Points perdus : ${leftScore}</p>
		<p class="text-dark">Précision : ${Math.round(rightScore/(rightScore + leftScore)*100)}%</p>
	`;
}

var currInputPlayer;
function searchAndDisplayPlayerStats(){

	currInputPlayer = document.getElementById('searchInputPlayer');
	displayGlobalStats();
}

async function displayGlobalStats() {

	if (!currInputPlayer){
		document.getElementById("playerStatsOutput").innerHTML = `
			<p class="text-dark">No players selected.</p>
		`;
		return;
	}
	console.log(currInputPlayer.value);
	await backendPost("/get/globalstats/", currInputPlayer.value);
	if (buffer.error){
		document.getElementById("playerStatsOutput").innerHTML = `
		<p class="text-dark">${buffer.error}</p>
		`
	}
	else{
	console.log(buffer.message);
	document.getElementById("playerStatsOutput").innerHTML = `
		<h3 class="text-dark">Global statistics of ${currInputPlayer.value}</h3>
		<p class="text-dark">Points won : ${buffer.message.pointsWon}</p>
		<p class="text-dark">Points lost : ${buffer.message.pointsLost}</p>
		<p class="text-dark">Points played : ${buffer.message.pointsPlayed}</p>
		<p class="text-dark">Matches won : ${buffer.message.matchesWon}</p>
		<p class="text-dark">Matches lost : ${buffer.message.matchesLost}</p>
		<p class="text-dark">Matches played : ${buffer.message.matchesPlayed}</p>
	`;
	}
}

async function displaySoloStats(){

	if (!currInputPlayer){
		document.getElementById("playerStatsOutput").innerHTML = `
			<p class="text-dark">No players selected.</p>
		`;
		return;
	}
	await backendPost("/get/solostats/", currInputPlayer.value);
	if (buffer.error){
		document.getElementById("playerStatsOutput").innerHTML = `
		<p class="text-dark">${buffer.error}</p>
		`
	}
	else{
	document.getElementById("playerStatsOutput").innerHTML = `
		<h3 class="text-dark">Solo statistics of ${currInputPlayer.value}</h3>
		<p class="text-dark">Points won : ${buffer.message.pointsWon}</p>
		<p class="text-dark">Points lost : ${buffer.message.pointsLost}</p>
		<p class="text-dark">Points played : ${buffer.message.pointsPlayed}</p>
		<p class="text-dark">Matches won : ${buffer.message.matchesWon}</p>
		<p class="text-dark">Matches lost : ${buffer.message.matchesLost}</p>
		<p class="text-dark">Matches played : ${buffer.message.matchesPlayed}</p>
	`;
	}
}

async function displayDuoStats(){

	if (!currInputPlayer){
		document.getElementById("playerStatsOutput").innerHTML = `
			<p class="text-dark">No players selected.</p>
		`;
		return;
	}
	await backendPost("/get/duostats/", currInputPlayer.value);
	if (buffer.error){
		document.getElementById("playerStatsOutput").innerHTML = `
		<p class="text-dark">${buffer.error}</p>
		`
	}
	else{
	document.getElementById("playerStatsOutput").innerHTML = `
		<h3 class="text-dark">Duo statistics of ${currInputPlayer.value}</h3>
		<p class="text-dark">Points won : ${buffer.message.pointsWon}</p>
		<p class="text-dark">Points lost : ${buffer.message.pointsLost}</p>
		<p class="text-dark">Points played : ${buffer.message.pointsPlayed}</p>
		<p class="text-dark">Matches won : ${buffer.message.matchesWon}</p>
		<p class="text-dark">Matches lost : ${buffer.message.matchesLost}</p>
		<p class="text-dark">Matches played : ${buffer.message.matchesPlayed}</p>
	`;
	}
}

async function displayTournamentStats(){

	if (!currInputPlayer){
		document.getElementById("playerStatsOutput").innerHTML = `
			<p class="text-dark">No players selected.</p>
		`;
		return;
	}
	await backendPost("/get/tournamentstats/", currInputPlayer.value);
	if (buffer.error){
		document.getElementById("playerStatsOutput").innerHTML = `
		<p class="text-dark">${buffer.error}</p>
		`
	}
	else{
	document.getElementById("playerStatsOutput").innerHTML = `
		<h3 class="text-dark">Tournament statistics of ${currInputPlayer.value}</h3>
		<p class="text-dark">Points won : ${buffer.message.pointsWon}</p>
		<p class="text-dark">Points lost : ${buffer.message.pointsLost}</p>
		<p class="text-dark">Points played : ${buffer.message.pointsPlayed}</p>
		<p class="text-dark">Matches won : ${buffer.message.matchesWon}</p>
		<p class="text-dark">Matches lost : ${buffer.message.matchesLost}</p>
		<p class="text-dark">Matches played : ${buffer.message.matchesPlayed}</p>
		<p class="text-dark">Tournament won : ${buffer.message.tournamentsWon}</p>
		<p class="text-dark">Tournament lost : ${buffer.message.tournamentsLost}</p>
		<p class="text-dark">Tournament played : ${buffer.message.tournamentsPlayed}</p>
	`;
	}
}

async function displayVictoriesAndDefeatsGraph(){

	if (!currInputPlayer){
		document.getElementById("playerStatsOutput").innerHTML = `
			<p class="text-dark">No players selected.</p>
		`;
		return;
	}
	await backendPost("/get/victories/", currInputPlayer.value);
	if (buffer.error){
		document.getElementById("playerStatsOutput").innerHTML = `
		<p class="text-dark">${buffer.error}</p>
		`
		return;
	}
	const victories = buffer.message.matchesWon;
	await backendPost("/get/defeats/", currInputPlayer.value);
	if (buffer.error){
		document.getElementById("playerStatsOutput").innerHTML = `
		<p class="text-dark">${buffer.error}</p>
		`
		return;
	}
	const defeats = buffer.message.matchesLost;

	if (victories === 0 && defeats === 0){
		document.getElementById("playerStatsOutput").innerHTML = `
			<h3 class="text-dark">Graphic statistics of ${currInputPlayer.value}</h3>
			<p class="text-dark">No matches found</p>
		`;
	}
	else{
	document.getElementById("playerStatsOutput").innerHTML = `
		<h3 class="text-dark">Graphic statistics of ${currInputPlayer.value}</h3>
		<div class="d-flex align-item-center">
		<canvas class="bg-light" id="myPlayerChart"></canvas>
		<div class="text-dark" for="myPlayerChartLegend"></div>
		</div>
	`;

	const canvas = document.getElementById('myPlayerChart');
	canvas.width = 500;
	canvas.height = 500;

	const chartOptions = {
		canvas: canvas,
		seriesName: "Results distribution",
		padding: 40,
		data: {
			"Victories": victories,
			"Defeats": defeats
		},
		colors: ["#80DEEA", "#FFE082", "#FFAB91", "#CE93D8"]
	};

	var myPiechart = new PieChart(chartOptions);
	myPiechart.draw();

	// const titleOptions = {
	// 	canvas: canvas,
	// 	seriesName: "Results distribution",
	// 	align: "center",
	// 	fill: "dark",
	// 	font: {
	// 		weight: "bold",
	// 		size: "18px",
	// 		family: "system-ui"
	// 	}
	// };

	// var myPieChartTitle = new Title(titleOptions);
	// myPieChartTitle.drawTitle();

	const legendOptions = {
		canvas: canvas,
		div: "myPlayerChartLegend",
		data: {
			"Victories": victories,
			"Defeats": defeats
		},
		colors: ["#80DEEA", "#FFE082", "#FFAB91", "#CE93D8"]
	};
	var myPieChartLegend = new Legend(legendOptions);
	myPieChartLegend.drawLegend();
	}
}

async function displayVictoriesByModeGraph(){

	if (!currInputPlayer){
		document.getElementById("playerStatsOutput").innerHTML = `
			<p class="text-dark">No players selected.</p>
		`;
		return;
	}
	await backendPost("/get/victoriesbymode/", currInputPlayer.value);
	if (buffer.error){
		document.getElementById("playerStatsOutput").innerHTML = `
		<p class="text-dark">${buffer.error}</p>
		`
		return;
	}
	const soloWins = buffer.message.SoloMatchesWins;
	const duoWins = buffer.message.DuoMatchesWins;
	const tournamentWins = buffer.message.TournamentMatchesWins;
	if (soloWins === 0 && duoWins === 0 && tournamentWins === 0){
		document.getElementById("playerStatsOutput").innerHTML = `
			<h3 class="text-dark">Graphic statistics of ${currInputPlayer.value}</h3>
			<p class="text-dark">No matches or no wins found</p>
		`;
	}
	else{
	document.getElementById("playerStatsOutput").innerHTML = `
		<h3 class="text-dark">Graphic statistics of ${currInputPlayer.value}</h3>
		<div class="d-flex align-item-center">
		<canvas class="bg-light" id="myPlayerChart"></canvas>
		<div class="text-dark" for="myPlayerChartLegend"></div>
		</div>
	`;

	const canvas = document.getElementById('myPlayerChart');
	canvas.width = 500;
	canvas.height = 500;

	var gridScaleValue = Math.ceil(soloWins +
		duoWins +
		tournamentWins / 3);
	const barChartOptions = {
		canvas: canvas,
		seriesName:"Répartition des victoires par mode de jeux",
		padding: 20,
		gridScale: gridScaleValue,
		gridColor:"#0X33E31",
		data: {
			"Solo": soloWins,
			"Duo": duoWins,
			"Tournoi": tournamentWins,
		},
		colors: ["#80DEEA", "#FFE082", "#FFAB91", "#CE93D8"]
	};

	var myBarChart = new BarChart(barChartOptions);
	myBarChart.draw();

	// const titleOptions = {
	// 	canvas: canvas,
	// 	seriesName: "Répartition des victoires par mode de jeux",
	// 	align: "center",
	// 	fill: "dark",
	// 	font: {
	// 		weight: "bold",
	// 		size: "18px",
	// 		family: "system-ui"
	// 	}
	// };

	// var myBarChartTitle = new Title(titleOptions);
	// myBarChartTitle.drawTitle();

	const legendOptions = {
		canvas: canvas,
		div: "myPlayerChartLegend",
		data: {
			"Solo": soloWins,
			"Duo": duoWins,
			"Tournoi": tournamentWins,
		},
		colors: ["#80DEEA", "#FFE082", "#FFAB91", "#CE93D8"]
	};
	var myBarChartLegend = new Legend(legendOptions);
	myBarChartLegend.drawLegend();
	}
}

async function displayPointsByMatchGraph(){

	if (!currInputPlayer){
		document.getElementById("playerStatsOutput").innerHTML = `
			<p class="text-dark">No players selected.</p>
		`;
		return;
	}
	await backendPost("/get/pointsbymatch/", currInputPlayer.value);
	if (buffer.error){
		document.getElementById("playerStatsOutput").innerHTML = `
		<p class="text-dark">${buffer.error}</p>
		`
		return;
	}
	const pointsOverTime = buffer.message.matches;
	if (pointsOverTime.length === 0){
		document.getElementById("playerStatsOutput").innerHTML = `
			<h3 class="text-dark">Graphic statistics of ${currInputPlayer.value}</h3>
			<p class="text-dark">No matches or no wins found</p>
		`;
	}
	else{
	document.getElementById("playerStatsOutput").innerHTML = `
		<h3 class="text-dark">Graphic stats of ${currInputPlayer.value}</h3>
		<div class="d-flex align-item-center">
		<canvas class="bg-light" id="myPlayerChart"></canvas>
		<div class="text-dark" for="myPlayerChartLegend"></div>
		</div>
	`;

	const canvas = document.getElementById('myPlayerChart');
	canvas.width = 500;
	canvas.height = 500;

	var n = 0;
	var mapping = {};
	var gridScaleValue;
	for (let i = 0; i < pointsOverTime.length; i++) {
		mapping["Match " + i] = pointsOverTime[i];
		gridScaleValue += pointsOverTime[i];
		n++;
	}
	gridScaleValue = Math.ceil(gridScaleValue / n);

	const plotChartOptions = {
		canvas: canvas,
			seriesName:"Points gagnés au cours des parties",
			padding:20,
			gridScale:gridScaleValue,
			gridColor:"black",
			lineGridWidth:1,
			linePlotWidth:5,
			data: mapping,
			colors: ["#80DEEA", "#FFE082", "#FFAB91", "#CE93D8"]
	};

	var myPlotChart = new PlotChart(plotChartOptions);
	myPlotChart.draw();

	// const titleOptions = {
	// 	canvas: canvas,
	// 	seriesName: "Points gagnés au cours des parties",
	// 	align: "center",
	// 	fill: "dark",
	// 	font: {
	// 		weight: "bold",
	// 		size: "18px",
	// 		family: "system-ui"
	// 	}
	// };

	// var myPlotChartTitle = new Title(titleOptions);
	// myPlotChartTitle.drawTitle();

	const legendOptions = {
		canvas: canvas,
		div: "myPlayerChartLegend",
		data: mapping,
		colors: ["#80DEEA", "#FFE082", "#FFAB91", "#CE93D8"]
	};

	var myPlotChartLegend = new Legend(legendOptions);
	myPlotChartLegend.drawLegend();
	}
}

async function displayMatchStats(){

	if (!currInputPlayer){
		document.getElementById("playerStatsOutput").innerHTML = `
			<p class="text-dark">No players selected.</p>
		`;
		return;
	}

	await backendPost("/get/matchstats/", currInputPlayer.value);
	if (buffer.error){
		document.getElementById("playerStatsOutput").innerHTML = `
		<p class="text-dark">${buffer.error}</p>
		`
		return;
	}
	const matches = JSON.parse(buffer.message);
	if (matches.length === 0){
		document.getElementById("playerStatsOutput").innerHTML = `
			<h3 class="text-dark">Graphic statistics of ${currInputPlayer.value}</h3>
			<p class="text-dark">No matches found</p>
		`;
	}
	else{
	document.getElementById("playerStatsOutput").innerHTML = `
			<h3 class="text-dark">Graphic statistics of ${currInputPlayer.value}</h3>
		`;
	console.log(matches);
	for (let i = 0; i < matches.length; i++){
		document.getElementById("playerStatsOutput").innerHTML += `
			<h5 class="text-dark">Match ${i}</h5>
			<p class="text-dark">${matches[i].fields.player1} (${matches[i].fields.player1_points}) - ${matches[i].fields.player2} (${matches[i].fields.player2_points})</p>
			<p class="text-dark">Mode : ${matches[i].fields.mode}</p>
			<p class="text-dark">Date : ${matches[i].fields.date}</p>
			<p class="text-dark">Match time :  ${matches[i].fields.match_time}</p>
		`;
	}
	}
}

function displayProfilePage(){

	displayUsername();
	// displayAvatar();
	displayFriendsList();
}

async function displayUsername(){

	var currentUser;
	await backendPost("/get/currentuser/");
	if (buffer.error)
		document.getElementById("usernameProfileOutput").innerText = buffer.error;
	else
	{
		currentUser = buffer.message;
		document.getElementById("usernameProfileOutput").innerText = currentUser;
	}
	await backendPost("/get/victories/", currentUser);
	if (buffer.error)
		document.getElementById("victoriesProfileOutput").innerText = buffer.error;
	else
		document.getElementById("victoriesProfileOutput").innerText = `${buffer.message.matchesWon} ${buffer.message.matchesWon < 1 ? " win" : " wins"}`;
	await backendPost("/get/defeats/", currentUser);
	if (buffer.error)
		document.getElementById("defeatsProfileOutput").innerText = buffer.error;
	else
		document.getElementById("defeatsProfileOutput").innerText = `${buffer.message.matchesLost} ${buffer.message.matchesLost < 1 ? " loss" : " losses"}`;
}

// function displayAvatar(){

// 	backendPost("/get/avatar/");

// 	const avatarPicture = document.querySelector(".image img");
// 	avatarPicture.src = URL.createObjectURL(buffer);
// }

// function uploadAndDisplayAvatar(){

// 	const userFile = document.getElementById("filePath");

// 	userFile.onchange = function() {
// 		backendPost("/post/changeavatar/", userFile.files[0]);
// 		displayAvatar();
// 	}
// }

async function searchAndAddFriend(){

	var input = document.getElementById('searchInputProfile');
	await backendPost("/post/addfriend/", input.value);
	if (buffer.error){
		document.getElementById("addFriendOutput").innerHTML = buffer.error;
	}
	else{
		document.getElementById("addFriendOutput").innerHTML = buffer.message;
	}
}

async function displayFriendsList() {

	//loop here to display friend requests
	await backendPost("/get/friendrequests/");
	if (buffer.error){
		document.getElementById("requestsList").innerHTML = `
		<p class="text-light">${buffer.error}</p>
		`
	}
	else{
		const requestsList = buffer.message.requests;
		document.getElementById("requestsList").innerHTML = null;
	for (let i = 0; i < requestsList.length; i++){
		document.getElementById("requestsList").innerHTML += `
			<li class="d-flex inline">
				<h5>${requestsList[i]}</h5>
				<button type="button" class="btn btn-outline-light ms-2"><i class="bi bi-check-circle" style="font-size: 20px"></i></button>
				<button type="button" class="btn btn-outline-light ms-3"><i class="bi bi-slash-circle" style="font-size: 20px"></i></button>
			</li>
		`
		//event listener to accept or decline invitation
	}
	}
	//loop here to display friends list
	await backendPost("/get/friendslist/")
	if (buffer.error){
		document.getElementById("friendsList").innerHTML = `
		<p class="text-light">${buffer.error}</p>
		`
	}
	else{
		console.log(buffer.message);
		console.log(buffer.message.friends);
		const friendsList = buffer.message.friends;
		document.getElementById("friendsList").innerHTML = null;
	for (let i = 0; i < friendsList.length; i++){
		// backendPost("/get/isuserconnected/", friend);
		// if (buffer === true){
			//if friend is online display a 'green circle'
			document.getElementById("friendsList").innerHTML += `
				<li class="d-flex inline">
					<h5>${friendsList[i]}</h5>
					<img src="img/icons8-online-24.png" alt="online" width="24" height="24"></img>
					<button type="button" class="btn btn-outline-light ms-3"><i class="bi bi-trash3" style="font-size: 20px"></i></button>
				</li>
			`
		// }
		// else{
		// 	//else display a 'red circle'
		// 	document.getElementById("friendsList").innerHTML.innerHTML += `
		// 		<li class="d-flex inline">
		// 			<h5>${friend}</h5>
		// 			<img src="img/icons8-offline-24.png" alt="offline" width="24" height="24"></img>
		// 			<button type="button" class="btn btn-outline-light ms-3"><i class="bi bi-trash3" style="font-size: 20px"></i></button>
		// 		</li>
		// 	`
		// }
	}
	}
}

// function acceptFriendRequest(requestor){

// 	backendPost("/post/acceptfriendrequest/", requestor);
// 	displayFriendsList();
// }

// function declineFriendRequest(requestor){

// 	backendPost("/post/declinefriendrequest/", requestor);
// 	displayFriendsList();
// }

// function removeFriend(friend){

// 	backendPost("/post/removefriend/", friend);
// 	displayFriendsList();
// }

// Appeler la fonction await backendPost ici
async function updateLogInButton(){

	await backendPost("/get/currentuser/");

	// Vérifier le résultat et modifier le bouton en conséquence
	if (buffer.error === "You're not logged in") {
		document.getElementById("logInButton").innerHTML = `
			<a class="nav-link" href="#login">Log in</a>
		`;
	} else if (buffer.error) {
		document.getElementById("logInButton").innerHTML = buffer.error;
	} else {
		document.getElementById("logInButton").innerHTML = `
			<a class="nav-link" href="#profile" onclick="displayProfilePage()">Profile</a>
		`;
	}
}

async function logInWith42(){

	await backendPost("/api_42/");
	if (buffer.error){
		document.getElementById("logInOutput").innerText = buffer.error;
	}
	else{
		window.location.href = "#home";
		// hideAllContentDivs();
		// document.getElementsByClassName('content-profile')[0].style.display='block';
	}
	updateLogInButton();
}

async function logIn(){

	var frm = document.querySelector('#logInForm');
	var username = frm.querySelector('input[type=text]');
	var password = frm.querySelector('input[type=password]');
	var inputs = [];

	inputs.push(username);
	inputs.push(password);
	for (var i = 0; i < inputs.length; i++){
		const value = inputs[i].value;
		if (value.includes(" ")){
			document.getElementById('logInOutput').innerText = 'Mauvaise saisie: "' + value + '" contient des espaces.';
			return false;
		}
		else if (value === ''){
			document.getElementById('logInOutput').innerText = 'Champ vide.';
			return false;
		}
	}
	await backendPost("/login/", inputs[0].value, inputs[1].value);
	if (buffer.error){
		document.getElementById("logInOutput").innerText = buffer.error;
	}
	else{
		window.location.href = "#home";
		// hideAllContentDivs();
		// document.getElementsByClassName('content-profile')[0].style.display='block';
	}
	updateLogInButton();
}

async function logOut(){

	await backendPost("/logout/");
	if (buffer.error){
		alert(buffer.error);
	}
	else
		window.location.href = "#home";
	updateLogInButton();
}

async function signUp(){

	var frm = document.querySelector('#signUpForm');
	var username = frm.querySelector('input[type=text]');
	var password = frm.querySelector('input[type=password]');
	var inputs = [];

	inputs.push(username);
	inputs.push(password);
	for (var i = 0; i < inputs.length; i++){
		const value = inputs[i].value;
		if (value.includes(" ")){
			document.getElementById('signUpOutput').innerText = 'Mauvaise saisie: "' + value + '" contient des espaces.';
			return false;
		}
		else if (value === ''){
			document.getElementById('signUpOutput').innerText = 'Champ vide.';
			return false;
		}
	}
	await backendPost("/register/", inputs[0].value, inputs[1].value);
	if (buffer.error){
		document.getElementById("signUpOutput").innerText = buffer.error;
	}
	else{
		window.location.href = "#home";
		// hideAllContentDivs();
		// document.getElementsByClassName('content-profile')[0].style.display='block';
	}
	updateLogInButton();
}

function updateUsername(){

	var frm = document.querySelector('#updateUsernameForm');
	var inputs = frm.querySelectorAll('input[type=text]');

	const value = inputs[1].value;
	if (value.includes(" ")){
		document.getElementById('updateUsernameOutput').innerText = 'Mauvaise saisie: "' + value + '" contient des espaces.';
		return false;
	}
	else if (value === ''){
		document.getElementById('updateUsernameOutput').innerText = 'Champ vide.';
		return false;
	}
	// backendPost("/post/username/", value);
	// document.getElementById("updateUsernameOutput").innerText = buffer;
}

function updatePassword(){

	var frm = document.querySelector('#updatePasswordForm');
	var inputs = frm.querySelectorAll('input[type=password]');

	const value = inputs[1].value;
	if (value.includes(" ")){
		document.getElementById('updatePasswordOutput').textContent = 'Mauvaise saisie: "' + value + '" contient des espaces.';
		return false;
	}
	else if (value === ''){
		document.getElementById('updatePasswordOutput').textContent = 'Champ vide.';
		return false;
	}
	// backendPost("/post/password/", value);
	// document.getElementById("updatePasswordOutput").innerText = buffer;
}

function addPlayerToForm(){

	// Compter le nombre actuel de champs d'input
	const playersNumber = document.querySelectorAll('#tournamentInputs #playerInputs .col-12').length;

	if (playersNumber == 8)
		return;
	// Créer un nouvel élément div pour le champ input
	const newInputDiv = document.createElement('div');
	newInputDiv.classList.add('col-12');

	const newLabel = document.createElement('label');
	newLabel.setAttribute('for', 'player' + (playersNumber + 1));
	newLabel.classList.add('form-label');
	newLabel.textContent = 'Surnom *';

	// Créer le nouvel input
	const newInput = document.createElement('input');
	newInput.type = 'text';
	newInput.classList.add('form-control');
	newInput.name = 'player' + (playersNumber + 1);
	// newInput.id = 'player' + (playersNumber + 1);
	newInput.maxLength = '15';
	newInput.required = ' ';

	// Ajouter le label et l'input au div
	newInputDiv.appendChild(newLabel);
	newInputDiv.appendChild(newInput);

	// Ajouter le nouveau div au conteneur de champs
	document.querySelector('#tournamentInputs #playerInputs').appendChild(newInputDiv);
}

function removePlayerFromForm(){

	const playersNumber = document.querySelectorAll('#tournamentInputs #playerInputs .col-12').length;
	const divInputs = document.querySelectorAll('#tournamentInputs #playerInputs .col-12');

	if (playersNumber <= 3)
		return;

	divInputs[divInputs.length - 1].remove();
}

async function launchTournament(){

	var frm = document.querySelector('#tournamentForm');
	var inputs = frm.querySelectorAll('input[type=text]');
	// e.preventDefault();
	// e.stopPropagation();
	var classArr = [];
	for(var i = 0; i < inputs.length; i++){
		const value = inputs[i].value;
		if (value.includes(" ")){
			document.getElementById('tournamentOutputText').innerText = 'Mauvaise saisie: "' + value + '" contient des espaces.';
			return false;
		}
		else if (classArr.includes(value)){
			document.getElementById('tournamentOutputText').innerText = 'Mauvaise saisie: "' + value + '" est doublon.';
			return false;
		}
		if (value === ''){
			document.getElementById('tournamentOutputText').innerText = 'Veuillez remplir tous les champs.';
			return false;
		}
		classArr.push(value);
	}
	onClickTournament();
	alias = inputs[0].value;
	for (var i = 0; i < inputs.length; i++)
		players[i].name = inputs[i].value;
	await backendPost("/get/currentuser/");
	if (buffer.error){
		document.getElementById('tournamentOutputText').innerText = buffer.error;
		return false;
	}
	players[0].name = buffer.message;
	playersCount = inputs.length;
	findNextMatch();
	hideAllContentDivs();
	document.getElementsByClassName('content-game')[0].style.display='block';
	window.location.href = "#game";
}

async function launchDuoMatch(){

	var frm = document.querySelector('#duoForm');
	var inputs = frm.querySelectorAll('input[type=text]');
	// e.preventDefault();
	// e.stopPropagation();
	var classArr = [];
	for(var i = 0; i < inputs.length; i++){
		const value = inputs[i].value;
		if (value.includes(" ")){
			document.getElementById('duoOutputText').innerText = 'Mauvaise saisie: "' + value + '" contient des espaces.';
			return false;
		}
		else if (classArr.includes(value)){
			document.getElementById('duoOutputText').innerText = 'Mauvaise saisie: "' + value + '" est doublon.';
			return false;
		}
		if (value === ''){
			document.getElementById('duoOutputText').innerText = 'Veuillez remplir tous les champs.';
			return false;
		}
		classArr.push(value);
	}
	onClickDuo();
	alias = inputs[0].value;
	await backendPost("/get/currentuser/");
	if (buffer.error){
		document.getElementById('duoOutputText').innerText = buffer.error;
		return false;
	}
	player1 = buffer.message;
	player2 = inputs[1].value;
	hideAllContentDivs();
	document.getElementsByClassName('content-game')[0].style.display='block';
	window.location.href = "#game";
}

// window.addEventListener('popstate', function (e) {

// 	// console.log("History changed")
// });

// window.addEventListener('hashchange', function (e) {

// 	// console.log("Hash changed");
// });

// var previousFragment = window.location.hash.substring(1);
// var state = false;
window.addEventListener('hashchange', function (e) {

	var currentFragment = window.location.hash.substring(1);
	// console.log("Current: "+currentFragment);
	// console.log("Previous: "+previousFragment);
	var fragmentsArray = ["home", "game", "duo", "tournament", "stats", "profile", "blockchain", "login", "signup"];

	for (let fragment of fragmentsArray){
		if (currentFragment === fragment){
			// if (currentFragment !== "game")
			// 	state = false;
			// else if (currentFragment === "game" && state === false){
			// 	history.back();
			// 	currentFragment = window.location.hash.substring(1);
			// }
			// if (currentFragment === "game"){
			// 	hideAllContentDivs();
			// 	page = 'content-home';
			// 	document.getElementsByClassName(page)[0].style.display='block';
			// }
			// else{
				// while (currentFragment === "game"){
				// 	history.go(-1);
				// 	currentFragment = window.location.hash.substring(1);
				// 	console.log("Fragment in while loop: "+currentFragment);
				// }
				hideAllContentDivs();
				page = 'content-' + currentFragment;
				document.getElementsByClassName(page)[0].style.display='block';
			// }
			// previousFragment = currentFragment;
			break;
		}
	}
});
