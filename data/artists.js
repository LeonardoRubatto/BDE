// =====================================================
// ARTISTES / SHOWCASES
// Ce fichier alimente le carrousel d'artistes de la page d'accueil.
//
// AJOUTER UN ARTISTE :
// 1. Placer la photo dans /uploads/
// 2. Copier un bloc dans cards.
// 3. Modifier name, image, yearEvent, eventText, badge et order.
//
// featured: true donne la carte large.
// active: false masque la carte sans la supprimer.
// =====================================================


// -----------------------------------------------------
// GUIDE DES CHAMPS ARTISTES
// Exemple fictif non utilisé :
// {
//   name: "Nom artiste",             // Nom visible sur la carte.
//   image: "uploads/artiste.jpg",    // Image affichée dans le carrousel.
//   alt: "Nom artiste",              // Texte alternatif de l'image.
//   yearEvent: "2026 · How We Dau",  // Ligne de contexte affichée au-dessus/près du nom.
//   eventText: "Showcase...",        // Description courte affichée sur la carte.
//   badge: "Édition 2026",           // Petit label/badge affiché sur la carte.
//   featured: true,                   // true = carte mise en avant visuellement.
//   active: true,                     // false = masque l'artiste sans supprimer ses données.
//   order: 1                          // Ordre d'affichage dans le carrousel.
// }
// textStrip contient les noms affichés dans le bandeau texte défilant.
// IMPORTANT : cet exemple est uniquement un commentaire. Il n'est jamais lu par le site.
// -----------------------------------------------------

window.BDE_ARTISTS = {
  "cards": [
    {
      "name": "Gazo",
      "image": "uploads/cap-145216.png",
      "alt": "Gazo",
      "yearEvent": "2026 · How We Dau",
      "eventText": "Showcase exclusif · Paris Dauphine",
      "badge": "Édition 2026",
      "featured": true,
      "active": true,
      "order": 1
    },
    {
      "name": "Maître Gims",
      "image": "uploads/cap-144920.png",
      "alt": "Maître Gims",
      "yearEvent": "2025 · How We Dau",
      "eventText": "Showcase · Paris Dauphine",
      "badge": "Édition 2025",
      "featured": false,
      "active": true,
      "order": 2
    },
    {
      "name": "SCH",
      "image": "uploads/cap-145000.png",
      "alt": "SCH",
      "yearEvent": "2023 · How We Dau",
      "eventText": "Showcase · Paris Dauphine",
      "badge": "Édition 2023",
      "featured": false,
      "active": true,
      "order": 3
    },
    {
      "name": "Laylow",
      "image": "uploads/cap-145018.png",
      "alt": "Laylow",
      "yearEvent": "2022 · How We Dau",
      "eventText": "Showcase · Paris Dauphine",
      "badge": "Édition 2022",
      "featured": false,
      "active": true,
      "order": 4
    },
    {
      "name": "Djadja & Dinaz",
      "image": "uploads/cap-145101.png",
      "alt": "Djadja & Dinaz",
      "yearEvent": "2022 · How We Dau",
      "eventText": "Showcase · Paris Dauphine",
      "badge": "Édition 2022",
      "featured": false,
      "active": true,
      "order": 5
    },
    {
      "name": "PLK · SDM",
      "image": "uploads/cap-145204.png",
      "alt": "PLK & SDM",
      "yearEvent": "2021 · How We Dau",
      "eventText": "Showcase · Paris Dauphine",
      "badge": "Édition 2021",
      "featured": false,
      "active": true,
      "order": 6
    },
    {
      "name": "VANCO",
      "image": "uploads/DSC05863-scaled.jpg",
      "alt": "Nuit Dauphine VANCO",
      "yearEvent": "2026 · Nuit Dauphine",
      "eventText": "Nuit Dauphine · Club parisien",
      "badge": "Édition 2026",
      "featured": false,
      "active": true,
      "order": 7
    }
  ],
  "textStrip": [
    "Gazo",
    "Maître Gims",
    "SCH",
    "Laylow",
    "Djadja & Dinaz",
    "PLK",
    "SDM",
    "VANCO",
    "Koba LaD",
    "Leto"
  ]
};
