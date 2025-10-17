// SAE/src/datasource/data_billetterie.js
const billets = {
    billets1Jour: [
        { "nom": "Billet 1 jour - jeudi", "prix": 10, "quantite": 100, "jours": ["jeudi"] },
        { "nom": "Billet 1 jour - vendredi", "prix": 10, "quantite": 100, "jours": ["vendredi"] },
        { "nom": "Billet 1 jour - samedi", "prix": 10, "quantite": 100, "jours": ["samedi"] },
        { "nom": "Billet 1 jour - dimanche", "prix": 10, "quantite": 100, "jours": ["dimanche"] }
    ],
    billets2Jours: [
        { "nom": "Billet 2 jours - jeudi + vendredi", "prix": 20, "quantite": 100, "jours": ["jeudi", "vendredi"] },
        { "nom": "Billet 2 jours - vendredi + samedi", "prix": 20, "quantite": 100, "jours": ["vendredi", "samedi"] },
        { "nom": "Billet 2 jours - samedi + dimanche", "prix": 20, "quantite": 100, "jours": ["samedi", "dimanche"] },
        { "nom": "Billet 2 jours - jeudi + samedi", "prix": 20, "quantite": 100, "jours": ["jeudi", "samedi"] },
        { "nom": "Billet 2 jours - jeudi + dimanche", "prix": 20, "quantite": 100, "jours": ["jeudi", "dimanche"] },
        { "nom": "Billet 2 jours - vendredi + dimanche", "prix": 20, "quantite": 100, "jours": ["vendredi", "dimanche"] }
    ],
    billets3Jours: [
        { "nom": "Billet 3 jours - jeudi + vendredi + samedi", "prix": 30, "quantite": 100, "jours": ["jeudi", "vendredi", "samedi"] },
        { "nom": "Billet 3 jours - vendredi + samedi + dimanche", "prix": 30, "quantite": 100, "jours": ["vendredi", "samedi", "dimanche"] },
        { "nom": "Billet 3 jours - jeudi + samedi + dimanche", "prix": 30, "quantite": 100, "jours": ["jeudi", "samedi", "dimanche"] },
        { "nom": "Billet 3 jours - jeudi + vendredi + dimanche", "prix": 30, "quantite": 100, "jours": ["jeudi", "vendredi", "dimanche"] }
    ],
    billets4Jours: [
        { "nom": "Billet 4 jours - jeudi + vendredi + samedi + dimanche", "prix": 40, "quantite": 100, "jours": ["jeudi", "vendredi", "samedi", "dimanche"] }
    ]
};

export { billets }
