# BDE Dauphine — site statique data-driven

Cette version conserve le site visuel existant, mais centralise les contenus répétitifs dans des fichiers simples du dossier `data/`.

## Principe

Le visiteur voit toujours des pages HTML classiques : `index.html`, `evenements.html`, `partenaires.html`, etc.

La différence est interne : plusieurs sections ne sont plus écrites en dur dans chaque page. Elles sont générées automatiquement depuis les fichiers suivants :

- `data/site.js` : année, liens sociaux, contact, footer, navigation, billetterie Shotgun.
- `data/events.js` : événements, textes, images, galeries liées.
- `data/sponsors.js` : sponsors, logos, liens, ordre d'affichage.
- `data/galleries.js` : images des galeries et liens Google Photos.
- `data/artists.js` : artistes du carrousel de la page d'accueil.

## Structure

```txt
site-v4/
  index.html
  evenements.html
  howwedau.html
  nuits.html
  partenaires.html
  about.html
  mentions-legales.html
  galerie-*.html
  style.css
  uploads/
  assets/
  data/
  js/
```

## Prérequis

Aucun CMS, aucune base de données, aucun outil externe obligatoire.

Pour tester localement, le plus fiable est d'ouvrir le dossier avec un petit serveur local, car certains navigateurs peuvent limiter JavaScript avec `file://`.

Option simple si Python est installé :

```bash
python -m http.server 8000
```

Puis ouvrir :

```txt
http://localhost:8000
```

Sur Cloudflare Pages ou tout hébergement statique, il suffit d'envoyer le dossier.

## Fichiers à modifier

Modifier principalement :

- `data/site.js`
- `data/events.js`
- `data/sponsors.js`
- `data/galleries.js`
- `data/artists.js`

## Fichiers à éviter de modifier

Éviter sauf besoin technique :

- `js/components.js`
- `js/render.js`
- `js/main.js`
- `style.css`

Les fichiers HTML restent lisibles et commentés, mais les sections automatiques ne doivent pas être remplies directement dedans.

## Déploiement Cloudflare Pages

1. Mettre tout le contenu du dossier sur le dépôt ou l'espace utilisé par Cloudflare Pages.
2. Aucun build command n'est nécessaire.
3. Output directory : racine du site.
4. Déployer.
5. Vérifier `index.html`, `evenements.html`, `partenaires.html`, les galeries et la modal billetterie.

## Ce qui a été centralisé

- Navigation globale.
- Footer global.
- Modal billetterie / Shotgun.
- Sponsors et partenaires.
- Liste événements accueil.
- Sections événements de la page Événements.
- Grilles des pages galerie.
- Bande photo de la page d'accueil.
- Carrousel artistes de la page d'accueil.

## Limite volontaire

Les grandes pages éditoriales comme `about.html`, `nuits.html`, `howwedau.html` gardent encore une partie de leur texte directement dans le HTML afin de préserver exactement la mise en page actuelle. Les blocs les plus répétitifs ont été centralisés en priorité.

## Dernière mise à jour appliquée

- Ajout de l'événement `Begin's` dans `data/events.js`.
- Ajout de la galerie `Begin's` dans `data/galleries.js`.
- Création de la page `galerie-begins.html`.
- Ajout d'un bloc de finition visuelle à la fin de `style.css`, sans modification des contenus.
