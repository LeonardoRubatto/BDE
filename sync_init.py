#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
sync_init.py — Génère les fichiers CSV depuis les fichiers data/*.js
Usage   : python sync_init.py
Résultat: crée ou écrase les fichiers dans le dossier csv/

Les CSV s'ouvrent directement dans Excel ou Google Sheets.
Encodage UTF-8 avec BOM pour que Excel affiche correctement les accents.
"""

import json, re, csv, os
from pathlib import Path

ROOT = Path(__file__).parent
DATA = ROOT / "data"
CSV  = ROOT / "csv"
CSV.mkdir(exist_ok=True)


def load_js(filename):
    content = (DATA / filename).read_text(encoding="utf-8")
    lines = [l for l in content.split("\n") if not l.strip().startswith("//")]
    content = "\n".join(lines)
    match = re.search(r'window\.\w+\s*=\s*([\s\S]+?)\s*;?\s*$', content.strip())
    if not match:
        raise ValueError(f"Impossible de parser {filename}")
    return json.loads(match.group(1))


def write_csv(filename, rows):
    """Écrit un CSV UTF-8 avec BOM (lisible par Excel sans configuration)."""
    path = CSV / filename
    with open(path, "w", newline="", encoding="utf-8-sig") as f:
        writer = csv.writer(f)
        writer.writerows(rows)
    print(f"  OK  csv/{filename}  ({len(rows)-1} lignes)")


def b(val):
    if val is True:  return "OUI"
    if val is False: return "NON"
    return val if val is not None else ""

def s(val):
    return val if val is not None else ""


def main():
    print()
    print("  Lecture des fichiers data/*.js...")

    site      = load_js("site.js")
    events    = load_js("events.js")
    sponsors  = load_js("sponsors.js")
    artists   = load_js("artists.js")
    galleries = load_js("galleries.js")

    print("  Génération des fichiers CSV...")

    # ── config.csv ───────────────────────────────────────────────
    ticket = site.get("ticket") or {}
    rows = [["CHAMP", "VALEUR", "DESCRIPTION"]]
    rows += [
        ["siteName",              s(site.get("siteName")),               "Nom du site"],
        ["university",            s(site.get("university")),             "Nom de l'université"],
        ["year",                  s(site.get("year")),                   "Année en cours"],
        ["seasonLabel",           s(site.get("seasonLabel")),            "Libellé de saison"],
        ["email",                 s(site.get("email")),                  "Email de contact"],
        ["phone",                 s(site.get("phone")),                  "Téléphone affiché"],
        ["phoneHref",             s(site.get("phoneHref")),              "Téléphone sans espaces pour les liens"],
        ["address",               s(site.get("address")),                "Adresse complète"],
        ["logo",                  s(site.get("logo")),                   "Chemin du logo"],
        ["footerDescription",     s(site.get("footerDescription")),      "Description footer FR"],
        ["footerDescriptionEn",   s(site.get("footerDescriptionEn")),    "Description footer EN"],
        ["instagramUrl",          s(site.get("instagramUrl")),           "Lien Instagram BDE"],
        ["instagramLabel",        s(site.get("instagramLabel")),         "Label Instagram BDE"],
        ["nuitsInstagramUrl",     s(site.get("nuitsInstagramUrl")),      "Lien Instagram Nuits"],
        ["nuitsInstagramLabel",   s(site.get("nuitsInstagramLabel")),    "Label Instagram Nuits"],
        ["tiktokUrl",             s(site.get("tiktokUrl")),              "Lien TikTok"],
        ["facebookUrl",           s(site.get("facebookUrl")),            "Lien Facebook"],
        ["defaultTicketUrl",      s(site.get("defaultTicketUrl")),       "Lien billetterie générique"],
        ["defaultGooglePhotosUrl",s(site.get("defaultGooglePhotosUrl")), "Lien Google Photos générique"],
        ["copyrightText",         s(site.get("copyrightText")),          "Texte copyright"],
        ["ticket_eventName",      s(ticket.get("eventName")),            "Nom événement modal billetterie"],
        ["ticket_eventSub",       s(ticket.get("eventSub")),             "Sous-titre modal FR"],
        ["ticket_eventSubEn",     s(ticket.get("eventSubEn")),           "Sous-titre modal EN"],
        ["ticket_url",            s(ticket.get("url")),                  "URL billetterie"],
        ["ticket_buttonLabel",    s(ticket.get("buttonLabel")),          "Texte bouton FR"],
        ["ticket_buttonLabelEn",  s(ticket.get("buttonLabelEn")),        "Texte bouton EN"],
        ["ticket_description",    s(ticket.get("description")),          "Description billetterie FR"],
        ["ticket_descriptionEn",  s(ticket.get("descriptionEn")),        "Description billetterie EN"],
        ["ticket_note",           s(ticket.get("note")),                 "Note billetterie FR"],
        ["ticket_noteEn",         s(ticket.get("noteEn")),               "Note billetterie EN"],
    ]
    write_csv("config.csv", rows)

    # ── navigation.csv ───────────────────────────────────────────
    rows = [["ORDRE", "LABEL FR", "LABEL EN", "HREF", "LIEN HORS HOME"]]
    for i, nav in enumerate(site.get("navigation") or [], 1):
        rows.append([i, s(nav.get("label")), s(nav.get("labelEn")),
                     s(nav.get("href")), s(nav.get("externalFromNonHome"))])
    write_csv("navigation.csv", rows)

    # ── events.csv ───────────────────────────────────────────────
    rows = [[
        "SLUG", "ORDRE", "NUMÉRO", "TITRE", "SOUS-TITRE", "CATÉGORIE",
        "DATE (AAAA-MM-JJ)", "DATE FR", "DATE EN",
        "STATUT FR", "STATUT EN", "COULEUR STATUT",
        "LIEU", "SALLE", "DESCRIPTION COURTE",
        "HOME DESC FR", "HOME DESC EN", "HOME PÉRIODE FR", "HOME PÉRIODE EN",
        "IMAGE PRINCIPALE", "IMAGES SUPPLÉMENTAIRES (séparer par ;)", "ALT IMAGE",
        "TICKET URL", "TICKET LABEL",
        "DOSSIER URL", "DOSSIER LABEL FR", "DOSSIER LABEL EN", "DOSSIER DOWNLOAD (OUI/NON)",
        "GOOGLE PHOTOS URL", "PAGE GALERIE", "GALERIE LABEL",
        "SUR HOME (OUI/NON)", "SUR ÉVÉNEMENTS (OUI/NON)", "SUR PAGE NUITS (OUI/NON)",
        "FEATURED (OUI/NON)", "STATUS", "REVERSE (OUI/NON)",
    ]]
    for ev in events:
        dl   = ev.get("dateLabel")          or {}
        sl   = ev.get("statusLabel")        or {}
        hd   = ev.get("homeDescriptionI18n") or {}
        hp   = ev.get("homePeriodI18n")     or {}
        dlab = ev.get("dossierLabel")       or {}
        imgs = ev.get("images")             or []
        main = s(ev.get("image"))
        supp = " ; ".join(img for img in imgs if img != main)
        rows.append([
            s(ev.get("slug")), ev.get("order",""), s(ev.get("number")),
            s(ev.get("title")), s(ev.get("subtitle")), s(ev.get("category")),
            s(ev.get("date")), s(dl.get("fr")), s(dl.get("en")),
            s(sl.get("fr")), s(sl.get("en")), s(ev.get("statusColor")),
            s(ev.get("place")), s(ev.get("venue")), s(ev.get("shortDescription")),
            s(hd.get("fr")), s(hd.get("en")),
            s(hp.get("fr")), s(hp.get("en")),
            main, supp, s(ev.get("alt")),
            s(ev.get("ticketUrl")), s(ev.get("ticketLabel")),
            s(ev.get("dossierUrl")), s(dlab.get("fr")), s(dlab.get("en")),
            b(ev.get("dossierDownload")),
            s(ev.get("googlePhotosUrl")), s(ev.get("galleryPage")), s(ev.get("galleryLabel")),
            b(ev.get("showOnHome")), b(ev.get("showOnEventsPage")), b(ev.get("showOnNuitsPage")),
            b(ev.get("featured")), s(ev.get("status")), b(ev.get("reverse")),
        ])
    write_csv("events.csv", rows)

    # ── event_descriptions.csv ───────────────────────────────────
    rows = [["SLUG ÉVÉNEMENT", "ORDRE", "TEXTE FR", "TEXTE EN"]]
    for ev in events:
        for k, block in enumerate(ev.get("descriptionBlocks") or [], 1):
            i18n = block.get("i18n") or {}
            rows.append([s(ev.get("slug")), k,
                         s(i18n.get("fr") or block.get("text")), s(i18n.get("en"))])
    write_csv("event_descriptions.csv", rows)

    # ── event_meta.csv ───────────────────────────────────────────
    rows = [["SLUG ÉVÉNEMENT", "ORDRE", "CLÉ FR", "CLÉ EN", "VALEUR FR", "VALEUR EN"]]
    for ev in events:
        for k, meta in enumerate(ev.get("meta") or [], 1):
            ki = meta.get("keyI18n")   or {}
            vi = meta.get("valueI18n") or {}
            rows.append([s(ev.get("slug")), k,
                         s(ki.get("fr") or meta.get("key")), s(ki.get("en") or meta.get("key")),
                         s(vi.get("fr") or meta.get("value")), s(vi.get("en") or meta.get("value"))])
    write_csv("event_meta.csv", rows)

    # ── event_tags.csv ───────────────────────────────────────────
    rows = [["SLUG ÉVÉNEMENT", "ORDRE", "LABEL", "ROUGE (OUI/NON)", "LABEL FR", "LABEL EN"]]
    for ev in events:
        for k, tag in enumerate(ev.get("tags") or [], 1):
            i18n = tag.get("i18n") or {}
            rows.append([s(ev.get("slug")), k, s(tag.get("label")),
                         b(tag.get("red", False)),
                         s(i18n.get("fr") or tag.get("label")), s(i18n.get("en"))])
    write_csv("event_tags.csv", rows)

    # ── event_artists.csv ────────────────────────────────────────
    rows = [["SLUG ÉVÉNEMENT", "ORDRE", "LABEL", "MIS EN AVANT (OUI/NON)"]]
    for ev in events:
        for k, art in enumerate(ev.get("artists") or [], 1):
            rows.append([s(ev.get("slug")), k, s(art.get("label")), b(art.get("highlight", False))])
    write_csv("event_artists.csv", rows)

    # ── sponsors.csv ─────────────────────────────────────────────
    rows = [["NOM", "LOGO", "FALLBACK", "ALT", "URL",
             "CATÉGORIE", "TYPE FR", "TYPE EN", "LIEN LABEL", "ACTIF (OUI/NON)", "ORDRE"]]
    for sp in sponsors:
        rows.append([s(sp.get("name")), s(sp.get("logo")), s(sp.get("fallback")),
                     s(sp.get("alt")), s(sp.get("url")), s(sp.get("category")),
                     s(sp.get("type")), s(sp.get("typeEn")), s(sp.get("linkLabel")),
                     b(sp.get("active")), sp.get("order", "")])
    write_csv("sponsors.csv", rows)

    # ── artists_cartes.csv ───────────────────────────────────────
    rows = [["NOM", "IMAGE", "ALT", "ANNÉE · ÉVÉNEMENT", "TEXTE ÉVÉNEMENT",
             "BADGE", "FEATURED (OUI/NON)", "ACTIF (OUI/NON)", "ORDRE"]]
    for card in artists.get("cards") or []:
        rows.append([s(card.get("name")), s(card.get("image")), s(card.get("alt")),
                     s(card.get("yearEvent")), s(card.get("eventText")), s(card.get("badge")),
                     b(card.get("featured")), b(card.get("active")), card.get("order", "")])
    write_csv("artists_cartes.csv", rows)

    # ── artists_bande.csv ────────────────────────────────────────
    rows = [["ORDRE", "NOM"]]
    for i, name in enumerate(artists.get("textStrip") or [], 1):
        rows.append([i, s(name)])
    write_csv("artists_bande.csv", rows)

    # ── galleries.csv ────────────────────────────────────────────
    rows = [["SLUG", "TITRE", "PAGE HTML", "SLUG ÉVÉNEMENT LIÉ",
             "IMAGE COUVERTURE", "GOOGLE PHOTOS URL", "MODE LIGHTBOX", "ACTIF (OUI/NON)", "ORDRE"]]
    for gal in galleries:
        rows.append([s(gal.get("slug")), s(gal.get("title")), s(gal.get("page")),
                     s(gal.get("eventSlug")), s(gal.get("coverImage")),
                     s(gal.get("googlePhotosUrl")), s(gal.get("lightboxMode")),
                     b(gal.get("active")), gal.get("order", "")])
    write_csv("galleries.csv", rows)

    # ── gallery_images.csv ───────────────────────────────────────
    rows = [["SLUG GALERIE", "ORDRE", "SRC", "ALT",
             "LÉGENDE FR", "LÉGENDE EN", "TAG FR", "TAG EN"]]
    for gal in galleries:
        for k, img in enumerate(gal.get("images") or [], 1):
            ci = img.get("captionI18n") or {}
            ti = img.get("tagI18n")     or {}
            rows.append([s(gal.get("slug")), k, s(img.get("src")), s(img.get("alt")),
                         s(ci.get("fr") or img.get("caption")), s(ci.get("en")),
                         s(ti.get("fr") or img.get("tag")), s(ti.get("en"))])
    write_csv("gallery_images.csv", rows)

    print()
    print("  Terminé ! 12 fichiers CSV générés dans csv/")
    print()


if __name__ == "__main__":
    main()
