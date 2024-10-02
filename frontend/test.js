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
	// backendPost("/post/signup/", inputs[0].value, inputs[1].value);
	// document.getElementById("signUpOutput").innerText = buffer;
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
	// backendPost("/post/login/", inputs[0].value, inputs[1].value);
	// document.getElementById("logInOutput").innerText = buffer;
	hideAllContentDivs();
	document.getElementsByClassName('content-profile')[0].style.display='block';
}

function logInWith42(){

	// backendPost("/post/42api/");
	// document.getElementById("logInOutput").innerText = buffer;
	hideAllContentDivs();
	document.getElementsByClassName('content-profile')[0].style.display='block';
}

function launchDuoMatch(){

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
	hideAllContentDivs();
	onClickDuo();
	document.getElementsByClassName('content-game')[0].style.display='block';
	window.location.href = "#myGame";
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
	hideAllContentDivs();
	onClickTournament();
	findNextMatch();
	document.getElementsByClassName('content-game')[0].style.display='block';
	window.location.href = "#myGame";
}
