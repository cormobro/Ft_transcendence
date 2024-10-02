// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;
contract TournamentScores{

	mapping(uint256 => Match[]) public tournamentMatches;
	mapping(uint256 => string) public tournamentWinners;

	struct Match {
		uint256	id;
		string	player1;
		string	player2;
		string	winner;
		uint256	pointsPlayer1;
		uint256	pointPlayer2;
	}

	constructor(){}

	function setTournamentMatches(uint256 _tournamentId, uint256[] memory _matchesId, string[] memory _players1, string[]  memory _players2, string[]  memory _matchesWinners,
		uint256[] memory _pointsPlayers1, uint256[] memory _pointsPlayers2, string memory _tournamentWinner, uint256 _matchesNumber) public {
		for (uint256 i = 0; i < _matchesNumber; i++)
			tournamentMatches[_tournamentId].push(Match(_matchesId[i], _players1[i], _players2[i], _matchesWinners[i], _pointsPlayers1[i], _pointsPlayers2[i]));
		tournamentWinners[_tournamentId] = _tournamentWinner;
	}

	function getTournamentMatches(uint256 _tournamentId) public view returns (Match[] memory) {

		return (tournamentMatches[_tournamentId]);
	}

	function getTournamentWinner(uint256 _tournamentId) public view returns (string memory) {

		return (tournamentWinners[_tournamentId]);
	}
}
