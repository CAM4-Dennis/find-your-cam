/**
 * Lightweight SEO pre-render script — NO browser needed.
 * Injects language-specific meta tags per route.
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "..", "dist");
const BASE = "https://www.startvagina.nl";
const template = readFileSync(join(DIST, "index.html"), "utf-8");

const langs = ["nl", "en", "fr", "de", "es", "it"];
const langPrefixes = { nl: "", en: "/en", fr: "/fr", de: "/de", es: "/es", it: "/it" };

// ============================================================
// Multilingual page definitions
// Each page has meta per language: { nl: {...}, en: {...}, ... }
// ============================================================

function m(nl, en, fr, de, es, it) {
  return { nl, en, fr, de, es, it };
}

function meta(title, desc, kw, faq, schema) {
  return { title, description: desc, keywords: kw, faq, schema };
}

const pages = [
  // ---------- Homepage ----------
  {
    slugs: [""],
    meta: m(
      meta("StartVagina — Gratis Webcamsex & Live Sex Cams", "StartVagina is dé zoekmachine voor gratis webcamsex en live sex cams. Bekijk duizenden cam girls, sexchat en erotische webcam shows van Nederlandse en Belgische modellen.", "webcamsex, live sex cams, gratis webcam, sexchat, cam girls", null, { "@context": "https://schema.org", "@type": "WebSite", name: "StartVagina", url: BASE, inLanguage: "nl" }),
      meta("StartVagina — Free Webcam Sex & Live Sex Cams", "StartVagina is the ultimate search engine for free webcam sex and live sex cams. Watch thousands of cam girls, enjoy sex chat and erotic webcam shows live — no signup required.", "webcam sex, live sex cams, free webcam, sex chat, cam girls", null, { "@context": "https://schema.org", "@type": "WebSite", name: "StartVagina", url: BASE, inLanguage: "en" }),
      meta("StartVagina — Webcam Sexe Gratuit & Cams Direct", "StartVagina est le moteur de recherche ultime pour le webcam sexe gratuit et les cams en direct. Regardez des milliers de cam girls et profitez de shows érotiques sans inscription.", "webcam sexe, cams en direct, webcam gratuit, chat sexe, cam girls", null, { "@context": "https://schema.org", "@type": "WebSite", name: "StartVagina", url: BASE, inLanguage: "fr" }),
      meta("StartVagina — Gratis Webcam Sex & Live Cams", "StartVagina ist die ultimative Suchmaschine für gratis Webcam Sex und Live Sex Cams. Schau dir tausende Cam Girls live an — kostenlos und ohne Anmeldung auf allen Plattformen.", "webcam sex, live sex cams, gratis webcam, sexchat, cam girls", null, { "@context": "https://schema.org", "@type": "WebSite", name: "StartVagina", url: BASE, inLanguage: "de" }),
      meta("StartVagina — Webcam Sexo Gratis & Cams en Vivo", "StartVagina es el buscador definitivo de webcam sexo gratis y cams en vivo. Mira miles de cam girls en directo de Chaturbate, Stripchat, BongaCams y CAM4 sin registro.", "webcam sexo, cams en vivo, webcam gratis, chat sexual, cam girls", null, { "@context": "https://schema.org", "@type": "WebSite", name: "StartVagina", url: BASE, inLanguage: "es" }),
      meta("StartVagina — Webcam Sex Gratis & Cam dal Vivo", "StartVagina è il motore di ricerca definitivo per webcam sex gratis e cam dal vivo. Guarda migliaia di cam girl in diretta da Chaturbate, Stripchat, BongaCams e CAM4 senza registrazione.", "webcam sex, cam dal vivo, webcam gratis, chat erotica, cam girl", null, { "@context": "https://schema.org", "@type": "WebSite", name: "StartVagina", url: BASE, inLanguage: "it" }),
    ),
  },

  // ---------- Core pages ----------
  {
    slugs: ["categories"],
    meta: m(
      meta("Webcamsex Categorieën | StartVagina", "Bekijk alle webcamsex categorieën op StartVagina. Van teen tot mature, MILF tot BDSM — ontdek jouw favoriete categorie cam girls van Chaturbate, Stripchat en meer.", "webcamsex categorieën, cam categorieën"),
      meta("Webcam Sex Categories | StartVagina", "Browse all webcam sex categories on StartVagina. From teen to mature, MILF to BDSM — find your favourite category of cam girls from Chaturbate, Stripchat and more.", "webcam sex categories, cam categories"),
      meta("Catégories Webcam Sexe | StartVagina", "Parcourez toutes les catégories de webcam sexe sur StartVagina. De teen à mature, MILF à BDSM — trouvez votre catégorie préférée de cam girls en direct.", "catégories webcam sexe, catégories cam"),
      meta("Webcam Sex Kategorien | StartVagina", "Durchsuche alle Webcam Sex Kategorien auf StartVagina. Von Teen bis Mature, MILF bis BDSM — finde deine Lieblingskategorie Cam Girls von Chaturbate, Stripchat und mehr.", "webcam sex kategorien, cam kategorien"),
      meta("Categorías Webcam Sexo | StartVagina", "Explora todas las categorías de webcam sexo en StartVagina. De teen a mature, MILF a BDSM — encuentra tu categoría favorita de cam girls en vivo.", "categorías webcam sexo, categorías cam"),
      meta("Categorie Webcam Sex | StartVagina", "Sfoglia tutte le categorie di webcam sex su StartVagina. Da teen a mature, MILF a BDSM — trova la tua categoria preferita di cam girl in diretta.", "categorie webcam sex, categorie cam"),
    ),
  },
  {
    slugs: ["countries"],
    meta: m(
      meta("Webcamsex per Land | StartVagina", "Ontdek cam girls per land op StartVagina. Bekijk Nederlandse, Belgische, Colombiaanse en meer webcam modellen live op Chaturbate, Stripchat, BongaCams en CAM4.", "webcamsex landen, cam girls landen"),
      meta("Webcam Sex by Country | StartVagina", "Discover cam girls by country on StartVagina. Watch Dutch, Belgian, Colombian and more webcam models live on Chaturbate, Stripchat, BongaCams and CAM4.", "webcam sex countries, cam girls countries"),
      meta("Webcam Sexe par Pays | StartVagina", "Découvrez des cam girls par pays sur StartVagina. Modèles néerlandaises, belges, colombiennes et plus encore en direct sur Chaturbate, Stripchat et BongaCams.", "webcam sexe pays, cam girls pays"),
      meta("Webcam Sex nach Land | StartVagina", "Entdecke Cam Girls nach Land auf StartVagina. Niederländische, belgische, kolumbianische und mehr Models live auf Chaturbate, Stripchat, BongaCams und CAM4.", "webcam sex länder, cam girls länder"),
      meta("Webcam Sexo por País | StartVagina", "Descubre cam girls por país en StartVagina. Modelos holandesas, belgas, colombianas y más en vivo en Chaturbate, Stripchat, BongaCams y CAM4.", "webcam sexo países, cam girls países"),
      meta("Webcam Sex per Paese | StartVagina", "Scopri cam girl per paese su StartVagina. Modelle olandesi, belghe, colombiane e altre dal vivo su Chaturbate, Stripchat, BongaCams e CAM4.", "webcam sex paesi, cam girl paesi"),
    ),
  },
  {
    slugs: ["languages"],
    meta: m(
      meta("Webcamsex per Taal | StartVagina", "Vind cam girls die jouw taal spreken op StartVagina. Geniet van gratis webcamsex in het Nederlands, Engels, Duits, Frans, Spaans en meer talen — live en zonder registratie.", "webcamsex taal, cam girls taal"),
      meta("Webcam Sex by Language | StartVagina", "Find cam girls who speak your language on StartVagina. Enjoy free webcam sex in English, Dutch, German, French, Spanish and more languages — live and without signup.", "webcam sex language, cam girls language"),
      meta("Webcam Sexe par Langue | StartVagina", "Trouvez des cam girls qui parlent votre langue sur StartVagina. Profitez de webcam sexe gratuit en français, anglais, allemand et plus — en direct sans inscription.", "webcam sexe langue, cam girls langue"),
      meta("Webcam Sex nach Sprache | StartVagina", "Finde Cam Girls die deine Sprache sprechen auf StartVagina. Genieße gratis Webcam Sex auf Deutsch, Englisch, Französisch und mehr Sprachen — live und ohne Anmeldung.", "webcam sex sprache, cam girls sprache"),
      meta("Webcam Sexo por Idioma | StartVagina", "Encuentra cam girls que hablan tu idioma en StartVagina. Disfruta de webcam sexo gratis en español, inglés, alemán y más idiomas — en vivo y sin registro.", "webcam sexo idioma, cam girls idioma"),
      meta("Webcam Sex per Lingua | StartVagina", "Trova cam girl che parlano la tua lingua su StartVagina. Goditi webcam sex gratis in italiano, inglese, tedesco e altre lingue — in diretta e senza registrazione.", "webcam sex lingua, cam girl lingua"),
    ),
  },
  {
    slugs: ["new"],
    meta: m(
      meta("Nieuwe Cam Girls | StartVagina", "Ontdek de nieuwste cam modellen die net begonnen zijn met streamen op StartVagina. Verse gezichten en nieuwe erotische shows — dagelijks bijgewerkt.", "nieuwe cam modellen, nieuwe cam girls"),
      meta("New Cam Girls | StartVagina", "Discover the newest webcam models who just started streaming on StartVagina. Fresh faces and exciting new erotic shows — updated daily from all major platforms.", "new cam models, new cam girls"),
      meta("Nouvelles Cam Girls | StartVagina", "Découvrez les derniers modèles webcam qui viennent de commencer à streamer sur StartVagina. Nouveaux visages et shows érotiques — mis à jour quotidiennement.", "nouveaux modèles webcam, nouvelles cam girls"),
      meta("Neue Cam Girls | StartVagina", "Entdecke die neuesten Webcam Models die gerade angefangen haben auf StartVagina. Frische Gesichter und neue erotische Shows — täglich aktualisiert.", "neue cam models, neue cam girls"),
      meta("Nuevas Cam Girls | StartVagina", "Descubre las modelos webcam más nuevas que acaban de empezar en StartVagina. Caras nuevas y shows eróticos emocionantes — actualizados diariamente.", "nuevas modelos webcam, nuevas cam girls"),
      meta("Nuove Cam Girl | StartVagina", "Scopri le modelle webcam più recenti che hanno appena iniziato su StartVagina. Volti nuovi e show erotici emozionanti — aggiornati quotidianamente.", "nuove modelle webcam, nuove cam girl"),
    ),
  },
  {
    slugs: ["top"],
    meta: m(
      meta("Top Cam Girls | StartVagina", "De populairste en best bekeken cam girls live op webcam. Bekijk de top modellen van Chaturbate, Stripchat, BongaCams en CAM4 — dagelijks bijgewerkte ranglijst.", "top cam girls, populaire cam modellen"),
      meta("Top Cam Girls | StartVagina", "The most popular and most viewed cam girls live on webcam. Browse top models from Chaturbate, Stripchat, BongaCams and CAM4 — updated daily.", "top cam girls, popular cam models"),
      meta("Top Cam Girls | StartVagina", "Les cam girls les plus populaires et les plus regardées en direct sur webcam. Découvrez le classement des top modèles de Chaturbate, Stripchat et BongaCams.", "top cam girls, modèles populaires"),
      meta("Top Cam Girls | StartVagina", "Die beliebtesten und meistgesehenen Cam Girls live auf Webcam. Entdecke das Ranking der Top Models von Chaturbate, Stripchat, BongaCams und CAM4.", "top cam girls, beliebte cam models"),
      meta("Top Cam Girls | StartVagina", "Las cam girls más populares y más vistas en vivo por webcam. Descubre el ranking de top modelos de Chaturbate, Stripchat, BongaCams y CAM4.", "top cam girls, modelos populares"),
      meta("Top Cam Girl | StartVagina", "Le cam girl più popolari e più viste in diretta su webcam. Scopri la classifica delle top modelle di Chaturbate, Stripchat, BongaCams e CAM4.", "top cam girl, modelle popolari"),
    ),
  },
  {
    slugs: ["blog"],
    meta: m(
      meta("Blog | StartVagina", "Lees het laatste nieuws, tips en achtergronden over webcamsex en live cam shows op de StartVagina blog. Ontdek trends, reviews en gidsen voor cam beginners.", "webcamsex blog, cam blog"),
      meta("Blog | StartVagina", "Read the latest news, tips and backgrounds about webcam sex and live cam shows on the StartVagina blog. Discover trends, reviews and guides for cam beginners.", "webcam sex blog, cam blog"),
      meta("Blog | StartVagina", "Lisez les dernières nouvelles, conseils et articles sur le webcam sexe et les shows cam en direct sur le blog StartVagina. Tendances, avis et guides pour débutants.", "webcam sexe blog, cam blog"),
      meta("Blog | StartVagina", "Lies die neuesten Nachrichten, Tipps und Hintergründe über Webcam Sex und Live Cam Shows auf dem StartVagina Blog. Trends, Reviews und Guides für Cam-Einsteiger.", "webcam sex blog, cam blog"),
      meta("Blog | StartVagina", "Lee las últimas noticias, consejos y artículos sobre webcam sexo y shows cam en vivo en el blog de StartVagina. Tendencias, reseñas y guías para principiantes.", "webcam sexo blog, cam blog"),
      meta("Blog | StartVagina", "Leggi le ultime notizie, consigli e approfondimenti su webcam sex e show cam dal vivo sul blog di StartVagina. Tendenze, recensioni e guide per principianti.", "webcam sex blog, cam blog"),
    ),
  },

  // ---------- Keyword landing pages ----------
  {
    slugs: ["webcamsex"],
    meta: m(
      meta("Webcamsex — Gratis Live Cam Sex | StartVagina", "Gratis webcamsex kijken met duizenden cam girls live online. De beste webcam sex van Chaturbate, Stripchat, BongaCams en CAM4 op één plek — zonder registratie.", "webcamsex, webcam sex, gratis webcamsex"),
      meta("Webcam Sex — Free Live Cam Sex | StartVagina", "Watch free webcam sex with thousands of cam girls live online. The best webcam sex from Chaturbate, Stripchat, BongaCams and CAM4 in one place — no signup needed.", "webcam sex, free webcam sex, live webcam sex"),
      meta("Webcam Sexe Gratuit en Direct | StartVagina", "Regardez du webcam sexe gratuit avec des milliers de cam girls en direct de Chaturbate, Stripchat et BongaCams. Le meilleur du webcam sexe réuni sur une seule page.", "webcam sexe, webcam sexe gratuit, cam sexe"),
      meta("Webcam Sex — Gratis Live Cam Sex | StartVagina", "Gratis Webcam Sex schauen mit tausenden Cam Girls live online von Chaturbate, Stripchat, BongaCams und CAM4. Der beste Webcam Sex aller Plattformen an einem Ort.", "webcam sex, gratis webcam sex, live webcam sex"),
      meta("Webcam Sexo Gratis en Vivo | StartVagina", "Mira webcam sexo gratis con miles de cam girls en vivo de Chaturbate, Stripchat, BongaCams y CAM4. El mejor webcam sexo de todas las plataformas en un solo lugar.", "webcam sexo, webcam sexo gratis, cam sexo"),
      meta("Webcam Sex Gratis dal Vivo | StartVagina", "Guarda webcam sex gratis con migliaia di cam girl in diretta da Chaturbate, Stripchat, BongaCams e CAM4. Il meglio del webcam sex da tutte le piattaforme riunito qui.", "webcam sex, webcam sex gratis, cam sex"),
    ),
  },
  {
    slugs: ["gratis-webcam-sex"],
    meta: m(
      meta("Gratis Webcam Sex | StartVagina", "Gratis webcam sex kijken met de mooiste cam girls van Chaturbate, Stripchat en BongaCams. Geen creditcard nodig, geen registratie — direct live meekijken.", "gratis webcam sex, gratis cam, gratis sexcam"),
      meta("Free Webcam Sex | StartVagina", "Watch free webcam sex with the most beautiful cam girls from Chaturbate, Stripchat and BongaCams. No credit card needed, no registration — start watching live now.", "free webcam sex, free cam, free sex cam"),
      meta("Webcam Sexe Gratuit | StartVagina", "Regardez du webcam sexe gratuit avec les plus belles cam girls de Chaturbate, Stripchat et BongaCams. Sans carte de crédit, sans inscription — commencez maintenant.", "webcam sexe gratuit, cam gratuit"),
      meta("Gratis Webcam Sex | StartVagina", "Gratis Webcam Sex schauen mit den schönsten Cam Girls von Chaturbate, Stripchat und BongaCams. Keine Kreditkarte nötig, keine Registrierung — jetzt live zuschauen.", "gratis webcam sex, gratis cam, kostenlos webcam sex"),
      meta("Webcam Sexo Gratis | StartVagina", "Mira webcam sexo gratis con las cam girls más hermosas de Chaturbate, Stripchat y BongaCams. Sin tarjeta de crédito, sin registro — empieza a ver en vivo ahora.", "webcam sexo gratis, cam gratis"),
      meta("Webcam Sex Gratis | StartVagina", "Guarda webcam sex gratis con le cam girl più belle di Chaturbate, Stripchat e BongaCams. Nessuna carta di credito, nessuna registrazione — inizia a guardare ora.", "webcam sex gratis, cam gratis"),
    ),
  },
  {
    slugs: ["sexchat"],
    meta: m(
      meta("Sexchat — Live Sex Chat | StartVagina", "Live sexchat met cam girls op StartVagina. Chat gratis met duizenden webcam modellen op Chaturbate, Stripchat, BongaCams en CAM4 — anoniem en zonder registratie.", "sexchat, sex chat, live sexchat"),
      meta("Sex Chat — Live Cam Chat | StartVagina", "Live sex chat with cam girls on StartVagina. Chat for free with thousands of webcam models on Chaturbate, Stripchat, BongaCams and CAM4 — anonymous and no signup.", "sex chat, live sex chat, cam chat"),
      meta("Chat Sexe en Direct | StartVagina", "Chat sexe en direct avec des cam girls sur StartVagina. Chattez gratuitement avec des milliers de modèles webcam sur Chaturbate, Stripchat et BongaCams — anonyme.", "chat sexe, chat sexe en direct"),
      meta("Sexchat — Live Sex Chat | StartVagina", "Live Sexchat mit Cam Girls auf StartVagina. Chatte kostenlos mit tausenden Webcam Models auf Chaturbate, Stripchat, BongaCams und CAM4 — anonym und ohne Anmeldung.", "sexchat, sex chat, live sexchat"),
      meta("Chat Sexual en Vivo | StartVagina", "Chat sexual en vivo con cam girls en StartVagina. Chatea gratis con miles de modelos webcam en Chaturbate, Stripchat, BongaCams y CAM4 — anónimo y sin registro.", "chat sexual, chat sexual en vivo"),
      meta("Chat Erotica dal Vivo | StartVagina", "Chat erotica dal vivo con cam girl su StartVagina. Chatta gratis con migliaia di modelle webcam su Chaturbate, Stripchat, BongaCams e CAM4 — anonimo e senza registrazione.", "chat erotica, chat erotica dal vivo"),
    ),
  },
  {
    slugs: ["cam-girls"],
    meta: m(
      meta("Cam Girls — Live Webcam Meisjes | StartVagina", "Bekijk de mooiste cam girls live op webcam op StartVagina. Duizenden webcam meisjes van Chaturbate, Stripchat, BongaCams en CAM4 op één plek — gratis en zonder registratie.", "cam girls, webcam meisjes, cam meisjes"),
      meta("Cam Girls — Live Webcam Girls | StartVagina", "Watch the most beautiful cam girls live on webcam at StartVagina. Thousands of webcam girls from Chaturbate, Stripchat, BongaCams and CAM4 — free and no signup required.", "cam girls, webcam girls, live cam girls"),
      meta("Cam Girls en Direct | StartVagina", "Regardez les plus belles cam girls en direct sur webcam sur StartVagina. Des milliers de cam girls de Chaturbate, Stripchat, BongaCams et CAM4 — gratuit et sans inscription.", "cam girls, webcam girls, cam girls en direct"),
      meta("Cam Girls Live | StartVagina", "Schau dir die schönsten Cam Girls live auf Webcam an auf StartVagina. Tausende Webcam Girls von Chaturbate, Stripchat, BongaCams und CAM4 — kostenlos und ohne Anmeldung.", "cam girls, webcam girls, live cam girls"),
      meta("Cam Girls en Vivo | StartVagina", "Mira las cam girls más hermosas en vivo por webcam en StartVagina. Miles de cam girls de Chaturbate, Stripchat, BongaCams y CAM4 — gratis y sin registro.", "cam girls, webcam girls, cam girls en vivo"),
      meta("Cam Girl dal Vivo | StartVagina", "Guarda le cam girl più belle in diretta su webcam su StartVagina. Migliaia di cam girl da Chaturbate, Stripchat, BongaCams e CAM4 — gratis e senza registrazione.", "cam girl, webcam girl, cam girl dal vivo"),
    ),
  },
  {
    slugs: ["live-sex-cams"],
    meta: m(
      meta("Live Sex Cams — Gratis Shows | StartVagina", "Gratis live sex cams kijken op StartVagina. Duizenden modellen live op Chaturbate, Stripchat, BongaCams en CAM4 — bekijk erotische webcam shows zonder registratie.", "live sex cams, live cam, live sex"),
      meta("Live Sex Cams — Free Shows | StartVagina", "Watch free live sex cams on StartVagina. Thousands of models live on Chaturbate, Stripchat, BongaCams and CAM4 — enjoy erotic webcam shows without signup.", "live sex cams, live cam, free live cams"),
      meta("Cams en Direct Gratuits | StartVagina", "Regardez des cams en direct gratuitement sur StartVagina. Des milliers de modèles en direct sur Chaturbate, Stripchat, BongaCams et CAM4 — shows érotiques sans inscription.", "cams en direct, cam en direct, cam gratuit"),
      meta("Live Sex Cams — Gratis Shows | StartVagina", "Gratis Live Sex Cams schauen auf StartVagina. Tausende Models live auf Chaturbate, Stripchat, BongaCams und CAM4 — erotische Webcam Shows ohne Anmeldung genießen.", "live sex cams, live cam, gratis live cams"),
      meta("Cams en Vivo Gratis | StartVagina", "Mira cams en vivo gratis en StartVagina. Miles de modelos en directo en Chaturbate, Stripchat, BongaCams y CAM4 — disfruta de shows eróticos sin registro.", "cams en vivo, cam en vivo, cam gratis"),
      meta("Cam dal Vivo Gratis | StartVagina", "Guarda cam dal vivo gratis su StartVagina. Migliaia di modelle in diretta su Chaturbate, Stripchat, BongaCams e CAM4 — show erotici senza registrazione.", "cam dal vivo, cam in diretta, cam gratis"),
    ),
  },

  // ---------- Platform landing pages ----------
  ...["cam4", "chaturbate", "bongacams", "stripchat"].map(p => { // xcams temporarily disabled
    const name = { cam4: "CAM4", chaturbate: "Chaturbate", bongacams: "BongaCams", stripchat: "Stripchat" }[p];
    return {
      slugs: [`live-sex-cams-${p}`],
      meta: m(
        meta(`${name} Live Sex Cams | StartVagina`, `Bekijk gratis live sex cams van ${name} op StartVagina. Duizenden ${name} modellen live online — bekijk erotische webcam shows zonder registratie of creditcard.`, `${p}, ${p} live, ${p} webcamsex`),
        meta(`${name} Live Sex Cams | StartVagina`, `Watch free live sex cams from ${name} on StartVagina. Thousands of ${name} models live online — enjoy erotic webcam shows without signup or credit card.`, `${p}, ${p} live, ${p} webcam sex`),
        meta(`${name} Cams en Direct | StartVagina`, `Regardez des cams en direct de ${name} gratuitement sur StartVagina. Des milliers de modèles ${name} en direct — shows érotiques sans inscription ni carte de crédit.`, `${p}, ${p} en direct, ${p} webcam sexe`),
        meta(`${name} Live Sex Cams | StartVagina`, `Schau dir gratis Live Sex Cams von ${name} auf StartVagina an. Tausende ${name} Models live online — erotische Webcam Shows ohne Anmeldung oder Kreditkarte.`, `${p}, ${p} live, ${p} webcam sex`),
        meta(`${name} Cams en Vivo | StartVagina`, `Mira cams en vivo de ${name} gratis en StartVagina. Miles de modelos ${name} en directo — shows eróticos sin registro ni tarjeta de crédito.`, `${p}, ${p} en vivo, ${p} webcam sexo`),
        meta(`${name} Cam dal Vivo | StartVagina`, `Guarda cam dal vivo di ${name} gratis su StartVagina. Migliaia di modelle ${name} in diretta — show erotici senza registrazione o carta di credito.`, `${p}, ${p} dal vivo, ${p} webcam sex`),
      ),
    };
  }),

  // ---------- Category landing pages ----------
  ...[
    { s: "webcamsex-teen-18-plus", nl: "Teen 18+", en: "Teen 18+", fr: "Teen 18+", de: "Teen 18+", es: "Teen 18+", it: "Teen 18+",
      nlD: "jonge cam girls van 18+", enD: "young cam girls aged 18+", frD: "jeunes cam girls de 18+", deD: "junge Cam Girls ab 18+", esD: "cam girls jóvenes de 18+", itD: "giovani cam girl di 18+" },
    { s: "webcamsex-milf", nl: "MILF", en: "MILF", fr: "MILF", de: "MILF", es: "MILF", it: "MILF",
      nlD: "ervaren vrouwen", enD: "experienced women", frD: "femmes expérimentées", deD: "erfahrene Frauen", esD: "mujeres experimentadas", itD: "donne esperte" },
    { s: "webcamsex-mature", nl: "Mature", en: "Mature", fr: "Mature", de: "Mature", es: "Mature", it: "Mature",
      nlD: "oudere vrouwen", enD: "older women", frD: "femmes mûres", deD: "ältere Frauen", esD: "mujeres maduras", itD: "donne mature" },
    { s: "webcamsex-asian", nl: "Aziatisch", en: "Asian", fr: "Asiatique", de: "Asiatisch", es: "Asiáticas", it: "Asiatiche",
      nlD: "Aziatische cam girls", enD: "Asian cam girls", frD: "cam girls asiatiques", deD: "asiatische Cam Girls", esD: "cam girls asiáticas", itD: "cam girl asiatiche" },
    { s: "webcamsex-latina", nl: "Latina", en: "Latina", fr: "Latina", de: "Latina", es: "Latina", it: "Latina",
      nlD: "Latijnse cam girls", enD: "Latina cam girls", frD: "cam girls latinas", deD: "Latina Cam Girls", esD: "cam girls latinas", itD: "cam girl latine" },
    { s: "webcamsex-ebony", nl: "Ebony", en: "Ebony", fr: "Ebony", de: "Ebony", es: "Ebony", it: "Ebony",
      nlD: "zwarte cam girls", enD: "black cam girls", frD: "cam girls noires", deD: "schwarze Cam Girls", esD: "cam girls negras", itD: "cam girl nere" },
    { s: "webcamsex-grote-borsten", nl: "Grote Borsten", en: "Big Boobs", fr: "Gros Seins", de: "Große Brüste", es: "Tetas Grandes", it: "Tette Grandi",
      nlD: "cam girls met grote borsten", enD: "cam girls with big boobs", frD: "cam girls aux gros seins", deD: "Cam Girls mit großen Brüsten", esD: "cam girls con tetas grandes", itD: "cam girl con tette grandi" },
    { s: "webcamsex-kleine-borsten", nl: "Kleine Borsten", en: "Small Tits", fr: "Petits Seins", de: "Kleine Brüste", es: "Tetas Pequeñas", it: "Tette Piccole",
      nlD: "petite cam girls", enD: "petite cam girls", frD: "cam girls petites", deD: "petite Cam Girls", esD: "cam girls petite", itD: "cam girl petite" },
    { s: "webcamsex-anal", nl: "Anal", en: "Anal", fr: "Anal", de: "Anal", es: "Anal", it: "Anale",
      nlD: "anale cam shows", enD: "anal cam shows", frD: "shows cam anal", deD: "anale Cam Shows", esD: "shows cam anal", itD: "show cam anali" },
    { s: "webcamsex-koppels", nl: "Koppels", en: "Couples", fr: "Couples", de: "Paare", es: "Parejas", it: "Coppie",
      nlD: "echte koppels live op cam", enD: "real couples live on cam", frD: "vrais couples en direct", deD: "echte Paare live auf Cam", esD: "parejas reales en vivo", itD: "vere coppie in diretta" },
    { s: "webcamsex-squirt", nl: "Squirt", en: "Squirt", fr: "Squirt", de: "Squirt", es: "Squirt", it: "Squirt",
      nlD: "squirting cam shows", enD: "squirting cam shows", frD: "shows cam squirt", deD: "Squirting Cam Shows", esD: "shows cam squirt", itD: "show cam squirt" },
    { s: "webcamsex-bdsm", nl: "BDSM", en: "BDSM", fr: "BDSM", de: "BDSM", es: "BDSM", it: "BDSM",
      nlD: "bondage en fetish cam shows", enD: "bondage and fetish cam shows", frD: "shows cam bondage et fétiche", deD: "Bondage und Fetisch Cam Shows", esD: "shows cam bondage y fetiche", itD: "show cam bondage e fetish" },
    { s: "webcamsex-tattoo", nl: "Tattoo", en: "Tattoo", fr: "Tatouage", de: "Tattoo", es: "Tatuaje", it: "Tatuaggio",
      nlD: "getatoeëerde cam girls", enD: "tattooed cam girls", frD: "cam girls tatouées", deD: "tätowierte Cam Girls", esD: "cam girls tatuadas", itD: "cam girl tatuate" },
    { s: "webcamsex-hairy", nl: "Hairy", en: "Hairy", fr: "Poilu", de: "Behaart", es: "Peluda", it: "Pelosa",
      nlD: "behaarde cam girls", enD: "hairy cam girls", frD: "cam girls poilues", deD: "behaarte Cam Girls", esD: "cam girls peludas", itD: "cam girl pelose" },
    { s: "webcamsex-voeten", nl: "Voeten", en: "Feet", fr: "Pieds", de: "Füße", es: "Pies", it: "Piedi",
      nlD: "foot fetish cam shows", enD: "foot fetish cam shows", frD: "shows cam fétichisme des pieds", deD: "Fuß-Fetisch Cam Shows", esD: "shows cam fetiche de pies", itD: "show cam feticismo dei piedi" },
    { s: "webcamsex-outdoor", nl: "Outdoor", en: "Outdoor", fr: "Extérieur", de: "Outdoor", es: "Exterior", it: "Outdoor",
      nlD: "cam shows buiten", enD: "outdoor cam shows", frD: "shows cam en extérieur", deD: "Outdoor Cam Shows", esD: "shows cam al aire libre", itD: "show cam all'aperto" },
    { s: "webcamsex-mobiel", nl: "Mobiel", en: "Mobile", fr: "Mobile", de: "Mobil", es: "Móvil", it: "Mobile",
      nlD: "mobiele cam shows", enD: "mobile cam shows", frD: "shows cam mobiles", deD: "mobile Cam Shows", esD: "shows cam móviles", itD: "show cam mobile" },
  ].map(c => {
    const t = (lang) => ({ nl: "Webcamsex", en: "Webcam Sex", fr: "Webcam Sexe", de: "Webcam Sex", es: "Webcam Sexo", it: "Webcam Sex" }[lang]);
    const free = (lang) => ({ nl: "Gratis", en: "Free", fr: "Gratuit", de: "Gratis", es: "Gratis", it: "Gratis" }[lang]);
    const on = (lang) => ({ nl: "op StartVagina", en: "on StartVagina", fr: "sur StartVagina", de: "auf StartVagina", es: "en StartVagina", it: "su StartVagina" }[lang]);
    const noReg = (lang) => ({ nl: "zonder registratie", en: "without signup", fr: "sans inscription", de: "ohne Anmeldung", es: "sin registro", it: "senza registrazione" }[lang]);
    return {
      slugs: [c.s],
      meta: m(
        meta(`${t("nl")} ${c.nl} | StartVagina`, `${free("nl")} ${t("nl").toLowerCase()} met ${c.nlD} live op webcam ${on("nl")}. Bekijk duizenden cam shows in de categorie ${c.nl} — ${noReg("nl")}.`, `${c.s}, ${c.nl.toLowerCase()} webcamsex, ${c.nl.toLowerCase()} cam`),
        meta(`${t("en")} ${c.en} | StartVagina`, `${free("en")} ${t("en").toLowerCase()} with ${c.enD} live on webcam ${on("en")}. Watch thousands of cam shows in the ${c.en} category — ${noReg("en")}.`, `${c.s}, ${c.en.toLowerCase()} webcam sex, ${c.en.toLowerCase()} cam`),
        meta(`${t("fr")} ${c.fr} | StartVagina`, `${free("fr")} ${t("fr").toLowerCase()} avec ${c.frD} en direct sur webcam ${on("fr")}. Regardez des milliers de shows cam ${c.fr} — ${noReg("fr")}.`, `${c.fr.toLowerCase()} webcam sexe, ${c.fr.toLowerCase()} cam`),
        meta(`${t("de")} ${c.de} | StartVagina`, `${free("de")} ${t("de")} mit ${c.deD} live auf Webcam ${on("de")}. Schau dir tausende Cam Shows in der Kategorie ${c.de} an — ${noReg("de")}.`, `${c.de.toLowerCase()} webcam sex, ${c.de.toLowerCase()} cam`),
        meta(`${t("es")} ${c.es} | StartVagina`, `${free("es")} ${t("es").toLowerCase()} con ${c.esD} en vivo por webcam ${on("es")}. Mira miles de shows cam en la categoría ${c.es} — ${noReg("es")}.`, `${c.es.toLowerCase()} webcam sexo, ${c.es.toLowerCase()} cam`),
        meta(`${t("it")} ${c.it} | StartVagina`, `${free("it")} ${t("it").toLowerCase()} con ${c.itD} in diretta su webcam ${on("it")}. Guarda migliaia di show cam nella categoria ${c.it} — ${noReg("it")}.`, `${c.it.toLowerCase()} webcam sex, ${c.it.toLowerCase()} cam`),
      ),
    };
  }),

  // ---------- Language landing pages ----------
  ...[
    { s: "webcamsex-in-het-nederlands", nl: "Nederlandstalige Cam Girls", en: "Dutch Speaking Cam Girls", fr: "Cam Girls Néerlandophones", de: "Niederländisch sprechende Cam Girls", es: "Cam Girls de Habla Neerlandesa", it: "Cam Girl di Lingua Olandese" },
    { s: "english-webcam-sex-chat", nl: "Engelstalige Cam Girls", en: "English Speaking Cam Girls", fr: "Cam Girls Anglophones", de: "Englisch sprechende Cam Girls", es: "Cam Girls de Habla Inglesa", it: "Cam Girl di Lingua Inglese" },
    { s: "webcamsex-auf-deutsch", nl: "Duitstalige Cam Girls", en: "German Speaking Cam Girls", fr: "Cam Girls Germanophones", de: "Deutschsprachige Cam Girls", es: "Cam Girls de Habla Alemana", it: "Cam Girl di Lingua Tedesca" },
    { s: "webcamsex-en-francais", nl: "Franstalige Cam Girls", en: "French Speaking Cam Girls", fr: "Cam Girls Francophones", de: "Französisch sprechende Cam Girls", es: "Cam Girls de Habla Francesa", it: "Cam Girl di Lingua Francese" },
    { s: "webcamsex-en-espanol", nl: "Spaanstalige Cam Girls", en: "Spanish Speaking Cam Girls", fr: "Cam Girls Hispanophones", de: "Spanisch sprechende Cam Girls", es: "Cam Girls de Habla Hispana", it: "Cam Girl di Lingua Spagnola" },
    { s: "webcamsex-in-italiano", nl: "Italiaanstalige Cam Girls", en: "Italian Speaking Cam Girls", fr: "Cam Girls Italophones", de: "Italienisch sprechende Cam Girls", es: "Cam Girls de Habla Italiana", it: "Cam Girl di Lingua Italiana" },
    { s: "webcamsex-em-portugues", nl: "Portugeestalige Cam Girls", en: "Portuguese Speaking Cam Girls", fr: "Cam Girls Lusophones", de: "Portugiesisch sprechende Cam Girls", es: "Cam Girls de Habla Portuguesa", it: "Cam Girl di Lingua Portoghese" },
    { s: "webcamsex-na-russkom", nl: "Russischtalige Cam Girls", en: "Russian Speaking Cam Girls", fr: "Cam Girls Russophones", de: "Russisch sprechende Cam Girls", es: "Cam Girls de Habla Rusa", it: "Cam Girl di Lingua Russa" },
    { s: "japanese-webcam-sex", nl: "Japanstalige Cam Girls", en: "Japanese Speaking Cam Girls", fr: "Cam Girls Japonaises", de: "Japanisch sprechende Cam Girls", es: "Cam Girls Japonesas", it: "Cam Girl Giapponesi" },
    { s: "korean-webcam-sex", nl: "Koreaanstalige Cam Girls", en: "Korean Speaking Cam Girls", fr: "Cam Girls Coréennes", de: "Koreanisch sprechende Cam Girls", es: "Cam Girls Coreanas", it: "Cam Girl Coreane" },
  ].map(c => ({
    slugs: [c.s],
    meta: m(
      meta(`${c.nl} Live | StartVagina`, `${c.nl} live op webcam op StartVagina. Geniet van gratis webcamsex met modellen die jouw taal spreken — chat live en anoniem zonder registratie.`, `${c.s}, ${c.nl.toLowerCase()}`),
      meta(`${c.en} Live | StartVagina`, `${c.en} live on webcam on StartVagina. Enjoy free webcam sex with models who speak your language — chat live and anonymously without registration.`, `${c.s}, ${c.en.toLowerCase()}`),
      meta(`${c.fr} en Direct | StartVagina`, `${c.fr} en direct sur webcam sur StartVagina. Profitez de webcam sexe gratuit avec des modèles qui parlent votre langue — chat en direct et anonyme.`, `${c.s}, ${c.fr.toLowerCase()}`),
      meta(`${c.de} Live | StartVagina`, `${c.de} live auf Webcam auf StartVagina. Genieße gratis Webcam Sex mit Models die deine Sprache sprechen — chatte live und anonym ohne Anmeldung.`, `${c.s}, ${c.de.toLowerCase()}`),
      meta(`${c.es} en Vivo | StartVagina`, `${c.es} en vivo por webcam en StartVagina. Disfruta de webcam sexo gratis con modelos que hablan tu idioma — chat en vivo y anónimo sin registro.`, `${c.s}, ${c.es.toLowerCase()}`),
      meta(`${c.it} dal Vivo | StartVagina`, `${c.it} in diretta su webcam su StartVagina. Goditi webcam sex gratis con modelle che parlano la tua lingua — chatta dal vivo e in anonimo senza registrazione.`, `${c.s}, ${c.it.toLowerCase()}`),
    ),
  })),

  // ---------- Country landing pages ----------
  ...[
    { s: "webcamsex-nederland", nl: "Nederland", en: "Netherlands", fr: "Pays-Bas", de: "Niederlande", es: "Países Bajos", it: "Paesi Bassi", nlA: "Nederlandse", enA: "Dutch", frA: "néerlandaises", deA: "niederländische", esA: "holandesas", itA: "olandesi" },
    { s: "webcamsex-belgie", nl: "België", en: "Belgium", fr: "Belgique", de: "Belgien", es: "Bélgica", it: "Belgio", nlA: "Belgische", enA: "Belgian", frA: "belges", deA: "belgische", esA: "belgas", itA: "belghe" },
    { s: "webcamsex-duitsland", nl: "Duitsland", en: "Germany", fr: "Allemagne", de: "Deutschland", es: "Alemania", it: "Germania", nlA: "Duitse", enA: "German", frA: "allemandes", deA: "deutsche", esA: "alemanas", itA: "tedesche" },
    { s: "webcamsex-colombia", nl: "Colombia", en: "Colombia", fr: "Colombie", de: "Kolumbien", es: "Colombia", it: "Colombia", nlA: "Colombiaanse", enA: "Colombian", frA: "colombiennes", deA: "kolumbianische", esA: "colombianas", itA: "colombiane" },
    { s: "webcamsex-roemenie", nl: "Roemenië", en: "Romania", fr: "Roumanie", de: "Rumänien", es: "Rumanía", it: "Romania", nlA: "Roemeense", enA: "Romanian", frA: "roumaines", deA: "rumänische", esA: "rumanas", itA: "rumene" },
    { s: "webcamsex-italie", nl: "Italië", en: "Italy", fr: "Italie", de: "Italien", es: "Italia", it: "Italia", nlA: "Italiaanse", enA: "Italian", frA: "italiennes", deA: "italienische", esA: "italianas", itA: "italiane" },
    { s: "webcamsex-spanje", nl: "Spanje", en: "Spain", fr: "Espagne", de: "Spanien", es: "España", it: "Spagna", nlA: "Spaanse", enA: "Spanish", frA: "espagnoles", deA: "spanische", esA: "españolas", itA: "spagnole" },
    { s: "webcamsex-frankrijk", nl: "Frankrijk", en: "France", fr: "France", de: "Frankreich", es: "Francia", it: "Francia", nlA: "Franse", enA: "French", frA: "françaises", deA: "französische", esA: "francesas", itA: "francesi" },
    { s: "webcamsex-verenigd-koninkrijk", nl: "VK", en: "United Kingdom", fr: "Royaume-Uni", de: "Vereinigtes Königreich", es: "Reino Unido", it: "Regno Unito", nlA: "Britse", enA: "British", frA: "britanniques", deA: "britische", esA: "británicas", itA: "britanniche" },
    { s: "webcamsex-verenigde-staten", nl: "VS", en: "United States", fr: "États-Unis", de: "USA", es: "Estados Unidos", it: "Stati Uniti", nlA: "Amerikaanse", enA: "American", frA: "américaines", deA: "amerikanische", esA: "americanas", itA: "americane" },
    { s: "webcamsex-rusland", nl: "Rusland", en: "Russia", fr: "Russie", de: "Russland", es: "Rusia", it: "Russia", nlA: "Russische", enA: "Russian", frA: "russes", deA: "russische", esA: "rusas", itA: "russe" },
    { s: "webcamsex-oekraine", nl: "Oekraïne", en: "Ukraine", fr: "Ukraine", de: "Ukraine", es: "Ucrania", it: "Ucraina", nlA: "Oekraïense", enA: "Ukrainian", frA: "ukrainiennes", deA: "ukrainische", esA: "ucranianas", itA: "ucraine" },
    { s: "webcamsex-brazilie", nl: "Brazilië", en: "Brazil", fr: "Brésil", de: "Brasilien", es: "Brasil", it: "Brasile", nlA: "Braziliaanse", enA: "Brazilian", frA: "brésiliennes", deA: "brasilianische", esA: "brasileñas", itA: "brasiliane" },
    { s: "webcamsex-japan", nl: "Japan", en: "Japan", fr: "Japon", de: "Japan", es: "Japón", it: "Giappone", nlA: "Japanse", enA: "Japanese", frA: "japonaises", deA: "japanische", esA: "japonesas", itA: "giapponesi" },
    { s: "webcamsex-polen", nl: "Polen", en: "Poland", fr: "Pologne", de: "Polen", es: "Polonia", it: "Polonia", nlA: "Poolse", enA: "Polish", frA: "polonaises", deA: "polnische", esA: "polacas", itA: "polacche" },
    { s: "webcamsex-mexico", nl: "Mexico", en: "Mexico", fr: "Mexique", de: "Mexiko", es: "México", it: "Messico", nlA: "Mexicaanse", enA: "Mexican", frA: "mexicaines", deA: "mexikanische", esA: "mexicanas", itA: "messicane" },
    { s: "webcamsex-tsjechie", nl: "Tsjechië", en: "Czech Republic", fr: "République tchèque", de: "Tschechien", es: "República Checa", it: "Repubblica Ceca", nlA: "Tsjechische", enA: "Czech", frA: "tchèques", deA: "tschechische", esA: "checas", itA: "ceche" },
    { s: "webcamsex-filipijnen", nl: "Filipijnen", en: "Philippines", fr: "Philippines", de: "Philippinen", es: "Filipinas", it: "Filippine", nlA: "Filipijnse", enA: "Filipina", frA: "philippines", deA: "philippinische", esA: "filipinas", itA: "filippine" },
    { s: "webcamsex-thailand", nl: "Thailand", en: "Thailand", fr: "Thaïlande", de: "Thailand", es: "Tailandia", it: "Thailandia", nlA: "Thaise", enA: "Thai", frA: "thaïlandaises", deA: "thailändische", esA: "tailandesas", itA: "thailandesi" },
  ].map(c => ({
    slugs: [c.s],
    meta: m(
      meta(`Webcamsex ${c.nl} | StartVagina`, `${c.nlA} cam girls live op webcam op StartVagina. Geniet van gratis webcamsex met de mooiste modellen uit ${c.nl} op Chaturbate, Stripchat en CAM4.`, `webcamsex ${c.nl.toLowerCase()}, ${c.nlA.toLowerCase()} cam girls`),
      meta(`Webcam Sex ${c.en} | StartVagina`, `${c.enA} cam girls live on webcam on StartVagina. Enjoy free webcam sex with the hottest models from ${c.en} on Chaturbate, Stripchat and CAM4.`, `webcam sex ${c.en.toLowerCase()}, ${c.enA.toLowerCase()} cam girls`),
      meta(`Webcam Sexe ${c.fr} | StartVagina`, `Cam girls ${c.frA} en direct sur webcam sur StartVagina. Webcam sexe gratuit avec les plus belles modèles de ${c.fr} sur Chaturbate, Stripchat et CAM4.`, `webcam sexe ${c.fr.toLowerCase()}, cam girls ${c.frA}`),
      meta(`Webcam Sex ${c.de} | StartVagina`, `${c.deA} Cam Girls live auf Webcam auf StartVagina. Gratis Webcam Sex mit den schönsten Models aus ${c.de} auf Chaturbate, Stripchat und CAM4.`, `webcam sex ${c.de.toLowerCase()}, ${c.deA} cam girls`),
      meta(`Webcam Sexo ${c.es} | StartVagina`, `Cam girls ${c.esA} en vivo por webcam en StartVagina. Webcam sexo gratis con las mejores modelos de ${c.es} en Chaturbate, Stripchat y CAM4.`, `webcam sexo ${c.es.toLowerCase()}, cam girls ${c.esA}`),
      meta(`Webcam Sex ${c.it} | StartVagina`, `Cam girl ${c.itA} in diretta su webcam su StartVagina. Webcam sex gratis con le migliori modelle da ${c.it} su Chaturbate, Stripchat e CAM4.`, `webcam sex ${c.it.toLowerCase()}, cam girl ${c.itA}`),
    ),
  })),
];

// ============================================================
// HTML injection
// ============================================================

function buildMetaTags(slug, pageMeta) {
  const canonical = slug ? `${BASE}/${slug}` : BASE;
  const tags = [];

  tags.push(`<title>${escapeHtml(pageMeta.title)}</title>`);
  tags.push(`<meta name="description" content="${escapeAttr(pageMeta.description)}">`);
  tags.push(`<meta name="keywords" content="${escapeAttr(pageMeta.keywords)}">`);
  tags.push(`<meta name="robots" content="index, follow">`);
  tags.push(`<link rel="canonical" href="${canonical}">`);
  tags.push(`<meta property="og:title" content="${escapeAttr(pageMeta.title)}">`);
  tags.push(`<meta property="og:description" content="${escapeAttr(pageMeta.description)}">`);
  tags.push(`<meta property="og:type" content="website">`);
  tags.push(`<meta property="og:url" content="${canonical}">`);
  tags.push(`<meta property="og:site_name" content="StartVagina">`);
  tags.push(`<meta property="og:image" content="${BASE}/og-image.png">`);
  tags.push(`<meta name="twitter:card" content="summary_large_image">`);
  tags.push(`<meta name="twitter:title" content="${escapeAttr(pageMeta.title)}">`);
  tags.push(`<meta name="twitter:description" content="${escapeAttr(pageMeta.description)}">`);
  tags.push(`<meta name="twitter:image" content="${BASE}/og-image.png">`);

  // Hreflang
  const baseSlug = slug.replace(/^(en|fr|de|es|it)\//, "").replace(/^(en|fr|de|es|it)$/, "");
  for (const lang of langs) {
    const prefix = langPrefixes[lang];
    const href = baseSlug ? `${BASE}${prefix}/${baseSlug}` : `${BASE}${prefix || ""}`;
    tags.push(`<link rel="alternate" hreflang="${lang}" href="${href}">`);
  }
  tags.push(`<link rel="alternate" hreflang="x-default" href="${baseSlug ? `${BASE}/${baseSlug}` : BASE}">`);

  // JSON-LD
  if (pageMeta.faq && pageMeta.faq.length > 0) {
    tags.push(`<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: pageMeta.faq.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) })}</script>`);
  } else if (pageMeta.schema) {
    tags.push(`<script type="application/ld+json">${JSON.stringify(pageMeta.schema)}</script>`);
  }

  return tags.join("\n    ");
}

function escapeHtml(str) { return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function escapeAttr(str) { return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

function injectMeta(htmlTemplate, metaTags) {
  let html = htmlTemplate.replace(/<title>[^<]*<\/title>/, "");
  return html.replace("</head>", `    ${metaTags}\n</head>`);
}

function writePage(slug, html) {
  let outPath;
  if (!slug) {
    outPath = join(DIST, "index.html");
  } else {
    const dir = join(DIST, slug);
    mkdirSync(dir, { recursive: true });
    outPath = join(dir, "index.html");
  }
  writeFileSync(outPath, html, "utf-8");
}

// ============================================================
// Generate
// ============================================================

console.log("\n🔍 Pre-rendering SEO meta tags (multilingual)...\n");

let count = 0;

for (const page of pages) {
  for (const baseSlug of page.slugs) {
    for (const lang of langs) {
      const prefix = langPrefixes[lang];
      let fullSlug;
      if (!baseSlug && !prefix) fullSlug = "";
      else if (!baseSlug) fullSlug = prefix.slice(1);
      else if (!prefix) fullSlug = baseSlug;
      else fullSlug = `${prefix.slice(1)}/${baseSlug}`;

      const pageMeta = page.meta[lang];
      const metaTags = buildMetaTags(fullSlug, pageMeta);
      const html = injectMeta(template, metaTags);
      writePage(fullSlug, html);
      count++;
    }
  }
}

console.log(`✅ Pre-rendered ${count} pages with multilingual SEO meta tags`);
console.log(`📁 Output: ${DIST}\n`);
