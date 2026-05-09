// =====================================================
// SPONSORS / PARTENAIRES
// Ajouter, retirer, réordonner ou modifier les partenaires ici.
//
// AJOUTER UN SPONSOR :
// 1. Placer le logo dans /uploads/partners/
// 2. Copier-coller un bloc sponsor existant ci-dessous.
// 3. Modifier name, logo, alt, url, category, type et order.
// 4. Mettre active: true.
//
// DÉSACTIVER SANS SUPPRIMER : active: false
//
// LOGO :
// - Si vous avez un fichier logo : logo: "uploads/partners/mon-logo.png"
// - Si vous n'avez pas encore de logo : logo: "" et fallback: "XX"
//
// ORDRE :
// Plus order est petit, plus le sponsor apparaît tôt.
// Ne pas renommer window.BDE_SPONSORS.
// =====================================================


// -----------------------------------------------------
// GUIDE DES CHAMPS PARTENAIRES
// Exemple fictif non utilisé :
// {
//   name: "Nom partenaire",          // Nom officiel affiché.
//   logo: "uploads/partners/logo.png", // Chemin du logo. Vide si aucun logo disponible.
//   fallback: "NP",                  // Initiales affichées si logo est vide.
//   alt: "Nom partenaire",           // Texte alternatif du logo.
//   url: "https://...",              // Site du partenaire.
//   category: "Banque",              // Catégorie interne ou affichée selon le rendu.
//   type: "Banque · Finance",        // Description courte en français.
//   typeEn: "Bank · Finance",        // Description courte en anglais.
//   linkLabel: "site.fr →",          // Texte du lien visible.
//   active: true,                     // false = masque le partenaire sans supprimer ses données.
//   order: 1                          // Ordre d'affichage.
// }
// IMPORTANT : cet exemple est uniquement un commentaire. Il n'est jamais lu par le site.
// -----------------------------------------------------

window.BDE_SPONSORS = [
  {
    "name": "Lydia / Sumeria",
    "logo": "uploads/partners/logo-sumeria.png",
    "fallback": "",
    "alt": "Lydia / Sumeria",
    "url": "https://sumeria.eu",
    "category": "Fintech",
    "type": "Fintech · Paiement",
    "typeEn": "Fintech · Payment",
    "linkLabel": "sumeria.eu →",
    "active": true,
    "order": 5
  },
  {
    "name": "Caisse d'Épargne",
    "logo": "uploads/partners/logo-caisse-epargne.png",
    "fallback": "",
    "alt": "Caisse d'Épargne",
    "url": "https://www.caisse-epargne.fr",
    "category": "Banque",
    "type": "Banque · Finance",
    "typeEn": "Bank · Finance",
    "linkLabel": "caisse-epargne.fr →",
    "active": true,
    "order": 1
  },
  {
    "name": "Cercles de la Forme",
    "logo": "uploads/partners/logo-cercles-forme.png",
    "fallback": "",
    "alt": "Cercles de la Forme",
    "url": "https://www.cerclesdelaforme.com",
    "category": "Sport & bien-être",
    "type": "Sport · Bien-être",
    "typeEn": "Sport · Wellness",
    "linkLabel": "cerclesdelaforme.com →",
    "active": true,
    "order": 6
  },
  {
    "name": "YouStock",
    "logo": "uploads/partners/logo-youstock.png",
    "fallback": "",
    "alt": "YouStock",
    "url": "https://www.youstock.com",
    "category": "Stockage",
    "type": "Stockage · Logistique",
    "typeEn": "Storage · Logistics",
    "linkLabel": "youstock.com →",
    "active": true,
    "order": 4
  },
  {
    "name": "Prépa Parisiennes",
    "logo": "",
    "fallback": "PP",
    "alt": "Prépa Parisiennes",
    "url": "https://www.preparisiennes.com",
    "category": "Formation",
    "type": "Formation · Orientation",
    "typeEn": "Education · Guidance",
    "linkLabel": "preparisiennes.com →",
    "active": true,
    "order": 7
  },
  {
    "name": "Admissions Parallèles",
    "logo": "uploads/partners/logo-admissions-paralleles.png",
    "fallback": "",
    "alt": "Admissions Parallèles",
    "url": "https://www.admissionsparalleles.com",
    "category": "Orientation",
    "type": "Orientation · Admissions",
    "typeEn": "Guidance · Admissions",
    "linkLabel": "admissionsparalleles.com →",
    "active": true,
    "order": 8
  },
  {
    "name": "Smart Renting",
    "logo": "",
    "fallback": "SR",
    "alt": "Smart Renting",
    "url": "https://smart-renting.com",
    "category": "Immobilier étudiant",
    "type": "Immobilier · Étudiant",
    "typeEn": "Real Estate · Student",
    "linkLabel": "smart-renting.com →",
    "active": true,
    "order": 10
  },
    {
    "name": "En Voiture Simone",
    "logo": "uploads/partners/logo-en-voiture-simone.png",
    "fallback": "",
    "alt": "En Voiture Simone",
    "url": "https://www.envoituresimone.com",
    "category": "Mobilité",
    "type": "Mobilité · Auto-école",
    "typeEn": "Mobility · Driving School",
    "linkLabel": "envoituresimone.com →",
    "active": true,
    "order": 9
  },
  {
    "name": "Uber",
    "logo": "uploads/partners/logo-uber.png",
    "fallback": "UB",
    "alt": "Uber",
    "url": "https://www.uber.com/fr/fr/",
    "category": "Mobilité",
    "type": "Mobilité · VTC",
    "typeEn": "Mobility · Ride-hailing",
    "linkLabel": "uber.com →",
    "active": true,
    "order": 3
  },
  {
    "name": "Red Bull",
    "logo": "uploads/partners/logo-redbull.png",
    "fallback": "RB",
    "alt": "Red Bull",
    "url": "https://www.redbull.com/fr-fr/",
    "category": "Boisson",
    "type": "Boisson · Énergie",
    "typeEn": "Drink · Energy",
    "linkLabel": "redbull.com →",
    "active": true,
    "order": 2
  }
];
