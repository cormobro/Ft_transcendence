function hideAllContentDivs(){

	var contentDivs = document.getElementsByClassName('content');

	for (var i = 0; i < contentDivs.length; ++i) {
		var div = contentDivs[i];
		div.style.display='none';
	}
};

document.getElementById("duoModeButton").addEventListener('click', async function() {

	await backendPost("/get/currentuser/");
	if (buffer.error)
		document.getElementById("duoButtonOutputText").innerText = buffer.error;
	else
		window.location.href = "#duo";
});

document.getElementById("tournamentModeButton").addEventListener('click', async function() {

	await backendPost("/get/currentuser/");
	if (buffer.error)
		document.getElementById("tournamentButtonOutputText").innerText = buffer.error;
	else
		window.location.href = "#tournament";
});

document.getElementById('avatarInput').addEventListener('change', function() {

	var fileName = this.files[0].name;
	document.getElementById('fileName').textContent = fileName;
});

document.getElementById("avatarSubmitButton").addEventListener('click', function(){

	console.log("Button has been clicked");
	var form = document.getElementById("avatarForm");
	var input = document.getElementById("avatar_img").value;

	console.log("Input:"+input);
	if (input.length === 0)
		document.getElementById("avatarOutput").innerText = "File does not exist";
	else{
		form.submit();
		getAvatar();
	}
});
