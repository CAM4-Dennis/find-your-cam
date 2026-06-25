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

const NOINDEX_LANGS = ["fr", "de", "es", "it"];

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
      meta("StartVagina — Gratis Webcamsex & Live Sex Cams", "StartVagina is dé zoekmachine voor gratis webcamsex en live sex cams. Bekijk duizenden cam girls, sexchat en erotische webcam shows van Nederlandse en Belgische modellen.", "webcamsex, live sex cams, gratis webcam, sexchat, cam girls", null, { "@context": "https://schema.org", "@type": "WebSite", name: "StartVagina", url: BASE, inLanguage: "nl", potentialAction: { "@type": "SearchAction", target: `${BASE}/?q={search_term_string}`, "query-input": "required name=search_term_string" } }),
      meta("StartVagina — Free Webcam Sex & Live Sex Cams", "StartVagina is the ultimate search engine for free webcam sex and live sex cams. Watch thousands of cam girls, enjoy sex chat and erotic webcam shows live — no signup required.", "webcam sex, live sex cams, free webcam, sex chat, cam girls", null, { "@context": "https://schema.org", "@type": "WebSite", name: "StartVagina", url: BASE, inLanguage: "en", potentialAction: { "@type": "SearchAction", target: `${BASE}/en/?q={search_term_string}`, "query-input": "required name=search_term_string" } }),
      meta("StartVagina — Webcam Sexe Gratuit & Cams Direct", "StartVagina est le moteur de recherche ultime pour le webcam sexe gratuit et les cams en direct. Regardez des milliers de cam girls et profitez de shows érotiques sans inscription.", "webcam sexe, cams en direct, webcam gratuit, chat sexe, cam girls", null, { "@context": "https://schema.org", "@type": "WebSite", name: "StartVagina", url: BASE, inLanguage: "fr", potentialAction: { "@type": "SearchAction", target: `${BASE}/fr/?q={search_term_string}`, "query-input": "required name=search_term_string" } }),
      meta("StartVagina — Kostenloser Webcam Sex & Live Sex Cams", "StartVagina ist die ultimative Suchmaschine für kostenlosen Webcam Sex und Live Sex Cams. Schau dir tausende Cam Girls live an — gratis und ohne Anmeldung auf Chaturbate, Stripchat, BongaCams und CAM4.", "webcam sex, live sex cams, kostenloser webcam sex, sexchat, cam girls", null, { "@context": "https://schema.org", "@type": "WebSite", name: "StartVagina", url: BASE, inLanguage: "de", potentialAction: { "@type": "SearchAction", target: `${BASE}/de/?q={search_term_string}`, "query-input": "required name=search_term_string" } }),
      meta("StartVagina — Webcam Sexo Gratis & Cams en Vivo", "StartVagina es el buscador definitivo de webcam sexo gratis y cams en vivo. Mira miles de cam girls en directo de Chaturbate, Stripchat, BongaCams y CAM4 sin registro.", "webcam sexo, cams en vivo, webcam gratis, chat sexual, cam girls", null, { "@context": "https://schema.org", "@type": "WebSite", name: "StartVagina", url: BASE, inLanguage: "es", potentialAction: { "@type": "SearchAction", target: `${BASE}/es/?q={search_term_string}`, "query-input": "required name=search_term_string" } }),
      meta("StartVagina — Webcam Sex Gratis & Cam dal Vivo", "StartVagina è il motore di ricerca definitivo per webcam sex gratis e cam dal vivo. Guarda migliaia di cam girl in diretta da Chaturbate, Stripchat, BongaCams e CAM4 senza registrazione.", "webcam sex, cam dal vivo, webcam gratis, chat erotica, cam girl", null, { "@context": "https://schema.org", "@type": "WebSite", name: "StartVagina", url: BASE, inLanguage: "it", potentialAction: { "@type": "SearchAction", target: `${BASE}/it/?q={search_term_string}`, "query-input": "required name=search_term_string" } }),
    ),
  },

  // ---------- Core pages ----------
  {
    slugs: ["categorieen"],
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
    slugs: ["landen"],
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
    slugs: ["talen"],
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
    slugs: ["nieuwe-cam-girls"],
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
    slugs: ["populairste-cam-girls"],
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
      meta("Webcamsex — Gratis Live Cam Sex | StartVagina", "Gratis webcamsex kijken met duizenden cam girls live online. De beste webcam sex van Chaturbate, Stripchat, BongaCams en CAM4 op één plek — zonder registratie.", "webcamsex, webcam sex, gratis webcamsex", [{ q: "Is webcamsex gratis?", a: "Ja! Op StartVagina kun je gratis webcamsex kijken. Alle streams zijn live en zonder registratie te bekijken." }, { q: "Welke webcamsex sites zijn het best?", a: "De populairste webcamsex sites zijn Chaturbate, Stripchat, BongaCams en CAM4. Op StartVagina verzamelen we alle modellen op één plek." }, { q: "Is webcamsex anoniem?", a: "Ja, je kunt volledig anoniem webcamsex kijken. Je hoeft geen account aan te maken om streams te bekijken." }]),
      meta("Webcam Sex — Free Live Cam Sex | StartVagina", "Watch free webcam sex with thousands of cam girls live online. The best webcam sex from Chaturbate, Stripchat, BongaCams and CAM4 in one place — no signup needed.", "webcam sex, free webcam sex, live webcam sex", [{ q: "Is webcam sex free?", a: "Yes! On StartVagina you can watch free webcam sex. All streams are live and can be viewed without registration." }, { q: "Which webcam sex sites are the best?", a: "The most popular webcam sex sites are Chaturbate, Stripchat, BongaCams and CAM4. StartVagina collects all models in one place." }, { q: "Is webcam sex anonymous?", a: "Yes, you can watch webcam sex completely anonymously. No account is needed to view streams." }]),
      meta("Webcam Sexe Gratuit en Direct | StartVagina", "Regardez du webcam sexe gratuit avec des milliers de cam girls en direct de Chaturbate, Stripchat et BongaCams. Le meilleur du webcam sexe réuni sur une seule page.", "webcam sexe, webcam sexe gratuit, cam sexe", [{ q: "Le webcam sexe est-il gratuit ?", a: "Oui ! Sur StartVagina vous pouvez regarder du webcam sexe gratuitement. Tous les streams sont en direct et sans inscription." }, { q: "Quels sont les meilleurs sites de webcam sexe ?", a: "Les sites les plus populaires sont Chaturbate, Stripchat, BongaCams et CAM4. StartVagina rassemble tous les modèles en un seul endroit." }, { q: "Le webcam sexe est-il anonyme ?", a: "Oui, vous pouvez regarder du webcam sexe de manière totalement anonyme. Aucun compte n'est nécessaire." }]),
      meta("Webcam Sex — Kostenloser Live Cam Sex | StartVagina", "Kostenlos Webcam Sex schauen mit tausenden Cam Girls live online von Chaturbate, Stripchat, BongaCams und CAM4. Der beste Webcam Sex aller Plattformen an einem Ort.", "webcam sex, kostenloser webcam sex, live webcam sex", [{ q: "Ist Webcam Sex kostenlos?", a: "Ja! Auf StartVagina kannst du kostenlos Webcam Sex schauen. Alle Streams sind live und ohne Registrierung verfügbar." }, { q: "Welche Webcam Sex Seiten sind die besten?", a: "Die beliebtesten Webcam Sex Seiten sind Chaturbate, Stripchat, BongaCams und CAM4. StartVagina sammelt alle Models an einem Ort." }, { q: "Ist Webcam Sex anonym?", a: "Ja, du kannst völlig anonym Webcam Sex schauen. Kein Account nötig." }]),
      meta("Webcam Sexo Gratis en Vivo | StartVagina", "Mira webcam sexo gratis con miles de cam girls en vivo de Chaturbate, Stripchat, BongaCams y CAM4. El mejor webcam sexo de todas las plataformas en un solo lugar.", "webcam sexo, webcam sexo gratis, cam sexo", [{ q: "¿Es gratis el webcam sexo?", a: "¡Sí! En StartVagina puedes ver webcam sexo gratis. Todos los streams son en vivo y sin registro." }, { q: "¿Cuáles son los mejores sitios de webcam sexo?", a: "Los más populares son Chaturbate, Stripchat, BongaCams y CAM4. StartVagina reúne todas las modelos en un solo lugar." }, { q: "¿Es anónimo el webcam sexo?", a: "Sí, puedes ver webcam sexo de manera completamente anónima. No necesitas cuenta." }]),
      meta("Webcam Sex Gratis dal Vivo | StartVagina", "Guarda webcam sex gratis con migliaia di cam girl in diretta da Chaturbate, Stripchat, BongaCams e CAM4. Il meglio del webcam sex da tutte le piattaforme riunito qui.", "webcam sex, webcam sex gratis, cam sex", [{ q: "Il webcam sex è gratis?", a: "Sì! Su StartVagina puoi guardare webcam sex gratis. Tutti gli stream sono dal vivo e senza registrazione." }, { q: "Quali sono i migliori siti di webcam sex?", a: "I più popolari sono Chaturbate, Stripchat, BongaCams e CAM4. StartVagina raccoglie tutte le modelle in un unico posto." }, { q: "Il webcam sex è anonimo?", a: "Sì, puoi guardare webcam sex in modo completamente anonimo. Nessun account necessario." }]),
    ),
  },
  {
    slugs: ["gratis-webcam-sex"],
    meta: m(
      meta("Gratis Webcam Sex | StartVagina", "Gratis webcam sex kijken met de mooiste cam girls van Chaturbate, Stripchat en BongaCams. Geen creditcard nodig, geen registratie — direct live meekijken.", "gratis webcam sex, gratis cam, gratis sexcam", [{ q: "Is webcam sex echt gratis?", a: "Ja, op StartVagina kun je gratis webcam sex kijken zonder creditcard of registratie. Alle live shows zijn direct beschikbaar." }, { q: "Moet ik me registreren?", a: "Nee, je kunt direct meekijken zonder account aan te maken. Klik gewoon op een model en je wordt doorgestuurd naar de live show." }]),
      meta("Free Webcam Sex | StartVagina", "Watch free webcam sex with the most beautiful cam girls from Chaturbate, Stripchat and BongaCams. No credit card needed, no registration — start watching live now.", "free webcam sex, free cam, free sex cam", [{ q: "Is webcam sex really free?", a: "Yes, on StartVagina you can watch free webcam sex without a credit card or registration. All live shows are instantly available." }, { q: "Do I need to register?", a: "No, you can start watching immediately without creating an account. Just click on a model and you'll be redirected to the live show." }]),
      meta("Webcam Sexe Gratuit | StartVagina", "Regardez du webcam sexe gratuit avec les plus belles cam girls de Chaturbate, Stripchat et BongaCams. Sans carte de crédit, sans inscription — commencez maintenant.", "webcam sexe gratuit, cam gratuit", [{ q: "Le webcam sexe est-il vraiment gratuit ?", a: "Oui, sur StartVagina vous pouvez regarder du webcam sexe gratuitement sans carte de crédit ni inscription." }, { q: "Faut-il s'inscrire ?", a: "Non, vous pouvez commencer à regarder immédiatement sans créer de compte." }]),
      meta("Kostenloser Webcam Sex | StartVagina", "Kostenlos Webcam Sex schauen mit den schönsten Cam Girls von Chaturbate, Stripchat und BongaCams. Keine Kreditkarte nötig, keine Registrierung — jetzt live zuschauen.", "kostenloser webcam sex, gratis cam, kostenlos webcam sex", [{ q: "Ist Webcam Sex wirklich kostenlos?", a: "Ja, auf StartVagina kannst du kostenlos Webcam Sex schauen ohne Kreditkarte oder Registrierung." }, { q: "Muss ich mich registrieren?", a: "Nein, du kannst sofort zuschauen ohne ein Konto zu erstellen." }]),
      meta("Webcam Sexo Gratis | StartVagina", "Mira webcam sexo gratis con las cam girls más hermosas de Chaturbate, Stripchat y BongaCams. Sin tarjeta de crédito, sin registro — empieza a ver en vivo ahora.", "webcam sexo gratis, cam gratis", [{ q: "¿Es realmente gratis el webcam sexo?", a: "Sí, en StartVagina puedes ver webcam sexo gratis sin tarjeta de crédito ni registro." }, { q: "¿Necesito registrarme?", a: "No, puedes empezar a ver inmediatamente sin crear una cuenta." }]),
      meta("Webcam Sex Gratis | StartVagina", "Guarda webcam sex gratis con le cam girl più belle di Chaturbate, Stripchat e BongaCams. Nessuna carta di credito, nessuna registrazione — inizia a guardare ora.", "webcam sex gratis, cam gratis", [{ q: "Il webcam sex è davvero gratis?", a: "Sì, su StartVagina puoi guardare webcam sex gratis senza carta di credito o registrazione." }, { q: "Devo registrarmi?", a: "No, puoi iniziare a guardare subito senza creare un account." }]),
    ),
  },
  {
    slugs: ["sexchat"],
    meta: m(
      meta("Sexchat — Live Sex Chat | StartVagina", "Live sexchat met cam girls op StartVagina. Chat gratis met duizenden webcam modellen op Chaturbate, Stripchat, BongaCams en CAM4 — anoniem en zonder registratie.", "sexchat, sex chat, live sexchat", [{ q: "Hoe werkt sexchat?", a: "Klik op een model en je wordt doorgestuurd naar het platform. Daar kun je direct in de chatroom typen en live communiceren met het model." }, { q: "Is sexchat anoniem?", a: "Ja, je kunt volledig anoniem chatten. Er is geen registratie of persoonlijke informatie nodig om mee te kijken en te chatten." }]),
      meta("Sex Chat — Live Cam Chat | StartVagina", "Live sex chat with cam girls on StartVagina. Chat for free with thousands of webcam models on Chaturbate, Stripchat, BongaCams and CAM4 — anonymous and no signup.", "sex chat, live sex chat, cam chat", [{ q: "How does sex chat work?", a: "Click on a model and you'll be redirected to the platform. There you can type in the chatroom and communicate live with the model." }, { q: "Is sex chat anonymous?", a: "Yes, you can chat completely anonymously. No registration or personal information is needed to watch and chat." }]),
      meta("Chat Sexe en Direct | StartVagina", "Chat sexe en direct avec des cam girls sur StartVagina. Chattez gratuitement avec des milliers de modèles webcam sur Chaturbate, Stripchat et BongaCams — anonyme.", "chat sexe, chat sexe en direct", [{ q: "Comment fonctionne le chat sexe ?", a: "Cliquez sur un modèle et vous serez redirigé vers la plateforme. Vous pouvez chatter en direct dans le salon de discussion." }, { q: "Le chat sexe est-il anonyme ?", a: "Oui, vous pouvez chatter de manière totalement anonyme sans inscription." }]),
      meta("Sexchat — Live Sex Chat | StartVagina", "Live Sexchat mit Cam Girls auf StartVagina. Chatte kostenlos mit tausenden Webcam Models auf Chaturbate, Stripchat, BongaCams und CAM4 — anonym und ohne Anmeldung.", "sexchat, sex chat, live sexchat", [{ q: "Wie funktioniert Sexchat?", a: "Klicke auf ein Model und du wirst zur Plattform weitergeleitet. Dort kannst du direkt im Chatroom tippen und live kommunizieren." }, { q: "Ist Sexchat anonym?", a: "Ja, du kannst völlig anonym chatten. Keine Registrierung oder persönliche Daten nötig." }]),
      meta("Chat Sexual en Vivo | StartVagina", "Chat sexual en vivo con cam girls en StartVagina. Chatea gratis con miles de modelos webcam en Chaturbate, Stripchat, BongaCams y CAM4 — anónimo y sin registro.", "chat sexual, chat sexual en vivo", [{ q: "¿Cómo funciona el chat sexual?", a: "Haz clic en una modelo y serás redirigido a la plataforma. Allí puedes escribir en el chat y comunicarte en vivo." }, { q: "¿Es anónimo el chat sexual?", a: "Sí, puedes chatear de manera completamente anónima sin registro." }]),
      meta("Chat Erotica dal Vivo | StartVagina", "Chat erotica dal vivo con cam girl su StartVagina. Chatta gratis con migliaia di modelle webcam su Chaturbate, Stripchat, BongaCams e CAM4 — anonimo e senza registrazione.", "chat erotica, chat erotica dal vivo", [{ q: "Come funziona la chat erotica?", a: "Clicca su una modella e verrai reindirizzato alla piattaforma. Lì puoi scrivere nella chatroom e comunicare dal vivo." }, { q: "La chat erotica è anonima?", a: "Sì, puoi chattare in modo completamente anonimo senza registrazione." }]),
    ),
  },
  {
    slugs: ["cam-girls"],
    meta: m(
      meta("Cam Girls — Live Webcam Meisjes | StartVagina", "Bekijk de mooiste cam girls live op webcam op StartVagina. Duizenden webcam meisjes van Chaturbate, Stripchat, BongaCams en CAM4 op één plek — gratis en zonder registratie.", "cam girls, webcam meisjes, cam meisjes", [{ q: "Wat zijn cam girls?", a: "Cam girls zijn vrouwen die live webcam shows streamen op platforms zoals Chaturbate, Stripchat en CAM4. Je kunt hun shows gratis bekijken en met ze chatten." }, { q: "Hoeveel cam girls zijn er online?", a: "Er zijn op elk moment duizenden cam girls live online. StartVagina verzamelt modellen van alle grote platforms zodat je altijd iemand vindt die je leuk vindt." }]),
      meta("Cam Girls — Live Webcam Girls | StartVagina", "Watch the most beautiful cam girls live on webcam at StartVagina. Thousands of webcam girls from Chaturbate, Stripchat, BongaCams and CAM4 — free and no signup required.", "cam girls, webcam girls, live cam girls", [{ q: "What are cam girls?", a: "Cam girls are women who stream live webcam shows on platforms like Chaturbate, Stripchat and CAM4. You can watch their shows for free and chat with them." }, { q: "How many cam girls are online?", a: "Thousands of cam girls are live online at any moment. StartVagina collects models from all major platforms so you always find someone you like." }]),
      meta("Cam Girls en Direct | StartVagina", "Regardez les plus belles cam girls en direct sur webcam sur StartVagina. Des milliers de cam girls de Chaturbate, Stripchat, BongaCams et CAM4 — gratuit et sans inscription.", "cam girls, webcam girls, cam girls en direct", [{ q: "Que sont les cam girls ?", a: "Les cam girls sont des femmes qui diffusent des shows webcam en direct sur des plateformes comme Chaturbate, Stripchat et CAM4. Vous pouvez les regarder gratuitement." }, { q: "Combien de cam girls sont en ligne ?", a: "Des milliers de cam girls sont en direct à tout moment. StartVagina rassemble les modèles de toutes les grandes plateformes." }]),
      meta("Cam Girls Live | StartVagina", "Schau dir die schönsten Cam Girls live auf Webcam an auf StartVagina. Tausende Webcam Girls von Chaturbate, Stripchat, BongaCams und CAM4 — kostenlos und ohne Anmeldung.", "cam girls, webcam girls, live cam girls", [{ q: "Was sind Cam Girls?", a: "Cam Girls sind Frauen die live Webcam Shows auf Plattformen wie Chaturbate, Stripchat und CAM4 streamen. Du kannst ihre Shows kostenlos ansehen." }, { q: "Wie viele Cam Girls sind online?", a: "Tausende Cam Girls sind jederzeit live online. StartVagina sammelt Models von allen großen Plattformen." }]),
      meta("Cam Girls en Vivo | StartVagina", "Mira las cam girls más hermosas en vivo por webcam en StartVagina. Miles de cam girls de Chaturbate, Stripchat, BongaCams y CAM4 — gratis y sin registro.", "cam girls, webcam girls, cam girls en vivo", [{ q: "¿Qué son las cam girls?", a: "Las cam girls son mujeres que transmiten shows de webcam en vivo en plataformas como Chaturbate, Stripchat y CAM4. Puedes verlas gratis." }, { q: "¿Cuántas cam girls están en línea?", a: "Miles de cam girls están en vivo en cualquier momento. StartVagina reúne modelos de todas las grandes plataformas." }]),
      meta("Cam Girl dal Vivo | StartVagina", "Guarda le cam girl più belle in diretta su webcam su StartVagina. Migliaia di cam girl da Chaturbate, Stripchat, BongaCams e CAM4 — gratis e senza registrazione.", "cam girl, webcam girl, cam girl dal vivo", [{ q: "Cosa sono le cam girl?", a: "Le cam girl sono donne che trasmettono show webcam dal vivo su piattaforme come Chaturbate, Stripchat e CAM4. Puoi guardarle gratis." }, { q: "Quante cam girl sono online?", a: "Migliaia di cam girl sono in diretta in qualsiasi momento. StartVagina raccoglie modelle da tutte le grandi piattaforme." }]),
    ),
  },
  {
    slugs: ["live-sex-cams"],
    meta: m(
      meta("Live Sex Cams — Gratis Shows | StartVagina", "Gratis live sex cams kijken op StartVagina. Duizenden modellen live op Chaturbate, Stripchat, BongaCams en CAM4 — bekijk erotische webcam shows zonder registratie.", "live sex cams, live cam, live sex", [{ q: "Wat zijn live sex cams?", a: "Live sex cams zijn webcam shows die in real-time worden gestreamd door modellen op platforms zoals Chaturbate en Stripchat. Je kunt ze gratis bekijken en live interactie hebben." }, { q: "Wanneer zijn er live sex cams beschikbaar?", a: "Er zijn 24/7 duizenden modellen live online. StartVagina doorzoekt alle grote platforms zodat je op elk moment live shows kunt vinden." }]),
      meta("Live Sex Cams — Free Shows | StartVagina", "Watch free live sex cams on StartVagina. Thousands of models live on Chaturbate, Stripchat, BongaCams and CAM4 — enjoy erotic webcam shows without signup.", "live sex cams, live cam, free live cams", [{ q: "What are live sex cams?", a: "Live sex cams are webcam shows streamed in real-time by models on platforms like Chaturbate and Stripchat. You can watch them for free and interact live." }, { q: "When are live sex cams available?", a: "Thousands of models are live online 24/7. StartVagina searches all major platforms so you can find live shows at any time." }]),
      meta("Cams en Direct Gratuits | StartVagina", "Regardez des cams en direct gratuitement sur StartVagina. Des milliers de modèles en direct sur Chaturbate, Stripchat, BongaCams et CAM4 — shows érotiques sans inscription.", "cams en direct, cam en direct, cam gratuit", [{ q: "Que sont les cams en direct ?", a: "Les cams en direct sont des shows webcam diffusés en temps réel par des modèles sur des plateformes comme Chaturbate et Stripchat. Vous pouvez les regarder gratuitement." }, { q: "Quand les cams sont-elles disponibles ?", a: "Des milliers de modèles sont en direct 24h/24. StartVagina explore toutes les grandes plateformes." }]),
      meta("Live Sex Cams — Kostenlose Shows | StartVagina", "Kostenlos Live Sex Cams schauen auf StartVagina. Tausende Models live auf Chaturbate, Stripchat, BongaCams und CAM4 — erotische Webcam Shows ohne Anmeldung genießen.", "live sex cams, live cam, kostenlose live cams", [{ q: "Was sind Live Sex Cams?", a: "Live Sex Cams sind Webcam Shows die in Echtzeit von Models auf Plattformen wie Chaturbate und Stripchat gestreamt werden. Du kannst sie kostenlos ansehen." }, { q: "Wann sind Live Sex Cams verfügbar?", a: "Tausende Models sind rund um die Uhr live online. StartVagina durchsucht alle großen Plattformen." }]),
      meta("Cams en Vivo Gratis | StartVagina", "Mira cams en vivo gratis en StartVagina. Miles de modelos en directo en Chaturbate, Stripchat, BongaCams y CAM4 — disfruta de shows eróticos sin registro.", "cams en vivo, cam en vivo, cam gratis", [{ q: "¿Qué son las cams en vivo?", a: "Las cams en vivo son shows de webcam transmitidos en tiempo real por modelos en plataformas como Chaturbate y Stripchat. Puedes verlos gratis." }, { q: "¿Cuándo están disponibles las cams en vivo?", a: "Miles de modelos están en vivo las 24 horas. StartVagina busca en todas las grandes plataformas." }]),
      meta("Cam dal Vivo Gratis | StartVagina", "Guarda cam dal vivo gratis su StartVagina. Migliaia di modelle in diretta su Chaturbate, Stripchat, BongaCams e CAM4 — show erotici senza registrazione.", "cam dal vivo, cam in diretta, cam gratis", [{ q: "Cosa sono le cam dal vivo?", a: "Le cam dal vivo sono show webcam trasmessi in tempo reale da modelle su piattaforme come Chaturbate e Stripchat. Puoi guardarli gratis." }, { q: "Quando sono disponibili le cam dal vivo?", a: "Migliaia di modelle sono in diretta 24/7. StartVagina cerca su tutte le grandi piattaforme." }]),
    ),
  },

  // ---------- Comparison landing pages ----------
  ...[
    { s: "chaturbate-vs-stripchat",  a: "Chaturbate", b: "Stripchat" },
    { s: "chaturbate-vs-bongacams",  a: "Chaturbate", b: "BongaCams" },
    { s: "chaturbate-vs-cam4",       a: "Chaturbate", b: "CAM4" },
    { s: "chaturbate-vs-jerkmate",   a: "Chaturbate", b: "Jerkmate" },
    { s: "stripchat-vs-bongacams",   a: "Stripchat",  b: "BongaCams" },
    { s: "stripchat-vs-cam4",        a: "Stripchat",  b: "CAM4" },
    { s: "stripchat-vs-jerkmate",    a: "Stripchat",  b: "Jerkmate" },
    { s: "cam4-vs-bongacams",        a: "CAM4",       b: "BongaCams" },
    { s: "cam4-vs-jerkmate",         a: "CAM4",       b: "Jerkmate" },
    { s: "bongacams-vs-jerkmate",    a: "BongaCams",  b: "Jerkmate" },
  ].map(c => ({
    slugs: [c.s],
    meta: m(
      meta(`${c.a} vs ${c.b} — Vergelijking 2026 | StartVagina`, `${c.a} of ${c.b}? Vergelijk beide cam platforms op modellen, kwaliteit, VR, interface en meer op StartVagina.`, `${c.a.toLowerCase()} vs ${c.b.toLowerCase()}, vergelijking ${c.a.toLowerCase()} ${c.b.toLowerCase()}`),
      meta(`${c.a} vs ${c.b} — Comparison 2026 | StartVagina`, `${c.a} or ${c.b}? Compare both cam platforms on models, quality, VR, interface and more on StartVagina.`, `${c.a.toLowerCase()} vs ${c.b.toLowerCase()}, comparison ${c.a.toLowerCase()} ${c.b.toLowerCase()}`),
      meta(`${c.a} vs ${c.b} — Comparaison 2026 | StartVagina`, `${c.a} ou ${c.b} ? Comparez les deux plateformes cam sur les mod\u00e8les, la qualit\u00e9, la VR et plus encore.`, `${c.a.toLowerCase()} vs ${c.b.toLowerCase()}, comparaison ${c.a.toLowerCase()} ${c.b.toLowerCase()}`),
      meta(`${c.a} vs ${c.b} — Vergleich 2026 | StartVagina`, `${c.a} oder ${c.b}? Vergleiche beide Cam-Plattformen nach Models, Qualit\u00e4t, VR, Interface und mehr.`, `${c.a.toLowerCase()} vs ${c.b.toLowerCase()}, vergleich ${c.a.toLowerCase()} ${c.b.toLowerCase()}`),
      meta(`${c.a} vs ${c.b} — Comparaci\u00f3n 2026 | StartVagina`, `\u00bf${c.a} o ${c.b}? Compara ambas plataformas cam en modelos, calidad, VR, interfaz y m\u00e1s.`, `${c.a.toLowerCase()} vs ${c.b.toLowerCase()}, comparacion ${c.a.toLowerCase()} ${c.b.toLowerCase()}`),
      meta(`${c.a} vs ${c.b} — Confronto 2026 | StartVagina`, `${c.a} o ${c.b}? Confronta entrambe le piattaforme cam per modelle, qualit\u00e0, VR, interfaccia e altro.`, `${c.a.toLowerCase()} vs ${c.b.toLowerCase()}, confronto ${c.a.toLowerCase()} ${c.b.toLowerCase()}`),
    ),
  })),

  // ---------- Platform landing pages ----------
  ...["cam4", "chaturbate", "bongacams", "stripchat", "jerkmate", "islive"].map(p => { // xcams temporarily disabled
    const name = { cam4: "CAM4", chaturbate: "Chaturbate", bongacams: "BongaCams", stripchat: "Stripchat", jerkmate: "Jerkmate", islive: "Islive" }[p];
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
    { s: "jonge-cam-girls-18-plus", nl: "Teen 18+", en: "Teen 18+", fr: "Teen 18+", de: "Teen 18+", es: "Teen 18+", it: "Teen 18+",
      nlD: "jonge cam girls van 18+", enD: "young cam girls aged 18+", frD: "jeunes cam girls de 18+", deD: "junge Cam Girls ab 18+", esD: "cam girls jóvenes de 18+", itD: "giovani cam girl di 18+" },
    { s: "milf-webcamsex-ervaren-vrouwen", nl: "MILF", en: "MILF", fr: "MILF", de: "MILF", es: "MILF", it: "MILF",
      nlD: "ervaren vrouwen", enD: "experienced women", frD: "femmes expérimentées", deD: "erfahrene Frauen", esD: "mujeres experimentadas", itD: "donne esperte" },
    { s: "mature-webcamsex-oudere-vrouwen", nl: "Mature", en: "Mature", fr: "Mature", de: "Mature", es: "Mature", it: "Mature",
      nlD: "oudere vrouwen", enD: "older women", frD: "femmes mûres", deD: "ältere Frauen", esD: "mujeres maduras", itD: "donne mature" },
    { s: "aziatische-cam-girls-live", nl: "Aziatisch", en: "Asian", fr: "Asiatique", de: "Asiatisch", es: "Asiáticas", it: "Asiatiche",
      nlD: "Aziatische cam girls", enD: "Asian cam girls", frD: "cam girls asiatiques", deD: "asiatische Cam Girls", esD: "cam girls asiáticas", itD: "cam girl asiatiche" },
    { s: "latina-cam-girls-live", nl: "Latina", en: "Latina", fr: "Latina", de: "Latina", es: "Latina", it: "Latina",
      nlD: "Latijnse cam girls", enD: "Latina cam girls", frD: "cam girls latinas", deD: "Latina Cam Girls", esD: "cam girls latinas", itD: "cam girl latine" },
    { s: "ebony-cam-girls-live", nl: "Ebony", en: "Ebony", fr: "Ebony", de: "Ebony", es: "Ebony", it: "Ebony",
      nlD: "zwarte cam girls", enD: "black cam girls", frD: "cam girls noires", deD: "schwarze Cam Girls", esD: "cam girls negras", itD: "cam girl nere" },
    { s: "cam-girls-grote-borsten", nl: "Grote Borsten", en: "Big Boobs", fr: "Gros Seins", de: "Große Brüste", es: "Tetas Grandes", it: "Tette Grandi",
      nlD: "cam girls met grote borsten", enD: "cam girls with big boobs", frD: "cam girls aux gros seins", deD: "Cam Girls mit großen Brüsten", esD: "cam girls con tetas grandes", itD: "cam girl con tette grandi" },
    { s: "petite-cam-girls-kleine-borsten", nl: "Kleine Borsten", en: "Small Tits", fr: "Petits Seins", de: "Kleine Brüste", es: "Tetas Pequeñas", it: "Tette Piccole",
      nlD: "petite cam girls", enD: "petite cam girls", frD: "cam girls petites", deD: "petite Cam Girls", esD: "cam girls petite", itD: "cam girl petite" },
    { s: "anale-cam-shows-live", nl: "Anal", en: "Anal", fr: "Anal", de: "Anal", es: "Anal", it: "Anale",
      nlD: "anale cam shows", enD: "anal cam shows", frD: "shows cam anal", deD: "anale Cam Shows", esD: "shows cam anal", itD: "show cam anali" },
    { s: "cam-koppels-live-sex", nl: "Koppels", en: "Couples", fr: "Couples", de: "Paare", es: "Parejas", it: "Coppie",
      nlD: "echte koppels live op cam", enD: "real couples live on cam", frD: "vrais couples en direct", deD: "echte Paare live auf Cam", esD: "parejas reales en vivo", itD: "vere coppie in diretta" },
    { s: "squirt-cam-shows-live", nl: "Squirt", en: "Squirt", fr: "Squirt", de: "Squirt", es: "Squirt", it: "Squirt",
      nlD: "squirting cam shows", enD: "squirting cam shows", frD: "shows cam squirt", deD: "Squirting Cam Shows", esD: "shows cam squirt", itD: "show cam squirt" },
    { s: "bdsm-bondage-cam-shows", nl: "BDSM", en: "BDSM", fr: "BDSM", de: "BDSM", es: "BDSM", it: "BDSM",
      nlD: "bondage en fetish cam shows", enD: "bondage and fetish cam shows", frD: "shows cam bondage et fétiche", deD: "Bondage und Fetisch Cam Shows", esD: "shows cam bondage y fetiche", itD: "show cam bondage e fetish" },
    { s: "getatoeeerde-cam-girls", nl: "Tattoo", en: "Tattoo", fr: "Tatouage", de: "Tattoo", es: "Tatuaje", it: "Tatuaggio",
      nlD: "getatoeëerde cam girls", enD: "tattooed cam girls", frD: "cam girls tatouées", deD: "tätowierte Cam Girls", esD: "cam girls tatuadas", itD: "cam girl tatuate" },
    { s: "behaarde-cam-girls-natural", nl: "Hairy", en: "Hairy", fr: "Poilu", de: "Behaart", es: "Peluda", it: "Pelosa",
      nlD: "behaarde cam girls", enD: "hairy cam girls", frD: "cam girls poilues", deD: "behaarte Cam Girls", esD: "cam girls peludas", itD: "cam girl pelose" },
    { s: "voeten-fetish-cam-shows", nl: "Voeten", en: "Feet", fr: "Pieds", de: "Füße", es: "Pies", it: "Piedi",
      nlD: "foot fetish cam shows", enD: "foot fetish cam shows", frD: "shows cam fétichisme des pieds", deD: "Fuß-Fetisch Cam Shows", esD: "shows cam fetiche de pies", itD: "show cam feticismo dei piedi" },
    { s: "outdoor-cam-shows-buiten", nl: "Outdoor", en: "Outdoor", fr: "Extérieur", de: "Outdoor", es: "Exterior", it: "Outdoor",
      nlD: "cam shows buiten", enD: "outdoor cam shows", frD: "shows cam en extérieur", deD: "Outdoor Cam Shows", esD: "shows cam al aire libre", itD: "show cam all'aperto" },
    { s: "mobiele-cam-shows-live", nl: "Mobiel", en: "Mobile", fr: "Mobile", de: "Mobil", es: "Móvil", it: "Mobile",
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
    { s: "nederlandse-cam-girls", nl: "Nederland", en: "Netherlands", fr: "Pays-Bas", de: "Niederlande", es: "Países Bajos", it: "Paesi Bassi", nlA: "Nederlandse", enA: "Dutch", frA: "néerlandaises", deA: "niederländische", esA: "holandesas", itA: "olandesi" },
    { s: "belgische-cam-girls", nl: "België", en: "Belgium", fr: "Belgique", de: "Belgien", es: "Bélgica", it: "Belgio", nlA: "Belgische", enA: "Belgian", frA: "belges", deA: "belgische", esA: "belgas", itA: "belghe" },
    { s: "duitse-cam-girls", nl: "Duitsland", en: "Germany", fr: "Allemagne", de: "Deutschland", es: "Alemania", it: "Germania", nlA: "Duitse", enA: "German", frA: "allemandes", deA: "deutsche", esA: "alemanas", itA: "tedesche" },
    { s: "colombiaanse-cam-girls", nl: "Colombia", en: "Colombia", fr: "Colombie", de: "Kolumbien", es: "Colombia", it: "Colombia", nlA: "Colombiaanse", enA: "Colombian", frA: "colombiennes", deA: "kolumbianische", esA: "colombianas", itA: "colombiane" },
    { s: "roemeense-cam-girls", nl: "Roemenië", en: "Romania", fr: "Roumanie", de: "Rumänien", es: "Rumanía", it: "Romania", nlA: "Roemeense", enA: "Romanian", frA: "roumaines", deA: "rumänische", esA: "rumanas", itA: "rumene" },
    { s: "italiaanse-cam-girls", nl: "Italië", en: "Italy", fr: "Italie", de: "Italien", es: "Italia", it: "Italia", nlA: "Italiaanse", enA: "Italian", frA: "italiennes", deA: "italienische", esA: "italianas", itA: "italiane" },
    { s: "spaanse-cam-girls", nl: "Spanje", en: "Spain", fr: "Espagne", de: "Spanien", es: "España", it: "Spagna", nlA: "Spaanse", enA: "Spanish", frA: "espagnoles", deA: "spanische", esA: "españolas", itA: "spagnole" },
    { s: "franse-cam-girls", nl: "Frankrijk", en: "France", fr: "France", de: "Frankreich", es: "Francia", it: "Francia", nlA: "Franse", enA: "French", frA: "françaises", deA: "französische", esA: "francesas", itA: "francesi" },
    { s: "britse-cam-girls", nl: "VK", en: "United Kingdom", fr: "Royaume-Uni", de: "Vereinigtes Königreich", es: "Reino Unido", it: "Regno Unito", nlA: "Britse", enA: "British", frA: "britanniques", deA: "britische", esA: "británicas", itA: "britanniche" },
    { s: "amerikaanse-cam-girls", nl: "VS", en: "United States", fr: "États-Unis", de: "USA", es: "Estados Unidos", it: "Stati Uniti", nlA: "Amerikaanse", enA: "American", frA: "américaines", deA: "amerikanische", esA: "americanas", itA: "americane" },
    { s: "russische-cam-girls", nl: "Rusland", en: "Russia", fr: "Russie", de: "Russland", es: "Rusia", it: "Russia", nlA: "Russische", enA: "Russian", frA: "russes", deA: "russische", esA: "rusas", itA: "russe" },
    { s: "oekraiense-cam-girls", nl: "Oekraïne", en: "Ukraine", fr: "Ukraine", de: "Ukraine", es: "Ucrania", it: "Ucraina", nlA: "Oekraïense", enA: "Ukrainian", frA: "ukrainiennes", deA: "ukrainische", esA: "ucranianas", itA: "ucraine" },
    { s: "braziliaanse-cam-girls", nl: "Brazilië", en: "Brazil", fr: "Brésil", de: "Brasilien", es: "Brasil", it: "Brasile", nlA: "Braziliaanse", enA: "Brazilian", frA: "brésiliennes", deA: "brasilianische", esA: "brasileñas", itA: "brasiliane" },
    { s: "japanse-cam-girls", nl: "Japan", en: "Japan", fr: "Japon", de: "Japan", es: "Japón", it: "Giappone", nlA: "Japanse", enA: "Japanese", frA: "japonaises", deA: "japanische", esA: "japonesas", itA: "giapponesi" },
    { s: "poolse-cam-girls", nl: "Polen", en: "Poland", fr: "Pologne", de: "Polen", es: "Polonia", it: "Polonia", nlA: "Poolse", enA: "Polish", frA: "polonaises", deA: "polnische", esA: "polacas", itA: "polacche" },
    { s: "mexicaanse-cam-girls", nl: "Mexico", en: "Mexico", fr: "Mexique", de: "Mexiko", es: "México", it: "Messico", nlA: "Mexicaanse", enA: "Mexican", frA: "mexicaines", deA: "mexikanische", esA: "mexicanas", itA: "messicane" },
    { s: "tsjechische-cam-girls", nl: "Tsjechië", en: "Czech Republic", fr: "République tchèque", de: "Tschechien", es: "República Checa", it: "Repubblica Ceca", nlA: "Tsjechische", enA: "Czech", frA: "tchèques", deA: "tschechische", esA: "checas", itA: "ceche" },
    { s: "filipijnse-cam-girls", nl: "Filipijnen", en: "Philippines", fr: "Philippines", de: "Philippinen", es: "Filipinas", it: "Filippine", nlA: "Filipijnse", enA: "Filipina", frA: "philippines", deA: "philippinische", esA: "filipinas", itA: "filippine" },
    { s: "thaise-cam-girls", nl: "Thailand", en: "Thailand", fr: "Thaïlande", de: "Thailand", es: "Tailandia", it: "Thailandia", nlA: "Thaise", enA: "Thai", frA: "thaïlandaises", deA: "thailändische", esA: "tailandesas", itA: "thailandesi" },
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

function buildMetaTags(slug, pageMeta, lang = "nl") {
  const canonical = slug ? `${BASE}/${slug}` : BASE;
  const tags = [];

  tags.push(`<title>${escapeHtml(pageMeta.title)}</title>`);
  tags.push(`<meta name="description" content="${escapeAttr(pageMeta.description)}">`);
  tags.push(`<meta name="keywords" content="${escapeAttr(pageMeta.keywords)}">`);
  tags.push(`<meta name="robots" content="${NOINDEX_LANGS.includes(lang) ? "noindex, nofollow" : "index, follow"}">`);
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

function injectMeta(htmlTemplate, metaTags, lang) {
  let html = htmlTemplate.replace(/<title>[^<]*<\/title>/, "");
  html = html.replace(/<html lang="[^"]*">/, `<html lang="${lang}">`);
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
      const metaTags = buildMetaTags(fullSlug, pageMeta, lang);
      const html = injectMeta(template, metaTags, lang);
      writePage(fullSlug, html);
      count++;
    }
  }
}

console.log(`✅ Pre-rendered ${count} pages (static)`);

// ============================================================
// Niche-videos pre-render
// ============================================================

const NICHE_META_OVERRIDES = {
  masturbation: { nl: { title: "Masturbatie Video's \u2014 Solo Cam Shows op CAM4 | StartVagina", description: "Bekijk exclusieve masturbatie video's van cam modellen op CAM4. Solo shows met vingers en toys \u2014 van slow build tot intense orgasmes." }, en: { title: "Masturbation Videos \u2014 Solo Cam Shows on CAM4 | StartVagina", description: "Watch exclusive masturbation videos from cam models on CAM4. Solo shows with fingers and toys \u2014 from slow build to intense orgasms." } },
  squirt: { nl: { title: "Squirt Video's \u2014 Squirtende Cam Girls op CAM4 | StartVagina", description: "Bekijk squirt video's van cam modellen op CAM4. Intense orgasmes en spectaculaire squirt shows van amateurs en professionals." }, en: { title: "Squirt Videos \u2014 Squirting Cam Girls on CAM4 | StartVagina", description: "Watch squirt videos from cam models on CAM4. Intense orgasms and spectacular squirt shows from amateurs and professionals." } },
  amateur: { nl: { title: "Amateur Video's \u2014 Echte Amateur Cam Shows op CAM4 | StartVagina", description: "Bekijk amateur video's van echte cam modellen op CAM4. Authentiek, ongescript en persoonlijk \u2014 echte vrouwen delen intieme momenten." }, en: { title: "Amateur Videos \u2014 Real Amateur Cam Shows on CAM4 | StartVagina", description: "Watch amateur videos from real cam models on CAM4. Authentic, unscripted and personal \u2014 real women sharing intimate moments." } },
  anal: { nl: { title: "Anale Video's \u2014 Anale Cam Shows op CAM4 | StartVagina", description: "Bekijk anale video's van cam modellen op CAM4. Training, toys en meer \u2014 exclusieve anale content van amateurs." }, en: { title: "Anal Videos \u2014 Anal Cam Shows on CAM4 | StartVagina", description: "Watch anal videos from cam models on CAM4. Training, toys and more \u2014 exclusive anal content from amateur models." } },
  milf: { nl: { title: "MILF Video's \u2014 Ervaren Vrouwen op CAM4 | StartVagina", description: "Bekijk MILF video's van ervaren cam modellen op CAM4. Zelfverzekerde vrouwen met ervaring die weten hoe ze je moeten verleiden." }, en: { title: "MILF Videos \u2014 Experienced Women on CAM4 | StartVagina", description: "Watch MILF videos from experienced cam models on CAM4. Confident women who know exactly how to please." } },
  "18-plus-girls": { nl: { title: "18+ Meisjes Video's \u2014 Jonge Cam Girls op CAM4 | StartVagina", description: "Bekijk video's van jonge 18+ cam girls op CAM4. Verse nieuwe modellen die hun eerste shows delen." }, en: { title: "18+ Girls Videos \u2014 Young Cam Girls on CAM4 | StartVagina", description: "Watch videos from young 18+ cam girls on CAM4. Fresh new models sharing their first shows." } },
  "big-tits": { nl: { title: "Grote Borsten Video's \u2014 Cam Girls met Grote Tieten op CAM4 | StartVagina", description: "Bekijk video's van cam modellen met grote borsten op CAM4. Van natuurlijk tot enhanced \u2014 de beste busty cam girl content." }, en: { title: "Big Tits Videos \u2014 Busty Cam Girls on CAM4 | StartVagina", description: "Watch videos from busty cam models on CAM4. From natural to enhanced \u2014 the best big tits cam girl content." } },
  "hairy-pussy": { nl: { title: "Hairy Pussy Video's \u2014 Ongeschoren Cam Girls op CAM4 | StartVagina", description: "Bekijk video's van cam modellen met een natuurlijke look op CAM4. Ongeschoren en trots \u2014 hairy pussy content van echte vrouwen." }, en: { title: "Hairy Pussy Videos \u2014 Natural Cam Girls on CAM4 | StartVagina", description: "Watch videos from natural cam models on CAM4. Unshaved and proud \u2014 hairy pussy content from real women." } },
  pussy: { nl: { title: "Pussy Video's \u2014 Close-up Cam Shows op CAM4 | StartVagina", description: "Bekijk pussy video's en close-up content van cam modellen op CAM4. Intiem en expliciet \u2014 de beste cam girl pussy content." }, en: { title: "Pussy Videos \u2014 Close-up Cam Shows on CAM4 | StartVagina", description: "Watch pussy videos and close-up content from cam models on CAM4. Intimate and explicit \u2014 the best cam girl pussy content." } },
  blowjob: { nl: { title: "Blowjob Video's \u2014 Orale Cam Shows op CAM4 | StartVagina", description: "Bekijk blowjob video's van cam modellen op CAM4. Deepthroat, sloppy en meer \u2014 exclusieve orale content." }, en: { title: "Blowjob Videos \u2014 Oral Cam Shows on CAM4 | StartVagina", description: "Watch blowjob videos from cam models on CAM4. Deepthroat, sloppy and more \u2014 exclusive oral content." } },
  "big-ass": { nl: { title: "Grote Kont Video's \u2014 Cam Girls met een Big Ass op CAM4 | StartVagina", description: "Bekijk video's van cam modellen met een grote kont op CAM4. Twerk, booty shows en meer van de mooiste curves." }, en: { title: "Big Ass Videos \u2014 Booty Cam Girls on CAM4 | StartVagina", description: "Watch videos from cam models with a big ass on CAM4. Twerk, booty shows and more from the best curves." } },
  "public-streaming": { nl: { title: "Publieke Stream Video's \u2014 Outdoor Cam Shows op CAM4 | StartVagina", description: "Bekijk publieke streaming video's op CAM4. Cam modellen die het buiten of op openbare plekken doen \u2014 spannend en onvoorspelbaar." }, en: { title: "Public Streaming Videos \u2014 Outdoor Cam Shows on CAM4 | StartVagina", description: "Watch public streaming videos on CAM4. Cam models going live outdoors and in public \u2014 thrilling and unpredictable." } },
  creampie: { nl: { title: "Creampie Video's \u2014 Creampie Cam Shows op CAM4 | StartVagina", description: "Bekijk creampie video's van cam modellen op CAM4. Exclusieve creampie content van amateurs en koppels." }, en: { title: "Creampie Videos \u2014 Creampie Cam Shows on CAM4 | StartVagina", description: "Watch creampie videos from cam models on CAM4. Exclusive creampie content from amateurs and couples." } },
  latina: { nl: { title: "Latina Video's \u2014 Latina Cam Girls op CAM4 | StartVagina", description: "Bekijk video's van Latina cam modellen op CAM4. Heet, gepassioneerd en vol energie \u2014 de beste Latijns-Amerikaanse cam girl content." }, en: { title: "Latina Videos \u2014 Latina Cam Girls on CAM4 | StartVagina", description: "Watch videos from Latina cam models on CAM4. Hot, passionate and full of energy \u2014 the best Latin American cam girl content." } },
  redheads: { nl: { title: "Roodharige Video's \u2014 Redhead Cam Girls op CAM4 | StartVagina", description: "Bekijk video's van roodharige cam modellen op CAM4. Vurig en verleidelijk \u2014 exclusieve redhead content." }, en: { title: "Redhead Videos \u2014 Redhead Cam Girls on CAM4 | StartVagina", description: "Watch videos from redhead cam models on CAM4. Fiery and seductive \u2014 exclusive redhead content." } },
  pee: { nl: { title: "Pee Video's \u2014 Watersport Cam Shows op CAM4 | StartVagina", description: "Bekijk pee video's van cam modellen op CAM4. Watersport en golden shower content van avontuurlijke modellen." }, en: { title: "Pee Videos \u2014 Watersports Cam Shows on CAM4 | StartVagina", description: "Watch pee videos from cam models on CAM4. Watersports and golden shower content from adventurous models." } },
  tattoos: { nl: { title: "Tattoo Video's \u2014 Getatoe\u00eberde Cam Girls op CAM4 | StartVagina", description: "Bekijk video's van getatoe\u00eberde cam modellen op CAM4. Inked babes met attitude \u2014 de mooiste tattoo cam girls." }, en: { title: "Tattoo Videos \u2014 Tattooed Cam Girls on CAM4 | StartVagina", description: "Watch videos from tattooed cam models on CAM4. Inked babes with attitude \u2014 the hottest tattooed cam girls." } },
  bbw: { nl: { title: "BBW Video's \u2014 Curvy Cam Girls op CAM4 | StartVagina", description: "Bekijk video's van BBW cam modellen op CAM4. Voluptueuze vrouwen met zelfvertrouwen \u2014 de beste plus-size cam content." }, en: { title: "BBW Videos \u2014 Curvy Cam Girls on CAM4 | StartVagina", description: "Watch videos from BBW cam models on CAM4. Voluptuous women with confidence \u2014 the best plus-size cam content." } },
  petite: { nl: { title: "Petite Video's \u2014 Kleine Cam Girls op CAM4 | StartVagina", description: "Bekijk video's van petite cam modellen op CAM4. Klein maar fijn \u2014 schattige en sexy petite cam girls." }, en: { title: "Petite Videos \u2014 Small Cam Girls on CAM4 | StartVagina", description: "Watch videos from petite cam models on CAM4. Small but mighty \u2014 cute and sexy petite cam girls." } },
  feet: { nl: { title: "Voeten Video's \u2014 Foot Fetish Cam Shows op CAM4 | StartVagina", description: "Bekijk voeten video's van cam modellen op CAM4. Foot fetish content, voetmassage en meer van de mooiste voetjes." }, en: { title: "Feet Videos \u2014 Foot Fetish Cam Shows on CAM4 | StartVagina", description: "Watch feet videos from cam models on CAM4. Foot fetish content, foot massages and more from beautiful feet." } },
  bdsm: { nl: { title: "BDSM Video's \u2014 Bondage & Dominatie Cam Shows op CAM4 | StartVagina", description: "Bekijk BDSM video's van cam modellen op CAM4. Bondage, dominatie en submission \u2014 van beginners tot hardcore." }, en: { title: "BDSM Videos \u2014 Bondage & Domination Cam Shows on CAM4 | StartVagina", description: "Watch BDSM videos from cam models on CAM4. Bondage, domination and submission \u2014 from beginners to hardcore." } },
  blonde: { nl: { title: "Blonde Video's \u2014 Blonde Cam Girls op CAM4 | StartVagina", description: "Bekijk video's van blonde cam modellen op CAM4. Klassiek mooi en verleidelijk \u2014 de mooiste blonde cam girls." }, en: { title: "Blonde Videos \u2014 Blonde Cam Girls on CAM4 | StartVagina", description: "Watch videos from blonde cam models on CAM4. Classic beauty and seduction \u2014 the hottest blonde cam girls." } },
  lesbian: { nl: { title: "Lesbische Video's \u2014 Girl-on-Girl Cam Shows op CAM4 | StartVagina", description: "Bekijk lesbische video's van cam modellen op CAM4. Twee vrouwen, echte passie \u2014 exclusieve girl-on-girl content." }, en: { title: "Lesbian Videos \u2014 Girl-on-Girl Cam Shows on CAM4 | StartVagina", description: "Watch lesbian videos from cam models on CAM4. Two women, real passion \u2014 exclusive girl-on-girl content." } },
  shower: { nl: { title: "Douche Video's \u2014 Shower Cam Shows op CAM4 | StartVagina", description: "Bekijk douche video's van cam modellen op CAM4. Nat, zeepachtig en sexy \u2014 cam girls onder de douche." }, en: { title: "Shower Videos \u2014 Shower Cam Shows on CAM4 | StartVagina", description: "Watch shower videos from cam models on CAM4. Wet, soapy and sexy \u2014 cam girls in the shower." } },
  cosplay: { nl: { title: "Cosplay Video's \u2014 Cosplay Cam Girls op CAM4 | StartVagina", description: "Bekijk cosplay video's van cam modellen op CAM4. Anime, gaming en fantasy cosplay \u2014 creatieve en sexy shows." }, en: { title: "Cosplay Videos \u2014 Cosplay Cam Girls on CAM4 | StartVagina", description: "Watch cosplay videos from cam models on CAM4. Anime, gaming and fantasy cosplay \u2014 creative and sexy shows." } },
  asian: { nl: { title: "Aziatische Video's \u2014 Asian Cam Girls op CAM4 | StartVagina", description: "Bekijk video's van Aziatische cam modellen op CAM4. Japans, Koreaans, Thais en meer \u2014 exotische schoonheid." }, en: { title: "Asian Videos \u2014 Asian Cam Girls on CAM4 | StartVagina", description: "Watch videos from Asian cam models on CAM4. Japanese, Korean, Thai and more \u2014 exotic beauty." } },
  "fuck-machine": { nl: { title: "Fuck Machine Video's \u2014 Machine Cam Shows op CAM4 | StartVagina", description: "Bekijk fuck machine video's van cam modellen op CAM4. Intense machine-powered shows voor maximaal genot." }, en: { title: "Fuck Machine Videos \u2014 Machine Cam Shows on CAM4 | StartVagina", description: "Watch fuck machine videos from cam models on CAM4. Intense machine-powered shows for maximum pleasure." } },
  ebony: { nl: { title: "Ebony Video's \u2014 Zwarte Cam Girls op CAM4 | StartVagina", description: "Bekijk video's van ebony cam modellen op CAM4. Prachtige zwarte vrouwen met passie en stijl." }, en: { title: "Ebony Videos \u2014 Black Cam Girls on CAM4 | StartVagina", description: "Watch videos from ebony cam models on CAM4. Beautiful black women with passion and style." } },
  fitness: { nl: { title: "Fitness Video's \u2014 Sportieve Cam Girls op CAM4 | StartVagina", description: "Bekijk fitness video's van sportieve cam modellen op CAM4. Gespierd, flexibel en sexy \u2014 workout meets webcam." }, en: { title: "Fitness Videos \u2014 Athletic Cam Girls on CAM4 | StartVagina", description: "Watch fitness videos from athletic cam models on CAM4. Toned, flexible and sexy \u2014 workout meets webcam." } },
  "fem-dom": { nl: { title: "Femdom Video's \u2014 Dominante Vrouwen op CAM4 | StartVagina", description: "Bekijk femdom video's van dominante cam modellen op CAM4. Machtige vrouwen die de controle nemen." }, en: { title: "Femdom Videos \u2014 Dominant Women on CAM4 | StartVagina", description: "Watch femdom videos from dominant cam models on CAM4. Powerful women taking full control." } },
  "cum-play": { nl: { title: "Cum Play Video's \u2014 Cum Shows op CAM4 | StartVagina", description: "Bekijk cum play video's van cam modellen op CAM4. Creatieve en messy cum shows." }, en: { title: "Cum Play Videos \u2014 Cum Shows on CAM4 | StartVagina", description: "Watch cum play videos from cam models on CAM4. Creative and messy cum shows." } },
  gamer: { nl: { title: "Gamer Girl Video's \u2014 Gaming Cam Girls op CAM4 | StartVagina", description: "Bekijk video's van gamer cam modellen op CAM4. Gaming en sexy shows gecombineerd \u2014 voor de echte gamer fans." }, en: { title: "Gamer Girl Videos \u2014 Gaming Cam Girls on CAM4 | StartVagina", description: "Watch videos from gamer cam models on CAM4. Gaming and sexy shows combined \u2014 for real gamer fans." } },
  arab: { nl: { title: "Arabische Video's \u2014 Arabische Cam Girls op CAM4 | StartVagina", description: "Bekijk video's van Arabische cam modellen op CAM4. Exotisch, mysterieus en onweerstaanbaar mooi." }, en: { title: "Arab Videos \u2014 Arab Cam Girls on CAM4 | StartVagina", description: "Watch videos from Arab cam models on CAM4. Exotic, mysterious and irresistibly beautiful." } },
  twerk: { nl: { title: "Twerk Video's \u2014 Twerking Cam Girls op CAM4 | StartVagina", description: "Bekijk twerk video's van cam modellen op CAM4. Shake it \u2014 de beste booty shaking en twerk content." }, en: { title: "Twerk Videos \u2014 Twerking Cam Girls on CAM4 | StartVagina", description: "Watch twerk videos from cam models on CAM4. Shake it \u2014 the best booty shaking and twerk content." } },
  smoking: { nl: { title: "Smoking Video's \u2014 Rokende Cam Girls op CAM4 | StartVagina", description: "Bekijk smoking fetish video's van cam modellen op CAM4. Verleidelijk en sensueel \u2014 rokende cam girls." }, en: { title: "Smoking Videos \u2014 Smoking Cam Girls on CAM4 | StartVagina", description: "Watch smoking fetish videos from cam models on CAM4. Seductive and sensual \u2014 smoking cam girls." } },
  "oil-show": { nl: { title: "Olie Show Video's \u2014 Oiled Up Cam Girls op CAM4 | StartVagina", description: "Bekijk olie show video's van cam modellen op CAM4. Glanzend, glad en onweerstaanbaar \u2014 oiled up cam content." }, en: { title: "Oil Show Videos \u2014 Oiled Up Cam Girls on CAM4 | StartVagina", description: "Watch oil show videos from cam models on CAM4. Shiny, slippery and irresistible \u2014 oiled up cam content." } },
  pregnant: { nl: { title: "Zwangere Video's \u2014 Pregnant Cam Girls op CAM4 | StartVagina", description: "Bekijk video's van zwangere cam modellen op CAM4. Mooi, sensueel en uniek \u2014 pregnant cam content." }, en: { title: "Pregnant Videos \u2014 Pregnant Cam Girls on CAM4 | StartVagina", description: "Watch videos from pregnant cam models on CAM4. Beautiful, sensual and unique \u2014 pregnant cam content." } },
  fisting: { nl: { title: "Fisting Video's \u2014 Fisting Cam Shows op CAM4 | StartVagina", description: "Bekijk fisting video's van cam modellen op CAM4. Extreme en intense content voor de echte liefhebber." }, en: { title: "Fisting Videos \u2014 Fisting Cam Shows on CAM4 | StartVagina", description: "Watch fisting videos from cam models on CAM4. Extreme and intense content for true enthusiasts." } },
  fantasy: { nl: { title: "Fantasy Video's \u2014 Fantasy Cam Shows op CAM4 | StartVagina", description: "Bekijk fantasy video's van cam modellen op CAM4. Roleplay, verkleed en fantasierijke shows." }, en: { title: "Fantasy Videos \u2014 Fantasy Cam Shows on CAM4 | StartVagina", description: "Watch fantasy videos from cam models on CAM4. Roleplay, costumes and imaginative shows." } },
  leather: { nl: { title: "Leren Video's \u2014 Leather Fetish Cam Shows op CAM4 | StartVagina", description: "Bekijk leather fetish video's van cam modellen op CAM4. Stoer, dominant en verleidelijk in leer." }, en: { title: "Leather Videos \u2014 Leather Fetish Cam Shows on CAM4 | StartVagina", description: "Watch leather fetish videos from cam models on CAM4. Tough, dominant and seductive in leather." } },
  latex: { nl: { title: "Latex Video's \u2014 Latex Fetish Cam Shows op CAM4 | StartVagina", description: "Bekijk latex fetish video's van cam modellen op CAM4. Strak, glanzend en onweerstaanbaar \u2014 latex cam content." }, en: { title: "Latex Videos \u2014 Latex Fetish Cam Shows on CAM4 | StartVagina", description: "Watch latex fetish videos from cam models on CAM4. Tight, shiny and irresistible \u2014 latex cam content." } },
  "kinky-wife": { nl: { title: "Kinky Wife Video's \u2014 Stoute Vrouwen op CAM4 | StartVagina", description: "Bekijk kinky wife video's op CAM4. Getrouwde vrouwen die hun wilde kant laten zien." }, en: { title: "Kinky Wife Videos \u2014 Naughty Wives on CAM4 | StartVagina", description: "Watch kinky wife videos on CAM4. Married women showing their wild side." } },
  hardcore: { nl: { title: "Hardcore Video's \u2014 Hardcore Cam Shows op CAM4 | StartVagina", description: "Bekijk hardcore video's van cam modellen op CAM4. Intens, expliciet en ongecensureerd." }, en: { title: "Hardcore Videos \u2014 Hardcore Cam Shows on CAM4 | StartVagina", description: "Watch hardcore videos from cam models on CAM4. Intense, explicit and uncensored." } },
  "slavic-girls": { nl: { title: "Slavische Meisjes Video's \u2014 Oost-Europese Cam Girls op CAM4 | StartVagina", description: "Bekijk video's van Slavische cam modellen op CAM4. Prachtige Oost-Europese vrouwen met schoonheid en charme." }, en: { title: "Slavic Girls Videos \u2014 Eastern European Cam Girls on CAM4 | StartVagina", description: "Watch videos from Slavic cam models on CAM4. Beautiful Eastern European women with beauty and charm." } },
  bisexual: { nl: { title: "Biseksuele Video's \u2014 Bisexual Cam Shows op CAM4 | StartVagina", description: "Bekijk biseksuele video's van cam modellen op CAM4. Vrouwen die van beide kanten genieten." }, en: { title: "Bisexual Videos \u2014 Bisexual Cam Shows on CAM4 | StartVagina", description: "Watch bisexual videos from cam models on CAM4. Women who enjoy both sides." } },
  facesitting: { nl: { title: "Facesitting Video's \u2014 Facesitting Cam Shows op CAM4 | StartVagina", description: "Bekijk facesitting video's van cam modellen op CAM4. Dominant en sensueel \u2014 de beste facesitting content." }, en: { title: "Facesitting Videos \u2014 Facesitting Cam Shows on CAM4 | StartVagina", description: "Watch facesitting videos from cam models on CAM4. Dominant and sensual \u2014 the best facesitting content." } },
  handjob: { nl: { title: "Handjob Video's \u2014 Handjob Cam Shows op CAM4 | StartVagina", description: "Bekijk handjob video's van cam modellen op CAM4. Handmatig verwennen op z'n best." }, en: { title: "Handjob Videos \u2014 Handjob Cam Shows on CAM4 | StartVagina", description: "Watch handjob videos from cam models on CAM4. Manual pleasure at its finest." } },
  "pov-joi": { nl: { title: "POV JOI Video's \u2014 Jerk Off Instructie Cam Shows op CAM4 | StartVagina", description: "Bekijk POV JOI video's van cam modellen op CAM4. Persoonlijke instructies vanuit het eerste persoon." }, en: { title: "POV JOI Videos \u2014 Jerk Off Instruction Cam Shows on CAM4 | StartVagina", description: "Watch POV JOI videos from cam models on CAM4. Personal instructions from a first-person perspective." } },
  massage: { nl: { title: "Massage Video's \u2014 Erotische Massage Cam Shows op CAM4 | StartVagina", description: "Bekijk erotische massage video's van cam modellen op CAM4. Sensueel, ontspannend en verleidelijk." }, en: { title: "Massage Videos \u2014 Erotic Massage Cam Shows on CAM4 | StartVagina", description: "Watch erotic massage videos from cam models on CAM4. Sensual, relaxing and seductive." } },
  indian: { nl: { title: "Indiase Video's \u2014 Indian Cam Girls op CAM4 | StartVagina", description: "Bekijk video's van Indiase cam modellen op CAM4. Exotische schoonheid uit India." }, en: { title: "Indian Videos \u2014 Indian Cam Girls on CAM4 | StartVagina", description: "Watch videos from Indian cam models on CAM4. Exotic beauty from India." } },
  giantess: { nl: { title: "Giantess Video's \u2014 Giantess Fetish Cam Shows op CAM4 | StartVagina", description: "Bekijk giantess fetish video's van cam modellen op CAM4. Groots, dominant en uniek." }, en: { title: "Giantess Videos \u2014 Giantess Fetish Cam Shows on CAM4 | StartVagina", description: "Watch giantess fetish videos from cam models on CAM4. Grand, dominant and unique." } },
  asmr: { nl: { title: "ASMR Video's \u2014 ASMR Cam Shows op CAM4 | StartVagina", description: "Bekijk ASMR video's van cam modellen op CAM4. Fluisterzachte, tintelende content die je rillingen bezorgt." }, en: { title: "ASMR Videos \u2014 ASMR Cam Shows on CAM4 | StartVagina", description: "Watch ASMR videos from cam models on CAM4. Whisper-soft, tingly content that gives you chills." } },
  findom: { nl: { title: "Findom Video's \u2014 Financial Domination Cam Shows op CAM4 | StartVagina", description: "Bekijk findom video's van cam modellen op CAM4. Financi\u00eble dominatie door machtige vrouwen." }, en: { title: "Findom Videos \u2014 Financial Domination Cam Shows on CAM4 | StartVagina", description: "Watch findom videos from cam models on CAM4. Financial domination by powerful women." } },
  pegging: { nl: { title: "Pegging Video's \u2014 Pegging Cam Shows op CAM4 | StartVagina", description: "Bekijk pegging video's van cam modellen op CAM4. Rollenomkering op z'n best." }, en: { title: "Pegging Videos \u2014 Pegging Cam Shows on CAM4 | StartVagina", description: "Watch pegging videos from cam models on CAM4. Role reversal at its finest." } },
  "interracial-couple": { nl: { title: "Interracial Koppel Video's \u2014 Mixed Couple Cam Shows op CAM4 | StartVagina", description: "Bekijk interracial koppel video's op CAM4. Diverse koppels, echte passie en intieme momenten." }, en: { title: "Interracial Couple Videos \u2014 Mixed Couple Cam Shows on CAM4 | StartVagina", description: "Watch interracial couple videos on CAM4. Diverse couples, real passion and intimate moments." } },
  "big-cock": { nl: { title: "Big Cock Video's \u2014 Grote Lul Cam Shows op CAM4 | StartVagina", description: "Bekijk big cock video's op CAM4. Indrukwekkend en intens \u2014 de grootste cam content." }, en: { title: "Big Cock Videos \u2014 Big Dick Cam Shows on CAM4 | StartVagina", description: "Watch big cock videos on CAM4. Impressive and intense \u2014 the biggest cam content." } },
  "dirty-talk": { nl: { title: "Dirty Talk Video's \u2014 Dirty Talk Cam Shows op CAM4 | StartVagina", description: "Bekijk dirty talk video's van cam modellen op CAM4. Woorden die je gek maken." }, en: { title: "Dirty Talk Videos \u2014 Dirty Talk Cam Shows on CAM4 | StartVagina", description: "Watch dirty talk videos from cam models on CAM4. Words that drive you wild." } },
  threesome: { nl: { title: "Trio Video's \u2014 Threesome Cam Shows op CAM4 | StartVagina", description: "Bekijk trio video's op CAM4. Drie is niet te veel \u2014 de beste threesome cam content." }, en: { title: "Threesome Videos \u2014 Threesome Cam Shows on CAM4 | StartVagina", description: "Watch threesome videos on CAM4. Three is not a crowd \u2014 the best threesome cam content." } },
  69: { nl: { title: "69 Video's \u2014 69 Positie Cam Shows op CAM4 | StartVagina", description: "Bekijk 69 video's van cam modellen op CAM4. Gelijktijdig genieten in de klassieke 69 positie." }, en: { title: "69 Videos \u2014 69 Position Cam Shows on CAM4 | StartVagina", description: "Watch 69 videos from cam models on CAM4. Mutual pleasure in the classic 69 position." } },
  tickling: { nl: { title: "Kietelen Video's \u2014 Tickling Fetish Cam Shows op CAM4 | StartVagina", description: "Bekijk tickling fetish video's van cam modellen op CAM4. Speels, prikkelend en uniek." }, en: { title: "Tickling Videos \u2014 Tickling Fetish Cam Shows on CAM4 | StartVagina", description: "Watch tickling fetish videos from cam models on CAM4. Playful, stimulating and unique." } },
};

function getNicheSeoMeta(slug, nicheName, lang) {
  const override = NICHE_META_OVERRIDES[slug];
  if (override?.[lang]) return override[lang];
  if (override?.nl && lang !== "en") return override.nl;
  const n = nicheName.toLowerCase();
  const templates = {
    nl: { title: `${nicheName} Video's \u2014 ${nicheName} Cam Shows op CAM4 | StartVagina`, description: `Bekijk exclusieve ${n} video's van cam modellen op CAM4. Browse gratis preview content in de ${n} niche.` },
    en: { title: `${nicheName} Videos \u2014 ${nicheName} Cam Shows on CAM4 | StartVagina`, description: `Watch exclusive ${n} videos from cam models on CAM4. Browse free preview content in the ${n} niche.` },
    fr: { title: `${nicheName} Vid\u00e9os \u2014 Shows Cam ${nicheName} sur CAM4 | StartVagina`, description: `Regardez des vid\u00e9os ${n} exclusives de cam mod\u00e8les sur CAM4.` },
    de: { title: `${nicheName} Videos \u2014 ${nicheName} Cam Shows auf CAM4 | StartVagina`, description: `Schau exklusive ${n} Videos von Cam-Models auf CAM4.` },
    es: { title: `${nicheName} Videos \u2014 Shows Cam ${nicheName} en CAM4 | StartVagina`, description: `Mira videos exclusivos de ${n} de modelos cam en CAM4.` },
    it: { title: `${nicheName} Video \u2014 Show Cam ${nicheName} su CAM4 | StartVagina`, description: `Guarda video esclusivi di ${n} da modelle cam su CAM4.` },
  };
  return templates[lang] || templates.nl;
}

async function fetchNicheSlugsForPrerender() {
  try {
    const res = await fetch("https://api.cam4.com/rest/v1.0/niches?size=50&sortStrategy=MOST_POPULAR&gender=female");
    if (!res.ok) throw new Error(`API ${res.status}`);
    const data = await res.json();
    let allNiches = [...data.content];
    for (let page = 1; page < data.totalPages; page++) {
      const res2 = await fetch(`https://api.cam4.com/rest/v1.0/niches?size=50&sortStrategy=MOST_POPULAR&gender=female&page=${page}`);
      if (res2.ok) { const d2 = await res2.json(); allNiches.push(...d2.content); }
    }
    return allNiches.filter(n => n.stats && n.stats.postsCount > 0).map(n => ({ slug: n.slug, name: n.name.originalText }));
  } catch (e) {
    console.warn(`\u26a0\ufe0f  Could not fetch niche slugs: ${e.message}. Skipping niche pages.`);
    return [];
  }
}

function buildNicheBodyHtml(lang, slug, nicheName, seoDesc) {
  const navLinks = {
    nl: `<a href="/videos">Alle Niche Video's</a> | <a href="/categorieen">Categorie\u00ebn</a> | <a href="/landen">Landen</a> | <a href="/nieuwe-cam-girls">Nieuw</a> | <a href="/populairste-cam-girls">Top</a>`,
    en: `<a href="/en/videos">All Niche Videos</a> | <a href="/en/categorieen">Categories</a> | <a href="/en/landen">Countries</a> | <a href="/en/nieuwe-cam-girls">New</a> | <a href="/en/populairste-cam-girls">Top</a>`,
    fr: `<a href="/fr/videos">Toutes les Niches</a> | <a href="/fr/categorieen">Cat\u00e9gories</a> | <a href="/fr/landen">Pays</a> | <a href="/fr/nouvelle-cam-girls">Nouveau</a> | <a href="/fr/populairste-cam-girls">Top</a>`,
    de: `<a href="/de/videos">Alle Nischen</a> | <a href="/de/categorieen">Kategorien</a> | <a href="/de/landen">L\u00e4nder</a> | <a href="/de/neue-cam-girls">Neu</a> | <a href="/de/populairste-cam-girls">Top</a>`,
    es: `<a href="/es/videos">Todos los Nichos</a> | <a href="/es/categorieen">Categor\u00edas</a> | <a href="/es/landen">Pa\u00edses</a> | <a href="/es/nuevas-cam-girls">Nuevo</a> | <a href="/es/populairste-cam-girls">Top</a>`,
    it: `<a href="/it/videos">Tutte le Nicchie</a> | <a href="/it/categorieen">Categorie</a> | <a href="/it/landen">Paesi</a> | <a href="/it/nuove-cam-girls">Nuovo</a> | <a href="/it/populairste-cam-girls">Top</a>`,
  };
  const seo = getNicheSeoMeta(slug, nicheName, lang);
  const h1 = escapeHtml(seo.title.split(" | ")[0]);
  return `<div id="root"><nav aria-label="Main">${navLinks[lang] || navLinks.nl}</nav><main><h1>${h1}</h1><p>${escapeHtml(seoDesc)}</p></main><footer><p>\u00a9 ${new Date().getFullYear()} StartVagina.nl</p></footer></div>`;
}

function buildNicheIndexBodyHtml(lang) {
  const navLinks = {
    nl: `<a href="/">Home</a> | <a href="/categorieen">Categorie\u00ebn</a> | <a href="/landen">Landen</a> | <a href="/nieuwe-cam-girls">Nieuw</a> | <a href="/populairste-cam-girls">Top</a>`,
    en: `<a href="/en">Home</a> | <a href="/en/categorieen">Categories</a> | <a href="/en/landen">Countries</a> | <a href="/en/nieuwe-cam-girls">New</a> | <a href="/en/populairste-cam-girls">Top</a>`,
    fr: `<a href="/fr">Accueil</a> | <a href="/fr/categorieen">Cat\u00e9gories</a> | <a href="/fr/landen">Pays</a> | <a href="/fr/nouvelle-cam-girls">Nouveau</a> | <a href="/fr/populairste-cam-girls">Top</a>`,
    de: `<a href="/de">Startseite</a> | <a href="/de/categorieen">Kategorien</a> | <a href="/de/landen">L\u00e4nder</a> | <a href="/de/neue-cam-girls">Neu</a> | <a href="/de/populairste-cam-girls">Top</a>`,
    es: `<a href="/es">Inicio</a> | <a href="/es/categorieen">Categor\u00edas</a> | <a href="/es/landen">Pa\u00edses</a> | <a href="/es/nuevas-cam-girls">Nuevo</a> | <a href="/es/populairste-cam-girls">Top</a>`,
    it: `<a href="/it">Home</a> | <a href="/it/categorieen">Categorie</a> | <a href="/it/landen">Paesi</a> | <a href="/it/nuove-cam-girls">Nuovo</a> | <a href="/it/populairste-cam-girls">Top</a>`,
  };
  const titles = {
    nl: "Niche Video's \u2014 Cam Video Categorie\u00ebn | StartVagina",
    en: "Niche Videos \u2014 Cam Video Categories | StartVagina",
    fr: "Vid\u00e9os de Niche \u2014 Cat\u00e9gories Vid\u00e9o Cam | StartVagina",
    de: "Nischen-Videos \u2014 Cam Video Kategorien | StartVagina",
    es: "Videos de Nicho \u2014 Categor\u00edas de Video Cam | StartVagina",
    it: "Video di Nicchia \u2014 Categorie Video Cam | StartVagina",
  };
  const descs = {
    nl: "Ontdek alle niche video categorie\u00ebn op CAM4 via StartVagina. Blader door exclusieve cam video's gesorteerd op niche \u2014 van squirt tot BDSM, amateur tot latex.",
    en: "Discover all niche video categories on CAM4 via StartVagina. Browse exclusive cam videos sorted by niche \u2014 from squirt to BDSM, amateur to latex.",
    fr: "D\u00e9couvrez toutes les cat\u00e9gories de vid\u00e9os de niche sur CAM4 via StartVagina. Parcourez des vid\u00e9os cam exclusives tri\u00e9es par niche.",
    de: "Entdecke alle Nischen-Video-Kategorien auf CAM4 \u00fcber StartVagina. Durchsuche exklusive Cam Videos sortiert nach Nische.",
    es: "Descubre todas las categor\u00edas de videos de nicho en CAM4 a trav\u00e9s de StartVagina. Navega por videos cam exclusivos ordenados por nicho.",
    it: "Scopri tutte le categorie di video di nicchia su CAM4 tramite StartVagina. Sfoglia video cam esclusivi ordinati per nicchia.",
  };
  const title = titles[lang] || titles.nl;
  const desc = descs[lang] || descs.nl;
  const h1 = escapeHtml(title.split(" | ")[0]);
  return {
    title, desc,
    body: `<div id="root"><nav aria-label="Main">${navLinks[lang] || navLinks.nl}</nav><main><h1>${h1}</h1><p>${escapeHtml(desc)}</p></main><footer><p>\u00a9 ${new Date().getFullYear()} StartVagina.nl</p></footer></div>`,
  };
}

function injectMetaWithBody(htmlTemplate, metaTags, bodyHtml, lang) {
  let html = htmlTemplate.replace(/<title>[^<]*<\/title>/, "");
  html = html.replace(/<html lang="[^"]*">/, `<html lang="${lang}"`);
  html = html.replace("</head>", `    ${metaTags}\n</head>`);
  html = html.replace('<div id="root"></div>', bodyHtml);
  return html;
}

console.log("\n\ud83c\udfa5 Pre-rendering videos pages...");
const nicheSlugsData = await fetchNicheSlugsForPrerender();
console.log(`\ud83d\udce6 Fetched ${nicheSlugsData.length} niche slugs from CAM4 API`);

// Niche-videos INDEX page (all 6 langs)
for (const lang of langs) {
  const prefix = langPrefixes[lang];
  const fullSlug = prefix ? `${prefix.slice(1)}/videos` : "videos";
  const { title, desc, body } = buildNicheIndexBodyHtml(lang);
  const nicheIndexMeta = {
    title,
    description: desc,
    keywords: lang === "nl" ? "niche videos, cam video categorie\u00ebn, webcamsex niches, CAM4" :
               lang === "en" ? "niche videos, cam video categories, webcam sex niches, CAM4" :
               lang === "fr" ? "vid\u00e9os de niche, cat\u00e9gories cam, niches webcam sexe, CAM4" :
               lang === "de" ? "nischen videos, cam video kategorien, webcam sex nischen, CAM4" :
               lang === "es" ? "videos de nicho, categor\u00edas cam, nichos webcam sexo, CAM4" :
               "video di nicchia, categorie cam, nicchie webcam sex, CAM4",
  };
  const metaTags = buildMetaTags(fullSlug, nicheIndexMeta, lang);
  const html = injectMetaWithBody(template, metaTags, body, lang);
  writePage(fullSlug, html);
  count++;
}

// Niche-videos DETAIL pages (all 6 langs x all slugs)
for (const { slug, name: nicheName } of nicheSlugsData) {
  for (const lang of langs) {
    const prefix = langPrefixes[lang];
    const baseSlug = `videos/${slug}`;
    const fullSlug = prefix ? `${prefix.slice(1)}/${baseSlug}` : baseSlug;
    const seo = getNicheSeoMeta(slug, nicheName, lang);
    const nicheDetailMeta = {
      title: seo.title,
      description: seo.description,
      keywords: `${nicheName.toLowerCase()} videos, ${nicheName.toLowerCase()} cam, CAM4, StartVagina`,
    };
    const metaTags = buildMetaTags(fullSlug, nicheDetailMeta, lang);
    const bodyHtml = buildNicheBodyHtml(lang, slug, nicheName, seo.description);
    const html = injectMetaWithBody(template, metaTags, bodyHtml, lang);
    writePage(fullSlug, html);
    count++;
  }
}

const nicheCount = nicheSlugsData.length * langs.length + langs.length;
console.log(`\u2705 Pre-rendered ${nicheCount} videos pages (${langs.length} index + ${nicheSlugsData.length} \u00d7 ${langs.length} detail)`);
console.log(`\u2139\ufe0f  Model pages use SPA fallback (no static pre-render)`);
console.log(`\u2139\ufe0f  Filter pages (query strings) use SPA fallback + React Helmet`);
console.log(`\u2705 Total: ${count} pages`);
console.log(`\ud83d\udcc1 Output: ${DIST}\n`);
