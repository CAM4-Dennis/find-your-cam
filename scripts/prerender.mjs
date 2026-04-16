/**
 * Lightweight SEO pre-render script — NO browser needed.
 * Injects language-specific meta tags per route.
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "..", "dist");
const BASE = "https://startvagina.nl";
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
      meta("StartVagina — Gratis Webcamsex & Live Sex Cams Nederland België", "StartVagina is dé zoekmachine voor gratis webcamsex en live sex cams. Bekijk duizenden cam girls, sexchat en erotische webcam shows van Nederlandse en Belgische modellen.", "webcamsex, live sex cams, gratis webcam, sexchat, cam girls", null, { "@context": "https://schema.org", "@type": "WebSite", name: "StartVagina", url: BASE, inLanguage: "nl" }),
      meta("StartVagina — Free Webcam Sex & Live Sex Cams", "StartVagina is the ultimate search engine for free webcam sex and live sex cams. Watch thousands of cam girls, sex chat and erotic webcam shows live.", "webcam sex, live sex cams, free webcam, sex chat, cam girls", null, { "@context": "https://schema.org", "@type": "WebSite", name: "StartVagina", url: BASE, inLanguage: "en" }),
      meta("StartVagina — Webcam Sexe Gratuit & Cams en Direct", "StartVagina est le moteur de recherche ultime pour le webcam sexe gratuit et les cams en direct. Regardez des milliers de cam girls en direct.", "webcam sexe, cams en direct, webcam gratuit, chat sexe, cam girls", null, { "@context": "https://schema.org", "@type": "WebSite", name: "StartVagina", url: BASE, inLanguage: "fr" }),
      meta("StartVagina — Gratis Webcam Sex & Live Sex Cams", "StartVagina ist die ultimative Suchmaschine für gratis Webcam Sex und Live Sex Cams. Schau dir tausende Cam Girls live an.", "webcam sex, live sex cams, gratis webcam, sexchat, cam girls", null, { "@context": "https://schema.org", "@type": "WebSite", name: "StartVagina", url: BASE, inLanguage: "de" }),
      meta("StartVagina — Webcam Sexo Gratis & Cams en Vivo", "StartVagina es el buscador definitivo de webcam sexo gratis y cams en vivo. Mira miles de cam girls en directo.", "webcam sexo, cams en vivo, webcam gratis, chat sexual, cam girls", null, { "@context": "https://schema.org", "@type": "WebSite", name: "StartVagina", url: BASE, inLanguage: "es" }),
      meta("StartVagina — Webcam Sex Gratis & Cam dal Vivo", "StartVagina è il motore di ricerca definitivo per webcam sex gratis e cam dal vivo. Guarda migliaia di cam girl in diretta.", "webcam sex, cam dal vivo, webcam gratis, chat erotica, cam girl", null, { "@context": "https://schema.org", "@type": "WebSite", name: "StartVagina", url: BASE, inLanguage: "it" }),
    ),
  },

  // ---------- Core pages ----------
  {
    slugs: ["categories"],
    meta: m(
      meta("Webcamsex Categorieën — Alle Cam Categorieën | StartVagina", "Bekijk alle webcamsex categorieën. Van teen tot mature, MILF tot BDSM. Vind jouw favoriete categorie cam girls.", "webcamsex categorieën, cam categorieën"),
      meta("Webcam Sex Categories — All Cam Categories | StartVagina", "Browse all webcam sex categories. From teen to mature, MILF to BDSM. Find your favourite category of cam girls.", "webcam sex categories, cam categories"),
      meta("Catégories Webcam Sexe — Toutes les Catégories | StartVagina", "Parcourez toutes les catégories de webcam sexe. De teen à mature, MILF à BDSM. Trouvez votre catégorie préférée.", "catégories webcam sexe, catégories cam"),
      meta("Webcam Sex Kategorien — Alle Cam Kategorien | StartVagina", "Durchsuche alle Webcam Sex Kategorien. Von Teen bis Mature, MILF bis BDSM. Finde deine Lieblingskategorie.", "webcam sex kategorien, cam kategorien"),
      meta("Categorías Webcam Sexo — Todas las Categorías | StartVagina", "Explora todas las categorías de webcam sexo. De teen a mature, MILF a BDSM. Encuentra tu categoría favorita.", "categorías webcam sexo, categorías cam"),
      meta("Categorie Webcam Sex — Tutte le Categorie | StartVagina", "Sfoglia tutte le categorie di webcam sex. Da teen a mature, MILF a BDSM. Trova la tua categoria preferita.", "categorie webcam sex, categorie cam"),
    ),
  },
  {
    slugs: ["countries"],
    meta: m(
      meta("Webcamsex per Land — Cam Girls uit Alle Landen | StartVagina", "Ontdek cam girls per land. Nederlandse, Belgische, Colombiaanse en meer webcam modellen live.", "webcamsex landen, cam girls landen"),
      meta("Webcam Sex by Country — Cam Girls from All Countries | StartVagina", "Discover cam girls by country. Dutch, Belgian, Colombian and more webcam models live.", "webcam sex countries, cam girls countries"),
      meta("Webcam Sexe par Pays — Cam Girls de Tous les Pays | StartVagina", "Découvrez des cam girls par pays. Modèles néerlandaises, belges, colombiennes et plus en direct.", "webcam sexe pays, cam girls pays"),
      meta("Webcam Sex nach Land — Cam Girls aus Allen Ländern | StartVagina", "Entdecke Cam Girls nach Land. Niederländische, belgische, kolumbianische und mehr Models live.", "webcam sex länder, cam girls länder"),
      meta("Webcam Sexo por País — Cam Girls de Todos los Países | StartVagina", "Descubre cam girls por país. Modelos holandesas, belgas, colombianas y más en vivo.", "webcam sexo países, cam girls países"),
      meta("Webcam Sex per Paese — Cam Girl da Tutti i Paesi | StartVagina", "Scopri cam girl per paese. Modelle olandesi, belghe, colombiane e altre dal vivo.", "webcam sex paesi, cam girl paesi"),
    ),
  },
  {
    slugs: ["languages"],
    meta: m(
      meta("Webcamsex per Taal — Cam Girls in Jouw Taal | StartVagina", "Vind cam girls die jouw taal spreken. Webcamsex in het Nederlands, Engels, Duits en meer.", "webcamsex taal, cam girls taal"),
      meta("Webcam Sex by Language — Cam Girls in Your Language | StartVagina", "Find cam girls who speak your language. Webcam sex in English, Dutch, German and more.", "webcam sex language, cam girls language"),
      meta("Webcam Sexe par Langue — Cam Girls dans Votre Langue | StartVagina", "Trouvez des cam girls qui parlent votre langue. Webcam sexe en français, anglais et plus.", "webcam sexe langue, cam girls langue"),
      meta("Webcam Sex nach Sprache — Cam Girls in Deiner Sprache | StartVagina", "Finde Cam Girls die deine Sprache sprechen. Webcam Sex auf Deutsch, Englisch und mehr.", "webcam sex sprache, cam girls sprache"),
      meta("Webcam Sexo por Idioma — Cam Girls en Tu Idioma | StartVagina", "Encuentra cam girls que hablan tu idioma. Webcam sexo en español, inglés y más.", "webcam sexo idioma, cam girls idioma"),
      meta("Webcam Sex per Lingua — Cam Girl nella Tua Lingua | StartVagina", "Trova cam girl che parlano la tua lingua. Webcam sex in italiano, inglese e altro.", "webcam sex lingua, cam girl lingua"),
    ),
  },
  {
    slugs: ["new"],
    meta: m(
      meta("Nieuwe Webcam Modellen — Verse Cam Girls | StartVagina", "Ontdek de nieuwste cam modellen die net begonnen zijn met streamen. Verse gezichten, nieuwe shows.", "nieuwe cam modellen, nieuwe cam girls"),
      meta("New Webcam Models — Fresh Cam Girls | StartVagina", "Discover the newest webcam models who just started streaming. Fresh faces, new shows.", "new cam models, new cam girls"),
      meta("Nouveaux Modèles Webcam — Nouvelles Cam Girls | StartVagina", "Découvrez les derniers modèles webcam qui viennent de commencer à streamer. Nouveaux visages, nouveaux shows.", "nouveaux modèles webcam, nouvelles cam girls"),
      meta("Neue Webcam Models — Frische Cam Girls | StartVagina", "Entdecke die neuesten Webcam Models die gerade angefangen haben. Frische Gesichter, neue Shows.", "neue cam models, neue cam girls"),
      meta("Nuevas Modelos Webcam — Cam Girls Nuevas | StartVagina", "Descubre las modelos webcam más nuevas que acaban de empezar. Caras nuevas, shows nuevos.", "nuevas modelos webcam, nuevas cam girls"),
      meta("Nuove Modelle Webcam — Cam Girl Nuove | StartVagina", "Scopri le modelle webcam più recenti che hanno appena iniziato. Volti nuovi, show nuovi.", "nuove modelle webcam, nuove cam girl"),
    ),
  },
  {
    slugs: ["top"],
    meta: m(
      meta("Top Cam Girls — Populairste Webcam Modellen | StartVagina", "De populairste en best bekeken cam girls live op webcam. Top modellen van alle platforms.", "top cam girls, populaire cam modellen"),
      meta("Top Cam Girls — Most Popular Webcam Models | StartVagina", "The most popular and most viewed cam girls live on webcam. Top models from all platforms.", "top cam girls, popular cam models"),
      meta("Top Cam Girls — Modèles Webcam les Plus Populaires | StartVagina", "Les cam girls les plus populaires et les plus regardées en direct. Top modèles de toutes les plateformes.", "top cam girls, modèles populaires"),
      meta("Top Cam Girls — Beliebteste Webcam Models | StartVagina", "Die beliebtesten und meistgesehenen Cam Girls live auf Webcam. Top Models aller Plattformen.", "top cam girls, beliebte cam models"),
      meta("Top Cam Girls — Modelos Webcam Más Populares | StartVagina", "Las cam girls más populares y más vistas en vivo por webcam. Top modelos de todas las plataformas.", "top cam girls, modelos populares"),
      meta("Top Cam Girl — Modelle Webcam Più Popolari | StartVagina", "Le cam girl più popolari e più viste in diretta su webcam. Top modelle da tutte le piattaforme.", "top cam girl, modelle popolari"),
    ),
  },
  {
    slugs: ["blog"],
    meta: m(
      meta("Blog — StartVagina", "Lees het laatste nieuws, tips en achtergronden over webcamsex en live cam shows.", "webcamsex blog, cam blog"),
      meta("Blog — StartVagina", "Read the latest news, tips and backgrounds about webcam sex and live cam shows.", "webcam sex blog, cam blog"),
      meta("Blog — StartVagina", "Lisez les dernières nouvelles, conseils et articles sur le webcam sexe et les shows cam en direct.", "webcam sexe blog, cam blog"),
      meta("Blog — StartVagina", "Lies die neuesten Nachrichten, Tipps und Hintergründe über Webcam Sex und Live Cam Shows.", "webcam sex blog, cam blog"),
      meta("Blog — StartVagina", "Lee las últimas noticias, consejos y artículos sobre webcam sexo y shows cam en vivo.", "webcam sexo blog, cam blog"),
      meta("Blog — StartVagina", "Leggi le ultime notizie, consigli e approfondimenti su webcam sex e show cam dal vivo.", "webcam sex blog, cam blog"),
    ),
  },

  // ---------- Keyword landing pages ----------
  {
    slugs: ["webcamsex"],
    meta: m(
      meta("Webcamsex — Gratis Live Webcam Sex Kijken | StartVagina", "Gratis webcamsex kijken met duizenden cam girls live online. De beste webcam sex van Nederland en België op één plek.", "webcamsex, webcam sex, gratis webcamsex"),
      meta("Webcam Sex — Free Live Webcam Sex | StartVagina", "Watch free webcam sex with thousands of cam girls live online. The best webcam sex from all platforms in one place.", "webcam sex, free webcam sex, live webcam sex"),
      meta("Webcam Sexe — Webcam Sexe Gratuit en Direct | StartVagina", "Regardez du webcam sexe gratuit avec des milliers de cam girls en direct. Le meilleur du webcam sexe sur une seule page.", "webcam sexe, webcam sexe gratuit, cam sexe"),
      meta("Webcam Sex — Gratis Live Webcam Sex | StartVagina", "Gratis Webcam Sex schauen mit tausenden Cam Girls live online. Der beste Webcam Sex aller Plattformen an einem Ort.", "webcam sex, gratis webcam sex, live webcam sex"),
      meta("Webcam Sexo — Webcam Sexo Gratis en Vivo | StartVagina", "Mira webcam sexo gratis con miles de cam girls en vivo. El mejor webcam sexo de todas las plataformas en un lugar.", "webcam sexo, webcam sexo gratis, cam sexo"),
      meta("Webcam Sex — Webcam Sex Gratis dal Vivo | StartVagina", "Guarda webcam sex gratis con migliaia di cam girl in diretta. Il meglio del webcam sex da tutte le piattaforme.", "webcam sex, webcam sex gratis, cam sex"),
    ),
  },
  {
    slugs: ["gratis-webcam-sex"],
    meta: m(
      meta("Gratis Webcam Sex — Live Cam Girls Zonder te Betalen | StartVagina", "Gratis webcam sex kijken met de mooiste cam girls. Geen creditcard nodig, geen registratie.", "gratis webcam sex, gratis cam, gratis sexcam"),
      meta("Free Webcam Sex — Live Cam Girls Without Paying | StartVagina", "Watch free webcam sex with the most beautiful cam girls. No credit card needed, no registration.", "free webcam sex, free cam, free sex cam"),
      meta("Webcam Sexe Gratuit — Cam Girls en Direct Sans Payer | StartVagina", "Regardez du webcam sexe gratuit avec les plus belles cam girls. Sans carte de crédit, sans inscription.", "webcam sexe gratuit, cam gratuit"),
      meta("Gratis Webcam Sex — Live Cam Girls Ohne zu Bezahlen | StartVagina", "Gratis Webcam Sex schauen mit den schönsten Cam Girls. Keine Kreditkarte nötig, keine Registrierung.", "gratis webcam sex, gratis cam, kostenlos webcam sex"),
      meta("Webcam Sexo Gratis — Cam Girls en Vivo Sin Pagar | StartVagina", "Mira webcam sexo gratis con las cam girls más hermosas. Sin tarjeta de crédito, sin registro.", "webcam sexo gratis, cam gratis"),
      meta("Webcam Sex Gratis — Cam Girl dal Vivo Senza Pagare | StartVagina", "Guarda webcam sex gratis con le cam girl più belle. Nessuna carta di credito, nessuna registrazione.", "webcam sex gratis, cam gratis"),
    ),
  },
  {
    slugs: ["sexchat"],
    meta: m(
      meta("Sexchat — Live Sex Chat met Cam Girls | StartVagina", "Live sexchat met cam girls. Chat gratis met webcam modellen op Chaturbate, Stripchat en meer.", "sexchat, sex chat, live sexchat"),
      meta("Sex Chat — Live Sex Chat with Cam Girls | StartVagina", "Live sex chat with cam girls. Chat for free with webcam models on Chaturbate, Stripchat and more.", "sex chat, live sex chat, cam chat"),
      meta("Chat Sexe — Chat Sexe en Direct avec Cam Girls | StartVagina", "Chat sexe en direct avec des cam girls. Chattez gratuitement avec des modèles webcam.", "chat sexe, chat sexe en direct"),
      meta("Sexchat — Live Sex Chat mit Cam Girls | StartVagina", "Live Sexchat mit Cam Girls. Chatte kostenlos mit Webcam Models auf Chaturbate, Stripchat und mehr.", "sexchat, sex chat, live sexchat"),
      meta("Chat Sexual — Chat Sexual en Vivo con Cam Girls | StartVagina", "Chat sexual en vivo con cam girls. Chatea gratis con modelos webcam.", "chat sexual, chat sexual en vivo"),
      meta("Chat Erotica — Chat Erotica dal Vivo con Cam Girl | StartVagina", "Chat erotica dal vivo con cam girl. Chatta gratis con modelle webcam.", "chat erotica, chat erotica dal vivo"),
    ),
  },
  {
    slugs: ["cam-girls"],
    meta: m(
      meta("Cam Girls — Live Webcam Meisjes Kijken | StartVagina", "Bekijk de mooiste cam girls live op webcam. Duizenden webcam meisjes van alle platforms op één plek.", "cam girls, webcam meisjes, cam meisjes"),
      meta("Cam Girls — Watch Live Webcam Girls | StartVagina", "Watch the most beautiful cam girls live on webcam. Thousands of webcam girls from all platforms in one place.", "cam girls, webcam girls, live cam girls"),
      meta("Cam Girls — Regarder des Cam Girls en Direct | StartVagina", "Regardez les plus belles cam girls en direct sur webcam. Des milliers de cam girls de toutes les plateformes.", "cam girls, webcam girls, cam girls en direct"),
      meta("Cam Girls — Live Webcam Girls Ansehen | StartVagina", "Schau dir die schönsten Cam Girls live auf Webcam an. Tausende Webcam Girls aller Plattformen an einem Ort.", "cam girls, webcam girls, live cam girls"),
      meta("Cam Girls — Ver Cam Girls en Vivo | StartVagina", "Mira las cam girls más hermosas en vivo por webcam. Miles de cam girls de todas las plataformas.", "cam girls, webcam girls, cam girls en vivo"),
      meta("Cam Girl — Guarda Cam Girl dal Vivo | StartVagina", "Guarda le cam girl più belle in diretta su webcam. Migliaia di cam girl da tutte le piattaforme.", "cam girl, webcam girl, cam girl dal vivo"),
    ),
  },
  {
    slugs: ["live-sex-cams"],
    meta: m(
      meta("Live Sex Cams — Gratis Live Cam Shows | StartVagina", "Gratis live sex cams kijken. Duizenden modellen live op Chaturbate, Stripchat, BongaCams en CAM4.", "live sex cams, live cam, live sex"),
      meta("Live Sex Cams — Free Live Cam Shows | StartVagina", "Watch free live sex cams. Thousands of models live on Chaturbate, Stripchat, BongaCams and CAM4.", "live sex cams, live cam, free live cams"),
      meta("Cams en Direct — Shows Cam Gratuits en Direct | StartVagina", "Regardez des cams en direct gratuitement. Des milliers de modèles en direct sur Chaturbate, Stripchat et plus.", "cams en direct, cam en direct, cam gratuit"),
      meta("Live Sex Cams — Gratis Live Cam Shows | StartVagina", "Gratis Live Sex Cams schauen. Tausende Models live auf Chaturbate, Stripchat, BongaCams und CAM4.", "live sex cams, live cam, gratis live cams"),
      meta("Cams en Vivo — Shows Cam Gratis en Directo | StartVagina", "Mira cams en vivo gratis. Miles de modelos en directo en Chaturbate, Stripchat, BongaCams y CAM4.", "cams en vivo, cam en vivo, cam gratis"),
      meta("Cam dal Vivo — Show Cam Gratis in Diretta | StartVagina", "Guarda cam dal vivo gratis. Migliaia di modelle in diretta su Chaturbate, Stripchat, BongaCams e CAM4.", "cam dal vivo, cam in diretta, cam gratis"),
    ),
  },

  // ---------- Platform landing pages ----------
  ...["cam4", "chaturbate", "bongacams", "stripchat"].map(p => { // xcams temporarily disabled
    const name = { cam4: "CAM4", chaturbate: "Chaturbate", bongacams: "BongaCams", stripchat: "Stripchat" }[p];
    return {
      slugs: [`live-sex-cams-${p}`],
      meta: m(
        meta(`Live Sex Cams ${name} — Gratis ${name} Webcamsex | StartVagina`, `Bekijk gratis live sex cams van ${name} op StartVagina. Duizenden ${name} modellen live online.`, `${p}, ${p} live, ${p} webcamsex`),
        meta(`Live Sex Cams ${name} — Free ${name} Webcam Sex | StartVagina`, `Watch free live sex cams from ${name} on StartVagina. Thousands of ${name} models live online.`, `${p}, ${p} live, ${p} webcam sex`),
        meta(`Cams en Direct ${name} — ${name} Webcam Sexe Gratuit | StartVagina`, `Regardez des cams en direct de ${name} gratuitement. Des milliers de modèles ${name} en direct.`, `${p}, ${p} en direct, ${p} webcam sexe`),
        meta(`Live Sex Cams ${name} — Gratis ${name} Webcam Sex | StartVagina`, `Schau dir gratis Live Sex Cams von ${name} an. Tausende ${name} Models live online.`, `${p}, ${p} live, ${p} webcam sex`),
        meta(`Cams en Vivo ${name} — ${name} Webcam Sexo Gratis | StartVagina`, `Mira cams en vivo de ${name} gratis. Miles de modelos ${name} en directo.`, `${p}, ${p} en vivo, ${p} webcam sexo`),
        meta(`Cam dal Vivo ${name} — ${name} Webcam Sex Gratis | StartVagina`, `Guarda cam dal vivo di ${name} gratis. Migliaia di modelle ${name} in diretta.`, `${p}, ${p} dal vivo, ${p} webcam sex`),
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
    const live = (lang) => ({ nl: "Live", en: "Live", fr: "en Direct", de: "Live", es: "en Vivo", it: "dal Vivo" }[lang]);
    const free = (lang) => ({ nl: "Gratis", en: "Free", fr: "Gratuit", de: "Gratis", es: "Gratis", it: "Gratis" }[lang]);
    return {
      slugs: [c.s],
      meta: m(
        meta(`${t("nl")} ${c.nl} — ${c.nl} Cam Girls ${live("nl")} | StartVagina`, `${free("nl")} ${t("nl").toLowerCase()} met ${c.nlD} live op webcam.`, `${c.s}, ${c.nl.toLowerCase()} webcamsex, ${c.nl.toLowerCase()} cam`),
        meta(`${t("en")} ${c.en} — ${c.en} Cam Girls ${live("en")} | StartVagina`, `${free("en")} ${t("en").toLowerCase()} with ${c.enD} live on webcam.`, `${c.s}, ${c.en.toLowerCase()} webcam sex, ${c.en.toLowerCase()} cam`),
        meta(`${t("fr")} ${c.fr} — Cam Girls ${c.fr} ${live("fr")} | StartVagina`, `${free("fr")} ${t("fr").toLowerCase()} avec ${c.frD} en direct sur webcam.`, `${c.fr.toLowerCase()} webcam sexe, ${c.fr.toLowerCase()} cam`),
        meta(`${t("de")} ${c.de} — ${c.de} Cam Girls ${live("de")} | StartVagina`, `${free("de")} ${t("de")} mit ${c.deD} live auf Webcam.`, `${c.de.toLowerCase()} webcam sex, ${c.de.toLowerCase()} cam`),
        meta(`${t("es")} ${c.es} — Cam Girls ${c.es} ${live("es")} | StartVagina`, `${free("es")} ${t("es").toLowerCase()} con ${c.esD} en vivo por webcam.`, `${c.es.toLowerCase()} webcam sexo, ${c.es.toLowerCase()} cam`),
        meta(`${t("it")} ${c.it} — Cam Girl ${c.it} ${live("it")} | StartVagina`, `${free("it")} ${t("it").toLowerCase()} con ${c.itD} in diretta su webcam.`, `${c.it.toLowerCase()} webcam sex, ${c.it.toLowerCase()} cam`),
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
      meta(`${c.nl} Live | StartVagina`, `${c.nl} live op webcam. Gratis webcamsex in de taal van je keuze.`, `${c.s}, ${c.nl.toLowerCase()}`),
      meta(`${c.en} Live | StartVagina`, `${c.en} live on webcam. Free webcam sex in your chosen language.`, `${c.s}, ${c.en.toLowerCase()}`),
      meta(`${c.fr} en Direct | StartVagina`, `${c.fr} en direct sur webcam. Webcam sexe gratuit dans la langue de votre choix.`, `${c.s}, ${c.fr.toLowerCase()}`),
      meta(`${c.de} Live | StartVagina`, `${c.de} live auf Webcam. Gratis Webcam Sex in der Sprache deiner Wahl.`, `${c.s}, ${c.de.toLowerCase()}`),
      meta(`${c.es} en Vivo | StartVagina`, `${c.es} en vivo por webcam. Webcam sexo gratis en el idioma que prefieras.`, `${c.s}, ${c.es.toLowerCase()}`),
      meta(`${c.it} dal Vivo | StartVagina`, `${c.it} in diretta su webcam. Webcam sex gratis nella lingua che preferisci.`, `${c.s}, ${c.it.toLowerCase()}`),
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
      meta(`Webcamsex ${c.nl} — ${c.nlA} Cam Girls Live | StartVagina`, `${c.nlA} cam girls live op webcam. Gratis webcamsex met modellen uit ${c.nl}.`, `webcamsex ${c.nl.toLowerCase()}, ${c.nlA.toLowerCase()} cam girls`),
      meta(`Webcam Sex ${c.en} — ${c.enA} Cam Girls Live | StartVagina`, `${c.enA} cam girls live on webcam. Free webcam sex with models from ${c.en}.`, `webcam sex ${c.en.toLowerCase()}, ${c.enA.toLowerCase()} cam girls`),
      meta(`Webcam Sexe ${c.fr} — Cam Girls ${c.frA} en Direct | StartVagina`, `Cam girls ${c.frA} en direct sur webcam. Webcam sexe gratuit avec des modèles de ${c.fr}.`, `webcam sexe ${c.fr.toLowerCase()}, cam girls ${c.frA}`),
      meta(`Webcam Sex ${c.de} — ${c.deA} Cam Girls Live | StartVagina`, `${c.deA} Cam Girls live auf Webcam. Gratis Webcam Sex mit Models aus ${c.de}.`, `webcam sex ${c.de.toLowerCase()}, ${c.deA} cam girls`),
      meta(`Webcam Sexo ${c.es} — Cam Girls ${c.esA} en Vivo | StartVagina`, `Cam girls ${c.esA} en vivo por webcam. Webcam sexo gratis con modelos de ${c.es}.`, `webcam sexo ${c.es.toLowerCase()}, cam girls ${c.esA}`),
      meta(`Webcam Sex ${c.it} — Cam Girl ${c.itA} dal Vivo | StartVagina`, `Cam girl ${c.itA} in diretta su webcam. Webcam sex gratis con modelle da ${c.it}.`, `webcam sex ${c.it.toLowerCase()}, cam girl ${c.itA}`),
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
