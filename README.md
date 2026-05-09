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

## Utilisation simple avec une IA

Si vous êtes débutant et que vous ne savez pas exactement quel fichier modifier, le plus simple est de donner ce projet à une IA avec ce README, puis de décrire clairement ce que vous voulez obtenir sur le site.

L’IA doit agir comme un traducteur entre votre demande et les fichiers du site : elle doit comprendre le résultat souhaité, identifier le ou les fichiers à modifier, demander les informations manquantes, puis appliquer uniquement les changements nécessaires sans toucher au reste.

Exemples de demandes possibles :

- « Ajoute un nouveau partenaire. »
- « Ajoute un nouvel événement. »
- « Change le lien de billetterie. »
- « Ajoute une galerie photo. »
- « Modifie le texte d’un événement existant. »

Avant de modifier, l’IA doit vérifier quelles informations sont nécessaires. Par exemple, pour ajouter un partenaire, elle doit demander au minimum :

- le nom du partenaire ;
- le logo ou le nom exact du fichier image à placer dans `uploads/` ou `assets/` ;
- le lien du site ou du réseau social ;
- le texte court à afficher si le site en utilise un ;
- l’ordre ou l’importance d’affichage, si nécessaire.

Pour ajouter un événement, elle doit demander au minimum :

- le nom de l’événement ;
- la date ;
- le statut à afficher ;
- l’image principale ;
- le texte de présentation ;
- le lien de billetterie, s’il existe ;
- le lien de galerie photo, s’il existe ;
- le dossier ou fichier téléchargeable, s’il existe ;
- les éventuelles informations pratiques.

Règle importante : l’IA ne doit pas modifier les fichiers de structure ou de design si la demande concerne seulement le contenu. Dans la majorité des cas, elle doit travailler uniquement dans `data/site.js`, `data/events.js`, `data/sponsors.js`, `data/galleries.js` ou `data/artists.js`. Les fichiers `style.css`, `js/render.js`, `js/components.js`, `js/main.js` et les pages HTML ne doivent être changés que si la demande implique vraiment une nouvelle fonctionnalité ou une modification visuelle.

Phrase simple à donner à une IA :

```txt
Voici le dossier complet de mon site. Lis d'abord le README. Je suis débutant : pose-moi les questions nécessaires, puis modifie uniquement les fichiers indispensables pour obtenir le résultat demandé, sans changer le reste du site.
```


