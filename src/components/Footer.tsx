import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const L = ({ to, children }: { to: string; children: ReactNode }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { localePath } = useLanguage();
  return <Link to={localePath(to)} className="text-primary hover:underline">{children}</Link>;
};

const categorySlugs = ["jonge-cam-girls-18-plus","milf-webcamsex-ervaren-vrouwen","mature-webcamsex-oudere-vrouwen","aziatische-cam-girls-live","latina-cam-girls-live","ebony-cam-girls-live","cam-girls-grote-borsten","petite-cam-girls-kleine-borsten","anale-cam-shows-live","cam-koppels-live-sex","squirt-cam-shows-live","bdsm-bondage-cam-shows","getatoeeerde-cam-girls","behaarde-cam-girls-natural","voeten-fetish-cam-shows","outdoor-cam-shows-buiten","mobiele-cam-shows-live"];
const countrySlugs = ["nederlandse-cam-girls","belgische-cam-girls","duitse-cam-girls","colombiaanse-cam-girls","roemeense-cam-girls","italiaanse-cam-girls","spaanse-cam-girls","franse-cam-girls","britse-cam-girls","amerikaanse-cam-girls","russische-cam-girls","oekraiense-cam-girls","braziliaanse-cam-girls","japanse-cam-girls","poolse-cam-girls","mexicaanse-cam-girls","tsjechische-cam-girls","filipijnse-cam-girls","thaise-cam-girls"];
const languageKeywords = ["in-het-", "auf-deutsch", "en-francais", "en-espanol", "in-italiano", "em-portugu", "na-russkom"];

function getFooterContent(path: string): { title: string; paragraphs: ReactNode[] } {
  const isCategory = categorySlugs.some(s => path === `/${s}`);
  const isCountry = countrySlugs.some(s => path === `/${s}`);
  const isLanguage = path.startsWith("/webcamsex-") && languageKeywords.some(k => path.includes(k));

  // Homepage
  if (path === "/") {
    return {
      title: "StartVagina — Dé Zoekmachine voor Gratis Webcamsex",
      paragraphs: [
        <p key="1"><strong className="text-foreground">StartVagina.nl</strong> bundelt duizenden live <strong className="text-foreground">cam girls</strong> van de grootste platformen — <L to="/live-sex-cams-chaturbate">Chaturbate</L>, <L to="/live-sex-cams-stripchat">Stripchat</L>, <L to="/live-sex-cams-bongacams">BongaCams</L>, <L to="/live-sex-cams-cam4">CAM4</L>, <L to="/live-sex-cams-jerkmate">Jerkmate</L> — op één overzichtelijke pagina. Geen registratie, geen kosten, direct kijken.</p>,
        <p key="2">Filter op <L to="/categorieen">categorie</L>, zoek per <L to="/landen">land</L> of vind modellen die <L to="/talen">jouw taal spreken</L>. Met meer dan 10.000 modellen tegelijk online is er altijd iemand live die bij je past.</p>,
      ],
    };
  }

  // Platform pages
  if (path.startsWith("/live-sex-cams-")) {
    const name = path.includes("chaturbate") ? "Chaturbate" : path.includes("stripchat") ? "Stripchat" : path.includes("bongacams") ? "BongaCams" : path.includes("jerkmate") ? "Jerkmate" : path.includes("flirt4free") ? "Flirt4Free" : path.includes("cam4") ? "CAM4" : "CAM4";
    const others = ["Chaturbate", "Stripchat", "BongaCams", "CAM4", "Jerkmate", "Flirt4Free"].filter(p => p !== name);
    return {
      title: `${name} op StartVagina — Vergelijk met Andere Platformen`,
      paragraphs: [
        <p key="1">Je bekijkt nu alle live {name} modellen op StartVagina. Wist je dat je hier ook modellen van {others.slice(0, 3).join(", ")} en {others[3]} kunt vergelijken? Ontdek welk platform het beste bij jou past.</p>,
        <p key="2">Naast platformen kun je ook filteren op <L to="/categorieen">categorie</L> (bijv. <L to="/milf-webcamsex-ervaren-vrouwen">MILF</L>, <L to="/latina-cam-girls-live">Latina</L> of <L to="/cam-koppels-live-sex">Koppels</L>), per <L to="/landen">land</L> of op <L to="/talen">gesproken taal</L>. Alles gratis, zonder registratie.</p>,
      ],
    };
  }

  // Category pages
  const catSlugs = ["jonge-cam-girls-18-plus","milf-webcamsex-ervaren-vrouwen","mature-webcamsex-oudere-vrouwen","aziatische-cam-girls-live","latina-cam-girls-live","ebony-cam-girls-live","cam-girls-grote-borsten","petite-cam-girls-kleine-borsten","anale-cam-shows-live","cam-koppels-live-sex","squirt-cam-shows-live","bdsm-bondage-cam-shows","getatoeeerde-cam-girls","behaarde-cam-girls-natural","voeten-fetish-cam-shows","outdoor-cam-shows-buiten","mobiele-cam-shows-live"];
  if (catSlugs.some(s => path === `/${s}`)) {
    return {
      title: "Webcamsex per Categorie op StartVagina",
      paragraphs: [
        <p key="1">StartVagina biedt <L to="/categorieen">17+ webcamsex categorieën</L> met live modellen van alle grote cam platformen. Elke categorie toont real-time wie er online is op <L to="/live-sex-cams-chaturbate">Chaturbate</L>, <L to="/live-sex-cams-stripchat">Stripchat</L>, <L to="/live-sex-cams-bongacams">BongaCams</L>, <L to="/live-sex-cams-cam4">CAM4</L> en <L to="/live-sex-cams-jerkmate">Jerkmate</L>.</p>,
        <p key="2">Ontdek ook modellen per <L to="/landen">land</L> — van <L to="/nederlandse-cam-girls">Nederlandse cam girls</L> tot <L to="/colombiaanse-cam-girls">Colombiaanse modellen</L>. Of zoek op <L to="/talen">taal</L> voor webcamsex zonder taalbarrière. Bekijk onze <L to="/blog">blog</L> voor de nieuwste tips en top-10 lijsten.</p>,
      ],
    };
  }

  // Country pages
  if (isCountry) {
    return {
      title: "Webcamsex per Land — Ontdek de Wereld op StartVagina",
      paragraphs: [
        <p key="1">StartVagina toont live cam modellen uit <L to="/landen">alle landen</L> ter wereld. Van <L to="/nederlandse-cam-girls">Nederlandse</L> en <L to="/belgische-cam-girls">Belgische</L> cam girls tot modellen uit <L to="/colombiaanse-cam-girls">Colombia</L>, <L to="/roemeense-cam-girls">Roemenië</L> en <L to="/japanse-cam-girls">Japan</L>. Elk land heeft een eigen pagina met gefilterde modellen en platform-specifieke informatie.</p>,
        <p key="2">Combineer landen met <L to="/categorieen">categorieën</L> of zoek modellen die <L to="/webcamsex-in-het-nederlands">Nederlands</L>, <L to="/webcamsex-auf-deutsch">Deutsch</L> of <L to="/webcamsex-en-espanol">Español</L> spreken. Vergelijk het aanbod van <L to="/live-sex-cams-chaturbate">Chaturbate</L>, <L to="/live-sex-cams-cam4">CAM4</L> en meer — alles op één plek.</p>,
      ],
    };
  }

  // Language pages
  if (isLanguage || path.startsWith("/english-") || path.startsWith("/japanese-") || path.startsWith("/korean-")) {
    return {
      title: "Webcamsex in Jouw Taal — Geen Taalbarrière",
      paragraphs: [
        <p key="1">Op StartVagina vind je cam modellen die <L to="/talen">jouw taal spreken</L>. Van <L to="/webcamsex-in-het-nederlands">Nederlandstalige cam girls</L> tot <L to="/webcamsex-en-francais">Franstalige</L>, <L to="/webcamsex-auf-deutsch">Duitstalige</L> en <L to="/webcamsex-en-espanol">Spaanstalige</L> modellen — communiceer direct in je moedertaal voor een persoonlijkere ervaring.</p>,
        <p key="2">Combineer taalfilters met <L to="/categorieen">categorieën</L> en <L to="/landen">landen</L> om exact te vinden wat je zoekt. Modellen van <L to="/live-sex-cams-chaturbate">Chaturbate</L>, <L to="/live-sex-cams-bongacams">BongaCams</L>, <L to="/live-sex-cams-cam4">CAM4</L> en meer — alles overzichtelijk bij elkaar.</p>,
      ],
    };
  }

  // Countries overview
  if (path === "/landen" || path === "/countries") {
    return {
      title: "Webcamsex uit Alle Landen — Van Nederland tot Colombia",
      paragraphs: [
        <p key="1">Op de <L to="/landen">landen-pagina</L> van StartVagina ontdek je cam modellen uit de hele wereld. <L to="/nederlandse-cam-girls">Nederland</L> en <L to="/belgische-cam-girls">België</L> staan bovenaan, gevolgd door populaire cam-landen als <L to="/colombiaanse-cam-girls">Colombia</L>, <L to="/roemeense-cam-girls">Roemenië</L> en de <L to="/amerikaanse-cam-girls">Verenigde Staten</L>. Elk land heeft een eigen pagina met live modellen en achtergrondinformatie.</p>,
        <p key="2">Wist je dat <L to="/colombiaanse-cam-girls">Colombia</L> het land met de meeste cam modellen ter wereld is? Of dat <L to="/roemeense-cam-girls">Roemenië</L> bekendstaat om professionele studio-setups? Ontdek het per land, of filter direct op <L to="/categorieen">categorie</L> en <L to="/talen">taal</L>.</p>,
      ],
    };
  }

  // Languages overview
  if (path === "/talen" || path === "/languages") {
    return {
      title: "Webcamsex per Taal — Chat in Je Moedertaal",
      paragraphs: [
        <p key="1">Taal maakt het verschil in webcamsex. Op de <L to="/talen">talen-pagina</L> vind je cam modellen die jouw taal spreken — van <L to="/webcamsex-in-het-nederlands">Nederlandstalig</L> en <L to="/webcamsex-auf-deutsch">Duitstalig</L> tot <L to="/webcamsex-en-espanol">Spaanstalig</L> en <L to="/webcamsex-em-portugues">Portugeestalig</L>. Geen taalbarrière, direct persoonlijk contact.</p>,
        <p key="2">Combineer taal met <L to="/landen">land</L> of <L to="/categorieen">categorie</L> voor de perfecte match. Of vergelijk het taalaanbod per platform: <L to="/live-sex-cams-cam4">CAM4</L> voor Nederlands, <L to="/live-sex-cams-bongacams">BongaCams</L> voor Russisch.</p>,
      ],
    };
  }

  // Top Cams
  if (path === "/populairste-cam-girls" || path === "/top") {
    return {
      title: "De Populairste Cam Girls — Live en Trending",
      paragraphs: [
        <p key="1">De top cams op StartVagina zijn de modellen met de meeste kijkers op dit moment — de shows waar het gebeurt. Deze cam girls trekken honderden tot duizenden kijkers tegelijk van <L to="/live-sex-cams-chaturbate">Chaturbate</L>, <L to="/live-sex-cams-stripchat">Stripchat</L>, <L to="/live-sex-cams-bongacams">BongaCams</L>, <L to="/live-sex-cams-cam4">CAM4</L> en <L to="/live-sex-cams-jerkmate">Jerkmate</L>.</p>,
        <p key="2">Op zoek naar iets specifieks? Filter de populairste modellen per <L to="/categorieen">categorie</L> (bijv. <L to="/milf-webcamsex-ervaren-vrouwen">MILF</L> of <L to="/latina-cam-girls-live">Latina</L>), per <L to="/landen">land</L> of per <L to="/talen">taal</L>. Of bekijk de <L to="/nieuwe-cam-girls">nieuwste cam girls</L> die net begonnen zijn.</p>,
      ],
    };
  }

  // New Cams
  if (path === "/nieuwe-cam-girls" || path === "/new") {
    return {
      title: "Nieuwe Cam Girls — Vers op het Platform",
      paragraphs: [
        <p key="1">Elke dag beginnen er nieuwe cam modellen op <L to="/live-sex-cams-chaturbate">Chaturbate</L>, <L to="/live-sex-cams-stripchat">Stripchat</L>, <L to="/live-sex-cams-bongacams">BongaCams</L>, <L to="/live-sex-cams-cam4">CAM4</L> en <L to="/live-sex-cams-jerkmate">Jerkmate</L>. Deze verse gezichten zijn vaak extra enthousiast, spontaan en nieuwsgierig — en ze staan te popelen om hun eerste kijkers te verwelkomen.</p>,
        <p key="2">Nieuwe modellen ontdekken is een van de leukste dingen aan webcamsex. Combineer met <L to="/categorieen">categorieën</L> of zoek nieuwe cam girls uit een specifiek <L to="/landen">land</L>. Of bekijk de <L to="/populairste-cam-girls">populairste cam girls</L> als je liever kiest voor bewezen kwaliteit.</p>,
      ],
    };
  }

  // Blog
  if (path.startsWith("/blog")) {
    return {
      title: "StartVagina Blog — Tips, Vergelijkingen & Top Modellen",
      paragraphs: [
        <p key="1">Op de <L to="/blog">StartVagina blog</L> vind je de nieuwste artikelen over webcamsex: platform-vergelijkingen, top-10 lijsten van populaire cam modellen en tips voor beginners. Alles wat je moet weten over <L to="/live-sex-cams-chaturbate">Chaturbate</L>, <L to="/live-sex-cams-stripchat">Stripchat</L>, <L to="/live-sex-cams-bongacams">BongaCams</L> en meer.</p>,
        <p key="2">Klaar om te kijken? Ontdek live cam modellen per <L to="/categorieen">categorie</L>, <L to="/landen">land</L> of <L to="/talen">taal</L>. Of ga direct naar de <L to="/">homepage</L> voor het volledige aanbod — meer dan 10.000 modellen online, 24/7.</p>,
      ],
    };
  }

  // Model stream pages
  if (path.startsWith("/chaturbate/") || path.startsWith("/bongacams/") ||
      path.startsWith("/cam4/") || path.startsWith("/stripchat/") || path.startsWith("/jerkmate/")) {
    const platform = path.split("/")[1];
    const platformMap: Record<string, string> = { chaturbate: "Chaturbate", bongacams: "BongaCams", cam4: "CAM4", stripchat: "Stripchat", jerkmate: "Jerkmate", flirt4free: "Flirt4Free", };
    const name = platformMap[platform] || platform;
    return {
      title: `Meer ${name} Modellen op StartVagina`,
      paragraphs: [
        <p key="1">Dit model is een van duizenden live {name} cam girls op StartVagina. Ontdek meer modellen op de <L to={`/live-sex-cams-${platform}`}>{name} overzichtspagina</L> of vergelijk met cam girls van andere platformen zoals {Object.entries(platformMap).filter(([k]) => k !== platform).slice(0, 3).map(([k, v]) => <><L to={`/live-sex-cams-${k}`} key={k}>{v}</L>, </>)}en meer.</p>,
        <p key="2">Filter op <L to="/categorieen">categorie</L>, <L to="/landen">land</L> of <L to="/talen">taal</L> om vergelijkbare modellen te vinden. Alle shows zijn gratis te bekijken — geen registratie nodig.</p>,
      ],
    };
  }

  // Keyword landing pages & default
  return {
    title: "StartVagina — Gratis Webcamsex & Live Sex Cams",
    paragraphs: [
      <p key="1"><strong className="text-foreground">StartVagina.nl</strong> is jouw startpagina voor gratis <strong className="text-foreground">webcamsex</strong>. We bundelen cam girls van <L to="/live-sex-cams-chaturbate">Chaturbate</L>, <L to="/live-sex-cams-stripchat">Stripchat</L>, <L to="/live-sex-cams-bongacams">BongaCams</L>, <L to="/live-sex-cams-cam4">CAM4</L> en <L to="/live-sex-cams-jerkmate">Jerkmate</L> op één plek.</p>,
      <p key="2">Verken webcamsex per <L to="/categorieen">categorie</L>, <L to="/landen">land</L> of <L to="/talen">taal</L>. Lees de <L to="/blog">blog</L> voor tips en vergelijkingen, of duik direct de <L to="/">live cams</L> in. Altijd gratis, altijd live.</p>,
    ],
  };
}

const Footer = () => {
  const { t, localePath, basePath } = useLanguage();
  const { title, paragraphs } = getFooterContent(basePath);

  return (
    <footer className="border-t border-border bg-card mt-12">
      <div className="container py-10">
        {/* Dynamic SEO content block */}
        <div className="mb-8 max-w-4xl">
          <h2 className="text-lg font-bold font-display text-foreground mb-3">
            {title}
          </h2>
          <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
            {paragraphs}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <Link to={localePath("/")} className="inline-block">
              <span className="text-xl font-bold font-display">
                <span className="text-primary">Start</span>Vagina
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              {t.footerTagline}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3 text-foreground">{t.footerCategories}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to={localePath("/milf-webcamsex-ervaren-vrouwen")} className="hover:text-primary transition-colors">{t.catMilf}</Link></li>
              <li><Link to={localePath("/jonge-cam-girls-18-plus")} className="hover:text-primary transition-colors">{t.catTeen18}</Link></li>
              <li><Link to={localePath("/cam-koppels-live-sex")} className="hover:text-primary transition-colors">{t.catCouples}</Link></li>
              <li><Link to={localePath("/anale-cam-shows-live")} className="hover:text-primary transition-colors">{t.catAnal}</Link></li>
              <li><Link to={localePath("/cam-girls-grote-borsten")} className="hover:text-primary transition-colors">{t.catBigBoobs}</Link></li>
              <li><Link to={localePath("/latina-cam-girls-live")} className="hover:text-primary transition-colors">{t.catLatina}</Link></li>
              <li><Link to={localePath("/categorieen")} className="hover:text-primary transition-colors font-medium">{t.footerAllCategories}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3 text-foreground">{t.footerPlatforms}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to={localePath("/live-sex-cams-chaturbate")} className="hover:text-primary transition-colors">Chaturbate</Link></li>
              <li><Link to={localePath("/live-sex-cams-stripchat")} className="hover:text-primary transition-colors">Stripchat</Link></li>
              <li><Link to={localePath("/live-sex-cams-bongacams")} className="hover:text-primary transition-colors">BongaCams</Link></li>
              <li><Link to={localePath("/live-sex-cams-cam4")} className="hover:text-primary transition-colors">CAM4</Link></li>
              <li><Link to={localePath("/live-sex-cams-jerkmate")} className="hover:text-primary transition-colors">Jerkmate</Link></li>
              <li><Link to={localePath("/live-sex-cams-flirt4free")} className="hover:text-primary transition-colors">Flirt4Free</Link></li>
              <li><Link to={localePath("/live-sex-cams-xcams")} className="hover:text-primary transition-colors">XCams</Link></li>
            </ul>
            <h4 className="font-semibold text-sm mb-3 mt-5 text-foreground">Vergelijkingen</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to={localePath("/chaturbate-vs-stripchat")} className="hover:text-primary transition-colors">Chaturbate vs Stripchat</Link></li>
              <li><Link to={localePath("/chaturbate-vs-bongacams")} className="hover:text-primary transition-colors">Chaturbate vs BongaCams</Link></li>
              <li><Link to={localePath("/chaturbate-vs-cam4")} className="hover:text-primary transition-colors">Chaturbate vs CAM4</Link></li>
              <li><Link to={localePath("/stripchat-vs-bongacams")} className="hover:text-primary transition-colors">Stripchat vs BongaCams</Link></li>
              <li><Link to={localePath("/cam4-vs-jerkmate")} className="hover:text-primary transition-colors">CAM4 vs Jerkmate</Link></li>
            </ul>
            <h4 className="font-semibold text-sm mb-3 mt-5 text-foreground">{t.footerPopularCountries}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to={localePath("/nederlandse-cam-girls")} className="hover:text-primary transition-colors">🇳🇱 Nederland</Link></li>
              <li><Link to={localePath("/belgische-cam-girls")} className="hover:text-primary transition-colors">🇧🇪 België</Link></li>
              <li><Link to={localePath("/colombiaanse-cam-girls")} className="hover:text-primary transition-colors">🇨🇴 Colombia</Link></li>
              <li><Link to={localePath("/landen")} className="hover:text-primary transition-colors font-medium">{t.footerAllCountries}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3 text-foreground">{t.footerDiscover}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to={localePath("/nieuwe-cam-girls")} className="hover:text-primary transition-colors">{t.footerNewCamGirls}</Link></li>
              <li><Link to={localePath("/populairste-cam-girls")} className="hover:text-primary transition-colors">Top Cams</Link></li>
              <li><Link to={localePath("/webcamsex")} className="hover:text-primary transition-colors">{t.footerWebcamsex}</Link></li>
              <li><Link to={localePath("/cam-girls")} className="hover:text-primary transition-colors">{t.footerCamGirls}</Link></li>
              <li><Link to={localePath("/live-sex-cams")} className="hover:text-primary transition-colors">{t.footerLiveSexCams}</Link></li>
              <li><Link to={localePath("/sexchat")} className="hover:text-primary transition-colors">{t.footerSexchat}</Link></li>
              <li><Link to={localePath("/blog")} className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to={localePath("/contact")} className="hover:text-primary transition-colors">{t.contactTitle}</Link></li>
              <li><a href="https://offers.cam4tracking.com/aff_c?offer_id=2292&aff_id=1961&aff_sub=startvagina" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">{t.footerMakeMoney}</a></li>
            </ul>
            <h4 className="font-semibold text-sm mb-3 mt-5 text-foreground">{t.footerLanguages}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to={localePath("/webcamsex-in-het-nederlands")} className="hover:text-primary transition-colors">🇳🇱 Nederlands</Link></li>
              <li><Link to={localePath("/english-webcam-sex-chat")} className="hover:text-primary transition-colors">🇬🇧 English</Link></li>
              <li><Link to={localePath("/webcamsex-auf-deutsch")} className="hover:text-primary transition-colors">🇩🇪 Deutsch</Link></li>
              <li><Link to={localePath("/talen")} className="hover:text-primary transition-colors font-medium">{t.footerAllLanguages}</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} StartVagina.nl — {t.footerCopyright}
          </p>
          <p className="text-xs text-muted-foreground">
            {t.footerDisclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
