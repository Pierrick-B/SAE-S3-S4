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
        id: "HALL-C-01",
        label: "Stand Extérieur 5",
        zone: "extérieur",
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
        map_infos: {
            type: "polygon",
            coords: [[[631.1626528063092,585.3273152746675],[676.0412115135127,592.7075345297495],[667.6371468126393,637.5007727831368],[623.0998699206997,630.3338546625947],[631.1626528063092,585.3273152746675]]],
            color: "#ff0066"
        }
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
            color: "#FF5722"
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
            // Axis-aligned rectangle from provided points (min/max bbox)
            coords: [[[95.35937500000011, 734.8125], [584.7773437500001, 734.8125], [584.7773437500001, 879.25390625], [95.35937500000011, 879.25390625], [95.35937500000011, 734.8125]]],
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
            // Axis-aligned rectangle from provided points (min/max bbox)
            coords: [[[587.5820312500001, 735.5136718749999], [901.7070312500001, 735.5136718749999], [901.7070312500001, 874.3457031249999], [587.5820312500001, 874.3457031249999], [587.5820312500001, 735.5136718749999]]],
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
            // Axis-aligned rectangle from provided points (min/max bbox)
            coords: [[[904.7679564351085, 728.1031288500942], [1327.2661624764362, 728.1031288500942], [1327.2661624764362, 871.7525189041457], [904.7679564351085, 871.7525189041457], [904.7679564351085, 728.1031288500942]]],
            color: "#FFE66D"
        }
    },
    {
        id: "EXT-NEW-01",
        label: "Stand Extérieur 7",
        zone: "extérieur",
        dimensions: { largeur_m: 8, profondeur_m: 6 },
        surface_m2: 48,
        tarif_emplacement_eur: 300,
        infrastructures: ["electricite"],
        status: "available",
        occupant: null,
        requests: [],
        map_infos: { type: "polygon", coords: [[[316.9296875000001,246.796875],[378.6328125000001,79.91796875],[462.7734375000001,70.1015625],[399.6679687500001,266.4296875],[316.9296875000001,246.796875]]], color: "#e53935" }
    },
    {
        id: "EXT-NEW-02",
        label: "Stand Extérieur 8",
        zone: "extérieur",
        dimensions: { largeur_m: 8, profondeur_m: 6 },
        surface_m2: 48,
        tarif_emplacement_eur: 300,
        infrastructures: ["electricite"],
        status: "available",
        occupant: null,
        requests: [],
        map_infos: { type: "polygon", coords: [[[399.6679687500001,276.9472656249999],[639.4687500000001,327.4316406249999],[624.0429687500001,386.3300781249999],[387.0468750000001,334.4433593749999],[399.6679687500001,276.9472656249999]]], color: "#43a047" }
    },
    {
        id: "EXT-NEW-03",
        label: "Stand Extérieur 9",
        zone: "extérieur",
        dimensions: { largeur_m: 8, profondeur_m: 6 },
        surface_m2: 48,
        tarif_emplacement_eur: 300,
        infrastructures: ["electricite"],
        status: "available",
        occupant: null,
        requests: [],
        map_infos: { type: "polygon", coords: [[[626.8476562500001,389.1347656249999],[640.8710937500001,328.8339843749999],[903.1093750000001,377.9160156249999],[883.4765625000001,438.2167968749999],[626.8476562500001,389.1347656249999]]], color: "#1e88e5" }
    },
    {
        id: "EXT-NEW-04",
        label: "Stand Extérieur 10",
        zone: "extérieur",
        dimensions: { largeur_m: 8, profondeur_m: 6 },
        surface_m2: 48,
        tarif_emplacement_eur: 300,
        infrastructures: ["electricite"],
        status: "available",
        occupant: null,
        requests: [],
        map_infos: { type: "polygon", coords: [[[886.2812500000001,438.2167968749999],[904.5117187500001,380.7207031249999],[1147.1171875,425.5957031249999],[1100.83984375,480.2871093749999],[886.2812500000001,438.2167968749999]]], color: "#8e24aa" }
    },
    {
        id: "EXT-NEW-05",
        label: "Stand Extérieur 11",
        zone: "extérieur",
        dimensions: { largeur_m: 8, profondeur_m: 6 },
        surface_m2: 48,
        tarif_emplacement_eur: 300,
        infrastructures: ["electricite"],
        status: "available",
        occupant: null,
        requests: [],
        map_infos: { type: "polygon", coords: [[[440.7478541247572,144.13132725214228],[753.9803440960823,97.90538710218902],[748.4608288542968,46.15993171045028],[463.51585449712223,74.44744732460077],[440.7478541247572,144.13132725214228]]], color: "#fb8c00" }
    },
    {
        id: "EXT-NEW-06",
        label: "Stand Extérieur 12",
        zone: "extérieur",
        dimensions: { largeur_m: 8, profondeur_m: 6 },
        surface_m2: 48,
        tarif_emplacement_eur: 300,
        infrastructures: ["electricite"],
        status: "available",
        occupant: null,
        requests: [],
        map_infos: { type: "polygon", coords: [[[749.3308690269266,43.137726196224264],[845.3409152428292,40.93059869700812],[934.1777970862793,50.86267244348079],[1010.8754776840404,69.07147431201406],[1236.0024826040878,149.63162803340356],[1213.9312076119263,199.84377864057097],[755.4004696497711,99.97125930104016],[749.3308690269266,43.137726196224264]]], color: "#00897b" }
    },
    {
        id: "EXT-NEW-07",
        label: "Stand Extérieur 13",
        zone: "extérieur",
        dimensions: { largeur_m: 8, profondeur_m: 6 },
        surface_m2: 48,
        tarif_emplacement_eur: 300,
        infrastructures: ["electricite"],
        status: "available",
        occupant: null,
        requests: [],
        map_infos: { type: "polygon", coords: [[[1148.1694013325903,422.6372988514691],[1184.4649435383344,366.81088687483236],[1207.1691642273552,205.1627152301367],[1163.9945837709956,197.96695182074342],[1108.8270642989805,409.84220776398956],[1148.1694013325903,422.6372988514691]]], color: "#5e35b1" }
    },
    {
        id: "EXT-NEW-08",
        label: "Stand Extérieur 14",
        zone: "extérieur",
        dimensions: { largeur_m: 8, profondeur_m: 6 },
        surface_m2: 48,
        tarif_emplacement_eur: 300,
        infrastructures: ["electricite"],
        status: "available",
        occupant: null,
        requests: [],
        map_infos: { type: "polygon", coords: [[[511.1216734575218,211.74538896401418],[524.9204615619856,164.82950940883774],[636.000705802918,182.07799453941732],[620.8220388880079,227.6139952841474],[511.1216734575218,211.74538896401418]]], color: "#3949ab" }
    },
    {
        id: "EXT-NEW-09",
        label: "Stand Extérieur 15",
        zone: "extérieur",
        dimensions: { largeur_m: 8, profondeur_m: 6 },
        surface_m2: 48,
        tarif_emplacement_eur: 300,
        infrastructures: ["electricite"],
        status: "available",
        occupant: null,
        requests: [],
        map_infos: { type: "polygon", coords: [[[621.5119782932311,228.30393468937058],[636.6906452081412,183.4578733498637],[742.2513742072881,200.01641907522009],[725.6928284819317,246.93229863039653],[621.5119782932311,228.30393468937058]]], color: "#6d4c41" }
    },
    {
        id: "EXT-NEW-10",
        label: "Stand Extérieur 16",
        zone: "extérieur",
        dimensions: { largeur_m: 8, profondeur_m: 6 },
        surface_m2: 48,
        tarif_emplacement_eur: 300,
        infrastructures: ["electricite"],
        status: "available",
        occupant: null,
        requests: [],
        map_infos: { type: "polygon", coords: [[[726.3827678871548,246.24235922517335],[743.6312530177345,202.77617669611283],[842.982527369873,220.02466182669238],[825.7340422392933,264.8707231661993],[726.3827678871548,246.24235922517335]]], color: "#f4511e" }
    },
    {
        id: "EXT-NEW-11",
        label: "Stand Extérieur 17",
        zone: "extérieur",
        dimensions: { largeur_m: 8, profondeur_m: 6 },
        surface_m2: 48,
        tarif_emplacement_eur: 300,
        infrastructures: ["electricite"],
        status: "available",
        occupant: null,
        requests: [],
        map_infos: { type: "polygon", coords: [[[826.4239816445165,264.8707231661993],[843.6724667750962,220.71460123191557],[940.2639835063417,237.96308636249515],[923.7054377809854,283.49908710722525],[826.4239816445165,264.8707231661993]]], color: "#7cb342" }
    },
    {
        id: "EXT-NEW-12",
        label: "Stand Extérieur 18",
        zone: "extérieur",
        dimensions: { largeur_m: 8, profondeur_m: 6 },
        surface_m2: 48,
        tarif_emplacement_eur: 300,
        infrastructures: ["electricite"],
        status: "available",
        occupant: null,
        requests: [],
        map_infos: { type: "polygon", coords: [[[925.0853165914318,284.18902651244844],[940.9539229115649,237.96308636249515],[1052.0341671524973,261.42102614008337],[1036.8555002375874,307.64696629003663],[925.0853165914318,284.18902651244844]]], color: "#c0ca33" }
    }
    ,
    {
        id: "INT-STAND-04",
        label: "Stand Intérieur 4",
        zone: "intérieur",
        dimensions: { largeur_m: 8, profondeur_m: 6 },
        surface_m2: 48,
        tarif_emplacement_eur: 300,
        infrastructures: ["electricite"],
        status: "available",
        occupant: null,
        requests: [],
        map_infos: {
            type: "polygon",
            // bbox rectangle from provided coords
            coords: [[[1216.9833675237473, 89.22803289458943],[1321.6790134071875, 89.22803289458943],[1321.6790134071875, 384.5234443607028],[1216.9833675237473, 384.5234443607028],[1216.9833675237473, 89.22803289458943]]],
            color: "#9C27B0"
        }
    },
    {
        id: "INT-STAND-05",
        label: "Stand Intérieur 5",
        zone: "intérieur",
        dimensions: { largeur_m: 8, profondeur_m: 6 },
        surface_m2: 48,
        tarif_emplacement_eur: 300,
        infrastructures: ["electricite"],
        status: "available",
        occupant: null,
        requests: [],
        map_infos: {
            type: "polygon",
            coords: [[[1217.5455621070444,383.96360644069426],[1325.716181306045,383.96360644069426],[1325.716181306045,720.4965551658111],[1217.5455621070444,720.4965551658111],[1217.5455621070444,383.96360644069426]]],
            color: "#3F51B5"
        }
    },
    {
        id: "INT-STAND-06",
        label: "Stand Intérieur 6",
        zone: "intérieur",
        dimensions: { largeur_m: 8, profondeur_m: 6 },
        surface_m2: 48,
        tarif_emplacement_eur: 300,
        infrastructures: ["electricite"],
        status: "available",
        occupant: null,
        requests: [],
        map_infos: {
            type: "polygon",
            coords: [[[657.4351125106707,95.2789442641722],[1210.8802935894175,95.2789442641722],[1210.8802935894175,195.76034601622132],[657.4351125106707,195.76034601622132],[657.4351125106707,95.2789442641722]]],
            color: "#2196F3"
        }
    },
    {
        id: "INT-STAND-07",
        label: "Stand Intérieur 7",
        zone: "intérieur",
        dimensions: { largeur_m: 8, profondeur_m: 6 },
        surface_m2: 48,
        tarif_emplacement_eur: 300,
        infrastructures: ["electricite"],
        status: "available",
        occupant: null,
        requests: [],
        map_infos: {
            type: "polygon",
            coords: [[[314.52239224574134,95.2789442641722],[657.4351125106707,95.2789442641722],[657.4351125106707,197.3552889011745],[314.52239224574134,197.3552889011745],[314.52239224574134,95.2789442641722]]],
            color: "#00BCD4"
        }
    },
    {
        id: "INT-STAND-08",
        label: "Stand Intérieur 8",
        zone: "intérieur",
        dimensions: { largeur_m: 8, profondeur_m: 6 },
        surface_m2: 48,
        tarif_emplacement_eur: 300,
        infrastructures: ["electricite"],
        status: "available",
        occupant: null,
        requests: [],
        map_infos: {
            type: "polygon",
            coords: [[[108.77476008678366,93.68400137921913],[314.52239224574134,93.68400137921913],[314.52239224574134,197.3552889011745],[108.77476008678366,197.3552889011745],[108.77476008678366,93.68400137921913]]],
            color: "#4CAF50"
        }
    },
    {
        id: "INT-STAND-09",
        label: "Stand Intérieur 9",
        zone: "intérieur",
        dimensions: { largeur_m: 8, profondeur_m: 6 },
        surface_m2: 48,
        tarif_emplacement_eur: 300,
        infrastructures: ["electricite"],
        status: "available",
        occupant: null,
        requests: [],
        map_infos: {
            type: "polygon",
            coords: [[[111.76287701056754,198.31822028177396],[209.12966589973735,198.31822028177396],[209.12966589973735,732.7537059623287],[103.10805133153008,732.7537059623287],[103.10805133153008,198.31822028177396]]],
            color: "#FFC107"
        }
    },
    {
        id: "INT-STAND-14",
        label: "Stand Intérieur 10",
        zone: "intérieur",
        dimensions: { largeur_m: 8, profondeur_m: 6 },
        surface_m2: 48,
        tarif_emplacement_eur: 300,
        infrastructures: ["electricite"],
        status: "available",
        occupant: null,
        requests: [],
        map_infos: {
            type: "polygon",
            coords: [[[375.417888887386,457.2153533910031],[609.1330806257909,457.2153533910031],[609.1330806257909,608.0187290371204],[375.417888887386,608.0187290371204],[375.417888887386,457.2153533910031]]],
            color: "#E91E63"
        }
    },
    {
        id: "INT-STAND-15",
        label: "Stand Intérieur 11",
        zone: "intérieur",
        dimensions: { largeur_m: 8, profondeur_m: 6 },
        surface_m2: 48,
        tarif_emplacement_eur: 300,
        infrastructures: ["electricite"],
        status: "available",
        occupant: null,
        requests: [],
        map_infos: {
            type: "polygon",
            coords: [[[609.7338908873292,458.1165687833104],[838.6426005334275,458.1165687833104],[838.6426005334275,602.9118418140445],[609.7338908873292,602.9118418140445],[609.7338908873292,458.1165687833104]]],
            color: "#673AB7"
        }
    },
    {
        id: "INT-STAND-16",
        label: "Stand Intérieur 12",
        zone: "intérieur",
        dimensions: { largeur_m: 8, profondeur_m: 6 },
        surface_m2: 48,
        tarif_emplacement_eur: 300,
        infrastructures: ["electricite"],
        status: "available",
        occupant: null,
        requests: [],
        map_infos: {
            type: "polygon",
            coords: [[[839.0736890289404,456.78699914901017],[1045.018873587468,456.78699914901017],[1045.018873587468,598.3457734575325],[839.0736890289404,598.3457734575325],[839.0736890289404,456.78699914901017]]],
            color: "#009688"
        }
    },
    {
        id: "INT-STAND-17",
        label: "Stand Intérieur 13",
        zone: "intérieur",
        dimensions: { largeur_m: 8, profondeur_m: 6 },
        surface_m2: 48,
        tarif_emplacement_eur: 300,
        infrastructures: ["electricite"],
        status: "available",
        occupant: null,
        requests: [],
        map_infos: {
            type: "polygon",
            coords: [[[375.49245037759124,271.7659680252539],[603.3262248458727,271.7659680252539],[603.3262248458727,351.9891280492967],[375.49245037759124,351.9891280492967],[375.49245037759124,271.7659680252539]]],
            color: "#FF9800"
        }
    },
    {
        id: "INT-STAND-18",
        label: "Stand Intérieur 14",
        zone: "intérieur",
        dimensions: { largeur_m: 8, profondeur_m: 6 },
        surface_m2: 48,
        tarif_emplacement_eur: 300,
        infrastructures: ["electricite"],
        status: "available",
        occupant: null,
        requests: [],
        map_infos: {
            type: "polygon",
            coords: [[[604.6097954062574,272.40775330544625],[830.5182140339617,272.40775330544625],[830.5182140339617,349.4219869285273],[604.6097954062574,349.4219869285273],[604.6097954062574,272.40775330544625]]],
            color: "#3F51B5"
        }
    },
    {
        id: "INT-STAND-19",
        label: "Stand Intérieur 15",
        zone: "intérieur",
        dimensions: { largeur_m: 8, profondeur_m: 6 },
        surface_m2: 48,
        tarif_emplacement_eur: 300,
        infrastructures: ["electricite"],
        status: "available",
        occupant: null,
        requests: [],
        map_infos: {
            type: "polygon",
            coords: [[[830.7786041987031,271.6869310323591],[1044.761766576908,271.6869310323591],[1044.761766576908,351.75110084836535],[830.7786041987031,351.75110084836535],[830.7786041987031,271.6869310323591]]],
            color: "#00BCD4"
        }
    },
    {
        id: "EXT-STAND-19",
        label: "Stand Extérieur 19",
        zone: "extérieur",
        dimensions: { largeur_m: 10, profondeur_m: 10 },
        surface_m2: 100,
        tarif_emplacement_eur: 620,
        infrastructures: ["electricite"],
        status: "available",
        occupant: null,
        requests: [],
        map_infos: {
            type: "polygon",
            coords: [[[777.0924332613835,592.054285868116],[786.3181798646212,548.4189978798295],[830.4521568584883,554.4032659467945],[822.4731327692016,599.0359319462419],[777.0924332613835,592.054285868116]]],
            color: "#E91E63"
        }
    }
];

export default stands;
