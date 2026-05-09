// =====================================================
// FICHIER GLOBAL DU SITE
// Modifier ici les informations communes à tout le site.
// Ce fichier alimente automatiquement : navigation, footer,
// liens sociaux, modal billetterie, année, contact et copyright.
//
// EXEMPLES :
// - Changer year: "2026" en "2027" mettra à jour le footer.
// - Changer ticket.url mettra à jour tous les boutons Shotgun génériques.
// - Changer instagramUrl mettra à jour le footer et les liens communs.
//
// Ne pas renommer window.BDE_SITE. Le moteur JS en a besoin.
// =====================================================


// -----------------------------------------------------
// GUIDE DES CHAMPS GLOBAUX DU SITE
// siteName : nom principal du site.
// university : nom de l'université affiché à différents endroits.
// year : année utilisée notamment dans le footer.
// seasonLabel : libellé de saison, par exemple "Saison 2025-2026".
// email, phone, phoneHref, address : coordonnées. phoneHref doit rester sans espaces pour les liens téléphone.
// logo : chemin du logo principal.
// footerDescription / footerDescriptionEn : texte FR/EN du footer.
// instagramUrl, tiktokUrl, facebookUrl : liens sociaux principaux.
// nuitsInstagramUrl : lien Instagram spécifique aux Nuits Dauphine.
// defaultTicketUrl / defaultGooglePhotosUrl : liens de secours utilisés quand un lien spécifique n'est pas fourni.
// copyrightText : texte de copyright du footer.
// ticket : données de la modal ou du bouton billetterie générique.
//   - eventName : nom affiché dans la modal.
//   - eventSub / eventSubEn : sous-titre FR/EN.
//   - url : lien de billetterie générique.
//   - buttonLabel / buttonLabelEn : texte du bouton FR/EN.
//   - description / descriptionEn : phrase descriptive FR/EN.
//   - note / noteEn : note complémentaire FR/EN.
// navigation : liste des liens du menu.
//   - label / labelEn : texte FR/EN.
//   - href : destination.
//   - externalFromNonHome : destination alternative quand le lien part d'une autre page que la home.
// IMPORTANT : ce guide est uniquement un commentaire. Il n'est jamais lu par le site.
// -----------------------------------------------------

window.BDE_SITE = {
  "siteName": "BDE Dauphine",
  "university": "Paris Dauphine-PSL",
  "year": "2026",
  "seasonLabel": "Saison 2025-2026",
  "email": "bdedauphine@gmail.com",
  "phone": "06 03 35 68 22",
  "phoneHref": "0603356822",
  "address": "Université Paris Dauphine-PSL, Place du Maréchal de Lattre de Tassigny, 75016 Paris",
  "logo": "uploads/logo-1777708303205.png",
  "footerDescription": "Bureau des Étudiants de l'Université Paris Dauphine-PSL — Association loi 1901 à but non lucratif. La vie étudiante depuis 1979.",
  "footerDescriptionEn": "Student Union of Paris Dauphine-PSL University — Non-profit association. Student life since 1979.",
  "instagramUrl": "https://www.instagram.com/bdedauphine/",
  "instagramLabel": "Instagram @bdedauphine",
  "nuitsInstagramUrl": "https://www.instagram.com/lesnuitsdauphine/",
  "nuitsInstagramLabel": "@lesnuitsdauphine",
  "tiktokUrl": "https://www.tiktok.com/@bdedauphine",
  "facebookUrl": "https://www.facebook.com/bdedauphine",
  "defaultTicketUrl": "https://shotgun.live/fr",
  "defaultGooglePhotosUrl": "https://photos.google.com/",
  "copyrightText": "© 2026 BDE Dauphine · Paris Dauphine-PSL · Association loi 1901",
  "ticket": {
    "eventName": "How We Dau 2026",
    "eventSub": "Paris Dauphine-PSL · Prochainement",
    "eventSubEn": "Paris Dauphine-PSL · Coming soon",
    "url": "https://shotgun.live/fr",
    "buttonLabel": "Réserver sur Shotgun",
    "buttonLabelEn": "Book on Shotgun",
    "description": "Billetterie officielle — pack asso disponible",
    "descriptionEn": "Official ticketing — association pack available",
    "note": "Le pack asso Dauphine donne accès à un tarif réduit sur présentation de ta carte étudiante. Disponible en prévente uniquement.",
    "noteEn": "The Dauphine association pack gives access to a reduced rate on presentation of your student card. Presale only."
  },
  "navigation": [
    {
      "label": "Événements",
      "labelEn": "Events",
      "href": "evenements.html"
    },
    {
      "label": "Notre label",
      "labelEn": "Our Label",
      "href": "nuits.html"
    },
    {
      "label": "How We Dau",
      "labelEn": "How We Dau",
      "href": "howwedau.html"
    },
    {
      "label": "Partenaires",
      "labelEn": "Partners",
      "href": "partenaires.html"
    },
    {
      "label": "Notre histoire",
      "labelEn": "Our Story",
      "href": "about.html"
    },
    {
      "label": "Contact",
      "labelEn": "Contact",
      "href": "#contact",
      "externalFromNonHome": "index.html#contact"
    }
  ]
};
