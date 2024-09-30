const CONTRACT_ADDRESS = '0xF90ba1a351d7399fD4f4138d044aA9DbD60979bb';
const CONTRACT_ABI = [
	{
	  "inputs": [],
	  "stateMutability": "nonpayable",
	  "type": "constructor"
	},
	{
	  "inputs": [
		{
		  "internalType": "uint256",
		  "name": "",
		  "type": "uint256"
		},
		{
		  "internalType": "uint256",
		  "name": "",
		  "type": "uint256"
		}
	  ],
	  "name": "tournamentMatches",
	  "outputs": [
		{
		  "internalType": "uint256",
		  "name": "id",
		  "type": "uint256"
		},
		{
		  "internalType": "string",
		  "name": "player1",
		  "type": "string"
		},
		{
		  "internalType": "string",
		  "name": "player2",
		  "type": "string"
		},
		{
		  "internalType": "string",
		  "name": "winner",
		  "type": "string"
		},
		{
		  "internalType": "uint256",
		  "name": "pointsPlayer1",
		  "type": "uint256"
		},
		{
		  "internalType": "uint256",
		  "name": "pointPlayer2",
		  "type": "uint256"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function",
	  "constant": true
	},
	{
	  "inputs": [
		{
		  "internalType": "uint256",
		  "name": "",
		  "type": "uint256"
		}
	  ],
	  "name": "tournamentWinners",
	  "outputs": [
		{
		  "internalType": "string",
		  "name": "",
		  "type": "string"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function",
	  "constant": true
	},
	{
	  "inputs": [
		{
		  "internalType": "uint256",
		  "name": "_tournamentId",
		  "type": "uint256"
		},
		{
		  "internalType": "uint256",
		  "name": "_matchId",
		  "type": "uint256"
		},
		{
		  "internalType": "string",
		  "name": "_player1",
		  "type": "string"
		},
		{
		  "internalType": "string",
		  "name": "_player2",
		  "type": "string"
		},
		{
		  "internalType": "string",
		  "name": "_winner",
		  "type": "string"
		},
		{
		  "internalType": "uint256",
		  "name": "_pointsPlayer1",
		  "type": "uint256"
		},
		{
		  "internalType": "uint256",
		  "name": "_pointsPlayer2",
		  "type": "uint256"
		}
	  ],
	  "name": "setTournamentMatches",
	  "outputs": [],
	  "stateMutability": "nonpayable",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "uint256",
		  "name": "_tournamentId",
		  "type": "uint256"
		}
	  ],
	  "name": "getTournamentMatches",
	  "outputs": [
		{
		  "components": [
			{
			  "internalType": "uint256",
			  "name": "id",
			  "type": "uint256"
			},
			{
			  "internalType": "string",
			  "name": "player1",
			  "type": "string"
			},
			{
			  "internalType": "string",
			  "name": "player2",
			  "type": "string"
			},
			{
			  "internalType": "string",
			  "name": "winner",
			  "type": "string"
			},
			{
			  "internalType": "uint256",
			  "name": "pointsPlayer1",
			  "type": "uint256"
			},
			{
			  "internalType": "uint256",
			  "name": "pointPlayer2",
			  "type": "uint256"
			}
		  ],
		  "internalType": "struct TournamentScores.Match[]",
		  "name": "",
		  "type": "tuple[]"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function",
	  "constant": true
	},
	{
	  "inputs": [
		{
		  "internalType": "uint256",
		  "name": "_tournamentId",
		  "type": "uint256"
		},
		{
		  "internalType": "string",
		  "name": "_player",
		  "type": "string"
		}
	  ],
	  "name": "setTournamentWinner",
	  "outputs": [],
	  "stateMutability": "nonpayable",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "uint256",
		  "name": "_tournamentId",
		  "type": "uint256"
		}
	  ],
	  "name": "getTournamentWinner",
	  "outputs": [
		{
		  "internalType": "string",
		  "name": "",
		  "type": "string"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function",
	  "constant": true
	}
];

const web3 = new Web3('http://127.0.0.1:7545');
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

// Fonction pour enregistrer un match
async function setTournamentScores() {
	const tournamentId = document.getElementById('tournamentId').value;
	const matchId = document.getElementById('matchId').value;
	const player1 = document.getElementById('player1').value;
	const player2 = document.getElementById('player2').value;
	const winner = document.getElementById('winner').value;
	const pointsPlayer1 = document.getElementById('pointsPlayer1').value;
	const pointsPlayer2 = document.getElementById('pointsPlayer2').value;
	const tournamentWinner = document.getElementById('tournamentWinner').value;

	const accounts = await web3.eth.getAccounts();
	if (tournamentId && matchId && player1 && player2 && winner && pointsPlayer1 && pointsPlayer2 && tournamentWinner) {
		try {
		// Envoi de la transaction au contrat pour enregistrer les scores
			await contract.methods.setTournamentMatches(tournamentId, matchId, player1, player2, winner, pointsPlayer1, pointsPlayer2)
			.send({ from: accounts[0], gas: 3000000 })
			.on('transactionHash', (hash) => {
				console.log(`Transaction envoyée : ${hash}`);
				alert(`Transaction envoyée : ${hash}`);
			})
			.on('confirmation', (confirmationNumber, receipt) => {
				console.log(`Transaction confirmée : ${confirmationNumber}`);
			});
			await contract.methods.setTournamentWinner(tournamentId, winner)
			.send({ from: accounts[0], gas: 3000000 })
			.on('transactionHash', (hash) => {
				console.log(`Transaction envoyée : ${hash}`);
				alert(`Transaction envoyée : ${hash}`);
			})
			.on('confirmation', (confirmationNumber, receipt) => {
				console.log(`Transaction confirmée : ${confirmationNumber}`);
			});
		} catch (error) {
			console.error(error);
			alert('Erreur lors de l\'enregistrement des scores.');
		}
	} else {
		alert('Veuillez remplir tous les champs.');
	}
}

// Fonction pour récupérer les scores d'un tournoi
document.getElementById('getTournamentScores').addEventListener('click', async () => {
	const tournamentId = document.getElementById('tournamentId').value;

	if (tournamentId) {
		try {
			const matches = await contract.methods.getTournamentMatches(tournamentId).call();
			const winner = await contract.methods.getTournamentWinner(tournamentId).call();

			// Afficher les scores récupérés
			document.getElementById('outputMatches').innerText = JSON.stringify(matches, null, 2);
			document.getElementById('outputWinner').innerText = JSON.stringify(winner, null, 2);
		} catch (error) {
			console.error(error);
			alert('Erreur lors de la récupération des scores.');
		}
	} else {
		alert('Veuillez entrer un ID de tournoi.');
	}
});
