import type { CamModel } from "@/types/cam";
import { getLanguageNames } from "@/lib/languageNames";

interface ProfileSection {
  title: string;
  content: string;
}

/** Platform descriptions per language */
const platformInfo: Record<string, Record<string, { desc: string; features: string; tip: string }>> = {
  nl: {
    CAM4: {
      desc: "CAM4 is een van de langstlopende cam platforms (sinds 2007) en staat bekend om authentieke amateurshows en een sterke Europese community.",
      features: "Gratis kijken, HD-streams, interactieve chat, koppels, en een groot aanbod Nederlandse en Belgische modellen.",
      tip: "Tip: maak een gratis account aan op CAM4 om te chatten en je favoriete modellen op te slaan.",
    },
    Chaturbate: {
      desc: "Chaturbate is het grootste webcam platform ter wereld met duizenden live modellen op elk moment van de dag.",
      features: "Gratis shows, token-systeem voor tips, interactieve toys (Lovense), HD & 4K streams, en een enorme variatie aan modellen.",
      tip: "Tip: veel Chaturbate modellen gebruiken interactieve vibrators die reageren op tips — probeer het eens!",
    },
    BongaCams: {
      desc: "BongaCams is een populair Europees cam platform met een groot aanbod modellen uit Oost-Europa en Rusland.",
      features: "Gratis toegang, HD-kwaliteit, privéshows, groepsshows, en regelmatige promoties en wedstrijden.",
      tip: "Tip: BongaCams heeft regelmatig promoties waarbij je extra credits krijgt — ideaal om privéshows te proberen.",
    },
    Stripchat: {
      desc: "Stripchat is een innovatief cam platform dat als eerste VR-cams introduceerde en bekend staat om uitgebreide zoekfilters.",
      features: "Gratis shows, VR-ondersteuning, interactieve toys, uitgebreide categorieën, en een van de grootste modelbestanden.",
      tip: "Tip: gebruik de geavanceerde filters van Stripchat om precies het type model te vinden dat je zoekt.",
    },
    XCams: {
      desc: "XCams is een premium Europees cam platform gespecialiseerd in hoogwaardige shows met professionele modellen.",
      features: "Europese modellen, professionele kwaliteit, privéshows, en een intimere kijkervaring dan de grote platforms.",
      tip: "Tip: XCams heeft een kleiner maar kwalitatief hoger aanbod — ideaal als je kwaliteit boven kwantiteit stelt.",
    },
    Jerkmate: {
      desc: "Jerkmate is een cam-aggregator die modellen van meerdere platforms samenbrengt op één plek.",
      features: "Multi-platform modellen, live iframe streams, geen apart account nodig, en een enorm gecombineerd aanbod.",
      tip: "Tip: via StartVagina kun je Jerkmate modellen direct in je browser bekijken zonder tabbladen te wisselen.",
    },
    "Flirt4Free": {
      desc: "Flirt4Free is een premium cam platform dat zich richt op hoogwaardige shows met professionele modellen.",
      features: "HD-streams, privéshows, multi-user shows, en een uitgebreid aanbod aan categorieën inclusief fetisj.",
      tip: "Tip: Flirt4Free biedt regelmatig gratis credits aan nieuwe gebruikers — perfect om het platform te verkennen.",
    },
    Islive: {
      desc: "Islive is het grootste Nederlandse cam platform, populair bij Nederlandse en Belgische modellen en kijkers.",
      features: "Nederlandstalige modellen, freechat, privéshows, cam-to-cam, interactieve toys, en een lokale community.",
      tip: "Tip: Islive is ideaal als je op zoek bent naar Nederlandstalige modellen die je eigen taal spreken.",
    },
  },
  en: {
    CAM4: {
      desc: "CAM4 is one of the longest-running cam platforms (since 2007), known for authentic amateur shows and a strong European community.",
      features: "Free viewing, HD streams, interactive chat, couples, and a large selection of European models.",
      tip: "Tip: create a free CAM4 account to chat and save your favorite models.",
    },
    Chaturbate: {
      desc: "Chaturbate is the world's largest webcam platform with thousands of live models at any time of day.",
      features: "Free shows, token tipping system, interactive toys (Lovense), HD & 4K streams, and an enormous variety of models.",
      tip: "Tip: many Chaturbate models use interactive vibrators that respond to tips — try it out!",
    },
    BongaCams: {
      desc: "BongaCams is a popular European cam platform with a large selection of models from Eastern Europe and Russia.",
      features: "Free access, HD quality, private shows, group shows, and regular promotions and contests.",
      tip: "Tip: BongaCams regularly runs promotions with bonus credits — perfect for trying private shows.",
    },
    Stripchat: {
      desc: "Stripchat is an innovative cam platform that pioneered VR cams and is known for its extensive search filters.",
      features: "Free shows, VR support, interactive toys, extensive categories, and one of the largest model databases.",
      tip: "Tip: use Stripchat's advanced filters to find exactly the type of model you're looking for.",
    },
    XCams: {
      desc: "XCams is a premium European cam platform specializing in high-quality shows with professional models.",
      features: "European models, professional quality, private shows, and a more intimate viewing experience.",
      tip: "Tip: XCams has a smaller but higher quality selection — ideal if you value quality over quantity.",
    },
    Jerkmate: {
      desc: "Jerkmate is a cam aggregator that brings together models from multiple platforms in one place.",
      features: "Multi-platform models, live iframe streams, no separate account needed, and a huge combined selection.",
      tip: "Tip: through StartVagina you can watch Jerkmate models directly in your browser.",
    },
    "Flirt4Free": {
      desc: "Flirt4Free is a premium cam platform focused on high-quality shows with professional models.",
      features: "HD streams, private shows, multi-user shows, and an extensive range of categories including fetish.",
      tip: "Tip: Flirt4Free regularly offers free credits to new users — perfect for exploring the platform.",
    },
    Islive: {
      desc: "Islive is the largest Dutch cam platform, popular among Dutch and Belgian models and viewers.",
      features: "Dutch-speaking models, free chat, private shows, cam-to-cam, interactive toys, and a local community.",
      tip: "Tip: Islive is ideal if you're looking for Dutch-speaking models who speak your language.",
    },
  },
  fr: {
    CAM4: { desc: "CAM4 est l'une des plus anciennes plateformes cam (depuis 2007), connue pour ses shows amateurs authentiques et sa communauté européenne.", features: "Visionnage gratuit, streams HD, chat interactif, couples, et un large choix de modèles européens.", tip: "Astuce : créez un compte gratuit sur CAM4 pour chatter et sauvegarder vos modèles favoris." },
    Chaturbate: { desc: "Chaturbate est la plus grande plateforme webcam au monde avec des milliers de modèles en direct à tout moment.", features: "Shows gratuits, système de pourboires, jouets interactifs (Lovense), streams HD & 4K, et une énorme variété de modèles.", tip: "Astuce : de nombreux modèles Chaturbate utilisent des vibrateurs interactifs qui répondent aux pourboires !" },
    BongaCams: { desc: "BongaCams est une plateforme cam européenne populaire avec un grand choix de modèles d'Europe de l'Est.", features: "Accès gratuit, qualité HD, shows privés, shows de groupe, et des promotions régulières.", tip: "Astuce : BongaCams propose régulièrement des crédits bonus — idéal pour essayer les shows privés." },
    Stripchat: { desc: "Stripchat est une plateforme cam innovante, pionnière des cams VR et connue pour ses filtres de recherche avancés.", features: "Shows gratuits, support VR, jouets interactifs, catégories étendues, et l'une des plus grandes bases de modèles.", tip: "Astuce : utilisez les filtres avancés de Stripchat pour trouver exactement le type de modèle que vous cherchez." },
    XCams: { desc: "XCams est une plateforme cam européenne premium spécialisée dans les shows de haute qualité.", features: "Modèles européens, qualité professionnelle, shows privés, et une expérience plus intime.", tip: "Astuce : XCams offre une sélection plus petite mais de meilleure qualité." },
    Jerkmate: { desc: "Jerkmate est un agrégateur cam qui rassemble des modèles de plusieurs plateformes en un seul endroit.", features: "Modèles multi-plateformes, streams iframe en direct, pas de compte séparé nécessaire.", tip: "Astuce : via StartVagina, regardez les modèles Jerkmate directement dans votre navigateur." },
    "Flirt4Free": { desc: "Flirt4Free est une plateforme cam premium axée sur des shows de haute qualité avec des modèles professionnels.", features: "Streams HD, shows privés, shows multi-utilisateurs, et une gamme étendue de catégories.", tip: "Astuce : Flirt4Free offre régulièrement des crédits gratuits aux nouveaux utilisateurs." },
    Islive: { desc: "Islive est la plus grande plateforme cam néerlandaise, populaire parmi les modèles et spectateurs néerlandais et belges.", features: "Modèles néerlandophones, chat gratuit, shows privés, cam-to-cam, jouets interactifs.", tip: "Astuce : Islive est idéal si vous cherchez des modèles néerlandophones." },
  },
  de: {
    CAM4: { desc: "CAM4 ist eine der ältesten Cam-Plattformen (seit 2007), bekannt für authentische Amateur-Shows und eine starke europäische Community.", features: "Kostenloses Zuschauen, HD-Streams, interaktiver Chat, Paare und eine große Auswahl an europäischen Models.", tip: "Tipp: Erstelle ein kostenloses CAM4-Konto, um zu chatten und deine Lieblingsmodels zu speichern." },
    Chaturbate: { desc: "Chaturbate ist die weltweit größte Webcam-Plattform mit Tausenden von Live-Models zu jeder Tageszeit.", features: "Kostenlose Shows, Token-Trinkgeld-System, interaktive Toys (Lovense), HD- & 4K-Streams und eine enorme Vielfalt.", tip: "Tipp: Viele Chaturbate-Models verwenden interaktive Vibratoren, die auf Trinkgelder reagieren!" },
    BongaCams: { desc: "BongaCams ist eine beliebte europäische Cam-Plattform mit vielen Models aus Osteuropa und Russland.", features: "Kostenloser Zugang, HD-Qualität, Privatshows, Gruppenshows und regelmäßige Aktionen.", tip: "Tipp: BongaCams bietet regelmäßig Bonus-Credits — ideal zum Ausprobieren von Privatshows." },
    Stripchat: { desc: "Stripchat ist eine innovative Cam-Plattform, Pionier bei VR-Cams und bekannt für umfangreiche Suchfilter.", features: "Kostenlose Shows, VR-Unterstützung, interaktive Toys, umfangreiche Kategorien und eine der größten Model-Datenbanken.", tip: "Tipp: Nutze die erweiterten Filter von Stripchat, um genau das richtige Model zu finden." },
    XCams: { desc: "XCams ist eine Premium-Cam-Plattform, spezialisiert auf hochwertige Shows mit europäischen Models.", features: "Europäische Models, professionelle Qualität, Privatshows und ein intimeres Erlebnis.", tip: "Tipp: XCams hat ein kleineres, aber qualitativ hochwertigeres Angebot." },
    Jerkmate: { desc: "Jerkmate ist ein Cam-Aggregator, der Models von mehreren Plattformen an einem Ort zusammenbringt.", features: "Multi-Plattform-Models, Live-Iframe-Streams, kein separates Konto erforderlich.", tip: "Tipp: Über StartVagina kannst du Jerkmate-Models direkt im Browser ansehen." },
    "Flirt4Free": { desc: "Flirt4Free ist eine Premium-Cam-Plattform mit Fokus auf hochwertige Shows mit professionellen Models.", features: "HD-Streams, Privatshows, Multi-User-Shows und eine große Auswahl an Kategorien.", tip: "Tipp: Flirt4Free bietet regelmäßig kostenlose Credits für neue Nutzer." },
    Islive: { desc: "Islive ist die größte niederländische Cam-Plattform, beliebt bei niederländischen und belgischen Models und Zuschauern.", features: "Niederländischsprachige Models, kostenloser Chat, Privatshows, Cam-to-Cam, interaktive Toys.", tip: "Tipp: Islive ist ideal, wenn du niederländischsprachige Models suchst." },
  },
  es: {
    CAM4: { desc: "CAM4 es una de las plataformas cam más antiguas (desde 2007), conocida por sus shows amateurs auténticos y su comunidad europea.", features: "Visualización gratuita, streams HD, chat interactivo, parejas y una gran selección de modelos europeos.", tip: "Consejo: crea una cuenta gratuita en CAM4 para chatear y guardar tus modelos favoritos." },
    Chaturbate: { desc: "Chaturbate es la plataforma webcam más grande del mundo con miles de modelos en vivo en cualquier momento.", features: "Shows gratuitos, sistema de propinas con tokens, juguetes interactivos (Lovense), streams HD y 4K, y una enorme variedad.", tip: "Consejo: muchos modelos de Chaturbate usan vibradores interactivos que responden a las propinas." },
    BongaCams: { desc: "BongaCams es una popular plataforma cam europea con muchos modelos de Europa del Este y Rusia.", features: "Acceso gratuito, calidad HD, shows privados, shows grupales y promociones regulares.", tip: "Consejo: BongaCams ofrece regularmente créditos bonus — ideal para probar shows privados." },
    Stripchat: { desc: "Stripchat es una plataforma cam innovadora, pionera en cams VR y conocida por sus filtros de búsqueda avanzados.", features: "Shows gratuitos, soporte VR, juguetes interactivos, categorías extensas y una de las bases de modelos más grandes.", tip: "Consejo: usa los filtros avanzados de Stripchat para encontrar exactamente el tipo de modelo que buscas." },
    XCams: { desc: "XCams es una plataforma cam premium europea especializada en shows de alta calidad con modelos profesionales.", features: "Modelos europeos, calidad profesional, shows privados y una experiencia más íntima.", tip: "Consejo: XCams tiene una selección más pequeña pero de mayor calidad." },
    Jerkmate: { desc: "Jerkmate es un agregador cam que reúne modelos de múltiples plataformas en un solo lugar.", features: "Modelos multi-plataforma, streams iframe en vivo, sin cuenta separada necesaria.", tip: "Consejo: a través de StartVagina puedes ver modelos de Jerkmate directamente en tu navegador." },
    "Flirt4Free": { desc: "Flirt4Free es una plataforma cam premium enfocada en shows de alta calidad con modelos profesionales.", features: "Streams HD, shows privados, shows multi-usuario y una amplia gama de categorías.", tip: "Consejo: Flirt4Free ofrece regularmente créditos gratis a nuevos usuarios." },
    Islive: { desc: "Islive es la plataforma cam holandesa más grande, popular entre modelos y espectadores holandeses y belgas.", features: "Modelos de habla neerlandesa, chat gratuito, shows privados, cam-to-cam, juguetes interactivos.", tip: "Consejo: Islive es ideal si buscas modelos que hablen neerlandés." },
  },
  it: {
    CAM4: { desc: "CAM4 è una delle più longeve piattaforme cam (dal 2007), nota per show amatoriali autentici e una forte comunità europea.", features: "Visione gratuita, stream HD, chat interattiva, coppie e un'ampia selezione di modelle europee.", tip: "Consiglio: crea un account gratuito su CAM4 per chattare e salvare le tue modelle preferite." },
    Chaturbate: { desc: "Chaturbate è la più grande piattaforma webcam al mondo con migliaia di modelle dal vivo in ogni momento.", features: "Show gratuiti, sistema di mance con token, giocattoli interattivi (Lovense), stream HD e 4K, e un'enorme varietà.", tip: "Consiglio: molte modelle di Chaturbate usano vibratori interattivi che rispondono alle mance!" },
    BongaCams: { desc: "BongaCams è una popolare piattaforma cam europea con molte modelle dall'Europa dell'Est e dalla Russia.", features: "Accesso gratuito, qualità HD, show privati, show di gruppo e promozioni regolari.", tip: "Consiglio: BongaCams offre regolarmente crediti bonus — ideale per provare gli show privati." },
    Stripchat: { desc: "Stripchat è una piattaforma cam innovativa, pioniera delle cam VR e nota per i suoi filtri di ricerca avanzati.", features: "Show gratuiti, supporto VR, giocattoli interattivi, categorie estese e uno dei più grandi database di modelle.", tip: "Consiglio: usa i filtri avanzati di Stripchat per trovare esattamente il tipo di modella che cerchi." },
    XCams: { desc: "XCams è una piattaforma cam premium europea specializzata in show di alta qualità con modelle professioniste.", features: "Modelle europee, qualità professionale, show privati e un'esperienza più intima.", tip: "Consiglio: XCams ha una selezione più piccola ma di qualità superiore." },
    Jerkmate: { desc: "Jerkmate è un aggregatore cam che riunisce modelle da più piattaforme in un unico posto.", features: "Modelle multi-piattaforma, stream iframe dal vivo, nessun account separato necessario.", tip: "Consiglio: tramite StartVagina puoi guardare le modelle Jerkmate direttamente nel browser." },
    "Flirt4Free": { desc: "Flirt4Free è una piattaforma cam premium focalizzata su show di alta qualità con modelle professioniste.", features: "Stream HD, show privati, show multi-utente e un'ampia gamma di categorie.", tip: "Consiglio: Flirt4Free offre regolarmente crediti gratuiti ai nuovi utenti." },
    Islive: { desc: "Islive è la più grande piattaforma cam olandese, popolare tra modelle e spettatori olandesi e belgi.", features: "Modelle di lingua olandese, chat gratuita, show privati, cam-to-cam, giocattoli interattivi.", tip: "Consiglio: Islive è ideale se cerchi modelle che parlano olandese." },
  },
};

/** Show type descriptions */
const showTypeInfo: Record<string, Record<string, string>> = {
  nl: {
    public: "Deze show is gratis en openbaar — iedereen kan meekijken zonder account of betaling. Dit is de perfecte manier om een model te leren kennen voordat je besluit om een privéshow te starten.",
    private: "Dit is een privéshow — een exclusieve één-op-één ervaring met het model. Privéshows bieden de meest persoonlijke en interactieve ervaring op het platform.",
    group: "Dit is een groepsshow waar meerdere kijkers samen bijdragen. Groepsshows zijn goedkoper dan privéshows en bieden toch een interactieve ervaring.",
    away: "Dit model is momenteel even weg maar kan elk moment terugkomen. Bewaar het profiel als favoriet om een melding te krijgen wanneer ze weer live gaat.",
  },
  en: {
    public: "This show is free and public — anyone can watch without an account or payment. This is the perfect way to get to know a model before deciding to start a private show.",
    private: "This is a private show — an exclusive one-on-one experience with the model. Private shows offer the most personal and interactive experience on the platform.",
    group: "This is a group show where multiple viewers contribute together. Group shows are cheaper than private shows while still offering an interactive experience.",
    away: "This model is currently away but could return at any moment. Save the profile as a favorite to get a notification when they go live again.",
  },
  fr: {
    public: "Ce show est gratuit et public — tout le monde peut regarder sans compte ni paiement. C'est le moyen idéal de découvrir un modèle avant de lancer un show privé.",
    private: "C'est un show privé — une expérience exclusive en tête-à-tête avec le modèle, offrant l'interaction la plus personnelle.",
    group: "C'est un show de groupe où plusieurs spectateurs contribuent ensemble. Moins cher qu'un show privé tout en restant interactif.",
    away: "Ce modèle est actuellement absent mais peut revenir à tout moment. Ajoutez-le en favori pour être notifié.",
  },
  de: {
    public: "Diese Show ist kostenlos und öffentlich — jeder kann ohne Konto oder Bezahlung zuschauen. Der perfekte Weg, ein Model kennenzulernen.",
    private: "Dies ist eine Privatshow — ein exklusives Eins-zu-eins-Erlebnis mit dem Model für die persönlichste Interaktion.",
    group: "Dies ist eine Gruppenshow, bei der mehrere Zuschauer gemeinsam beitragen. Günstiger als Privatshows und dennoch interaktiv.",
    away: "Dieses Model ist momentan abwesend, könnte aber jederzeit zurückkehren. Speichere das Profil als Favorit.",
  },
  es: {
    public: "Este show es gratuito y público — cualquiera puede ver sin cuenta ni pago. La forma perfecta de conocer a un modelo antes de un show privado.",
    private: "Este es un show privado — una experiencia exclusiva uno a uno con el modelo para la interacción más personal.",
    group: "Este es un show grupal donde varios espectadores contribuyen juntos. Más barato que los privados pero igualmente interactivo.",
    away: "Este modelo está ausente pero podría volver en cualquier momento. Guárdalo como favorito para recibir notificaciones.",
  },
  it: {
    public: "Questo show è gratuito e pubblico — chiunque può guardare senza account o pagamento. Il modo perfetto per conoscere una modella.",
    private: "Questo è uno show privato — un'esperienza esclusiva uno a uno con la modella per l'interazione più personale.",
    group: "Questo è uno show di gruppo dove più spettatori contribuiscono insieme. Più economico degli show privati ma comunque interattivo.",
    away: "Questa modella è attualmente assente ma potrebbe tornare in qualsiasi momento. Salvala come preferita per ricevere notifiche.",
  },
};

/** Section headers per language */
const headers: Record<string, {
  about: string;
  whatToExpect: string;
  platform: string;
  howToWatch: string;
  faq: string;
}> = {
  nl: { about: "Over", whatToExpect: "Wat kun je verwachten?", platform: "op", howToWatch: "Hoe kijk je gratis?", faq: "Veelgestelde vragen" },
  en: { about: "About", whatToExpect: "What to expect", platform: "on", howToWatch: "How to watch for free", faq: "Frequently asked questions" },
  fr: { about: "À propos de", whatToExpect: "À quoi s'attendre", platform: "sur", howToWatch: "Comment regarder gratuitement", faq: "Questions fréquentes" },
  de: { about: "Über", whatToExpect: "Was erwartet dich?", platform: "auf", howToWatch: "Kostenlos zuschauen", faq: "Häufig gestellte Fragen" },
  es: { about: "Sobre", whatToExpect: "Qué esperar", platform: "en", howToWatch: "Cómo ver gratis", faq: "Preguntas frecuentes" },
  it: { about: "Info su", whatToExpect: "Cosa aspettarsi", platform: "su", howToWatch: "Come guardare gratis", faq: "Domande frequenti" },
};

/** How to watch guide per language */
const howToWatch: Record<string, (name: string, platform: string) => string> = {
  nl: (name, platform) => `Op StartVagina kun je ${name} gratis bekijken zonder registratie. Klik op de stream om direct te kijken. Wil je chatten, tips sturen of een privéshow starten? Dan heb je een gratis account nodig op ${platform}. Het aanmaken duurt minder dan een minuut en geeft je toegang tot alle interactieve functies. StartVagina verzamelt live cam modellen van de beste platforms zodat je altijd de perfecte show vindt — alles op één plek, 24/7.`,
  en: (name, platform) => `On StartVagina you can watch ${name} for free without registration. Click the stream to start watching instantly. Want to chat, send tips, or start a private show? You'll need a free account on ${platform}. Signing up takes less than a minute and gives you access to all interactive features. StartVagina aggregates live cam models from the best platforms so you always find the perfect show — everything in one place, 24/7.`,
  fr: (name, platform) => `Sur StartVagina, vous pouvez regarder ${name} gratuitement sans inscription. Cliquez sur le stream pour commencer à regarder. Pour chatter, envoyer des pourboires ou lancer un show privé, créez un compte gratuit sur ${platform} en moins d'une minute. StartVagina rassemble les modèles cam en direct des meilleures plateformes — tout en un seul endroit, 24h/24.`,
  de: (name, platform) => `Auf StartVagina kannst du ${name} kostenlos und ohne Registrierung ansehen. Klicke auf den Stream, um sofort zu schauen. Zum Chatten, Trinkgeld geben oder für Privatshows brauchst du ein kostenloses Konto bei ${platform}. Die Anmeldung dauert weniger als eine Minute. StartVagina sammelt Live-Cam-Models der besten Plattformen — alles an einem Ort, rund um die Uhr.`,
  es: (name, platform) => `En StartVagina puedes ver a ${name} gratis sin registro. Haz clic en el stream para empezar a ver. Para chatear, enviar propinas o iniciar un show privado, necesitas una cuenta gratuita en ${platform}. Registrarte toma menos de un minuto. StartVagina reúne modelos cam en vivo de las mejores plataformas — todo en un solo lugar, 24/7.`,
  it: (name, platform) => `Su StartVagina puoi guardare ${name} gratis senza registrazione. Clicca sullo stream per iniziare a guardare. Per chattare, inviare mance o avviare uno show privato, serve un account gratuito su ${platform}. La registrazione richiede meno di un minuto. StartVagina raccoglie modelle cam dal vivo dalle migliori piattaforme — tutto in un unico posto, 24/7.`,
};

/** Generate FAQ items */
function generateFAQ(model: CamModel, platformName: string, lang: string): { q: string; a: string }[] {
  const name = model.name;
  const faqs: Record<string, { q: string; a: string }[]> = {
    nl: [
      { q: `Is ${name} nu live?`, a: `${name} is momenteel online op ${platformName}. Live status kan veranderen — bekijk de stream hierboven om te zien of ${name} nu live is. Via StartVagina zie je altijd de actuele status.` },
      { q: `Kan ik ${name} gratis bekijken?`, a: `Ja, je kunt ${name} gratis bekijken op StartVagina. De publieke show is volledig gratis en je hebt geen account nodig. Voor privéshows of interactieve functies heb je een gratis account nodig op ${platformName}.` },
      { q: `Op welk platform streamt ${name}?`, a: `${name} streamt op ${platformName}. Via StartVagina kun je de show direct bekijken of doorklikken naar ${platformName} voor de volledige ervaring inclusief chatten en interactie.` },
      ...(model.languages?.length > 0 ? [{ q: `Welke talen spreekt ${name}?`, a: `${name} spreekt ${getLanguageNames(model.languages, "nl").join(", ")}. Dit maakt het gemakkelijk om te communiceren in de chatroom tijdens de live show.` }] : []),
    ],
    en: [
      { q: `Is ${name} live right now?`, a: `${name} is currently online on ${platformName}. Live status can change — check the stream above to see if ${name} is currently live. StartVagina always shows the current status.` },
      { q: `Can I watch ${name} for free?`, a: `Yes, you can watch ${name} for free on StartVagina. The public show is completely free and you don't need an account. For private shows or interactive features, you'll need a free account on ${platformName}.` },
      { q: `What platform does ${name} stream on?`, a: `${name} streams on ${platformName}. Through StartVagina you can watch the show directly or click through to ${platformName} for the full experience including chat and interaction.` },
      ...(model.languages?.length > 0 ? [{ q: `What languages does ${name} speak?`, a: `${name} speaks ${getLanguageNames(model.languages, "en").join(", ")}. This makes it easy to communicate in the chatroom during the live show.` }] : []),
    ],
    fr: [
      { q: `${name} est-elle en direct maintenant ?`, a: `${name} est actuellement en ligne sur ${platformName}. Le statut peut changer — vérifiez le stream ci-dessus. StartVagina affiche toujours le statut actuel.` },
      { q: `Puis-je regarder ${name} gratuitement ?`, a: `Oui, vous pouvez regarder ${name} gratuitement sur StartVagina. Le show public est entièrement gratuit. Pour les shows privés, créez un compte gratuit sur ${platformName}.` },
      { q: `Sur quelle plateforme ${name} diffuse-t-elle ?`, a: `${name} diffuse sur ${platformName}. Via StartVagina, regardez directement ou cliquez pour accéder à ${platformName}.` },
    ],
    de: [
      { q: `Ist ${name} gerade live?`, a: `${name} ist derzeit online auf ${platformName}. Der Live-Status kann sich ändern — prüfe den Stream oben. StartVagina zeigt immer den aktuellen Status.` },
      { q: `Kann ich ${name} kostenlos ansehen?`, a: `Ja, du kannst ${name} kostenlos auf StartVagina ansehen. Die öffentliche Show ist komplett kostenlos. Für Privatshows brauchst du ein kostenloses Konto bei ${platformName}.` },
      { q: `Auf welcher Plattform streamt ${name}?`, a: `${name} streamt auf ${platformName}. Über StartVagina kannst du direkt zuschauen oder zu ${platformName} wechseln.` },
    ],
    es: [
      { q: `¿Está ${name} en vivo ahora?`, a: `${name} está actualmente en línea en ${platformName}. El estado puede cambiar — verifica el stream arriba. StartVagina siempre muestra el estado actual.` },
      { q: `¿Puedo ver a ${name} gratis?`, a: `Sí, puedes ver a ${name} gratis en StartVagina. El show público es completamente gratuito. Para shows privados necesitas una cuenta gratuita en ${platformName}.` },
      { q: `¿En qué plataforma transmite ${name}?`, a: `${name} transmite en ${platformName}. A través de StartVagina puedes ver directamente o ir a ${platformName}.` },
    ],
    it: [
      { q: `${name} è in diretta adesso?`, a: `${name} è attualmente online su ${platformName}. Lo stato può cambiare — controlla lo stream sopra. StartVagina mostra sempre lo stato attuale.` },
      { q: `Posso guardare ${name} gratis?`, a: `Sì, puoi guardare ${name} gratis su StartVagina. Lo show pubblico è completamente gratuito. Per show privati serve un account gratuito su ${platformName}.` },
      { q: `Su quale piattaforma trasmette ${name}?`, a: `${name} trasmette su ${platformName}. Tramite StartVagina puoi guardare direttamente o andare su ${platformName}.` },
    ],
  };
  return faqs[lang] || faqs.en;
}

/** Generate all profile sections for rich SEO content */
export function generateProfileSections(model: CamModel, platformName: string, lang: string, t: any): ProfileSection[] {
  const h = headers[lang] || headers.en;
  const sections: ProfileSection[] = [];
  const name = model.name;

  // 1. About section (expanded)
  const genderLabel = model.gender === "female" ? t.camGenderFemale : model.gender === "couple" ? t.camGenderCouple : model.gender === "male" ? t.camGenderMale : t.camGenderModel;
  const country = model.country && model.country !== "Onbekend" ? model.country : "";
  let aboutText = t.profileIsPopular(name, genderLabel, model.age || null, country, platformName);

  if (country) {
    aboutText += ` ${name} ${lang === "nl" ? "is afkomstig uit" : lang === "en" ? "comes from" : lang === "fr" ? "vient de" : lang === "de" ? "kommt aus" : lang === "es" ? "viene de" : "viene da"} ${country} ${lang === "nl" ? "en streamt live op" : lang === "en" ? "and streams live on" : lang === "fr" ? "et diffuse en direct sur" : lang === "de" ? "und streamt live auf" : lang === "es" ? "y transmite en vivo en" : "e trasmette in diretta su"} ${platformName}.`;
  }

  if (model.viewers > 0) {
    aboutText += " " + t.profileViewers(name, model.viewers);
  }

  if (model.languages && model.languages.length > 0) {
    const fullLangs = getLanguageNames(model.languages, lang);
    aboutText += " " + t.profileLanguages(name, fullLangs.join(", "));
  }

  if (model.tags && model.tags.length > 0) {
    const tagList = model.tags.slice(0, 6).map(tag => tag.toLowerCase()).join(", ");
    aboutText += " " + t.profileTags(tagList);
  }

  // Quality & features
  const features: string[] = [];
  if (model.isHD) features.push(lang === "nl" ? "HD-kwaliteit" : lang === "en" ? "HD quality" : "HD");
  if (model.isNew) features.push(lang === "nl" ? "nieuw op het platform" : lang === "en" ? "new on the platform" : lang === "fr" ? "nouveau sur la plateforme" : lang === "de" ? "neu auf der Plattform" : lang === "es" ? "nueva en la plataforma" : "nuova sulla piattaforma");
  if (features.length > 0) {
    aboutText += " " + t.profileFeatures(name, features.join(lang === "nl" ? " en " : lang === "en" ? " and " : lang === "fr" ? " et " : lang === "de" ? " und " : lang === "es" ? " y " : " e "));
  }

  sections.push({ title: `${h.about} ${name}`, content: aboutText });

  // 2. What to expect
  const showType = model.showType?.toLowerCase() || "public";
  const showInfo = showTypeInfo[lang]?.[showType] || showTypeInfo.en?.[showType] || "";
  if (showInfo) {
    let expectText = showInfo;

    // Add why-watch paragraph
    const whyParts: string[] = [];
    if (model.isHD) whyParts.push(lang === "nl" ? "kristalheldere HD-beelden" : lang === "en" ? "crystal-clear HD video" : "HD");
    if (model.viewers > 100) whyParts.push(lang === "nl" ? "een groot en actief publiek" : lang === "en" ? "a large and active audience" : lang === "fr" ? "un large public actif" : lang === "de" ? "ein großes aktives Publikum" : lang === "es" ? "una audiencia grande y activa" : "un grande pubblico attivo");
    if (model.tags && model.tags.length > 2) whyParts.push(lang === "nl" ? "gevarieerde shows" : lang === "en" ? "varied shows" : lang === "fr" ? "shows variés" : lang === "de" ? "abwechslungsreiche Shows" : lang === "es" ? "shows variados" : "show vari");
    if (country) whyParts.push(lang === "nl" ? `een authentiek model uit ${country}` : lang === "en" ? `an authentic model from ${country}` : `${country}`);

    if (whyParts.length > 0) {
      const connector = lang === "nl" ? " en " : lang === "en" ? " and " : lang === "fr" ? " et " : lang === "de" ? " und " : lang === "es" ? " y " : " e ";
      const expect = lang === "nl" ? "Je kunt rekenen op" : lang === "en" ? "You can expect" : lang === "fr" ? "Vous pouvez vous attendre à" : lang === "de" ? "Du kannst erwarten" : lang === "es" ? "Puedes esperar" : "Puoi aspettarti";
      expectText += ` ${expect} ${whyParts.join(connector)}.`;
    }

    sections.push({ title: h.whatToExpect, content: expectText });
  }

  // 3. Platform info
  const pInfo = platformInfo[lang]?.[platformName] || platformInfo.en?.[platformName];
  if (pInfo) {
    sections.push({
      title: `${name} ${h.platform} ${platformName}`,
      content: `${pInfo.desc} ${pInfo.features} ${pInfo.tip}`,
    });
  }

  // 4. How to watch
  const htw = howToWatch[lang] || howToWatch.en;
  sections.push({ title: h.howToWatch, content: htw(name, platformName) });

  return sections;
}

/** Generate FAQ with schema.org markup data */
export function generateProfileFAQ(model: CamModel, platformName: string, lang: string): { title: string; items: { q: string; a: string }[] } {
  const h = headers[lang] || headers.en;
  return {
    title: `${h.faq} — ${model.name}`,
    items: generateFAQ(model, platformName, lang),
  };
}
