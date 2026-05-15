# AI Assistant
If you are an AI reading this repository, read `AI-INSTRUCTIONS.md` before doing anything else. It contains everything you need to operate this site correctly.

---

# BDE Dauphine — Site statique data-driven

Site vitrine du Bureau des Étudiants de l'Université Paris Dauphine-PSL.  
Statique, bilingue FR/EN, déployé sur Cloudflare Pages via GitHub.

---

## Architecture

Le site est **100 % statique** — aucun CMS, aucune base de données, aucun backend.  
Les pages HTML sont générées visuellement depuis des fichiers JavaScript dans `data/`.

```
data/site.js       → config globale (nom, contact, réseaux, nav, footer, billetterie)
data/events.js     → événements, dates, statuts, textes, images, galeries
data/sponsors.js   → partenaires, logos, liens, ordre
data/galleries.js  → galeries photos, légendes, albums Google Photos
data/artists.js    → artistes du carrousel homepage

js/render.js       → moteur de rendu (lit data/, injecte dans le HTML)
js/components.js   → composants communs (nav, footer, modal, sponsors)
js/main.js         → point d'entrée
style.css          → design global
```

---

## Système de gestion des données — 3 niveaux

### Niveau 1 — Modifier directement un fichier `data/*.js`
La méthode la plus directe. Modifier le fichier, pousser sur GitHub.  
La sync se fait automatiquement (voir ci-dessous).

### Niveau 2 — Modifier via Excel (`admin.xlsx`)
Plus convivial. Ouvrir `admin.xlsx`, modifier dans les onglets, pousser sur GitHub.  
Chaque onglet correspond à un type de données :

| Onglet | Contenu |
|---|---|
| Config | Paramètres globaux du site |
| Navigation | Liens du menu |
| Events | Événements (champs principaux) |
| Event_Descriptions | Paragraphes de description par événement |
| Event_Meta | Métadonnées affichées par événement |
| Event_Tags | Tags/badges par événement |
| Event_Artists | Artistes liés à un événement |
| Sponsors | Partenaires |
| Artists_Cartes | Carrousel artistes homepage |
| Artists_Bande | Bande de texte défilant |
| Galeries | Galeries photos |
| Galerie_Images | Photos par galerie |

### Niveau 3 — Automatique via GitHub Actions
**Dès qu'un push est détecté sur `main` :**
- Si `data/*.js` a changé → `admin.xlsx` est mis à jour automatiquement
- Si `admin.xlsx` a changé → `data/*.js` sont mis à jour automatiquement
- Cloudflare Pages redéploie ensuite le site avec les données à jour

Les deux sources sont toujours synchronisées. Il n'y a rien à lancer manuellement.

---

## Déploiement

### GitHub → Cloudflare Pages
1. Connecter le dépôt GitHub à Cloudflare Pages
2. Aucune build command nécessaire
3. Output directory : `/` (racine)
4. Tout push sur `main` déclenche un redéploiement automatique

### Test local
```bash
python -m http.server 8000
```
Puis ouvrir `http://localhost:8000`

---

## Workflow quotidien

**Modifier via Excel (méthode recommandée pour les non-techniques) :**
1. Ouvrir `admin.xlsx` depuis le dépôt (ou le télécharger)
2. Modifier les données dans les onglets concernés
3. Sauvegarder et pousser sur GitHub
4. GitHub Actions met à jour `data/*.js` → Cloudflare redéploie

**Modifier directement un fichier `data/*.js` :**
1. Éditer le fichier dans `data/`
2. Pousser sur GitHub
3. GitHub Actions met à jour `admin.xlsx` → Cloudflare redéploie

**Sur Windows sans GitHub (local seulement) :**
- `init_excel.bat` : recrée `admin.xlsx` depuis les JS actuels
- `update_site.bat` : applique `admin.xlsx` vers les JS

---

## Fichiers à ne jamais modifier sans raison technique
- `js/render.js`, `js/components.js`, `js/main.js`
- `style.css`
- Les pages HTML (sauf ajout de nouvelle page)

---

## Convention dans admin.xlsx

| Valeur | Signification |
|---|---|
| `OUI` | true |
| `NON` | false |
| *(cellule vide)* | chaîne vide / non défini |
| `a.jpg ; b.jpg` | liste de chemins séparés par `;` |

---

## Utilisation avec une IA

```
Voici le dossier complet de mon site. Lis d'abord AI-INSTRUCTIONS.md.
Je suis débutant : pose-moi les questions nécessaires, puis modifie
uniquement les fichiers indispensables pour obtenir le résultat demandé.
```
