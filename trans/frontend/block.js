function setBlock(tournamentMatches, tournamentId, tournamentWinner, matchesNumber){

	let data = [];

	node_url = "http://127.0.0.1:7545";
	contract_address = "0x310b6A8f39Ab8f8f0d17c4b051CD1431AbA98F76";
	for (let match of tournamentMatches){
		let data_info = [];
		data_info.push(match.id); //matchid
		data_info.push(match.player1.username); //player1
		data_info.push(match.player2.username); //player2
		if (match.resultPlayer1 === true) //winner
			data_info.push(match.player1.username);
		else
			data_info.push(match.player2.username);
		data_info.push(match.pointsWonByPlayer1); //player1_points
		data_info.push(match.pointsWonByPlayer2); //player2_points
		data.push(data_info);
	}
	backendPost("/get/setblock/", node_url, contract_address, tournamentId, tournamentWinner, matchesNumber + 1, data);
}
