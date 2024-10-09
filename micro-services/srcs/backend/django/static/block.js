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

	const tournamentId = document.getElementById("tournamentId").value;
	nodeUrl = "http://ganache:7545";
	await backendPost("/get/getblock/", nodeUrl, tournamentId);
	if (buffer.scores !== undefined && buffer.winner !== undefined){
		generateCubeHTML();
		// document.getElementById('matchesOutput').innerText = buffer.scores;
		// document.getElementById('winnerOutput').innerText = buffer.winner;
	}
	else{
		document.getElementById('blockchainOutput').innerText = "Error while executing transaction";
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
