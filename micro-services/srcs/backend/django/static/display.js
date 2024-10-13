document.addEventListener("DOMContentLoaded", async function() {
	// Appeler la fonction await backendPost ici
	await backendPost("/get/currentuser/");
	// Vérifier le résultat et modifier le bouton en conséquence
	if (buffer.error === "You're not logged in") {
		document.getElementById("logInButton").innerHTML = `
			<a class="btn btn-outline-light" href="#login">Log in</a>
		`;
	} else if (buffer.error) {
		alert(buffer.error);
	} else {
		document.getElementById("logInButton").innerHTML = `
			<a class="btn btn-outline-light" href="#profile" onclick="displayProfilePage()">Profile</a>
		`;
	}
	window.location.href="#home";
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
		document.getElementById('informationOutput').innerText += `${i} - ${playersList[i].username} (${playersList[i].matches_won} ${playersList[i].matches_won < 2 ? "win" : "wins"})\n`;
	}
	}
}

function displayCurrentMatchStats(){

	document.getElementById("matchStatsOutput").innerHTML = `
		<h3 class="text-light">Statistics of the match : ${player1} - ${player2}</h3>
		<p class="text-light">Points won by ${player1} : ${leftScore}</p>
		<p class="text-light">Points won by ${player2} : ${rightScore}</p>
		<p class="text-light">Points played : ${leftScore + rightScore}</p>
		<p class="text-light">Winner is : ${leftScore > rightScore ? player1 : player2}</p>
	`;
	document.getElementById("player1StatsOutput").innerHTML = `
		<h3 class="text-light">Statistics of ${player1}</h3>
		<p class="text-light">Points won : ${leftScore}</p>
		<p class="text-light">Points lost : ${rightScore}</p>
		<p class="text-light">Accuracy : ${Math.round(leftScore/(rightScore + leftScore)*100)}%</p>
	`;
	document.getElementById("player2StatsOutput").innerHTML = `
		<h3 class="text-light">Statistics of ${player2}</h3>
		<p class="text-light">Points won : ${rightScore}</p>
		<p class="text-light">Points lost : ${leftScore}</p>
		<p class="text-light">Accuracy : ${Math.round(rightScore/(rightScore + leftScore)*100)}%</p>
	`;
}

var currInputPlayer;
function searchAndDisplayPlayerStats(){

	currInputPlayer = document.getElementById('searchPlayerInput');
	displayGlobalStats();
}

async function displayGlobalStats() {

	if (!currInputPlayer){
		document.getElementById("playerStatsOutput").innerHTML = `
			<p class="text-light">No players selected.</p>
		`;
		return;
	}
	await backendPost("/get/globalstats/", currInputPlayer.value);
	if (buffer.error){
		alert(buffer.error);
		// document.getElementById("playerStatsOutput").innerHTML = `
		// <p class="text-light">${buffer.error}</p>
		// `;
	}
	else{
	document.getElementById("playerStatsOutput").innerHTML = `
		<h3 class="text-light">Global statistics of ${currInputPlayer.value}</h3>
		<p class="text-light">Points won : ${buffer.message.pointsWon}</p>
		<p class="text-light">Points lost : ${buffer.message.pointsLost}</p>
		<p class="text-light">Points played : ${buffer.message.pointsPlayed}</p>
		<p class="text-light">Matches won : ${buffer.message.matchesWon}</p>
		<p class="text-light">Matches lost : ${buffer.message.matchesLost}</p>
		<p class="text-light">Matches played : ${buffer.message.matchesPlayed}</p>
	`;
	}
}

async function displaySoloStats(){

	if (!currInputPlayer){
		document.getElementById("playerStatsOutput").innerHTML = `
			<p class="text-light">No players selected.</p>
		`;
		return;
	}
	await backendPost("/get/solostats/", currInputPlayer.value);
	if (buffer.error){
		alert(buffer.error);
		// document.getElementById("playerStatsOutput").innerHTML = `
		// <p class="text-light">${buffer.error}</p>
		// `;
	}
	else{
	document.getElementById("playerStatsOutput").innerHTML = `
		<h3 class="text-light">Solo statistics of ${currInputPlayer.value}</h3>
		<p class="text-light">Points won : ${buffer.message.pointsWon}</p>
		<p class="text-light">Points lost : ${buffer.message.pointsLost}</p>
		<p class="text-light">Points played : ${buffer.message.pointsPlayed}</p>
		<p class="text-light">Matches won : ${buffer.message.matchesWon}</p>
		<p class="text-light">Matches lost : ${buffer.message.matchesLost}</p>
		<p class="text-light">Matches played : ${buffer.message.matchesPlayed}</p>
	`;
	}
}

async function displayDuoStats(){

	if (!currInputPlayer){
		document.getElementById("playerStatsOutput").innerHTML = `
			<p class="text-light">No players selected.</p>
		`;
		return;
	}
	await backendPost("/get/duostats/", currInputPlayer.value);
	if (buffer.error){
		alert(buffer.error);
		// document.getElementById("playerStatsOutput").innerHTML = `
		// <p class="text-light">${buffer.error}</p>
		// `;
	}
	else{
	document.getElementById("playerStatsOutput").innerHTML = `
		<h3 class="text-light">Duo statistics of ${currInputPlayer.value}</h3>
		<p class="text-light">Points won : ${buffer.message.pointsWon}</p>
		<p class="text-light">Points lost : ${buffer.message.pointsLost}</p>
		<p class="text-light">Points played : ${buffer.message.pointsPlayed}</p>
		<p class="text-light">Matches won : ${buffer.message.matchesWon}</p>
		<p class="text-light">Matches lost : ${buffer.message.matchesLost}</p>
		<p class="text-light">Matches played : ${buffer.message.matchesPlayed}</p>
	`;
	}
}

async function displayTournamentStats(){

	if (!currInputPlayer){
		document.getElementById("playerStatsOutput").innerHTML = `
			<p class="text-light">No players selected.</p>
		`;
		return;
	}
	await backendPost("/get/tournamentstats/", currInputPlayer.value);
	if (buffer.error){
		alert(buffer.error);
		// document.getElementById("playerStatsOutput").innerHTML = `
		// <p class="text-light">${buffer.error}</p>
		// `;
	}
	else{
	document.getElementById("playerStatsOutput").innerHTML = `
		<h3 class="text-light">Tournament statistics of ${currInputPlayer.value}</h3>
		<p class="text-light">Points won : ${buffer.message.pointsWon}</p>
		<p class="text-light">Points lost : ${buffer.message.pointsLost}</p>
		<p class="text-light">Points played : ${buffer.message.pointsPlayed}</p>
		<p class="text-light">Matches won : ${buffer.message.matchesWon}</p>
		<p class="text-light">Matches lost : ${buffer.message.matchesLost}</p>
		<p class="text-light">Matches played : ${buffer.message.matchesPlayed}</p>
		<p class="text-light">Tournament won : ${buffer.message.tournamentsWon}</p>
		<p class="text-light">Tournament lost : ${buffer.message.tournamentsLost}</p>
		<p class="text-light">Tournament played : ${buffer.message.tournamentsPlayed}</p>
	`;
	}
}

async function displayVictoriesAndDefeatsGraph(){

	if (!currInputPlayer){
		document.getElementById("playerStatsOutput").innerHTML = `
			<p class="text-light">No players selected.</p>
		`;
		return;
	}
	await backendPost("/get/victories/", currInputPlayer.value);
	if (buffer.error){
		alert(buffer.error);
		return;
	}
	const victories = buffer.message.matchesWon;
	await backendPost("/get/defeats/", currInputPlayer.value);
	if (buffer.error){
		document.getElementById("playerStatsOutput").innerHTML = `
		<p class="text-light">${buffer.error}</p>
		`
		return;
	}
	const defeats = buffer.message.matchesLost;

	if (victories === 0 && defeats === 0){
		document.getElementById("playerStatsOutput").innerHTML = `
			<h3 class="text-light">Graphic statistics of ${currInputPlayer.value} : Number of victories and defeats</h3>
			<p class="text-light">No matches found</p>
		`;
	}
	else{
	document.getElementById("playerStatsOutput").innerHTML = `
		<h3 class="text-light">Graphic statistics of ${currInputPlayer.value} : Number of victories and defeats</h3>
		<div class="d-flex align-item-center">
		<canvas class="bg-dark" id="myPlayerChart"></canvas>
		<div class="text-light" for="myPlayerChartLegend"></div>
		</div>
	`;

	const canvas = document.getElementById('myPlayerChart');
	canvas.width = 500;
	canvas.height = 500;

	const chartOptions = {
		canvas: canvas,
		seriesName: "Number of victories and defeats",
		padding: 40,
		data: {
			"Victories": victories,
			"Defeats": defeats
		},
		colors: ["#80DEEA", "#FFE082"]
	};

	var myPiechart = new PieChart(chartOptions);
	myPiechart.draw();

	const legendOptions = {
		canvas: canvas,
		div: "myPlayerChartLegend",
		data: {
			"Victories": victories,
			"Defeats": defeats
		},
		colors: ["#80DEEA", "#FFE082"]
	};
	var myPieChartLegend = new Legend(legendOptions);
	myPieChartLegend.drawLegend();
	}
}

async function displayVictoriesByModeGraph(){

	if (!currInputPlayer){
		document.getElementById("playerStatsOutput").innerHTML = `
			<p class="text-light">No players selected.</p>
		`;
		return;
	}
	await backendPost("/get/victoriesbymode/", currInputPlayer.value);
	if (buffer.error){
		alert(buffer.error);
		return;
	}
	const soloWins = buffer.message.SoloMatchesWins;
	const duoWins = buffer.message.DuoMatchesWins;
	const tournamentWins = buffer.message.TournamentMatchesWins;
	if (soloWins === 0 && duoWins === 0 && tournamentWins === 0){
		document.getElementById("playerStatsOutput").innerHTML = `
			<h3 class="text-light">Graphic statistics of ${currInputPlayer.value} : Number of victories by game mode</h3>
			<p class="text-light">No matches or no wins found</p>
		`;
	}
	else{
	document.getElementById("playerStatsOutput").innerHTML = `
		<h3 class="text-light">Graphic statistics of ${currInputPlayer.value} :  Number of victories by game mode</h3>
		<div class="d-flex align-item-center">
		<canvas class="bg-dark" id="myPlayerChart"></canvas>
		<div class="text-light" for="myPlayerChartLegend"></div>
		</div>
	`;

	const canvas = document.getElementById('myPlayerChart');
	canvas.width = 500;
	canvas.height = 500;

	// var gridScaleValue = Math.ceil(soloWins +
	// 	duoWins +
	// 	tournamentWins / 3);
	const barChartOptions = {
		canvas: canvas,
		seriesName:" Number of victories by game mode",
		padding: 20,
		// gridScale: gridScaleValue,
		// gridColor:"#0X33E31",
		data: {
			"Solo": soloWins,
			"Duo": duoWins,
			"Tournoi": tournamentWins,
		},
		colors: ["#80DEEA", "#FFE082", "#FFAB91"]
	};

	var myBarChart = new BarChart(barChartOptions);
	myBarChart.draw();

	const legendOptions = {
		canvas: canvas,
		div: "myPlayerChartLegend",
		data: {
			"Solo": soloWins,
			"Duo": duoWins,
			"Tournoi": tournamentWins,
		},
		colors: ["#80DEEA", "#FFE082", "#FFAB91"]
	};
	var myBarChartLegend = new Legend(legendOptions);
	myBarChartLegend.drawLegend();
	}
}

async function displayPointsByMatchGraph(){

	if (!currInputPlayer){
		document.getElementById("playerStatsOutput").innerHTML = `
			<p class="text-light">No players selected.</p>
		`;
		return;
	}
	await backendPost("/get/pointsbymatch/", currInputPlayer.value);
	if (buffer.error){
		alert(buffer.error);
		return;
	}
	const pointsOverTime = buffer.message.matches;
	if (pointsOverTime.length === 0){
		document.getElementById("playerStatsOutput").innerHTML = `
			<h3 class="text-light">Graphic statistics of ${currInputPlayer.value} : Number of points per match</h3>
			<p class="text-light">No matches found</p>
		`;
		return;
	}
	for (let i = 0; i < pointsOverTime.length; i++){
		if (pointsOverTime[i] > 0)
			break;
		else if (i === pointsOverTime.length - 1){
			document.getElementById("playerStatsOutput").innerHTML = `
				<h3 class="text-light">Graphic statistics of ${currInputPlayer.value} : Number of points per match</h3>
				<p class="text-light">No points won</p>
			`;
			return;
		}
	}
	document.getElementById("playerStatsOutput").innerHTML = `
		<h3 class="text-light">Graphic stats of ${currInputPlayer.value} : Number of points per match</h3>
		<div class="d-flex align-item-center">
		<canvas class="bg-dark" id="myPlayerChart"></canvas>
		<div class="text-light" for="myPlayerChartLegend"></div>
		</div>
	`;

	const canvas = document.getElementById('myPlayerChart');
	canvas.width = 500;
	canvas.height = 500;

	var mapping = {};
	for (let i = 0; i < pointsOverTime.length; i++) {
		mapping["Match " + i] = pointsOverTime[i];
	}

	const plotChartOptions = {
		canvas: canvas,
			seriesName:"Number of points per match",
			padding:20,
			lineGridWidth:1,
			linePlotWidth:5,
			data: mapping,
			colors: ["#80DEEA", "#FFE082", "#FFAB91", "#CE93D8"]
	};

	var myPlotChart = new PlotChart(plotChartOptions);
	myPlotChart.draw();

	const legendOptions = {
		canvas: canvas,
		div: "myPlayerChartLegend",
		data: mapping,
		colors: ["#80DEEA", "#FFE082", "#FFAB91", "#CE93D8"]
	};

	var myPlotChartLegend = new Legend(legendOptions);
	myPlotChartLegend.drawLegend();
}

async function displayMatchStats(){

	if (!currInputPlayer){
		document.getElementById("playerStatsOutput").innerHTML = `
			<p class="text-light">No players selected.</p>
		`;
		return;
	}

	await backendPost("/get/matchstats/", currInputPlayer.value);
	if (buffer.error){
		alert(buffer.error);
		return;
	}
	const matches = JSON.parse(buffer.message);
	if (matches.length === 0){
		document.getElementById("playerStatsOutput").innerHTML = `
			<h3 class="text-light">Match history of ${currInputPlayer.value}</h3>
			<p class="text-light">No matches found</p>
		`;
	}
	else{
	document.getElementById("playerStatsOutput").innerHTML = `
			<h3 class="text-light">Match history of ${currInputPlayer.value}</h3>
		`;
	console.log(matches);
	for (let i = 0; i < matches.length; i++){
		document.getElementById("playerStatsOutput").innerHTML += `
			<h5 class="text-light">Match ${i}</h5>
			<p class="text-light">${matches[i].fields.player1} (${matches[i].fields.player1_points}) - ${matches[i].fields.player2} (${matches[i].fields.player2_points})</p>
			<p class="text-light">Mode : ${matches[i].fields.mode == 0 ? 'Solo' : matches[i].fields.mode == 1 ? 'Duo' : 'Tournament'}</p>
			<p class="text-light">Date : ${matches[i].fields.date}</p>
			<p class="text-light">Match time :  ${Math.ceil(matches[i].fields.match_time)} secondes</p>
		`;
	}
	}
}

function displayProfilePage(){


	document.getElementById("searchProfileInput").value = '';
	document.getElementById("newUsernameInput").value = '';
	document.getElementById("newPasswordInput").value = '';
	document.getElementById("addFriendOutput").innerHTML = null;
	document.getElementById("updateUsernameOutput").innerText = null;
	document.getElementById("updatePasswordOutput").innerText = null;
	displayUsername();
	getAvatar();
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
		document.getElementById("victoriesProfileOutput").innerText = `${buffer.message.matchesWon} ${buffer.message.matchesWon < 2 ? " win" : " wins"}`;
	await backendPost("/get/defeats/", currentUser);
	if (buffer.error)
		document.getElementById("defeatsProfileOutput").innerText = buffer.error;
	else
		document.getElementById("defeatsProfileOutput").innerText = `${buffer.message.matchesLost} ${buffer.message.matchesLost < 2 ? " loss" : " losses"}`;
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

	var input = document.getElementById('searchProfileInput');
	await backendPost("/post/addfriend/", input.value);
	if (buffer.error){
		document.getElementById("addFriendOutput").innerHTML = `
			<p class="text-light">${buffer.error}</p>
		`;
	}
	else{
		document.getElementById("addFriendOutput").innerHTML = `
			<p class="text-light">${buffer.message}</p>
		`;
		displayFriendsList();
	}
}

async function displayFriendsList() {

	//loop here to display friend requests
	await backendPost("/get/friendrequests/");
	if (buffer.error){
		document.getElementById("requestsList").innerHTML = `
		<p class="text-light">${buffer.error}</p>
		`;
	}
	else{
		const requestsList = buffer.message.requests;
		document.getElementById("requestsList").innerHTML = null;
	for (let i = 0; i < requestsList.length; i++){
		document.getElementById("requestsList").innerHTML += `
			<li class="d-flex inline">
				<h5>${requestsList[i]}</h5>
				<button type="button" class="btn btn-outline-light ms-2" onclick="acceptFriendRequest('${requestsList[i]}')"><i class="bi bi-check-circle" style="font-size: 20px"></i></button>
				<button type="button" class="btn btn-outline-light ms-3" onclick="declineFriendRequest('${requestsList[i]}')"><i class="bi bi-slash-circle" style="font-size: 20px"></i></button>
			</li>
		`
	}
	}
	//loop here to display friends list
	await backendPost("/get/friendslist/")
	if (buffer.error){
		document.getElementById("friendsList").innerHTML = `
		<p class="text-light">${buffer.error}</p>
		`;
	}
	else{
		const friendsList = buffer.message.friends;
		document.getElementById("friendsList").innerHTML = null;
	for (let i = 0; i < friendsList.length; i++){
		await backendPost("/get/isuserconnected/", friendsList[i]);
		if (buffer.error){
			document.getElementById("friendsList").innerHTML += `
				<p class="text-light">${buffer.error}</p>
			`;
		}
		else{
			if (buffer.message === "True"){
				//if friend is online display a 'green circle'
				document.getElementById("friendsList").innerHTML += `
					<li class="d-flex inline">
						<h5>${friendsList[i]}</h5>
						<img src="static/img/icons8-online-24.png" alt="online" width="24" height="24">
						<button type="button" class="btn btn-outline-light ms-3" onclick="removeFriend('${friendsList[i]}')"><i class="bi bi-trash" style="font-size: 20px"></i></button>
					</li>
				`;
			}
			else{
				//else display a 'red circle'
				document.getElementById("friendsList").innerHTML += `
					<li class="d-flex inline">
						<h5>${friendsList[i]}</h5>
						<img src="static/img/icons8-offline-24.png" alt="offline" width="24" height="24">
						<button type="button" class="btn btn-outline-light ms-3" onclick="removeFriend('${friendsList[i]}')"><i class="bi bi-trash" style="font-size: 20px"></i></button>
					</li>
				`;
			}
		}
	}
	}
}

async function acceptFriendRequest(requestor){

	await backendPost("/post/addfriend/", requestor);
	if (buffer.error)
		alert(buffer.error);
	else
		displayFriendsList();
}

async function declineFriendRequest(requestor){

	await backendPost("/post/declinefriendrequest/", requestor);
	if (buffer.error)
		alert(buffer.error);
	else
		displayFriendsList();
}

async function removeFriend(friend){

	await backendPost("/post/removefriend/", friend);
	if (buffer.error)
		alert(buffer.error);
	else
		displayFriendsList();
}

async function updateLogInButton(){

	await backendPost("/get/currentuser/");

	// Vérifier le résultat et modifier le bouton en conséquence
	if (buffer.error === "You're not logged in") {
		document.getElementById("logInButton").innerHTML = `
			<a class="btn btn-outline-light" href="#login">Log in</a>
		`;
	} else if (buffer.error) {
		document.getElementById("logInButton").innerHTML = buffer.error;
	} else {
		document.getElementById("logInButton").innerHTML = `
			<a class="btn btn-outline-light" href="#profile" onclick="displayProfilePage()">Profile</a>
		`;
	}
}

async function logInWith42() {
	try {
		const response = await fetch("/api_42/");

		if (response.ok) {
			const data = await response.json();
			window.location.href = data.auth_url; // Redirection manuelle vers l'URL reçue
		} else {
			const buffer = await response.json();
			document.getElementById("linkMessage").innerText = buffer.error || "Unknown error";
		}
	} catch (error) {
		document.getElementById("linkMessage").innerText = "Network error: " + error.message;
	}
}

async function handleLinkResponse() {
	try {
		const response = await fetch("/api_code/"); // L'URL de retour après la redirection OAuth
		if (response.ok) {
			const data = await response.json();
			document.getElementById("linkMessage").innerText = data.message;
		} else {
			const buffer = await response.json();
			document.getElementById("linkMessage").innerText = buffer.error || "Error linking account";
		}
	} catch (error) {
		document.getElementById("linkMessage").innerText = "Network error: " + error.message;
	}
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
			document.getElementById('logInOutput').innerText = 'Wrong entry: "' + value + '" contains spaces.';
			return false;
		}
		else if (value === ''){
			document.getElementById('logInOutput').innerText = 'Empty field.';
			return false;
		}
	}
	await backendPost("/login/", inputs[0].value, inputs[1].value);
	if (buffer.error){
		document.getElementById("logInOutput").innerText = buffer.error;
	}
	else{
		window.location.href = "#home";
		frm.reset();
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
			document.getElementById('signUpOutput').innerText = 'Wrong entry: "' + value + '" contains spaces.';
			return false;
		}
		else if (value === ''){
			document.getElementById('signUpOutput').innerText = 'Empty field.';
			return false;
		}
	}
	await backendPost("/register/", inputs[0].value, inputs[1].value);
	if (buffer.error){
		document.getElementById("signUpOutput").innerText = buffer.error;
	}
	else{
		window.location.href = "#home";
		frm.reset();
		// hideAllContentDivs();
		// document.getElementsByClassName('content-profile')[0].style.display='block';
	}
	updateLogInButton();
}

async function updateUsername(){

	var frm = document.querySelector('#updateUsernameForm');
	var input = frm.querySelector('input[type=text]');

	const value = input.value;
	if (value.includes(" ")){
		document.getElementById('updateUsernameOutput').innerText = 'Wrong entry: "' + value + '" contains spaces.';
		return false;
	}
	else if (value === ''){
		document.getElementById('updateUsernameOutput').innerText = 'Empty field.';
		return false;
	}
	await backendPost("/post/username/", value);
	if (buffer.error){
		document.getElementById("updateUsernameOutput").innerText = buffer.error;
	}
	else{
		document.getElementById("updateUsernameOutput").innerText = buffer.message;
		displayUsername();
		frm.reset();
	}
}

async function updatePassword(){

	var frm = document.querySelector('#updatePasswordForm');
	var input = frm.querySelector('input[type=password]');

	const value = input.value;
	if (value.includes(" ")){
		document.getElementById('updatePasswordOutput').textContent = 'Wrong entry: "' + value + '" contains spaces.';
		return false;
	}
	else if (value === ''){
		document.getElementById('updatePasswordOutput').textContent = 'Empty field.';
		return false;
	}
	await backendPost("/post/password/", value);
	if (buffer.error){
		document.getElementById("updateUsernameOutput").innerText = buffer.error;
	}
	else{
		document.getElementById("updatePasswordOutput").innerText = buffer.message;
		frm.reset();
	}
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

async function checkInputsAndPlayTournament(){

	var frm = document.querySelector('#tournamentForm');
	var inputs = frm.querySelectorAll('input[type=text]');
	// e.preventDefault();
	// e.stopPropagation();
	var classArr = [];
	for(var i = 0; i < inputs.length; i++){
		const value = inputs[i].value;
		if (value.includes(" ")){
			document.getElementById('tournamentOutputText').innerText = 'Wrong entry: "' + value + '" contains spaces.';
			return false;
		}
		else if (classArr.includes(value)){
			document.getElementById('tournamentOutputText').innerText = 'Wrong entry: "' + value + '" is duplicated.';
			return false;
		}
		if (value === ''){
			document.getElementById('tournamentOutputText').innerText = 'Please fill in all the fields.';
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
	frm.reset();
}

async function checkInputAndPlay(){

	var frm = document.querySelector('#duoForm');
	var inputs = frm.querySelectorAll('input[type=text]');
	// e.preventDefault();
	// e.stopPropagation();
	var classArr = [];
	for(var i = 0; i < inputs.length; i++){
		const value = inputs[i].value;
		if (value.includes(" ")){
			document.getElementById('duoOutputText').innerText = 'Wrong entry: "' + value + '" contains spaces.';
			return false;
		}
		else if (classArr.includes(value)){
			document.getElementById('duoOutputText').innerText = 'Wrong entry: "' + value + '" is duplicated.';
			return false;
		}
		if (value === ''){
			document.getElementById('duoOutputText').innerText = 'Please fill in all the fields.';
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
	frm.reset();
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
				if (currentFragment === "stats"){
					document.getElementById("playerStatsOutput").innerHTML = null;
					document.getElementById("searchPlayerInput").value = '';
					currInputPlayer = '';
				}
				if (currentFragment === "blockchain"){
					document.getElementById("tournamentIdInput").value = '';
				}
				if (currentFragment === "duo"){
					var frm = document.getElementById("duoForm");
					frm.reset();
					// document.getElementById("duoOutputText").value = '';
				}
				if (currentFragment === "tournament"){
					var frm = document.getElementById("tournamentForm");
					frm.reset();
					// document.getElementById("tournamentOutputText").value = '';
				}
			// }
			// previousFragment = currentFragment;
				if (currentFragment === "game")
					window.location.href = "#game";
				else
					scroll();
			break;
		}
	}
});

function scroll() {
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
}
