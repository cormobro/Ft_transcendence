//CHANGE WITH THE CURRENT PLAYER LOGGED IN
let profilePlayerController = new PlayerController(playersInstances[0]);

document.getElementById("profileMenuButton").addEventListener('click', function(){

	if (!profilePlayerController){
		document.getElementById("playerProfile").innerHTML = `
			<p class="text-dark">Pas de joueur sélectionné.</p>
		`;
		return;
	}
	profilePlayerController.updateProfileView();
})
