function setBlock(tournamentMatches, tournamentId, tournamentWinner, matchesNumber){

	let data = [];

	nodeUrl = "http://ganache:7545";
	for (let match of tournamentMatches){
		let data_info = [];
		data_info.push(match[0]); //player1
		data_info.push(match[1]); //player2
		data_info.push(match[3]); //winner
		data_info.push(match[4]); //player1_points
		data_info.push(match[5]); //player2_points
		data.push(data_info);
	}
	backendPost("/get/setblock/", nodeUrl, tournamentId, tournamentWinner, matchesNumber, data);
}

async function getBlock(){

	const tournamentId = document.getElementById("tournamentIdInput").value;
	if (tournamentId < 0){
		document.getElementById('blockchainOutput').innerHTML = `
			<p>Negative value not allowed.</p>
		`;
		return;
	}
	nodeUrl = "http://ganache:7545";
	await backendPost("/get/getblock/", nodeUrl, tournamentId);
	if (buffer.error){
		let startIndex = buffer.error.search("message");
		if (startIndex !== -1){
			let valueStartIndex = buffer.error.indexOf("'", startIndex + 8);
			let valueEndIndex = buffer.error.indexOf("'", valueStartIndex + 1);
			if (valueStartIndex !== -1 && valueEndIndex !== -1) {
				const message = buffer.error.substring(valueStartIndex + 1, valueEndIndex);
				document.getElementById('blockchainOutput').innerHTML = `
					<p>${message}</p>
				`;
			}
			else {
				document.getElementById('blockchainOutput').innerHTML = `
					<p>The value of the message could not be extracted.</p>
				`;
			}
		}
		else {
			document.getElementById('blockchainOutput').innerHTML = `
				<p>${buffer.error}</p>
			`;
		}
	}
	else{
		generateCubeHTML();
	}
}

function generateCubeHTML(){

	document.getElementById('blockchainOutput').innerHTML = `
		<div class="container">
	`;
	console.log(buffer.scores.length);
	for (let i = 0; i < buffer.scores.length; i++){
		document.getElementById('blockchainOutput').innerHTML += `
				<div class="bg-dark text-white border p-3">
					<p>Match ${i}: ${buffer.scores[i].join(', ')}</p>
				</div>
		`;
	}
	document.getElementById('blockchainOutput').innerHTML += `
			<div class="bg-dark text-white border p-3">
				<p>Winner: ${buffer.winner}</p>
			</div>
			<div class= "bg-dark text-white border p-3">
				<p>Blockchain Cube</p>
			</div>
			<div class= "bg-dark text-white border p-3">
				<p>End of Data</p>
			</div>
		</div>
	`;
}
