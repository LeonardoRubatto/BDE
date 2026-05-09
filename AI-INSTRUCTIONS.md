# GUIDE IA — Comment traduire une demande humaine en modifications correctes du site BDE

Ce fichier est destiné à une IA chargée de modifier ce site. Son rôle est de transformer une demande vague ou humaine — par exemple “ajoute ce partenaire”, “mets le WEI à jour”, “ajoute un dossier à remplir”, “change la billetterie” — en actions précises dans les bons fichiers, sans casser le site, sans changer le design, et sans modifier inutilement les pages.

---

## 0. Mission de l'IA

Tu es l'exécutant technique du site. Tu dois :

1. comprendre l'intention réelle de l'utilisateur ;
2. identifier les fichiers concernés ;
3. demander uniquement les informations manquantes nécessaires ;
4. modifier exclusivement les champs nécessaires ;
5. préserver le style, la structure, les images, les liens et les pages existantes ;
6. vérifier que la modification est cohérente ;
7. expliquer clairement ce qui a été changé et où.

Règle absolue : **ne pas réécrire le site**. Le site fonctionne déjà. La plupart des demandes doivent être traitées en modifiant les fichiers du dossier `data/`.

---

## 1. Architecture réelle du site

Le site est un site statique. Il n'utilise pas de CMS, pas de base de données, pas de WordPress, pas de backend.

Les pages HTML existent physiquement :

```txt
index.html
about.html
evenements.html
howwedau.html
nuits.html
partenaires.html
mentions-legales.html
galerie-*.html
```

Mais plusieurs contenus visibles ne sont plus écrits directement dans ces pages. Ils sont injectés automatiquement par JavaScript depuis les fichiers du dossier `data/`.

### Fichiers de données principaux

```txt
data/site.js        -> informations globales : navigation, footer, contact, réseaux, billetterie générale
data/events.js      -> événements, dates, statuts, textes, images, liens galerie, dossier PDF
data/sponsors.js    -> partenaires / sponsors, logos, liens, ordre d'affichage
data/galleries.js   -> galeries photos, images, albums Google Photos
data/artists.js     -> artistes/showcases affichés sur la homepage
data/pages.js       -> réserve future, actuellement non utilisée visuellement
data/legal.js       -> réserve future, actuellement non utilisée visuellement
```

### Fichiers techniques à éviter

```txt
js/render.js         -> moteur qui lit les données et génère les sections dynamiques
js/components.js     -> composants communs : nav, footer, sponsors, modal billetterie
js/main.js           -> lance le rendu
style.css            -> style visuel global
```

Ne modifier ces fichiers que si la demande porte clairement sur une fonctionnalité non prévue par les fichiers `data/`.

---

## 2. Principe de fonctionnement dynamique

Les pages HTML contiennent des zones comme :

```html
<div data-render="home-events"></div>
<div data-render="events-page"></div>
<div data-render="sponsor-cards"></div>
<div data-render="gallery-masonry" data-gallery-slug="wei"></div>
```

Le moteur `js/render.js` lit ces marqueurs et injecte le contenu à partir des fichiers `data/*.js`.

Conséquence :

- pour changer un événement, modifier `data/events.js` ;
- pour changer un partenaire, modifier `data/sponsors.js` ;
- pour changer une galerie, modifier `data/galleries.js` ;
- pour changer les réseaux sociaux, la navigation, le footer ou la billetterie générale, modifier `data/site.js` ;
- ne pas modifier directement le HTML pour ces cas normaux.

---

## 3. Règles générales de modification

### 3.1 Ne jamais casser les noms globaux

Ces noms sont lus par le site. Ne pas les renommer :

```js
window.BDE_SITE
window.BDE_EVENTS
window.BDE_SPONSORS
window.BDE_GALLERIES
window.BDE_ARTISTS
window.BDE_PAGES
window.BDE_LEGAL
```

### 3.2 Garder la syntaxe JavaScript valide

Les fichiers `data/*.js` ne sont pas du JSON pur. Ce sont des fichiers JavaScript qui affectent des objets à `window`.

Respecter :

- les guillemets autour des textes ;
- les virgules entre les champs ;
- les crochets `[]` pour les listes ;
- les accolades `{}` pour les objets ;
- pas de virgule manquante entre deux blocs ;
- pas de commentaire placé au milieu d'une valeur.

### 3.3 Ne pas supprimer les anciens contenus sauf demande explicite

Pour masquer sans supprimer :

- partenaire : `active: false` dans `data/sponsors.js` ;
- galerie : `active: false` dans `data/galleries.js` ;
- artiste : `active: false` dans `data/artists.js` ;
- événement homepage : `showOnHome: false` dans `data/events.js` ;
- événement page événements : `showOnEventsPage: false` dans `data/events.js`.

### 3.4 Conserver les chemins relatifs

Les chemins doivent rester relatifs à la racine du site :

```js
"uploads/photo.jpg"
"uploads/partners/logo-partenaire.png"
"uploads/dossier-wei.pdf"
"galerie-wei.html"
```

Ne pas utiliser de chemins locaux de machine comme :

```txt
C:\Users\...
/mnt/data/...
file:///...
```

### 3.5 Préserver le design

Ne pas modifier :

```txt
style.css
classes CSS existantes
structure HTML existante
ordre des scripts
noms des attributs data-render
```

sauf si la demande porte explicitement sur le style ou une nouvelle fonctionnalité impossible à obtenir autrement.

---

## 4. Workflow obligatoire avant de modifier

Avant toute modification, suivre cette logique.

### Étape A — Identifier la catégorie de demande

| Demande humaine | Fichier principal |
|---|---|
| Ajouter/modifier un partenaire | `data/sponsors.js` |
| Ajouter/modifier un événement | `data/events.js` |
| Ajouter/modifier une galerie photos | `data/galleries.js` + éventuellement une page `galerie-*.html` |
| Ajouter/modifier un artiste/showcase | `data/artists.js` |
| Changer Instagram, TikTok, email, téléphone, footer, navigation | `data/site.js` |
| Changer le lien Shotgun général | `data/site.js` |
| Changer un lien billetterie propre à un événement | `data/events.js`, champ `ticketUrl` |
| Ajouter un PDF “dossier à remplir” à un événement | `data/events.js`, champs `dossierUrl`, `dossierLabel`, `dossierDownload` |
| Changer les mentions légales visibles | actuellement `mentions-legales.html`, car `data/legal.js` n'est pas encore rendu |
| Changer le texte éditorial de `about`, `nuits`, `howwedau` | fichier HTML correspondant, sauf bloc déjà rendu depuis `data/` |

### Étape B — Vérifier si l'information est suffisante

Si la demande manque d'informations nécessaires, poser une question ciblée.

Ne pas demander “Que voulez-vous faire ?” si l'intention est déjà claire. Demander seulement les données manquantes.

### Étape C — Modifier le minimum

Changer uniquement les lignes nécessaires. Ne pas reformater tout le fichier. Ne pas réordonner tout le contenu sauf si demandé.

### Étape D — Vérifier

Après modification, vérifier :

- syntaxe JS valide ;
- chemins de fichiers cohérents ;
- `slug` unique ;
- `order` cohérent ;
- liens non vides seulement quand ils doivent apparaître ;
- champs FR/EN cohérents si présents ;
- aucune modification parasite dans CSS/HTML/JS technique.

---

## 5. Ajouter un partenaire

### Fichier à modifier

```txt
data/sponsors.js
```

### Informations à demander à l'utilisateur

Demander uniquement ce qui manque :

1. nom officiel du partenaire ;
2. logo, ou confirmation qu'il n'y a pas encore de logo ;
3. site web du partenaire ;
4. catégorie courte en français ;
5. catégorie courte en anglais si le site bilingue doit rester complet ;
6. ordre d'affichage souhaité, ou autorisation de le placer à la fin ;
7. doit-il être visible immédiatement ?

### Bloc à ajouter

Ajouter un objet dans `window.BDE_SPONSORS = [ ... ]` :

```js
{
  "name": "Nom Partenaire",
  "logo": "uploads/partners/logo-nom-partenaire.png",
  "fallback": "NP",
  "alt": "Logo Nom Partenaire",
  "url": "https://www.site-partenaire.fr",
  "category": "Catégorie",
  "type": "Catégorie · Détail",
  "typeEn": "Category · Detail",
  "linkLabel": "site-partenaire.fr →",
  "active": true,
  "order": 11
}
```

### Si l'utilisateur n'a pas de logo

Utiliser :

```js
"logo": "",
"fallback": "NP"
```

Le site affichera les initiales.

### Vérification

Le partenaire apparaît automatiquement :

- dans le bandeau sponsors de la homepage ;
- dans la page `partenaires.html` ;
- dans les composants partenaires générés par `js/components.js`.

Ne pas modifier `partenaires.html` pour ajouter un partenaire normal.

---

## 6. Modifier ou masquer un partenaire

### Modifier

Dans `data/sponsors.js`, trouver le bloc par `name`, puis changer uniquement les champs demandés.

### Masquer sans supprimer

```js
"active": false
```

### Réafficher

```js
"active": true
```

### Changer l'ordre

```js
"order": 1
```

Plus le nombre est petit, plus le partenaire apparaît tôt.

---

## 7. Ajouter un événement

### Fichier principal

```txt
data/events.js
```

### Informations à demander à l'utilisateur

Pour ajouter correctement un événement, demander les informations suivantes si elles ne sont pas fournies :

1. nom exact de l'événement ;
2. slug souhaité, ou autorisation de le créer automatiquement ;
3. date technique au format `YYYY-MM-DD`, ou confirmation que la date est inconnue ;
4. texte de date affiché en français et anglais si nécessaire ;
5. statut à afficher : `À venir`, `En vente`, `SOLD OUT`, `Passé`, etc. ;
6. lieu ou ville ;
7. salle précise si connue ;
8. description courte homepage ;
9. paragraphes longs pour la page événements ;
10. image principale ;
11. images secondaires ;
12. lien billetterie spécifique, ou aucun ;
13. lien Google Photos, ou aucun ;
14. galerie interne souhaitée, ou aucune ;
15. doit-il apparaître sur la homepage ?
16. doit-il apparaître sur `evenements.html` ?
17. numéro décoratif et ordre d'affichage, ou autorisation de les calculer.

### Champs importants dans `data/events.js`

```js
"slug": "wei"
```

Identifiant unique. Sert aussi d'ancre : `evenements.html#wei`. Pas d'espace, pas d'accent.

```js
"order": 3
```

Ordre d'affichage. Plus petit = plus haut.

```js
"number": "03"
```

Numéro décoratif visible sur les cartes et sections.

```js
"title": "WEI"
```

Nom affiché.

```js
"date": "2026-09-18"
```

Date technique. Format obligatoire : `YYYY-MM-DD`. Laisser `""` si inconnue.

```js
"dateLabel": { "fr": "18 septembre 2026", "en": "September 18, 2026" }
```

Texte affiché si l'on veut contrôler exactement la date.

```js
"statusLabel": { "fr": "En vente", "en": "On sale" }
```

Statut affiché en priorité sur la date, sauf si `showStatusWithDate: true`.

```js
"statusColor": "red"
```

Force le statut en rouge sur la homepage. Mettre `""` pour le style normal.

```js
"showStatusWithDate": true
```

Option exceptionnelle. Affiche statut + date ensemble, par exemple : `En vente · 18 septembre 2026`.

```js
"showOnHome": true
"showOnEventsPage": true
```

Contrôle la visibilité.

```js
"galleryPage": "galerie-wei.html"
```

Lien vers une galerie interne.

```js
"googlePhotosUrl": "https://photos.google.com/..."
```

Lien vers album Google Photos si utilisé.

```js
"ticketUrl": "https://shotgun.live/..."
```

Lien billetterie spécifique à l'événement.

```js
"dossierUrl": "uploads/dossier-wei.pdf"
```

Lien vers un PDF ou fichier à télécharger.

---

## 8. Modifier la date ou le statut d'un événement

### Cas 1 — Date inconnue

```js
"date": "",
"dateLabel": { "fr": "", "en": "" },
"statusLabel": { "fr": "", "en": "" },
"statusColor": ""
```

Le site affichera automatiquement :

- `À venir` en français ;
- `Coming soon` en anglais ;
- avec le sous-texte “Date bientôt annoncée”.

### Cas 2 — Date connue

```js
"date": "2026-09-18",
"dateLabel": {
  "fr": "18 septembre 2026",
  "en": "September 18, 2026"
},
"statusLabel": {
  "fr": "",
  "en": ""
},
"statusColor": ""
```

### Cas 3 — Statut prioritaire

```js
"statusLabel": {
  "fr": "SOLD OUT",
  "en": "SOLD OUT"
},
"statusColor": "red"
```

La date peut exister, mais le statut sera affiché en priorité.

### Cas 4 — Exception : statut + date ensemble

```js
"date": "2026-09-18",
"dateLabel": {
  "fr": "18 septembre 2026",
  "en": "September 18, 2026"
},
"statusLabel": {
  "fr": "En vente",
  "en": "On sale"
},
"statusColor": "red",
"showStatusWithDate": true
```

Affichage attendu :

```txt
En vente · 18 septembre 2026
```

### Changer la couleur rouge du statut

Le rouge vient du champ :

```js
"statusColor": "red"
```

Pour enlever le rouge :

```js
"statusColor": ""
```

Pour ajouter le rouge à un autre événement :

```js
"statusColor": "red"
```

Si l'utilisateur demande une autre couleur que rouge, il faut modifier le CSS et/ou le moteur de rendu, car seul le cas `red` est prévu actuellement dans `js/render.js`.

---

## 9. Ajouter un dossier PDF “Dossier à remplir” à un événement

### Fichier à modifier

```txt
data/events.js
```

### Fichier à ajouter

Placer le PDF dans :

```txt
uploads/
```

Exemple :

```txt
uploads/dossier-wei.pdf
```

### Champs à renseigner dans l'événement

```js
"dossierUrl": "uploads/dossier-wei.pdf",
"dossierLabel": {
  "fr": "Dossier à remplir",
  "en": "Form to complete"
},
"dossierDownload": true
```

### Effet visible

Le lien apparaît sur la page événement sous le lien de galerie photos, si `dossierUrl` n'est pas vide.

### Pour retirer le dossier une fois terminé

Ne pas supprimer le fichier forcément. Il suffit de vider le lien :

```js
"dossierUrl": ""
```

Le lien disparaît du site.

---

## 10. Ajouter une galerie interne

Une galerie interne nécessite souvent deux choses :

1. un bloc dans `data/galleries.js` ;
2. une page HTML `galerie-nouvel-evenement.html` si elle n'existe pas déjà.

### Informations à demander

1. nom de la galerie ;
2. slug de galerie ;
3. événement lié ;
4. images à afficher ;
5. image de couverture ;
6. lien Google Photos éventuel ;
7. ordre d'affichage ;
8. légendes souhaitées ou autorisation d'utiliser des légendes simples.

### Bloc à ajouter dans `data/galleries.js`

```js
{
  "slug": "nouvel-evenement",
  "title": "Nouvel événement",
  "page": "galerie-nouvel-evenement.html",
  "eventSlug": "nouvel-evenement",
  "coverImage": "uploads/photo-principale.jpg",
  "googlePhotosUrl": "https://photos.google.com/...",
  "lightboxMode": "overlay",
  "active": true,
  "order": 9,
  "images": [
    {
      "src": "uploads/photo-1.jpg",
      "alt": "Nouvel événement 2026",
      "caption": "Légende de la photo",
      "captionI18n": {
        "fr": "Légende de la photo",
        "en": "Photo caption"
      },
      "tag": "Nouvel événement · 2026",
      "tagI18n": {
        "fr": "Nouvel événement · 2026",
        "en": "New event · 2026"
      }
    }
  ]
}
```

### Page galerie HTML

Si une nouvelle page galerie doit être créée, copier une page existante proche, par exemple :

```txt
galerie-wei.html
```

Créer :

```txt
galerie-nouvel-evenement.html
```

Puis adapter uniquement :

- le titre de page ;
- les meta SEO si présentes ;
- le texte visible spécifique ;
- l'attribut `data-gallery-slug` pour qu'il corresponde au `slug` dans `data/galleries.js`.

Exemple critique :

```html
<div data-render="gallery-masonry" data-gallery-slug="nouvel-evenement"></div>
```

### Relier l'événement à la galerie

Dans `data/events.js`, dans le bloc de l'événement :

```js
"galleryPage": "galerie-nouvel-evenement.html",
"galleryLabel": "Galerie photos des éditions →"
```

---

## 11. Modifier une galerie existante

### Ajouter une image

Dans `data/galleries.js`, trouver la galerie par `slug`, puis ajouter dans `images` :

```js
{
  "src": "uploads/nouvelle-photo.jpg",
  "alt": "Description de la photo",
  "caption": "Légende affichée",
  "captionI18n": {
    "fr": "Légende affichée",
    "en": "Displayed caption"
  },
  "tag": "WEI · 2026",
  "tagI18n": {
    "fr": "WEI · 2026",
    "en": "WEI · 2026"
  }
}
```

### Changer l'album Google Photos

Dans la galerie concernée :

```js
"googlePhotosUrl": "https://photos.google.com/..."
```

Attention : certains liens Google Photos sont aussi présents dans `data/events.js` selon l'usage. Si le lien doit apparaître depuis la section événement, vérifier aussi l'événement correspondant.

---

## 12. Ajouter ou modifier un artiste / showcase

### Fichier à modifier

```txt
data/artists.js
```

### Informations à demander

1. nom de l'artiste ;
2. image ;
3. événement et année ;
4. texte court ;
5. badge ;
6. doit-il être mis en avant ?
7. ordre d'affichage.

### Bloc à ajouter

```js
{
  "name": "Nom Artiste",
  "image": "uploads/artiste.jpg",
  "alt": "Nom Artiste",
  "yearEvent": "2026 · How We Dau",
  "eventText": "Showcase exclusif · Paris Dauphine",
  "badge": "Édition 2026",
  "featured": false,
  "active": true,
  "order": 8
}
```

### Bandeau texte défilant

Si l'artiste doit apparaître dans le bandeau texte, ajouter son nom dans :

```js
"textStrip": [ ... ]
```

---

## 13. Modifier les informations globales du site

### Fichier à modifier

```txt
data/site.js
```

### Exemples courants

#### Changer l'année

```js
"year": "2027",
"seasonLabel": "Saison 2026-2027",
"copyrightText": "© 2027 BDE Dauphine · Paris Dauphine-PSL · Association loi 1901"
```

#### Changer l'email

```js
"email": "nouvelleadresse@example.com"
```

#### Changer le téléphone

```js
"phone": "06 00 00 00 00",
"phoneHref": "0600000000"
```

`phoneHref` doit rester sans espaces.

#### Changer Instagram

```js
"instagramUrl": "https://www.instagram.com/.../",
"instagramLabel": "Instagram @..."
```

#### Changer le lien Shotgun général

```js
"defaultTicketUrl": "https://shotgun.live/...",
"ticket": {
  "url": "https://shotgun.live/..."
}
```

Vérifier les deux endroits si l'objectif est de changer toute la billetterie générale.

---

## 14. Modifier la navigation

### Fichier à modifier

```txt
data/site.js
```

La navigation est dans :

```js
"navigation": [ ... ]
```

Exemple d'entrée :

```js
{
  "label": "Événements",
  "labelEn": "Events",
  "href": "evenements.html"
}
```

Pour un lien vers une section de la homepage depuis les autres pages, utiliser :

```js
{
  "label": "Contact",
  "labelEn": "Contact",
  "href": "#contact",
  "externalFromNonHome": "index.html#contact"
}
```

Ne pas modifier `js/components.js` pour un simple changement de menu.

---

## 15. Modifier les textes éditoriaux non centralisés

Certaines grandes pages gardent encore du contenu directement dans le HTML pour préserver leur mise en page :

```txt
about.html
nuits.html
howwedau.html
mentions-legales.html
```

Si l'utilisateur demande de modifier un texte visible sur ces pages et que ce texte n'est pas dans `data/*.js`, modifier directement le fichier HTML correspondant.

Méthode :

1. rechercher le texte exact dans le HTML ;
2. remplacer uniquement ce texte ou ce bloc ;
3. ne pas changer les classes CSS ;
4. ne pas changer les scripts ;
5. ne pas reformater toute la page.

---

## 16. Gestion du bilingue FR/EN

Le site utilise souvent :

```js
"fieldI18n": {
  "fr": "Texte français",
  "en": "English text"
}
```

ou, dans le rendu HTML généré :

```html
data-fr="Texte français" data-en="English text"
```

Quand un champ bilingue existe déjà, le compléter dans les deux langues si possible.

Si l'utilisateur ne donne qu'une langue, demander la traduction manquante ou proposer une traduction professionnelle.

Ne pas supprimer les champs anglais existants.

---

## 17. Check-list de validation après modification

Avant de rendre le fichier final, vérifier :

### Structure

- [ ] le bon fichier a été modifié ;
- [ ] aucun fichier technique n'a été modifié inutilement ;
- [ ] aucun fichier HTML n'a été modifié si les données suffisaient ;
- [ ] aucun style n'a été changé sans demande explicite.

### Syntaxe

- [ ] les objets JS sont valides ;
- [ ] les virgules sont correctes ;
- [ ] les guillemets sont fermés ;
- [ ] les crochets et accolades sont équilibrés ;
- [ ] les noms `window.BDE_*` sont inchangés.

### Données

- [ ] les chemins images/PDF commencent par `uploads/` ou `uploads/partners/` ;
- [ ] les URLs externes commencent par `https://` ;
- [ ] les `slug` sont uniques ;
- [ ] les `order` ne créent pas d'ambiguïté grave ;
- [ ] les champs `active`, `showOnHome`, `showOnEventsPage` correspondent à la demande ;
- [ ] les textes FR/EN restent cohérents.

### Fonctionnel

- [ ] un partenaire ajouté doit apparaître sur la homepage et `partenaires.html` ;
- [ ] un événement ajouté doit apparaître sur `index.html` si `showOnHome: true` ;
- [ ] un événement ajouté doit apparaître sur `evenements.html` si `showOnEventsPage: true` ;
- [ ] une galerie interne doit avoir un bloc dans `data/galleries.js` et une page `galerie-*.html` si nécessaire ;
- [ ] un dossier PDF n'apparaît que si `dossierUrl` n'est pas vide.

---

## 18. Réactions types à des demandes humaines

### Demande : “Ajoute ce partenaire”

Action : modifier `data/sponsors.js`.

Si des informations manquent, demander :

```txt
Pour ajouter le partenaire sans inventer d'informations, il me faut :
1. le nom exact ;
2. le site web ;
3. le logo, ou les initiales à afficher si aucun logo n'est disponible ;
4. la catégorie courte FR/EN ;
5. l'ordre souhaité, ou confirmation que je le mets à la fin.
```

Puis ajouter un bloc sponsor.

### Demande : “Ajoute un événement”

Action : modifier `data/events.js`, et éventuellement `data/galleries.js` + page galerie.

Si des informations manquent, demander :

```txt
Pour créer l'événement proprement, il me faut : nom, date/statut, lieu, description courte, description longue, image principale, images secondaires, lien billetterie, lien galerie/Google Photos, visibilité homepage/page événements.
```

Si l'utilisateur n'a pas tout, créer une version minimale avec champs vides contrôlés.

### Demande : “Mets le WEI en vente le 18 septembre”

Action : dans `data/events.js`, trouver `slug: "wei"`, puis modifier :

```js
"date": "2026-09-18",
"dateLabel": {
  "fr": "18 septembre 2026",
  "en": "September 18, 2026"
},
"statusLabel": {
  "fr": "En vente",
  "en": "On sale"
},
"statusColor": "red",
"showStatusWithDate": true
```

### Demande : “Enlève le dossier à remplir”

Action : dans l'événement concerné dans `data/events.js` :

```js
"dossierUrl": ""
```

Ne pas supprimer le PDF sauf demande explicite.

### Demande : “Change le lien galerie photo”

Action possible selon le cas :

- lien visible depuis l'événement : `data/events.js`, champ `galleryPage` ou `googlePhotosUrl` ;
- album externe de la galerie : `data/galleries.js`, champ `googlePhotosUrl`.

Demander où le lien doit changer si ce n'est pas clair : section événement, page galerie, ou les deux.

### Demande : “Change le texte dans Notre histoire”

Action : probablement `about.html`, sauf si le texte existe dans `data/site.js`.

Méthode : rechercher le texte exact puis remplacer uniquement le bloc concerné.

### Demande : “Change la couleur du À venir rouge”

Action : vérifier d'abord si l'événement utilise :

```js
"statusColor": "red"
```

Si l'utilisateur veut enlever le rouge, mettre :

```js
"statusColor": ""
```

Si l'utilisateur veut une nouvelle couleur autre que rouge, ce n'est pas une simple donnée : il faut modifier le CSS et probablement `js/render.js` pour prévoir une nouvelle classe.

---

## 19. Ce qu'il ne faut pas faire

Ne pas :

- modifier toutes les pages HTML pour un changement qui peut être fait dans `data/` ;
- déplacer les images existantes ;
- renommer les fichiers existants sans mettre à jour tous les liens ;
- supprimer des blocs anciens sans demande explicite ;
- inventer un lien, une date, un logo ou un partenaire ;
- remplacer tout le fichier par une version reformattée ;
- changer le design pour “améliorer” sans demande ;
- créer un CMS ou une base de données ;
- ajouter des dépendances externes ;
- transformer le site en framework.

---

## 20. Réponse finale attendue de l'IA après modification

Quand la modification est faite, répondre de manière factuelle :

```txt
Modification effectuée.

Fichiers modifiés :
- data/sponsors.js

Changements :
- ajout du partenaire [Nom] ;
- logo : uploads/partners/[fichier] ;
- lien : [URL] ;
- affichage actif : oui ;
- ordre : [numéro].

Aucun fichier HTML, CSS ou JS technique n'a été modifié.
```

Si des fichiers techniques ont été modifiés, l'expliquer clairement et justifier pourquoi.

---

## 21. Résumé ultra-court pour l'IA

- Commencer par `data/`, pas par les pages HTML.
- Partenaires = `data/sponsors.js`.
- Événements = `data/events.js`.
- Galeries = `data/galleries.js`.
- Artistes = `data/artists.js`.
- Infos globales = `data/site.js`.
- HTML uniquement pour textes éditoriaux non centralisés ou nouvelle page galerie.
- CSS/JS technique uniquement si nouvelle fonctionnalité impossible par les données.
- Demander les informations manquantes, ne pas inventer.
- Modifier le minimum.
- Vérifier syntaxe, chemins, slugs, visibilité, bilingue.
