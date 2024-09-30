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


async function backendPost(path, ...data)
{
	console.log("hello");
	let _data = [];
	let dataIndex = 0;
	for (const arg of data)
	{
		_data[dataIndex] = arg;
		dataIndex++;
	}
	try {
		const csrfToken = getCookie('csrftoken');

		const response = await fetch(path, {
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

		const json = await response.json();
		console.log(json);
	} catch (error) {
		console.error(error.message);
	}
}

async function avatarPost(fileInput)
{
	const formData = new FormData();

	formData.append('file', fileInput.files[0]);
	try {
		const response = await fetch("/post/changeavatar", {
			method: "POST",
			body: formData,
			headers: {
				'X-CSRFToken': formData.get('csrfmiddlewaretoken')
			}
		});

		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		const json = await response.json();
		console.log(json);
	} catch (error) {
		console.error(error.message);
	}
}

async function avatarGet()
{
	try {
		const response = await fetch("/get/avatar", {
			method: "GET",
			headers: {
				'X-CSRFToken': formData.get('csrfmiddlewaretoken')
			}
		});

		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		//WRITE WHAT TO DO WITH IMAGE
	} catch (error) {
		console.error(error.message);
	}
}
