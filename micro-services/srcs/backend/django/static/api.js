var csrftoken = '{{ csrf_token }}'
function getCookie(name) {
	let cookieValue = null;
	if (document.cookie && document.cookie !== '') {
		const cookies = document.cookie.split(';');
		for (let i = 0; i < cookies.length; i++) {
			const cookie = cookies[i].trim();
			// Vérifie si cette chaîne de cookie commence par le nom que nous voulons
			if (cookie.substring(0, name.length + 1) === (name + '=')) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}

/*document.getElementById('getRequest').onclick = () => {
	const requestObj = new XMLHttpRequest()
	requestObj.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200){
			console.log(this.responseText)
		}
	}
	requestObj.open("GET", "/get/")
	requestObj.send()
}

document.getElementById('postRequest').onclick = () => {
	const requestObj = new XMLHttpRequest()
	requestObj.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200){
			console.log(this.responseText)
		}
	}
	requestObj.open("POST", "/post/")
	requestObj.setRequestHeader("X-CSRFToken", csrftoken)

	const formdata = new FormData()
	formdata.append('name', 'Gege')
	formdata.append('age', '26')
	requestObj.send(formdata)
}

document.getElementById('/post/match').onclick = () => {
	const params =
	{
		player1: player1,
		player2: player2,
		gamemode: gameMode,
		winner: winner,
		player1score: leftScore,
		player2score: rightScore,
		date: matchDebut,
		duration: Date.now() - matchDebut
	};
	const options =
	{
		method: 'POST',
		body: JSON.stringify( params )
	};
	fetch("/post/match", {
		method: "POST",
		body: JSON.stringify({
			player1: player1,
			player2: player2,
			gamemode: gameMode,
			winner: winner,
			player1score: leftScore,
			player2score: rightScore,
			date: matchDebut,
			duration: Date.now() - matchDebut
		}),
		headers: {
			"X-CSRF-Token": csrftoken,
			"Content-type": "application/json; charset=UTF-8"
		}
	})
		.then((response) => response.json())
		.then((json) => console.log(json));
}

document.getElementById('/post/login').onclick = () => {
	fetch("/post/login", {
		method: "POST",
		body: JSON.stringify({
			username: //USERNAME HERE,
			password: //PASSWORD HERE
		}),
		headers: {
			"X-CSRF-Token": csrftoken,
			"Content-type": "application/json; charset=UTF-8"
		}
	})
		.then((response) => response.json())
		.then((json) => console.log(json));
}

document.getElementById('/post/changeusername').onclick = () => {
	fetch("/post/changeusername", {
		method: "POST",
		body: JSON.stringify({
			username: //NEW USERNAME HERE
		}),
		headers: {
			"X-CSRF-Token": csrftoken,
			"Content-type": "application/json; charset=UTF-8"
		}
	})
		.then((response) => response.json())
		.then((json) => console.log(json));
}

document.getElementById('/post/changepassword').onclick = () => {
	fetch("/post/changepassword", {
		method: "POST",
		body: JSON.stringify({
			password: //NEW PASSWORD HERE
		}),
		headers: {
			"X-CSRF-Token": csrftoken,
			"Content-type": "application/json; charset=UTF-8"
		}
	})
		.then((response) => response.json())
		.then((json) => console.log(json));
}

document.getElementById('/post/changeavatar').onclick = () => {
	fetch("/post/changeavatar", {
		method: "POST",
		body: JSON.stringify({
			username: //USERNAME HERE
		}),
		headers: {
			"X-CSRF-Token": csrftoken,
			"Content-type": "application/json; charset=UTF-8"
		}
	})
		.then((response) => response.json())
		.then((json) => console.log(json));
}

document.getElementById('/post/42api').onclick = () => {
	fetch("/post/42api", {
		method: "POST",
		body: JSON.stringify({
			42name: //42NAME HERE
		}),
		headers: {
			"X-CSRF-Token": csrftoken,
			"Content-type": "application/json; charset=UTF-8"
		}
	})
		.then((response) => response.json())
		.then((json) => console.log(json));
}

document.getElementById('/post/friend/add').onclick = () => {
	fetch("/post/friend", {
		method: "POST",
		body: JSON.stringify({
			type: "request",
			username: //USERNAME HERE
		}),
		headers: {
			"X-CSRF-Token": csrftoken,
			"Content-type": "application/json; charset=UTF-8"
		}
	})
		.then((response) => response.json())
		.then((json) => console.log(json));
}

document.getElementById('/post/friend/accept').onclick = () => {
	fetch("/post/friend", {
		method: "POST",
		body: JSON.stringify({
			type: "accept",
			username: //USERNAME HERE
		}),
		headers: {
			"X-CSRF-Token": csrftoken,
			"Content-type": "application/json; charset=UTF-8"
		}
	})
		.then((response) => response.json())
		.then((json) => console.log(json));
}

document.getElementById('/post/friend/decline').onclick = () => {
	fetch("/post/friend", {
		method: "POST",
		body: JSON.stringify({
			type: "decline",
			username: //USERNAME HERE
		}),
		headers: {
			"X-CSRF-Token": csrftoken,
			"Content-type": "application/json; charset=UTF-8"
		}
	})
		.then((response) => response.json())
		.then((json) => console.log(json));
}

document.getElementById('/get/personalstats').onclick = () => {
	fetch("/get/personalstats", {
		method: "GET",
		headers: {
			"X-CSRF-Token": csrftoken,
			"Content-type": "application/json; charset=UTF-8"
		}
	})
		.then((response) => response.json())
		.then((json) => console.log(json));
}

document.getElementById('/get/profile').onclick = () => {
	fetch("/get/profile", {
		method: "GET",
		headers: {
			"X-CSRF-Token": csrftoken,
			"Content-type": "application/json; charset=UTF-8"
		}
	})
		.then((response) => response.json())
		.then((json) => console.log(json));
}*/

async function getUsers(path, username)
{
	try
	{
		const csrfToken = getCookie('csrftoken');
		const response = await fetch(path,
		{
			method: "GET",
			query: username=username,
			headers: {
				'X-CSRFToken': csrfToken,
				"Content-type": "application/json; charset=UTF-8"
			}
		});

		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		const json = await response.json();
		console.log(json);
	}
	catch (error)
	{
		console.error(error.message);
	}

}

let buffer;

async function backendPost(path, ...data)
{
	let _data = [];
	let dataIndex = 0;
	let response;
	for (const arg of data)
	{
		_data[dataIndex] = arg;
		dataIndex++;
	}
	try {
		const csrfToken = getCookie('csrftoken');
		response = await fetch(path, {
			method: "POST",
			body: JSON.stringify(_data),
			headers: {
				'X-CSRFToken': csrfToken,
				"Content-type": "application/json; charset=UTF-8"
			}
		});

		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		buffer = await response.json();
	} catch (error) {
		buffer = await response.json();
	}
}

async function postAvatar(fileInput)
{
	const formData = new FormData();
	let response;

	formData.append('avatar_img', fileInput.files[0]);
	try {
		const csrfToken = getCookie('csrftoken');
		response = await fetch("/post/avatar/", {
			method: "POST",
			body: formData,
			headers: {
				'X-CSRFToken': csrfToken
			}
		});

		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		buffer = await response.json();
	} catch (error) {
		buffer = await response.json();
	}
}

async function getAvatar()
{
	try {
		const csrfToken = getCookie('csrftoken');
		const response = await fetch("/get/avatar/", {
			method: "POST",
			body: "",
			headers: {
				'X-CSRFToken': csrfToken
			}
		});

		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const data = await response.json();
		if (data.message === 'No file associated') {
			document.getElementById('avatar').src = 'static/img/default_avatar.png';
			document.getElementById('avatarProfile').src = 'static/img/default_avatar.png';
		}
		else{
			document.getElementById('avatar').src = data.avatar_url;
			document.getElementById('avatarProfile').src = data.avatar_url;
		}
	} catch (error) {
		console.error(error.message);
	}
}
