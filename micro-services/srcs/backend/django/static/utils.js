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

document.getElementById('avatar_img').addEventListener('change', function() {

	var fileName = this.files[0].name;
	document.getElementById('fileName').textContent = fileName;
});
