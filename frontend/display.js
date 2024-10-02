function displayNextMatch() {

	document.getElementById('nextMatchOutput').innerText = `${player1} - ${player2}`;
}

function displayLeaderboard() {

	backendPost("/get/bestplayers/");
	for (let i = 0; i < buffer.length && buffer; i++){
		document.getElementById('leaderboardOutput').innerText += `${i} - ${buffer[i].username} (${buffer[i].matchesWon})`;
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

function searchAndDisplayPlayerStats(){

	input = document.getElementById('searchInputPlayer');
	backendPost("/get/globalstats/", input.value);
	document.getElementById("playerStatsOutput").innerHTML = `
		<h3 class="text-dark">Statistiques globales de ${player}</h3>
		<p class="text-dark">Points gagnés : ${buffer.pointsWon}</p>
		<p class="text-dark">Points perdus : ${buffer.pointsLost}</p>
		<p class="text-dark">Points joués : ${buffer.pointsPlayed}</p>
		<p class="text-dark">Parties gagnées : ${buffer.matchsWon}</p>
		<p class="text-dark">Parties perdues : ${buffer.matchsLost}</p>
		<p class="text-dark">Parties jouées : ${buffer.matchsPlayed}</p>
	`;
}

function displayGlobalStats(player) {

	backendPost("/get/globalstats/", player);
	document.getElementById("playerStatsOutput").innerHTML = `
		<h3 class="text-dark">Statistiques globales de ${player}</h3>
		<p class="text-dark">Points gagnés : ${buffer.pointsWon}</p>
		<p class="text-dark">Points perdus : ${buffer.pointsLost}</p>
		<p class="text-dark">Points joués : ${buffer.pointsPlayed}</p>
		<p class="text-dark">Parties gagnées : ${buffer.matchsWon}</p>
		<p class="text-dark">Parties perdues : ${buffer.matchsLost}</p>
		<p class="text-dark">Parties jouées : ${buffer.matchsPlayed}</p>
	`;
}

function displaySoloStats(player){

	backendPost("/get/solostats/", player);
	document.getElementById("playerStatsOutput").innerHTML = `
		<h3 class="text-dark">Statistiques de ${player} en mode solo</h3>
		<p class="text-dark">Points gagnés : ${buffer.pointsWon}</p>
		<p class="text-dark">Points perdus : ${buffer.pointsLost}</p>
		<p class="text-dark">Points joués : ${buffer.pointsPlayed}</p>
		<p class="text-dark">Parties gagnées : ${buffer.matchsWon}</p>
		<p class="text-dark">Parties perdues : ${buffer.matchsLost}</p>
		<p class="text-dark">Parties jouées : ${buffer.matchsPlayed}</p>
	`;
}

function displayDuoStats(player){

	backendPost("/get/duostats/", player);
	document.getElementById("playerStatsOutput").innerHTML = `
		<h3 class="text-dark">Statistiques de ${player} en mode duo</h3>
		<p class="text-dark">Points gagnés : ${buffer.pointsWon}</p>
		<p class="text-dark">Points perdus : ${buffer.pointsLost}</p>
		<p class="text-dark">Points joués : ${buffer.pointsPlayed}</p>
		<p class="text-dark">Parties gagnées : ${buffer.matchsWon}</p>
		<p class="text-dark">Parties perdues : ${buffer.matchsLost}</p>
		<p class="text-dark">Parties jouées : ${buffer.matchsPlayed}</p>
	`;
}

function displayTournamentStats(player){

	backendPost("/get/tournamentstats", player);
	document.getElementById("playerStatsOutput").innerHTML = `
		<h3 class="text-dark">Statistiques de ${player} en mode tournoi</h3>
		<p class="text-dark">Points gagnés : ${buffer.pointsWon}</p>
		<p class="text-dark">Points perdus : ${buffer.pointsLost}</p>
		<p class="text-dark">Points joués : ${buffer.pointsPlayed}</p>
		<p class="text-dark">Parties gagnées : ${buffer.matchsWon}</p>
		<p class="text-dark">Parties perdues : ${buffer.matchsLost}</p>
		<p class="text-dark">Parties jouées : ${buffer.matchsPlayed}</p>
		<p class="text-dark">Tournois gagnés : ${buffer.tournamentsWon}</p>
		<p class="text-dark">Tournois perdus : ${buffer.tournamentsLost}</p>
		<p class="text-dark">Tournois joués : ${buffer.tournamentsPlayed}</p>
	`;
}

function displayVictoriesAndDefeatsGraph(player){

	document.getElementById("playerStats").innerHTML = `
		<h3 class="text-dark">Statistiques graphiques de ${player}</h3>
		<div class="d-flex align-item-center">
		<canvas class="bg-light" id="myPlayerChart"></canvas>
		<div class="text-dark" for="myPlayerChartLegend"></div>
		</div>
	`;

	const canvas = document.getElementById('myPlayerChart');
	canvas.width = 500;
	canvas.height = 500;

	backendPost("/get/victories/", player);
	const victories = buffer;
	backendPost("/get/defeats/", player);
	const defeats = buffer;
	const chartOptions = {
		canvas: canvas,
		seriesName: "Répartition des résultats",
		padding: 40,
		data: {
			"Victoires": victories,
			"Défaites": defeats
		},
		colors: ["#80DEEA", "#FFE082", "#FFAB91", "#CE93D8"]
	};

	var myPiechart = new PieChart(chartOptions);
	myPiechart.draw();

	const titleOptions = {
		canvas: canvas,
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
		canvas: canvas,
		div: "myPlayerChartLegend",
		data: {
			"Victoires": victories,
			"Défaites": defeats
		},
		colors: ["#80DEEA", "#FFE082", "#FFAB91", "#CE93D8"]
	};
	var myPieChartLegend = new Legend(legendOptions);
	myPieChartLegend.drawLegend();
}

function displayVictoriesByModeGraph(player){

	document.getElementById("playerStats").innerHTML = `
		<h3 class="text-dark">Statistiques graphiques de ${player}</h3>
		<div class="d-flex align-item-center">
		<canvas class="bg-light" id="myPlayerChart"></canvas>
		<div class="text-dark" for="myPlayerChartLegend"></div>
		</div>
	`;

	const canvas = document.getElementById('myPlayerChart');
	canvas.width = 500;
	canvas.height = 500;

	backendPost("/get/victoriesbymode/", player);
	var gridScaleValue = Math.ceil(buffer.solo.matchsWon +
		buffer.duo.matchsWon +
		buffer.tournament.matchsWon / 3);
	const barChartOptions = {
		canvas: canvas,
		seriesName:"Répartition des victoires par mode de jeux",
		padding: 20,
		gridScale: gridScaleValue,
		gridColor:"#0X33E31",
		data: {
			"Solo": buffer.solo.matchsWon,
			"Duo": buffer.duo.matchsWon,
			"Tournoi": buffer.tournament.matchsWon,
		},
		colors: ["#80DEEA", "#FFE082", "#FFAB91", "#CE93D8"]
	};

	var myBarChart = new BarChart(barChartOptions);
	myBarChart.draw();

	const titleOptions = {
		canvas: canvas,
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
		canvas: canvas,
		div: "myPlayerChartLegend",
		data: {
			"Solo": buffer.solo.matchsWon,
			"Duo": buffer.duo.matchsWon,
			"Tournoi": buffer.tournament.matchsWon,
		},
		colors: ["#80DEEA", "#FFE082", "#FFAB91", "#CE93D8"]
	};
	var myBarChartLegend = new Legend(legendOptions);
	myBarChartLegend.drawLegend();
}

function displayPointsByMatchGraph(player){

	document.getElementById("playerStats").innerHTML = `
		<h3 class="text-dark">Statistiques graphiques de ${player}</h3>
		<div class="d-flex align-item-center">
		<canvas class="bg-light" id="myPlayerChart"></canvas>
		<div class="text-dark" for="myPlayerChartLegend"></div>
		</div>
	`;

	const canvas = document.getElementById('myPlayerChart');
	canvas.width = 500;
	canvas.height = 500;

	backendPost("/get/pointsbymatch/", player);
	const plotChartOptions = {
		canvas: canvas,
			seriesName:"Points gagnés au cours des parties",
			padding:20,
			gridScale:10,
			gridColor:"black",
			lineGridWidth:1,
			linePlotWidth:5,
			data: buffer,
			colors: ["#80DEEA", "#FFE082", "#FFAB91", "#CE93D8"]
	};

	var myPlotChart = new PlotChart(plotChartOptions);
	myPlotChart.draw();

	const titleOptions = {
		canvas: canvas,
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
		canvas: canvas,
		div: "myPlayerChartLegend",
		data: buffer,
		colors: ["#80DEEA", "#FFE082", "#FFAB91", "#CE93D8"]
	};

	var myPlotChartLegend = new Legend(legendOptions);
	myPlotChartLegend.drawLegend();
}

function displayMatchStats(player){

	document.getElementById("playerStatsOutput").innerHTML = `
		<h3 class="text-dark">Statistiques par partie de ${player}</h3>
	`;

	backendPost("/get/matchstats/", player);
	for (let match in buffer){
		document.getElementById("playerStatsOutput").innerHTML += `
		<h3 class="text-dark">Statistiques de la partie</h3>
		<p class="text-dark">Mode : ${match.mode}</p>
		<p class="text-dark">Joueur 1 : ${match.player1.username}</p>
		<p class="text-dark">Joueur 2 : ${match.player2.username}</p>
		<p class="text-dark">Victoire de : ${match.resultPlayer1 === true ? match.player1.username : match.player2.username}</p>
		<p class="text-dark">Points gagnés par ${match.player1.username} : ${match.pointsWonByPlayer1}</p>
		<p class="text-dark">Points gagnés par ${match.player2.username} : ${match.pointsWonByPlayer2}</p>
		<p class="text-dark">Date : ${match.date}</p>
		<p class="text-dark">Durée de la partie :  ${match.matchTime}</p>
	`;
	}
}

function displayProfilePage(){

	backendPost("/get/currentonlineuser/");
	displayUsername(buffer);
	displayAvatar(buffer);
	displayFriendsList(buffer);
}

function displayUsername(player){

	document.getElementById("usernameProfileOutput").innerText = player;
	backendPost("/get/victories/", player);
	document.getElementById("victoriesProfileOutput").innerText = buffer;
	backendPost("/get/defeats/", player);
	document.getElementById("defeatsProfileOutput").innerText = buffer;
}

function displayAvatar(player){

	backendPost("/get/avatar/", player);

	const avatarPicture = document.querySelector(".image img");
	avatarPicture.src = URL.createObjectURL(buffer);
}

function uploadAndDisplayAvatar(){

	const userFile = document.getElementById("filePath");

	userFile.onchange = function() {
		backendPost("/post/changeavatar/", player, userFile.files[0]);
		displayAvatar();
	}
}

function searchAndAddFriend(player){

	input = document.getElementById('searchInputProfile');
	backendPost("/post/addfriend/", player, input.value);
	document.getElementById("addFriendOutput").innerHTML = buffer;
}

function displayFriendsList(player) {

	//loop here to display friend requests
	backendPost("/get/friendrequests", player);
	for (let user in buffer){
		document.getElementById("friendsList").innerHTML = `
			<li class="d-flex inline">
				<h5>${user}</h5>
				<button type="button" class="btn btn-outline-light ms-2"><i class="bi bi-check-circle" style="font-size: 20px"></i></button>
				<button type="button" class="btn btn-outline-light ms-3"><i class="bi bi-slash-circle" style="font-size: 20px"></i></button>
			</li>
		`
	}
	//loop here to display friends list
	backendPost("/get/friendslist/", player)
	for (let friend in buffer){
		backendPost("/get/isuserconnected/", friend);
		if (buffer === true){
			//if friend is online display a 'green circle'
			document.getElementById("friendsList").innerHTML.innerHTML += `
				<li class="d-flex inline">
					<h5>${friend}</h5>
					<img src="img/icons8-online-24.png" alt="online" width="24" height="24"></img>
					<button type="button" class="btn btn-outline-light ms-3"><i class="bi bi-trash3" style="font-size: 20px"></i></button>
				</li>
			`
		}
		else{
			//else display a 'red circle'
			document.getElementById("friendsList").innerHTML.innerHTML += `
				<li class="d-flex inline">
					<h5>${friend}</h5>
					<img src="img/icons8-offline-24.png" alt="offline" width="24" height="24"></img>
					<button type="button" class="btn btn-outline-light ms-3"><i class="bi bi-trash3" style="font-size: 20px"></i></button>
				</li>
			`
		}
	}
}

function acceptFriendRequest(player, requestor){

	backendPost("/post/acceptfriendrequest/", player, requestor);
	displayFriendsList(player);
}

function declineFriendRequest(player, requestor){

	backendPost("/post/declinefriendrequest/", player, requestor);
	displayFriendsList(player);
}

function removeFriend(player, friend){

	backendPost("/post/removefriend/", player, friend);
	displayFriendsList(player);
}

function logInWith42(player){

	backendPost("/post/42api/", player);
	document.getElementById("logInOutput").innerText = buffer;
	hideAllContentDivs();
	document.getElementsByClassName('content-profile')[0].style.display='block';
}

function logIn(){

	var frm = document.querySelector('#logInForm');
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
	backendPost("/post/login/", inputs[0].value, inputs[1].value);
	document.getElementById("logInOutput").innerText = buffer;
	hideAllContentDivs();
	document.getElementsByClassName('content-profile')[0].style.display='block';
}

function logOut(user){

	backendPost("/post/logout/", user);
	hideAllContentDivs();
	document.getElementsByClassName('content-login')[0].style.display='block';
}

function signUp(){

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
	backendPost("/post/signup/", inputs[0].value, inputs[1].value);
	document.getElementById("signUpOutput").innerText = buffer;
	hideAllContentDivs();
	document.getElementsByClassName('content-profile')[0].style.display='block';
}

function updateUsername(player){

	var frm = document.querySelector('#updateUsernameForm');
	var input = frm.querySelector('input[type=text]');

	const value = input.value;
	if (value.includes(" ")){
		document.getElementById('updateUsernameOutput').innerText = 'Mauvaise saisie: "' + value + '" contient des espaces.';
		return false;
	}
	else if (value === ''){
		document.getElementById('updateUsernameOutput').innerText = 'Champ vide.';
		return false;
	}

	backendPost("/post/username/", player, value);
	document.getElementById("updateUsernameOutput").innerText = buffer;
}

function updatePassword(player){

	var frm = document.querySelector('#updatePasswordForm');
	var input = frm.querySelector('input[type=password]');

	const value = input.value;
	if (value.includes(" ")){
		document.getElementById('updatePasswordOutput').textContent = 'Mauvaise saisie: "' + value + '" contient des espaces.';
		return false;
	}
	else if (value === ''){
		document.getElementById('updatePasswordOutput').textContent = 'Champ vide.';
		return false;
	}

	backendPost("/post/password/", player, value);
	document.getElementById("updatePasswordOutput").innerText = buffer;
}

function getBlock(tournamentId){

	backendPost("/get/block/", tournamentId);
	document.getElementById('matchesOutput').innerText = buffer;
	document.getElementById('winnerOutput').innerText = buffer;
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
	newInput.id = 'player' + (playersNumber + 1);
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

function launchTournament(){

	var frm = document.querySelector('#tournamentForm');
	var inputs = frm.querySelectorAll('input[type=text]');
	e.preventDefault();
	e.stopPropagation();
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
	hideAllContentDivs();
	onClickTournament();
	findNextMatch();
	document.getElementsByClassName('content-game')[0].style.display='block';
	window.location.href = "#myGame";
}

function launchDuoMatch(){

	var frm = document.querySelector('#duoForm');
	var inputs = frm.querySelectorAll('input[type=text]');
	e.preventDefault();
	e.stopPropagation();
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
	hideAllContentDivs();
	onClickDuo();
	document.getElementsByClassName('content-game')[0].style.display='block';
	window.location.href = "#myGame";
}
