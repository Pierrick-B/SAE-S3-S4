// javascript
const stands = [
    {
        "id": "stand-3-1-a",
        "nom": "NovaGames - Éditeur",
        "categorie": "éditeur-jeux",
        "description": "Éditeur indépendant présentant son catalogue, démos jouables et vente de goodies.",
        "activites": [
            "Vente de goodies",
            "Test de jeux vidéos",
            "Concours de jeux vidéo"
        ],
        "besoins_logistiques": [
            "accès à l'électricité",
            "connexion internet",
            "utilisation de la scène"
        ],
        "dimensions": {
            "largeur_m": 10,
            "profondeur_m": 10
        },
        "surface_m2": 100,
        "capacite_personnes": 40,
        "tarif_emplacement_eur": 600,
        "contact": {
            "email": "contact@novagames.example",
            "tel": "+33 1 23 45 67 89",
            "responsable": "Claire Martin"
        },
        "images": [
            "/images/stands/novagames-1.jpg",
            "/images/stands/novagames-2.jpg"
        ],
        "created_at": "2025-11-11T08:00:00Z",
        "map_infos":{
            "type": "polygon",
            "coords": [[[757.4817379765262,658.5364012816275],[804.1093659869573,665.8313000828934],[812.2148090994748,619.6302743415425],[766.4830458541114,612.1220744057366],[757.4817379765262,658.5364012816275]]],

            "color":"00ff00"
        }
    },
    {
        "id": "stand-3-1-b",
        "nom": "PixelForge - Éditeur",
        "categorie": "éditeur-jeux",
        "description": "Studio mobile spécialisé en jeux rétro et souvenirs collectors.",
        "activites": [
            "Vente de goodies",
            "Test de jeux vidéos"
        ],
        "besoins_logistiques": [
            "accès à l'électricité",
            "connexion internet"
        ],
        "dimensions": {
            "largeur_m": 8,
            "profondeur_m": 6
        },
        "surface_m2": 48,
        "capacite_personnes": 20,
        "tarif_emplacement_eur": 420,
        "contact": {
            "email": "hello@pixelforge.example",
            "tel": "+33 6 12 34 56 78",
            "responsable": "Lucas Rey"
        },
        "images": [
            "/images/stands/pixelforge.jpg"
        ],
        "created_at": "2025-11-11T08:15:00Z",
        "map_infos":{
            "type": "polygon",
            "coords":[[[636.5771408872839,562.4068018051612],[646.0731792352947,512.1833100979047],[697.2462747773521,519.9911638507135],[688.277794115342,571.0587478555709],[636.5771408872839,562.4068018051612]]],
            "color":"ff0000"
        }
    },
    {
        "id": "stand-3-2-a",
        "nom": "StreetBites - Food Truck (stand)",
        "categorie": "restauration",
        "description": "Stand de restauration rapide proposant burgers artisanaux et options végétariennes.",
        "activites": [
            "Vente de nourriture"
        ],
        "besoins_logistiques": [
            "accès à l'eau",
            "accès à l'électricité"
        ],
        "dimensions": {
            "largeur_m": 5,
            "profondeur_m": 2
        },
        "surface_m2": 10,
        "capacite_personnes": 6,
        "tarif_emplacement_eur": 250,
        "contact": {
            "email": "contact@streetbites.example",
            "tel": "+33 7 11 22 33 44",
            "responsable": "Marion Dupont"
        },
        "images": [
            "/images/stands/streetbites.jpg"
        ],
        "created_at": "2025-11-11T09:00:00Z",
        "map_infos":{
            "type": "polygon",
            "coords": [[[631.1626528063092,585.3273152746675],[676.0412115135127,592.7075345297495],[667.6371468126393,637.5007727831368],[623.0998699206997,630.3338546625947],[631.1626528063092,585.3273152746675]]],

            "color":"0000ff"
        }
    },
    {
        "id": "stand-3-2-b",
        "nom": "Tea & Treats - Stand alimentaire",
        "categorie": "restauration",
        "description": "Stand spécialisé dans les boissons chaudes et pâtisseries maison.",
        "activites": [
            "Vente de nourriture"
        ],
        "besoins_logistiques": [
            "accès à l'eau",
            "accès à l'électricité"
        ],
        "dimensions": {
            "largeur_m": 4,
            "profondeur_m": 2
        },
        "surface_m2": 8,
        "capacite_personnes": 4,
        "tarif_emplacement_eur": 180,
        "contact": {
            "email": "info@teaandtreats.example",
            "tel": "+33 6 98 76 54 32",
            "responsable": "Sophie Laurent"
        },
        "images": [],
        "created_at": "2025-11-11T09:30:00Z"
    },
    {
        "id": "stand-3-3-a",
        "nom": "LicenPop - Stand licences films & séries",
        "categorie": "licence",
        "description": "Boutique officielle d'objets dérivés, animations cosplay et concours.",
        "activites": [
            "Vente de goodies",
            "Concours de cosplay"
        ],
        "besoins_logistiques": [
            "accès à l'électricité",
            "utilisation de la scène"
        ],
        "dimensions": {
            "largeur_m": 10,
            "profondeur_m": 10
        },
        "surface_m2": 100,
        "capacite_personnes": 50,
        "tarif_emplacement_eur": 700,
        "contact": {
            "email": "partners@licenpop.example",
            "tel": "+33 1 98 76 54 31",
            "responsable": "Antoine Girard"
        },
        "images": [
            "/images/stands/licenpop-1.jpg"
        ],
        "animations": [
            {
                "type": "concours-cosplay",
                "heure": "17:00"
            }
        ],
        "created_at": "2025-11-11T10:00:00Z"
    },
    {
        "id": "stand-3-3-b",
        "nom": "RetroLicense - Stand licences indépendantes",
        "categorie": "licence",
        "description": "Vente d'objets dérivés de séries cultes, animations communautaires.",
        "activites": [
            "Vente de goodies"
        ],
        "besoins_logistiques": [
            "accès à l'électricité"
        ],
        "dimensions": {
            "largeur_m": 6,
            "profondeur_m": 4
        },
        "surface_m2": 24,
        "capacite_personnes": 12,
        "tarif_emplacement_eur": 320,
        "contact": {
            "email": "shop@retrolicense.example",
            "tel": "+33 6 01 02 03 04",
            "responsable": "Pauline Roche"
        },
        "images": [],
        "created_at": "2025-11-11T10:30:00Z"
    }
];

export default stands;
