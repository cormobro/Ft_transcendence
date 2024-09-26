class ProfileView{

	// CONSTRUCTOR
	constructor(player){

		// INSTANCE PROPERTIES
		this.player = player;
		this.container = document.getElementById("playerProfile");
	}

	// METHOD DEFINITIONS
	// Render private view of the current logged in user's profile
	renderPrivateView(){

		const stats = this.player.getGlobalStats();

		this.container.innerHTML = `
			<div class="d-flex justify-content-center">
				<div class="col-8 border rounded-2 p-5 text-light">
					<div class=row>
						<h2 class="text-center">${this.player.username}</h2>
					</div>
					<div class="row">
						<p>En ligne</p>
					</div>
					<div class="row">
						<div class="col">
							<img src="img/default_avatar.png" alt="logo" width="200" height="200">
						</div>
						<div class="col">
							<p class="text-center">Victoires: ${stats.matchsWon}</p>
							<p class="text-center">Défaites: ${stats.matchsLost}</p>
						</div>
					</div>
					<div class="row">
						<p class="text-center">Amis</p>
					</div>
					<div class="row">
						<p class="text-center">Se connecter avec 42auth</p>
					</div>
				</div>
			</div>
			<div class="m-3 d-flex justify-content-center">
				<div class="col-8 border rounded-2 p-5 text-light">
					<h3 class="text-center mb-4"> Informations personnelles</h3>
					<form class="row gy-4" id="personnalInformationsForm" method="POST">
						<div class="form-group row">
							<label for="staticUsername" class="col-sm-2 col-form-label">Nom d'utilisateur</label>
							<div class="col-sm-8">
								<input type="text" readonly class="form-control-plaintext" id="staticUsername" value="${this.player.username}">
							</div>
						</div>
						<div class="form-group row">
							<label for="inputOldPassword" class="col-sm-2 col-form-label">Ancien mot de passe</label>
							<div class="col-sm-8">
								<input type="password" class="form-control" id="inputOldPassword" placeholder="Password">
							</div>
						</div>
						<div class="form-group row">
							<label for="inputNewPassword" class="col-sm-2 col-form-label">Nouveau mot de passe</label>
							<div class="col-sm-8">
								<input type="password" class="form-control" id="inputNewPassword" placeholder="Password">
							</div>
						</div>
						<div class="d-flex justify-content-center">
							<button type="submit" class="btn btn-outline-light" id="confirmationSubmitButton">Confirmation</button>
						</div>
					</form>
					<p class="text-light text-center mt-4" id="confirmationOutputText"></p>
				</div>
			</div>
		`;
	}

	// Render public view of the current logged in user's profile
	// renderPublicView(){

	// 	this.container.innerHTML = `<p class="text-dark">Hello ${this.player.username}, here is your public profile</p>`;
	// }
}
