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
						<div class="col">
							<form action="upload.php" method="POST" enctype="multipart/form-data">
								<div class="d-flex image position-relative">
									<img src="img/default_avatar.png" class="img-fluid rounded-5" alt="avatar" width="200" height="200" id="avatarImg">
									<label for="filePath" class="position-relative">
										<div id="cameraIcon" class="bg-primary rounded-circle d-flex justify-content-center align-items-center position-absolute" style="width: 40px; height: 40px; top: 0; right: 0; transform: translate(-25%, 25%) rotate(45deg);">
											<i class="bi bi-camera-fill" style="transform: rotate(-45deg);"></i>
										</div>
									</label>
								</div>
								<input type="file" class="d-none" id="filePath" name="file" accept="image/jpeg, image/png, image/jpg">
							</form>
						</div>
						<div class="col">
							<h5 class="text-center">Victoires: ${stats.matchsWon}</h5>
							<h5 class="text-center">Défaites: ${stats.matchsLost}</h5>
						</div>
					</div>
					<div class="row">
						<h4 class="text-center">Ajouter des amis</h4>
						<input type="search" id="searchInputProfile" placeholder="Recherche" onkeyup="searchProfileNow()"/>
						<div>
							<ul id="usersProfileFoundList"></ul>
						</div>
						<h4 class="text-center">Liste d'amis</h4>
						<div>
							<ul id="friendsList"></ul>
						</div>
					</div>
					<div class="d-flex justify-content-center">
						<button class="btn btn-outline-light" id="42LogInButton">Se connecter avec <img src="img/42_Logo.png" alt="42" width="30" height="30"></button>
					</div>
				</div>
			</div>
			<div class="mt-3 d-flex justify-content-center">
				<div class="col-8 border rounded-2 p-5 text-light">
					<h3 class="text-center mb-4"> Informations personnelles</h3>
					<form class="row gy-4" id="personnalInformationsForm" method="POST">
						<div class="form-group row">
							<label for="staticUsername" class="col-sm-2 col-form-label">Nom d'utilisateur</label>
							<div class="col-sm-8">
								<input type="text" readonly class="form-control-plaintext text-light" id="staticUsername" value="${this.player.username}">
							</div>
						</div>
						<div class="form-group row">
							<label for="inputOldPassword" class="col-sm-2 col-form-label">Ancien mot de passe</label>
							<div class="col-sm-8">
								<input type="password" class="form-control" id="inputOldPassword" placeholder="Mot de passe">
							</div>
						</div>
						<div class="form-group row">
							<label for="inputNewPassword" class="col-sm-2 col-form-label">Nouveau mot de passe</label>
							<div class="col-sm-8">
								<input type="password" class="form-control" id="inputNewPassword" placeholder="Mot de passe">
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
		// uploadAvatar();
		// renderFriendsList();
	}

	// Render public view of the current logged in user's profile
	// renderPublicView(){

	// 	this.container.innerHTML = `<p class="text-dark">Hello ${this.player.username}, here is your public profile</p>`;
	// }
}

// function that matches the user's search input with the players profile
function searchProfileNow(){
	input = document.getElementById('searchInputProfile');
	let container = document.getElementById("usersProfileFoundList");
	container.innerHTML = null;
	for (let i = 0; i < playersInstances.length; i++){
		if (input.value === playersInstances[i].username){
			//if searched player is already a friend display 'friend' next to his name
			container.innerHTML += `
				<li class="mt-3">
					<h5 class="mt-2">${playersInstances[i].username} is already your friend</h5>
				</li>
			`
			//if searched player already sent a friend request display 'accept and refuse buttons' next to his name
			container.innerHTML += `
				<li class="d-flex inline mt-3">
					<h5 class="mt-2 me-1">${playersInstances[i].username}</h5>
					<button type="button" class="btn btn-outline-light ms-2" id="acceptFriendRequestButton"><i class="bi bi-check-circle" style="font-size: 20px"></i></button>
					<button type="button" class="btn btn-outline-light ms-3" id="refuseFriendRequestButton"><i class="bi bi-slash-circle" style="font-size: 20px"></i></button>
				</li>
			`
			//else display 'add button' next to his name
			container.innerHTML += `
				<li class="d-flex inline mt-3">
					<h5 class="mt-2 me-1">${playersInstances[i].username}</h5>
					<button type="button" class="btn btn-outline-light ms-2" id="addFriendButton"><i class="bi bi-plus-circle" style="font-size:20px"></i></button>
				</li>
			`
		}
	}
}

function renderFriendsList() {

	//loop here to display friends request
	//loop here to display friends
	let container = document.getElementById("friendsList");
	for (let i = 0; i < playersInstances.length; i++){
		//if friend is online display a 'green circle'
		container.innerHTML += `
			<li class="d-flex inline">
				<h5>${playersInstances[i].username}</h5><img src="img/icons8-point-final-24.png" alt="online" width="24" height="24"></img>
			</li>
		`
		//else display a 'red circle'
		container.innerHTML += `
			<li class="d-flex inline">
				<h5>${playersInstances[i].username}</h5><img src="img/icons8-point-final-24 (1).png" alt="online" width="24" height="24"></img>
			</li>
		`
	}
}

function uploadAvatar(){

	const avatarPicture = document.querySelector(".image img");
	const userFile = document.getElementById("filePath");

	userFile.onchange = function() {
		avatarPicture.src = URL.createObjectURL(userFile.files[0]);
	}
}

document.getElementById("playerProfile").addEventListener('click', function(e){

	if (e.target && e.target.id === "acceptFriendRequest") {}
})

document.getElementById("playerProfile").addEventListener('click', function(e){

	if (e.target && e.target.id === "refuseFriendRequest") {}
})

document.getElementById("playerProfile").addEventListener('click', function(e){

	if (e.target && e.target.id === "addFriendButton") {}
})

document.getElementById("playerProfile").addEventListener('click', function(e){

	if (e.target && e.target.id === "confirmationSubmitButton") {}
})
