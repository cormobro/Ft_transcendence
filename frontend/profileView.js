class ProfileView{

	// CONSTRUCTOR
	constructor(player){

		// INSTANCE PROPERTIES
		this.player = player;
	}

	// METHOD DEFINITIONS
	renderFriendsList() {

		//loop here to display friends
		let container = document.getElementById("friendsList");
		for (let i = 0; i < playersInstances.length; i++){
			//if friend is online display a 'green circle'
			container.innerHTML += `
				<li class="d-flex inline">
					<h5>${playersInstances[i].username}</h5><img src="img/icons8-online-24.png" alt="online" width="24" height="24"></img>
				</li>
			`
			//else display a 'red circle'
			container.innerHTML += `
				<li class="d-flex inline">
					<h5>${playersInstances[i].username}</h5><img src="img/icons8-offline-24.png" alt="online" width="24" height="24"></img>
				</li>
			`
		}
	}

	uploadAvatar() {

		const avatarPicture = document.querySelector(".image img");
		const userFile = document.getElementById("filePath");

		userFile.onchange = function() {
			avatarPicture.src = URL.createObjectURL(userFile.files[0]);
		}
	}
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
