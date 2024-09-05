const players = []

const player = {
	id: "unique_player_id",  // Identifiant unique du joueur
	username: "player_name", // Nom du joueur
	globalStats: {
		totalPoints: { won: 0, lost: 0, played: 0 }, // Points globaux sur tous les modes
		totalMatches: { won: 0, lost: 0, played: 0 }, // Matchs globaux
		totalTournaments: { won: 0, lost: 0, played: 0 } // Tournois globaux
	},
	modeStats: {
		solo: {
			totalPoints: { won: 0, lost: 0, played: 0 }, // Points solo contre IA
			totalMatches: { won: 0, lost: 0, played: 0 }, // Matchs solo contre IA
			games: [] // Historique des parties solo
		},
		duo: {
			totalPoints: { won: 0, lost: 0, played: 0 }, // Points en duo
			totalMatches: { won: 0, lost: 0, played: 0 }, // Matchs en duo
			games: [] // Historique des parties duo
		},
		tournament: {
			totalPoints: { won: 0, lost: 0, played: 0 }, // Points en tournoi
			totalMatches: { won: 0, lost: 0, played: 0 }, // Matchs en tournoi
			totalTournaments: { won: 0, lost: 0, played: 0 }, // Tournois en tournoi
			games: [] // Historique des parties tournoi
		}
	}
};

const game = {
	id: "unique_game_id",
	opponent: "player2",
	points: { won: 7, lost: 11 },
	win: false
};
