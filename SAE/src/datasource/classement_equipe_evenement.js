const classements = [
    {
        organisateurs: ["stand-3-1-a"],
        nom: "Duo Challenge - Éditeurs",
        description: "Compétition par équipes de 2-3 joueurs organisée par NovaGames.",
        minimum_team_size: 2,
        maximum_team_size: 3,
        teams: [
            { id_team: 1, members_id: [1, 2], team_name: "Pixels United" },
            { id_team: 2, members_id: [3, 4], team_name: "Retro Force" },
            { id_team: 3, members_id: [5, 6], team_name: "Snack Breakers" }
        ],
        classement: [
            { id_team: 2, place: 1, score: 4200 },
            { id_team: 1, place: 2, score: 3800 },
            { id_team: 3, place: 3, score: 3200 }
        ],
        created_at: "2025-11-11T09:00:00Z"
    },
    {
        organisateurs: ["stand-3-3-a"],
        nom: "Cosplay Squad - Équipe",
        description: "Concours cosplay en équipe, panels et animations.",
        minimum_team_size: 2,
        maximum_team_size: 5,
        teams: [
            { id_team: 1, members_id: [1, 4, 6], team_name: "Guild A" },
            { id_team: 2, members_id: [2, 3], team_name: "Guild B" }
        ],
        classement: [
            { id_team: 1, place: 1, points: 183 },
            { id_team: 2, place: 2, points: 162 }
        ],
        created_at: "2025-11-11T10:30:00Z"
    }
]

export default classements