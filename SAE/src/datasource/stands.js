const stands = [
    {
        id: "HALL-A-01",
        label: "Neo Arcade",
        zone: "extérieur",
        dimensions: {
            largeur_m: 10,
            profondeur_m: 10
        },
        surface_m2: 100,
        tarif_emplacement_eur: 620,
        infrastructures: ["electricite", "internet", "scene"],
        status: "occupied",
        occupant: {
            prestataireId: 101,
            companyName: "NovaGames - Éditeur",
            category: "éditeur-jeux",
            description: "Éditeur indépendant présentant ses licences premium, bornes arcades et tournois e-sport.",
            activities: ["Freeplay", "Tournois e-sport", "Vente de goodies"],
            needs: ["electricite", "internet", "scene"],
            contact: {
                responsable: "Claire Martin",
                email: "contact@novagames.example",
                tel: "+33 1 23 45 67 89"
            },
            since: "2025-11-11T08:00:00Z"
        },
        requests: [
            {
                requestId: "REQ-HALL-A-01-0001",
                status: "approved",
                submittedAt: "2025-10-30T09:12:00Z",
                decisionAt: "2025-11-05T15:00:00Z",
                prestataire: {
                    id: 101,
                    name: "Claire Martin",
                    companyName: "NovaGames - Éditeur",
                    category: "éditeur-jeux"
                },
                contact: {
                    email: "contact@novagames.example",
                    phone: "+33 1 23 45 67 89"
                },
                message: "Nous souhaitons installer trois bornes arcades, un corner boutique et projeter nos trailers.",
                needsDetails: "Nous souhaitons installer trois bornes arcades, un corner boutique et projeter nos trailers.",
                synopsis: "Éditeur indépendant présentant ses licences premium, bornes arcades et tournois e-sport.",
                needs: ["electricite", "internet"],
                decisionNotes: "Stand validé pour la zone tournois"
            }
        ],
        map_infos: {
            type: "polygon",
            coords: [[[757.4817379765262,658.5364012816275],[804.1093659869573,665.8313000828934],[812.2148090994748,619.6302743415425],[766.4830458541114,612.1220744057366],[757.4817379765262,658.5364012816275]]],
            color: "#00ff00"
        }
    },
    {
        id: "HALL-A-02",
        label: "Indie Station",
        zone: "extérieur",
        dimensions: {
            largeur_m: 8,
            profondeur_m: 6
        },
        surface_m2: 48,
        tarif_emplacement_eur: 480,
        infrastructures: ["electricite", "internet"],
        status: "pending",
        occupant: null,
        requests: [
            {
                requestId: "REQ-HALL-A-02-0003",
                status: "pending",
                submittedAt: "2025-11-20T10:30:00Z",
                prestataire: {
                    id: 2,
                    name: "Jane Smith",
                    companyName: "PixelForge Studio",
                    category: "éditeur-jeux"
                },
                contact: {
                    email: "hello@pixelforge.example",
                    phone: "+33 6 12 34 56 78"
                },
                message: "Présentation de trois prototypes PC + boutique de prints, besoin d'un fond mural",
                needsDetails: "Présentation de trois prototypes PC + boutique de prints, besoin d'un fond mural",
                synopsis: "PixelForge Studio vient faire tester ses prochains jeux indépendants et vendre des prints exclusifs.",
                needs: ["electricite", "internet"],
                notes: null
            },
            {
                requestId: "REQ-HALL-A-02-0002",
                status: "rejected",
                submittedAt: "2025-11-18T18:10:00Z",
                decisionAt: "2025-11-19T09:12:00Z",
                decisionReason: "Stand positionné sur une zone thématique.",
                prestataire: {
                    id: 12,
                    name: "Sasha K.",
                    companyName: "RetroBits",
                    category: "collectibles"
                },
                contact: {
                    email: "hello@retrobits.example",
                    phone: "+33 6 55 55 55 11"
                },
                message: "Proposition boutique consoles rétro.",
                needsDetails: "Proposition boutique consoles rétro avec vitrines sécurisées.",
                synopsis: "RetroBits voulait proposer une sélection de consoles vintage et accessoires de collection.",
                needs: ["electricite"],
                notes: "Orienté vers zone B"
            }
        ],
        map_infos: {
            type: "polygon",
            coords: [[[636.5771408872839,562.4068018051612],[646.0731792352947,512.1833100979047],[697.2462747773521,519.9911638507135],[688.277794115342,571.0587478555709],[636.5771408872839,562.4068018051612]]],
            color: "#ffaa00"
        }
    },
    {
        id: "HALL-B-01",
        label: "Street Bites",
        zone: "extérieur",
        dimensions: {
            largeur_m: 5,
            profondeur_m: 2
        },
        surface_m2: 10,
        tarif_emplacement_eur: 260,
        infrastructures: ["electricite", "eau"],
        status: "pending",
        occupant: null,
        requests: [
            {
                requestId: "REQ-HALL-B-01-0001",
                status: "pending",
                submittedAt: "2025-11-22T14:15:00Z",
                prestataire: {
                    id: 3,
                    name: "Alice Brown",
                    companyName: "StreetBites",
                    category: "restauration"
                },
                contact: {
                    email: "contact@streetbites.example",
                    phone: "+33 7 11 22 33 44"
                },
                message: "Food truck burgers / options veggie, besoin arrivée d'eau + prises 32A.",
                needsDetails: "Food truck burgers / options veggie, besoin arrivée d'eau + prises 32A.",
                synopsis: "StreetBites propose un menu street-food gourmand avec options veggie.",
                needs: ["electricite", "eau"],
                notes: null
            }
        ],
        map_infos: {
            type: "polygon",
            coords: [[[631.1626528063092,585.3273152746675],[676.0412115135127,592.7075345297495],[667.6371468126393,637.5007727831368],[623.0998699206997,630.3338546625947],[631.1626528063092,585.3273152746675]]],
            color: "#ff0066"
        }
    },
    {
        id: "HALL-B-02",
        label: "Makers Corner",
        zone: "extérieur",
        dimensions: {
            largeur_m: 6,
            profondeur_m: 4
        },
        surface_m2: 24,
        tarif_emplacement_eur: 320,
        infrastructures: ["electricite"],
        status: "available",
        occupant: null,
        requests: [],
        map_infos: null
    },
    {
        id: "HALL-C-01",
        label: "LicenPop Store",
        zone: "Hall C",
        dimensions: {
            largeur_m: 10,
            profondeur_m: 10
        },
        surface_m2: 100,
        tarif_emplacement_eur: 720,
        infrastructures: ["electricite", "scene"],
        status: "occupied",
        occupant: {
            prestataireId: 205,
            companyName: "LicenPop",
            category: "licence",
            description: "Boutique officielle d'objets dérivés, animations cosplay et concours.",
            activities: ["Concours cosplay", "Rencontres photo"],
            needs: ["electricite", "scene"],
            contact: {
                responsable: "Antoine Girard",
                email: "partners@licenpop.example",
                tel: "+33 1 98 76 54 31"
            },
            since: "2025-11-11T10:00:00Z"
        },
        requests: [
            {
                requestId: "REQ-HALL-C-01-0001",
                status: "approved",
                submittedAt: "2025-10-25T12:47:00Z",
                decisionAt: "2025-10-28T09:00:00Z",
                prestataire: {
                    id: 205,
                    name: "Antoine Girard",
                    companyName: "LicenPop",
                    category: "licence"
                },
                contact: {
                    email: "partners@licenpop.example",
                    phone: "+33 1 98 76 54 31"
                },
                message: "Animations cosplay quotidiennes + boutique exclusive.",
                needsDetails: "Animations cosplay quotidiennes + boutique exclusive. Besoin loge arrière et portants.",
                synopsis: "Animations cosplay quotidiennes et boutique officielle d'objets dérivés.",
                needs: ["scene", "electricite"],
                decisionNotes: "Placer face scène principale"
            }
        ],
        map_infos: null
    },
    {
        id: "HALL-C-02",
        label: "Creative Alley",
        zone: "extérieur",
        dimensions: {
            largeur_m: 4,
            profondeur_m: 2
        },
        surface_m2: 8,
        tarif_emplacement_eur: 180,
        infrastructures: ["electricite"],
        status: "available",
        occupant: null,
        requests: []
    },
    {
        id: "GYM-INT-001",
        label: "Stands intérieurs",
        zone: "extérieur",
        dimensions: {
            largeur_m: 50,
            profondeur_m: 40
        },
        surface_m2: 2000,
        tarif_emplacement_eur: 0,
        infrastructures: ["electricite", "internet", "climatisation"],
        status: "occupied",
        occupant: null,
        requests: [],
        map_infos: {
            type: "polygon",
            coords: [[[835.58646101972, 517.8595438986426], [844.0742691171718, 469.2099121205654], [1034.739421745296, 511.2349131884364], [998.0969331294675, 555.1230916435529], [835.58646101972, 517.8595438986426]]],
            color: "#9C27B0"
        }
    },
    {
        id: "INT-STAND-01",
        label: "Stand Intérieur 1",
        zone: "intérieur",
        dimensions: {
            largeur_m: 6,
            profondeur_m: 4
        },
        surface_m2: 24,
        tarif_emplacement_eur: 200,
        infrastructures: ["electricite"],
        status: "available",
        occupant: null,
        requests: [],
        map_infos: {
            type: "polygon",
            coords: [[[99.56640625000011, 880.65625], [513.2578125000001, 882.05859375], [516.0625000000001, 746.03125], [100.96875000000011, 743.2265625], [99.56640625000011, 880.65625]]],
            color: "#FF6B6B"
        }
    },
    {
        id: "INT-STAND-02",
        label: "Stand Intérieur 2",
        zone: "intérieur",
        dimensions: {
            largeur_m: 6,
            profondeur_m: 4
        },
        surface_m2: 24,
        tarif_emplacement_eur: 200,
        infrastructures: ["electricite"],
        status: "available",
        occupant: null,
        requests: [],
        map_infos: {
            type: "polygon",
            coords: [[[521.6718750000001, 875.7480468749999], [524.4765625000001, 749.5371093749999], [835.7968750000001, 746.7324218749999], [835.7968750000001, 878.5527343749999], [521.6718750000001, 875.7480468749999]]],
            color: "#4ECDC4"
        }
    },
    {
        id: "INT-STAND-03",
        label: "Stand Intérieur 3",
        zone: "intérieur",
        dimensions: {
            largeur_m: 8,
            profondeur_m: 6
        },
        surface_m2: 48,
        tarif_emplacement_eur: 300,
        infrastructures: ["electricite", "internet"],
        status: "available",
        occupant: null,
        requests: [],
        map_infos: {
            type: "polygon",
            coords: [[[841.4062500000001, 877.1503906249999], [841.4062500000001, 748.1347656249999], [1336.43359375, 749.5371093749999], [1335.03125, 884.1621093749999], [841.4062500000001, 877.1503906249999]]],
            color: "#FFE66D"
        }
    }
];

export default stands;
