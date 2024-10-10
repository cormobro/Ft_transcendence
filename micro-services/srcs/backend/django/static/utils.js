function hideAllContentDivs(){
	var contentDivs = document.getElementsByClassName('content');

	for (var i = 0; i < contentDivs.length; ++i) {
		var div = contentDivs[i];
		div.style.display='none';
	}
};

// // Fonction pour mettre à jour la position du bouton login
// function toggleLoginButtonPosition() {
// 	const loginContainer = document.getElementById('logInContainer');
// 	const navbarToggler = document.getElementById('navbarToggler');

// 	// Vérifier l'état de la navbar-toggler avec aria-expanded
// 	const isExpanded = navbarToggler.getAttribute('aria-expanded') === 'true';
// 	console.log(isExpanded);

// 	if (isExpanded) {
// 		// Si le menu est déroulé (nav-toggler est ouvert), retirer justify-content-end
// 		loginContainer.classList.remove('justify-content-end');
// 	} else {
// 		// Si le menu est fermé, ajouter justify-content-end
// 		loginContainer.classList.add('justify-content-end');
// 	}
// }

// // Écouter l'événement 'click' sur le bouton navbar-toggler
// document.getElementById('navbarToggler').addEventListener('click', function () {
// 	setTimeout(toggleLoginButtonPosition, 300);  // Délai pour permettre à l'animation de se terminer avant de vérifier
// });
