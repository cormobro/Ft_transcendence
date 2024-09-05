document.getElementById('addPlayer').addEventListener('click', function() {
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
	newLabel.textContent = 'Nom d\'utilisateur';

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
});

document.getElementById('removePlayer').addEventListener('click', function() {
	const playersNumber = document.querySelectorAll('#tournamentInputs #playerInputs .col-12').length;
	const divInputs = document.querySelectorAll('#tournamentInputs #playerInputs .col-12');

	if (playersNumber <= 3)
		return;

	divInputs[divInputs.length - 1].remove();
});

var button = document.getElementById('duoSubmitButton');

button.addEventListener('click', function(e) {

	var frm = document.querySelector('#duoForm');
	var inputs = frm.querySelectorAll('input[type=text]');
	e.preventDefault();
	var classArr = [];
	for(var i = 0; i < inputs.length; i++){
		const value = inputs[i].value;
		if (value.includes(" ")){
			document.getElementById('duoOutputText').textContent = 'Mauvaise saisie: "' + value + '" has space.';
			return false;
		}
		else if (classArr.includes(value)){
			document.getElementById('duoOutputText').textContent = 'Mauvaise saisie: "' + value + '" is dup.';
			return false;
		}
		if (value === ''){
			document.getElementById('duoOutputText').textContent = 'Please fill in all the field.';
			return false;
		}
		classArr.push(value);
		}
		hideAllContentDivs();
		document.getElementsByClassName('content-game')[0].style.display='block';
});

var button = document.getElementById('tournamentSubmitButton');

button.addEventListener('click', function(e) {

	var frm = document.querySelector('#tournamentForm');
	var inputs = frm.querySelectorAll('input[type=text]');
	e.preventDefault();
	var classArr = [];
	for(var i = 0; i < inputs.length; i++){
		const value = inputs[i].value;
		if (value.includes(" ")){
			document.getElementById('tournamentOutputText').textContent = 'Mauvaise saisie: "' + value + '" has space.';
			return false;
		}
		else if (classArr.includes(value)){
			document.getElementById('tournamentOutputText').textContent = 'Mauvaise saisie: "' + value + '" is dup.';
			return false;
		}
		if (value === ''){
			document.getElementById('tournamentOutputText').textContent = 'Please fill in all the field.';
			return false;
		}
		classArr.push(value);
		}
		hideAllContentDivs();
		document.getElementsByClassName('content-game')[0].style.display='block';
});
