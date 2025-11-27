const classements = [
    {
        organisateurs: ["stand-3-1-a"],
        nom: "Tournoi Retro - Classique",
        description: "Tournoi jeux rétro organisé par NovaGames.",
        date: "2025-11-20",
        prize: "Trophée + goodies",
        participants_count: 6,
        classement: [
            { id_user: 3, place: 1, score: 9800 },
            { id_user: 1, place: 2, score: 8700 },
            { id_user: 5, place: 3, score: 7600 },
            { id_user: 2, place: 4, score: 6500 },
            { id_user: 4, place: 5, score: 5400 },
            { id_user: 6, place: 6, score: 4200 }
        ],
        created_at: "2025-11-11T08:00:00Z"
    },
    {
        organisateurs: ["stand-3-1-b"],
        nom: "Speedrun Challenge",
        description: "Épreuve de speedrun sur une démo sélectionnée.",
        date: "2025-11-21",
        prize: "Passe prioritaire + goodies",
        participants_count: 4,
        classement: [
            { id_user: 2, place: 1, time_seconds: 123 },
            { id_user: 6, place: 2, time_seconds: 145 },
            { id_user: 1, place: 3, time_seconds: 152 },
            { id_user: 5, place: 4, time_seconds: 201 }
        ],
        created_at: "2025-11-11T08:15:00Z"
    },
    {
        organisateurs: ["stand-3-3-a"],
        nom: "Concours Cosplay - Individuel",
        description: "Présentation individuelle judged par un panel.",
        date: "2025-11-23",
        prize: "Billets + pack partenaire",
        participants_count: 3,
        classement: [
            { id_user: 4, place: 1, points: 95 },
            { id_user: 1, place: 2, points: 88 },
            { id_user: 6, place: 3, points: 72 }
        ],
        created_at: "2025-11-11T10:00:00Z"
    }
]

export default classements