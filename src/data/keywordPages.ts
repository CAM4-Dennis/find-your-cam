import type { Language } from "@/i18n/translations";

export interface KeywordConfig {
  title: string;
  h1: string;
  description: string;
  keywords: string;
  intro: string;
  faq: { q: string; a: string }[];
  faqTitle: string;
  moreTitle: string;
}

type KeywordData = Record<string, Record<Language, KeywordConfig>>;

const faqT = { nl: "Veelgestelde vragen", en: "Frequently asked questions", fr: "Questions fréquentes", de: "Häufig gestellte Fragen", es: "Preguntas frecuentes", it: "Domande frequenti" };
const moreT = { nl: "Meer op StartVagina", en: "More on StartVagina", fr: "Plus sur StartVagina", de: "Mehr auf StartVagina", es: "Más en StartVagina", it: "Altro su StartVagina" };

export const keywordPages: KeywordData = {
  webcamsex: {
    nl: {
      title: "Webcamsex — Gratis Live Webcam Sex Kijken | StartVagina",
      h1: "Webcamsex — Gratis Live Cam Shows",
      description: "Gratis webcamsex kijken met duizenden cam girls live online. De beste webcam sex van Nederland en België op één plek.",
      keywords: "webcamsex, webcam sex, gratis webcamsex, live webcam sex",
      intro: "Welkom bij StartVagina — dé plek voor gratis webcamsex. Bekijk duizenden cam modellen live vanuit Nederland, België en de rest van de wereld. Kies je favoriet platform en geniet van gratis webcam sex shows zonder registratie.",
      faq: [
        { q: "Is webcamsex gratis?", a: "Ja! Op StartVagina kun je gratis webcamsex kijken. Alle streams zijn live en zonder registratie te bekijken." },
        { q: "Welke webcamsex sites zijn het best?", a: "De populairste webcamsex sites zijn Chaturbate, Stripchat, BongaCams en CAM4. Op StartVagina verzamelen we alle modellen op één plek." },
        { q: "Is webcamsex anoniem?", a: "Ja, je kunt volledig anoniem webcamsex kijken. Je hoeft geen account aan te maken om streams te bekijken." },
      ],
      faqTitle: faqT.nl, moreTitle: moreT.nl,
    },
    en: {
      title: "Webcam Sex — Free Live Webcam Sex | StartVagina",
      h1: "Webcam Sex — Free Live Cam Shows",
      description: "Watch free webcam sex with thousands of cam girls live online. The best webcam sex from all platforms in one place.",
      keywords: "webcam sex, free webcam sex, live webcam sex",
      intro: "Welcome to StartVagina — the place for free webcam sex. Watch thousands of cam models live from around the world. Choose your favourite platform and enjoy free webcam sex shows without registration.",
      faq: [
        { q: "Is webcam sex free?", a: "Yes! On StartVagina you can watch webcam sex for free. All streams are live and can be viewed without registration." },
        { q: "Which webcam sex sites are the best?", a: "The most popular webcam sex sites are Chaturbate, Stripchat, BongaCams and CAM4. On StartVagina we collect all models in one place." },
        { q: "Is webcam sex anonymous?", a: "Yes, you can watch webcam sex completely anonymously. You don't need an account to view streams." },
      ],
      faqTitle: faqT.en, moreTitle: moreT.en,
    },
    fr: {
      title: "Webcam Sexe — Webcam Sexe Gratuit en Direct | StartVagina",
      h1: "Webcam Sexe — Shows Cam Gratuits en Direct",
      description: "Regardez du webcam sexe gratuit avec des milliers de cam girls en direct. Le meilleur du webcam sexe sur une seule page.",
      keywords: "webcam sexe, webcam sexe gratuit, cam sexe en direct",
      intro: "Bienvenue sur StartVagina — l'endroit idéal pour le webcam sexe gratuit. Regardez des milliers de modèles cam en direct du monde entier. Choisissez votre plateforme préférée et profitez de shows webcam sexe gratuits sans inscription.",
      faq: [
        { q: "Le webcam sexe est-il gratuit ?", a: "Oui ! Sur StartVagina vous pouvez regarder du webcam sexe gratuitement. Tous les streams sont en direct et visibles sans inscription." },
        { q: "Quels sites de webcam sexe sont les meilleurs ?", a: "Les sites les plus populaires sont Chaturbate, Stripchat, BongaCams et CAM4. Sur StartVagina nous rassemblons tous les modèles en un seul endroit." },
        { q: "Le webcam sexe est-il anonyme ?", a: "Oui, vous pouvez regarder du webcam sexe de manière totalement anonyme. Aucun compte n'est nécessaire." },
      ],
      faqTitle: faqT.fr, moreTitle: moreT.fr,
    },
    de: {
      title: "Webcam Sex — Gratis Live Webcam Sex | StartVagina",
      h1: "Webcam Sex — Gratis Live Cam Shows",
      description: "Gratis Webcam Sex schauen mit tausenden Cam Girls live online. Der beste Webcam Sex aller Plattformen an einem Ort.",
      keywords: "webcam sex, gratis webcam sex, live webcam sex",
      intro: "Willkommen bei StartVagina — dem Ort für gratis Webcam Sex. Schau dir tausende Cam Models live aus der ganzen Welt an. Wähle deine Lieblingsplattform und genieße gratis Webcam Sex Shows ohne Registrierung.",
      faq: [
        { q: "Ist Webcam Sex gratis?", a: "Ja! Auf StartVagina kannst du gratis Webcam Sex schauen. Alle Streams sind live und ohne Registrierung zu sehen." },
        { q: "Welche Webcam Sex Seiten sind die besten?", a: "Die beliebtesten sind Chaturbate, Stripchat, BongaCams und CAM4. Auf StartVagina sammeln wir alle Models an einem Ort." },
        { q: "Ist Webcam Sex anonym?", a: "Ja, du kannst völlig anonym Webcam Sex schauen. Du brauchst kein Konto um Streams zu sehen." },
      ],
      faqTitle: faqT.de, moreTitle: moreT.de,
    },
    es: {
      title: "Webcam Sexo — Webcam Sexo Gratis en Vivo | StartVagina",
      h1: "Webcam Sexo — Shows Cam Gratis en Vivo",
      description: "Mira webcam sexo gratis con miles de cam girls en vivo. El mejor webcam sexo de todas las plataformas en un lugar.",
      keywords: "webcam sexo, webcam sexo gratis, cam sexo en vivo",
      intro: "Bienvenido a StartVagina — el lugar para webcam sexo gratis. Mira miles de modelos cam en vivo de todo el mundo. Elige tu plataforma favorita y disfruta de shows de webcam sexo gratis sin registro.",
      faq: [
        { q: "¿Es gratis el webcam sexo?", a: "¡Sí! En StartVagina puedes ver webcam sexo gratis. Todos los streams son en vivo y se pueden ver sin registro." },
        { q: "¿Cuáles son los mejores sitios de webcam sexo?", a: "Los más populares son Chaturbate, Stripchat, BongaCams y CAM4. En StartVagina reunimos todos los modelos en un solo lugar." },
        { q: "¿El webcam sexo es anónimo?", a: "Sí, puedes ver webcam sexo de forma completamente anónima. No necesitas una cuenta para ver los streams." },
      ],
      faqTitle: faqT.es, moreTitle: moreT.es,
    },
    it: {
      title: "Webcam Sex — Webcam Sex Gratis dal Vivo | StartVagina",
      h1: "Webcam Sex — Show Cam Gratis dal Vivo",
      description: "Guarda webcam sex gratis con migliaia di cam girl in diretta. Il meglio del webcam sex da tutte le piattaforme.",
      keywords: "webcam sex, webcam sex gratis, cam sex dal vivo",
      intro: "Benvenuto su StartVagina — il posto ideale per webcam sex gratis. Guarda migliaia di modelle cam in diretta da tutto il mondo. Scegli la tua piattaforma preferita e goditi show di webcam sex gratis senza registrazione.",
      faq: [
        { q: "Il webcam sex è gratis?", a: "Sì! Su StartVagina puoi guardare webcam sex gratis. Tutti gli stream sono in diretta e visibili senza registrazione." },
        { q: "Quali sono i migliori siti di webcam sex?", a: "I più popolari sono Chaturbate, Stripchat, BongaCams e CAM4. Su StartVagina raccogliamo tutte le modelle in un unico posto." },
        { q: "Il webcam sex è anonimo?", a: "Sì, puoi guardare webcam sex in modo completamente anonimo. Non serve un account per vedere gli stream." },
      ],
      faqTitle: faqT.it, moreTitle: moreT.it,
    },
  },

  "gratis-webcam-sex": {
    nl: { title: "Gratis Webcam Sex — Live Cam Girls Zonder te Betalen | StartVagina", h1: "Gratis Webcam Sex — Live & Zonder Betalen", description: "Gratis webcam sex kijken met de mooiste cam girls. Geen creditcard nodig, geen registratie.", keywords: "gratis webcam sex, gratis cam, gratis sexcam", intro: "Op zoek naar gratis webcam sex? Bij StartVagina kijk je gratis naar duizenden live cam shows. Geen creditcard nodig, geen verborgen kosten.", faq: [{ q: "Is het echt gratis?", a: "Ja! Alle openbare cam shows zijn 100% gratis te bekijken. Je betaalt alleen als je tokens koopt." }, { q: "Heb ik een account nodig?", a: "Nee, voor het kijken van gratis webcam sex heb je geen account nodig." }], faqTitle: faqT.nl, moreTitle: moreT.nl },
    en: { title: "Free Webcam Sex — Live Cam Girls Without Paying | StartVagina", h1: "Free Webcam Sex — Live & Without Paying", description: "Watch free webcam sex with the most beautiful cam girls. No credit card needed, no registration.", keywords: "free webcam sex, free cam, free sex cam", intro: "Looking for free webcam sex? On StartVagina you can watch thousands of live cam shows for free. No credit card needed, no hidden costs.", faq: [{ q: "Is it really free?", a: "Yes! All public cam shows are 100% free to watch. You only pay if you buy tokens." }, { q: "Do I need an account?", a: "No, you don't need an account to watch free webcam sex." }], faqTitle: faqT.en, moreTitle: moreT.en },
    fr: { title: "Webcam Sexe Gratuit — Cam Girls en Direct Sans Payer | StartVagina", h1: "Webcam Sexe Gratuit — En Direct & Sans Payer", description: "Regardez du webcam sexe gratuit avec les plus belles cam girls. Pas de carte de crédit, pas d'inscription.", keywords: "webcam sexe gratuit, cam gratuit", intro: "Vous cherchez du webcam sexe gratuit ? Sur StartVagina, regardez des milliers de shows cam en direct gratuitement. Pas de carte de crédit, pas de frais cachés.", faq: [{ q: "C'est vraiment gratuit ?", a: "Oui ! Tous les shows cam publics sont 100% gratuits. Vous ne payez que si vous achetez des tokens." }, { q: "Ai-je besoin d'un compte ?", a: "Non, vous n'avez pas besoin de compte pour regarder du webcam sexe gratuit." }], faqTitle: faqT.fr, moreTitle: moreT.fr },
    de: { title: "Gratis Webcam Sex — Live Cam Girls Ohne zu Bezahlen | StartVagina", h1: "Gratis Webcam Sex — Live & Ohne zu Bezahlen", description: "Gratis Webcam Sex schauen mit den schönsten Cam Girls. Keine Kreditkarte nötig, keine Registrierung.", keywords: "gratis webcam sex, gratis cam, kostenlos webcam sex", intro: "Auf der Suche nach gratis Webcam Sex? Auf StartVagina schaust du tausende Live Cam Shows kostenlos. Keine Kreditkarte nötig, keine versteckten Kosten.", faq: [{ q: "Ist es wirklich gratis?", a: "Ja! Alle öffentlichen Cam Shows sind 100% kostenlos. Du zahlst nur wenn du Tokens kaufst." }, { q: "Brauche ich ein Konto?", a: "Nein, du brauchst kein Konto um gratis Webcam Sex zu schauen." }], faqTitle: faqT.de, moreTitle: moreT.de },
    es: { title: "Webcam Sexo Gratis — Cam Girls en Vivo Sin Pagar | StartVagina", h1: "Webcam Sexo Gratis — En Vivo & Sin Pagar", description: "Mira webcam sexo gratis con las cam girls más hermosas. Sin tarjeta de crédito, sin registro.", keywords: "webcam sexo gratis, cam gratis", intro: "¿Buscas webcam sexo gratis? En StartVagina puedes ver miles de shows cam en vivo gratis. Sin tarjeta de crédito, sin costes ocultos.", faq: [{ q: "¿Es realmente gratis?", a: "¡Sí! Todos los shows cam públicos son 100% gratis. Solo pagas si compras tokens." }, { q: "¿Necesito una cuenta?", a: "No, no necesitas una cuenta para ver webcam sexo gratis." }], faqTitle: faqT.es, moreTitle: moreT.es },
    it: { title: "Webcam Sex Gratis — Cam Girl dal Vivo Senza Pagare | StartVagina", h1: "Webcam Sex Gratis — Dal Vivo & Senza Pagare", description: "Guarda webcam sex gratis con le cam girl più belle. Nessuna carta di credito, nessuna registrazione.", keywords: "webcam sex gratis, cam gratis", intro: "Cerchi webcam sex gratis? Su StartVagina guardi migliaia di show cam dal vivo gratis. Nessuna carta di credito, nessun costo nascosto.", faq: [{ q: "È davvero gratis?", a: "Sì! Tutti gli show cam pubblici sono 100% gratuiti. Paghi solo se acquisti token." }, { q: "Ho bisogno di un account?", a: "No, non serve un account per guardare webcam sex gratis." }], faqTitle: faqT.it, moreTitle: moreT.it },
  },

  sexchat: {
    nl: { title: "Sexchat — Live Sex Chat met Cam Girls | StartVagina", h1: "Sexchat — Live Chatten met Cam Modellen", description: "Start een sexchat met duizenden live cam girls. Gratis sex chatten op Chaturbate, Stripchat en BongaCams.", keywords: "sexchat, sex chat, gratis sexchat, live sexchat", intro: "Zin in een spannende sexchat? Op StartVagina vind je duizenden cam modellen die live online zijn en klaar staan voor een erotische chat.", faq: [{ q: "Hoe werkt sexchat?", a: "Je kiest een model dat online is, opent de stream en typt je bericht in de chat. Voor een privé sexchat kun je een privé show aanvragen." }, { q: "Is sexchat veilig?", a: "Ja, sexchatten via de grote cam platforms is veilig. Je bent anoniem en de platforms hebben strikte privacy-regels." }], faqTitle: faqT.nl, moreTitle: moreT.nl },
    en: { title: "Sex Chat — Live Sex Chat with Cam Girls | StartVagina", h1: "Sex Chat — Chat Live with Cam Models", description: "Start a sex chat with thousands of live cam girls. Free sex chatting on Chaturbate, Stripchat and BongaCams.", keywords: "sex chat, live sex chat, free sex chat", intro: "In the mood for an exciting sex chat? On StartVagina you'll find thousands of cam models who are live and ready for an erotic chat.", faq: [{ q: "How does sex chat work?", a: "Choose a model that's online, open the stream and type your message in the chat. For a private sex chat you can request a private show." }, { q: "Is sex chat safe?", a: "Yes, sex chatting via the major cam platforms is safe. You're anonymous and the platforms have strict privacy policies." }], faqTitle: faqT.en, moreTitle: moreT.en },
    fr: { title: "Chat Sexe — Chat Sexe en Direct avec Cam Girls | StartVagina", h1: "Chat Sexe — Chattez en Direct avec des Modèles Cam", description: "Commencez un chat sexe avec des milliers de cam girls en direct. Chat sexe gratuit sur Chaturbate, Stripchat et BongaCams.", keywords: "chat sexe, chat sexe en direct, chat sexe gratuit", intro: "Envie d'un chat sexe excitant ? Sur StartVagina, trouvez des milliers de modèles cam en direct prêtes pour un chat érotique.", faq: [{ q: "Comment fonctionne le chat sexe ?", a: "Choisissez un modèle en ligne, ouvrez le stream et tapez votre message dans le chat. Pour un chat sexe privé, demandez un show privé." }, { q: "Le chat sexe est-il sûr ?", a: "Oui, chatter via les grandes plateformes cam est sûr. Vous êtes anonyme et les plateformes ont des règles de confidentialité strictes." }], faqTitle: faqT.fr, moreTitle: moreT.fr },
    de: { title: "Sexchat — Live Sex Chat mit Cam Girls | StartVagina", h1: "Sexchat — Live Chatten mit Cam Models", description: "Starte einen Sexchat mit tausenden Live Cam Girls. Gratis Sex chatten auf Chaturbate, Stripchat und BongaCams.", keywords: "sexchat, sex chat, gratis sexchat, live sexchat", intro: "Lust auf einen aufregenden Sexchat? Auf StartVagina findest du tausende Cam Models die live online sind und bereit für einen erotischen Chat.", faq: [{ q: "Wie funktioniert Sexchat?", a: "Wähle ein Model das online ist, öffne den Stream und tippe deine Nachricht in den Chat. Für einen privaten Sexchat kannst du eine Privat-Show anfragen." }, { q: "Ist Sexchat sicher?", a: "Ja, Sexchatten über die großen Cam Plattformen ist sicher. Du bist anonym und die Plattformen haben strenge Datenschutzregeln." }], faqTitle: faqT.de, moreTitle: moreT.de },
    es: { title: "Chat Sexual — Chat Sexual en Vivo con Cam Girls | StartVagina", h1: "Chat Sexual — Chatea en Vivo con Modelos Cam", description: "Inicia un chat sexual con miles de cam girls en vivo. Chat sexual gratis en Chaturbate, Stripchat y BongaCams.", keywords: "chat sexual, chat sexual en vivo, chat sexual gratis", intro: "¿Quieres un chat sexual emocionante? En StartVagina encontrarás miles de modelos cam en vivo listas para un chat erótico.", faq: [{ q: "¿Cómo funciona el chat sexual?", a: "Elige una modelo que esté en línea, abre el stream y escribe tu mensaje en el chat. Para un chat sexual privado puedes solicitar un show privado." }, { q: "¿Es seguro el chat sexual?", a: "Sí, chatear a través de las grandes plataformas cam es seguro. Eres anónimo y las plataformas tienen políticas de privacidad estrictas." }], faqTitle: faqT.es, moreTitle: moreT.es },
    it: { title: "Chat Erotica — Chat Erotica dal Vivo con Cam Girl | StartVagina", h1: "Chat Erotica — Chatta dal Vivo con Modelle Cam", description: "Inizia una chat erotica con migliaia di cam girl in diretta. Chat erotica gratuita su Chaturbate, Stripchat e BongaCams.", keywords: "chat erotica, chat erotica dal vivo, chat erotica gratis", intro: "Voglia di una chat erotica eccitante? Su StartVagina trovi migliaia di modelle cam in diretta pronte per una chat erotica.", faq: [{ q: "Come funziona la chat erotica?", a: "Scegli una modella online, apri lo stream e scrivi il tuo messaggio nella chat. Per una chat erotica privata puoi richiedere uno show privato." }, { q: "La chat erotica è sicura?", a: "Sì, chattare tramite le grandi piattaforme cam è sicuro. Sei anonimo e le piattaforme hanno regole di privacy rigorose." }], faqTitle: faqT.it, moreTitle: moreT.it },
  },

  "cam-girls": {
    nl: { title: "Cam Girls — De Mooiste Live Cam Meisjes | StartVagina", h1: "Cam Girls — Live Cam Meisjes Online", description: "Bekijk de mooiste cam girls live op StartVagina. Duizenden cam meisjes van alle platforms op één plek.", keywords: "cam girls, cam meisjes, live cam girls", intro: "Op StartVagina vind je de mooiste cam girls van de populairste platforms. Of je nu houdt van Nederlandse cam meisjes, Latijns-Amerikaanse schoonheden of Oost-Europese modellen — hier vind je ze allemaal live.", faq: [{ q: "Hoeveel cam girls zijn er online?", a: "Op elk moment zijn er duizenden cam girls online. StartVagina toont modellen van alle grote platforms — samen goed voor 10.000+ live cam girls." }, { q: "Kan ik cam girls filteren?", a: "Ja! Gebruik onze filters om cam girls te zoeken op platform, categorie, land of tags." }], faqTitle: faqT.nl, moreTitle: moreT.nl },
    en: { title: "Cam Girls — The Most Beautiful Live Cam Girls | StartVagina", h1: "Cam Girls — Live Cam Girls Online", description: "Watch the most beautiful cam girls live on StartVagina. Thousands of cam girls from all platforms in one place.", keywords: "cam girls, webcam girls, live cam girls", intro: "On StartVagina you'll find the most beautiful cam girls from the most popular platforms. Whether you like Dutch cam girls, Latin American beauties or Eastern European models — you'll find them all live here.", faq: [{ q: "How many cam girls are online?", a: "At any moment there are thousands of cam girls online. StartVagina shows models from all major platforms — over 10,000+ live cam girls." }, { q: "Can I filter cam girls?", a: "Yes! Use our filters to search cam girls by platform, category, country or tags." }], faqTitle: faqT.en, moreTitle: moreT.en },
    fr: { title: "Cam Girls — Les Plus Belles Cam Girls en Direct | StartVagina", h1: "Cam Girls — Cam Girls en Direct", description: "Regardez les plus belles cam girls en direct sur StartVagina. Des milliers de cam girls de toutes les plateformes.", keywords: "cam girls, webcam girls, cam girls en direct", intro: "Sur StartVagina, trouvez les plus belles cam girls des plateformes les plus populaires. Que vous aimiez les cam girls néerlandaises, les beautés latino-américaines ou les modèles d'Europe de l'Est — vous les trouverez toutes en direct ici.", faq: [{ q: "Combien de cam girls sont en ligne ?", a: "À tout moment il y a des milliers de cam girls en ligne. StartVagina affiche des modèles de toutes les grandes plateformes — plus de 10 000 cam girls en direct." }, { q: "Puis-je filtrer les cam girls ?", a: "Oui ! Utilisez nos filtres pour rechercher des cam girls par plateforme, catégorie, pays ou tags." }], faqTitle: faqT.fr, moreTitle: moreT.fr },
    de: { title: "Cam Girls — Die Schönsten Live Cam Girls | StartVagina", h1: "Cam Girls — Live Cam Girls Online", description: "Schau dir die schönsten Cam Girls live auf StartVagina an. Tausende Cam Girls aller Plattformen an einem Ort.", keywords: "cam girls, webcam girls, live cam girls", intro: "Auf StartVagina findest du die schönsten Cam Girls der beliebtesten Plattformen. Ob niederländische Cam Girls, lateinamerikanische Schönheiten oder osteuropäische Models — hier findest du alle live.", faq: [{ q: "Wie viele Cam Girls sind online?", a: "Zu jeder Zeit sind tausende Cam Girls online. StartVagina zeigt Models aller großen Plattformen — über 10.000 Live Cam Girls." }, { q: "Kann ich Cam Girls filtern?", a: "Ja! Nutze unsere Filter um Cam Girls nach Plattform, Kategorie, Land oder Tags zu suchen." }], faqTitle: faqT.de, moreTitle: moreT.de },
    es: { title: "Cam Girls — Las Cam Girls Más Hermosas en Vivo | StartVagina", h1: "Cam Girls — Cam Girls en Vivo", description: "Mira las cam girls más hermosas en vivo en StartVagina. Miles de cam girls de todas las plataformas.", keywords: "cam girls, webcam girls, cam girls en vivo", intro: "En StartVagina encontrarás las cam girls más hermosas de las plataformas más populares. Ya te gusten las cam girls holandesas, las bellezas latinoamericanas o las modelos de Europa del Este — aquí las encontrarás todas en vivo.", faq: [{ q: "¿Cuántas cam girls están en línea?", a: "En cualquier momento hay miles de cam girls en línea. StartVagina muestra modelos de todas las grandes plataformas — más de 10.000 cam girls en vivo." }, { q: "¿Puedo filtrar cam girls?", a: "¡Sí! Usa nuestros filtros para buscar cam girls por plataforma, categoría, país o tags." }], faqTitle: faqT.es, moreTitle: moreT.es },
    it: { title: "Cam Girl — Le Cam Girl Più Belle dal Vivo | StartVagina", h1: "Cam Girl — Cam Girl dal Vivo", description: "Guarda le cam girl più belle in diretta su StartVagina. Migliaia di cam girl da tutte le piattaforme.", keywords: "cam girl, webcam girl, cam girl dal vivo", intro: "Su StartVagina trovi le cam girl più belle dalle piattaforme più popolari. Che ti piacciano le cam girl olandesi, le bellezze latinoamericane o le modelle dell'Europa dell'Est — qui le trovi tutte in diretta.", faq: [{ q: "Quante cam girl sono online?", a: "In qualsiasi momento ci sono migliaia di cam girl online. StartVagina mostra modelle da tutte le grandi piattaforme — oltre 10.000 cam girl in diretta." }, { q: "Posso filtrare le cam girl?", a: "Sì! Usa i nostri filtri per cercare cam girl per piattaforma, categoria, paese o tags." }], faqTitle: faqT.it, moreTitle: moreT.it },
  },

  "live-sex-cams": {
    nl: { title: "Live Sex Cams — Gratis Live Webcam Shows | StartVagina", h1: "Live Sex Cams — Nu Live Kijken", description: "Live sex cams kijken met duizenden modellen. Gratis live webcam shows 24/7 online.", keywords: "live sex cams, live cam sex, live webcam sex", intro: "Ontdek duizenden live sex cams op StartVagina. Real-time welke modellen nu online zijn op de grootste cam sites. 24/7 — er is altijd iemand live.", faq: [{ q: "Zijn de cams echt live?", a: "Ja! Alle streams op StartVagina zijn 100% live. We tonen real-time data van de cam platforms." }, { q: "Op welke tijden zijn de meeste cams online?", a: "De meeste modellen zijn online tussen 20:00 en 02:00 CET. Maar er zijn 24/7 duizenden cams beschikbaar." }], faqTitle: faqT.nl, moreTitle: moreT.nl },
    en: { title: "Live Sex Cams — Free Live Webcam Shows | StartVagina", h1: "Live Sex Cams — Watch Live Now", description: "Watch live sex cams with thousands of models. Free live webcam shows online 24/7.", keywords: "live sex cams, live cam sex, live webcam sex", intro: "Discover thousands of live sex cams on StartVagina. See in real-time which models are online on the biggest cam sites. 24/7 — there's always someone live.", faq: [{ q: "Are the cams really live?", a: "Yes! All streams on StartVagina are 100% live. We show real-time data from the cam platforms." }, { q: "What times are most cams online?", a: "Most models are online between 8 PM and 2 AM CET. But since our models come from around the world, thousands of cams are available 24/7." }], faqTitle: faqT.en, moreTitle: moreT.en },
    fr: { title: "Cams en Direct — Shows Cam Gratuits en Direct | StartVagina", h1: "Cams en Direct — Regarder Maintenant", description: "Regardez des cams en direct avec des milliers de modèles. Shows webcam gratuits en direct 24/7.", keywords: "cams en direct, cam en direct, webcam en direct", intro: "Découvrez des milliers de cams en direct sur StartVagina. Voyez en temps réel quels modèles sont en ligne. 24/7 — il y a toujours quelqu'un en direct.", faq: [{ q: "Les cams sont-elles vraiment en direct ?", a: "Oui ! Tous les streams sur StartVagina sont 100% en direct. Nous affichons des données en temps réel." }, { q: "À quelles heures y a-t-il le plus de cams ?", a: "La plupart des modèles sont en ligne entre 20h et 2h CET. Mais des milliers de cams sont disponibles 24/7." }], faqTitle: faqT.fr, moreTitle: moreT.fr },
    de: { title: "Live Sex Cams — Gratis Live Webcam Shows | StartVagina", h1: "Live Sex Cams — Jetzt Live Ansehen", description: "Live Sex Cams schauen mit tausenden Models. Gratis Live Webcam Shows 24/7 online.", keywords: "live sex cams, live cam sex, live webcam sex", intro: "Entdecke tausende Live Sex Cams auf StartVagina. Sieh in Echtzeit welche Models auf den größten Cam Seiten online sind. 24/7 — es ist immer jemand live.", faq: [{ q: "Sind die Cams wirklich live?", a: "Ja! Alle Streams auf StartVagina sind 100% live. Wir zeigen Echtzeit-Daten der Cam Plattformen." }, { q: "Zu welchen Zeiten sind die meisten Cams online?", a: "Die meisten Models sind zwischen 20:00 und 02:00 Uhr CET online. Aber es sind 24/7 tausende Cams verfügbar." }], faqTitle: faqT.de, moreTitle: moreT.de },
    es: { title: "Cams en Vivo — Shows Cam Gratis en Directo | StartVagina", h1: "Cams en Vivo — Ver en Directo Ahora", description: "Mira cams en vivo con miles de modelos. Shows webcam gratis en directo 24/7.", keywords: "cams en vivo, cam en vivo, webcam en vivo", intro: "Descubre miles de cams en vivo en StartVagina. Ve en tiempo real qué modelos están en línea. 24/7 — siempre hay alguien en directo.", faq: [{ q: "¿Las cams son realmente en vivo?", a: "¡Sí! Todos los streams en StartVagina son 100% en vivo. Mostramos datos en tiempo real." }, { q: "¿A qué horas hay más cams en línea?", a: "La mayoría de modelos están en línea entre las 20:00 y las 02:00 CET. Pero hay miles de cams disponibles 24/7." }], faqTitle: faqT.es, moreTitle: moreT.es },
    it: { title: "Cam dal Vivo — Show Cam Gratis in Diretta | StartVagina", h1: "Cam dal Vivo — Guarda in Diretta Ora", description: "Guarda cam dal vivo con migliaia di modelle. Show webcam gratis in diretta 24/7.", keywords: "cam dal vivo, cam in diretta, webcam dal vivo", intro: "Scopri migliaia di cam dal vivo su StartVagina. Vedi in tempo reale quali modelle sono online. 24/7 — c'è sempre qualcuno in diretta.", faq: [{ q: "Le cam sono davvero dal vivo?", a: "Sì! Tutti gli stream su StartVagina sono 100% dal vivo. Mostriamo dati in tempo reale." }, { q: "A che ore ci sono più cam online?", a: "La maggior parte delle modelle è online tra le 20:00 e le 02:00 CET. Ma migliaia di cam sono disponibili 24/7." }], faqTitle: faqT.it, moreTitle: moreT.it },
  },
};

/** Get translated keyword page config */
export function getKeywordConfig(slug: string, lang: Language): KeywordConfig | null {
  const page = keywordPages[slug];
  if (!page) return null;
  return page[lang] || page.nl;
}
