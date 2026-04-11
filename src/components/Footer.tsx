import { Link, useLocation } from "react-router-dom";
import type { ReactNode } from "react";

const L = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link to={to} className="text-primary hover:underline">{children}</Link>
);

function getFooterContent(path: string): { title: string; paragraphs: ReactNode[] } {
  // Homepage
  if (path === "/") {
    return {
      title: "StartVagina — Dé Zoekmachine voor Gratis Webcamsex",
      paragraphs: [
        <p key="1"><strong className="text-foreground">StartVagina.nl</strong> bundelt duizenden live <strong className="text-foreground">cam girls</strong> van de vijf grootste platformen — <L to="/live-sex-cams-chaturbate">Chaturbate</L>, <L to="/live-sex-cams-stripchat">Stripchat</L>, <L to="/live-sex-cams-bongacams">BongaCams</L>, <L to="/live-sex-cams-cam4">CAM4</L> en <L to="/live-sex-cams-xcams">XCams</L> — op één overzichtelijke pagina. Geen registratie, geen kosten, direct kijken.</p>,
        <p key="2">Filter op <L to="/categories">categorie</L>, zoek per <L to="/countries">land</L> of vind modellen die <L to="/languages">jouw taal spreken</L>. Met meer dan 10.000 modellen tegelijk online is er altijd iemand live die bij je past.</p>,
      ],
    };
  }

  // Platform pages
  if (path.startsWith("/live-sex-cams-")) {
    const name = path.includes("chaturbate") ? "Chaturbate" : path.includes("stripchat") ? "Stripchat" : path.includes("bongacams") ? "BongaCams" : path.includes("cam4") ? "CAM4" : "XCams";
    const others = ["Chaturbate", "Stripchat", "BongaCams", "CAM4", "XCams"].filter(p => p !== name);
    return {
      title: `${name} op StartVagina — Vergelijk met Andere Platformen`,
      paragraphs: [
        <p key="1">Je bekijkt nu alle live {name} modellen op StartVagina. Wist je dat je hier ook modellen van {others.slice(0, 3).join(", ")} en {others[3]} kunt vergelijken? Ontdek welk platform het beste bij jou past.</p>,
        <p key="2">Naast platformen kun je ook filteren op <L to="/categories">categorie</L> (bijv. <L to="/webcamsex-milf">MILF</L>, <L to="/webcamsex-latina">Latina</L> of <L to="/webcamsex-koppels">Koppels</L>), per <L to="/countries">land</L> of op <L to="/languages">gesproken taal</L>. Alles gratis, zonder registratie.</p>,
      ],
    };
  }

  // Category pages
  if (path.startsWith("/webcamsex-") && (
    path.includes("milf") || path.includes("teen") || path.includes("mature") ||
    path.includes("asian") || path.includes("latina") || path.includes("ebony") ||
    path.includes("borsten") || path.includes("anal") || path.includes("koppels") ||
    path.includes("squirt") || path.includes("bdsm") || path.includes("tattoo") ||
    path.includes("hairy") || path.includes("voeten") || path.includes("outdoor") ||
    path.includes("mobiel")
  )) {
    return {
      title: "Webcamsex per Categorie op StartVagina",
      paragraphs: [
        <p key="1">StartVagina biedt <L to="/categories">17+ webcamsex categorieën</L> met live modellen van alle grote cam platformen. Elke categorie toont real-time wie er online is op <L to="/live-sex-cams-chaturbate">Chaturbate</L>, <L to="/live-sex-cams-stripchat">Stripchat</L>, <L to="/live-sex-cams-bongacams">BongaCams</L>, <L to="/live-sex-cams-cam4">CAM4</L> en <L to="/live-sex-cams-xcams">XCams</L>.</p>,
        <p key="2">Ontdek ook modellen per <L to="/countries">land</L> — van <L to="/webcamsex-nederland">Nederlandse cam girls</L> tot <L to="/webcamsex-colombia">Colombiaanse modellen</L>. Of zoek op <L to="/languages">taal</L> voor webcamsex zonder taalbarrière. Bekijk onze <L to="/blog">blog</L> voor de nieuwste tips en top-10 lijsten.</p>,
      ],
    };
  }

  // Country pages
  if (path.startsWith("/webcamsex-nederland") || path.startsWith("/webcamsex-belgie") ||
      path.startsWith("/webcamsex-duitsland") || path.startsWith("/webcamsex-colombia") ||
      path.startsWith("/webcamsex-roemenie") || path.startsWith("/webcamsex-italie") ||
      path.startsWith("/webcamsex-spanje") || path.startsWith("/webcamsex-frankrijk") ||
      path.startsWith("/webcamsex-verenigd") || path.startsWith("/webcamsex-verenigde") ||
      path.startsWith("/webcamsex-rusland") || path.startsWith("/webcamsex-oekraine") ||
      path.startsWith("/webcamsex-brazilie") || path.startsWith("/webcamsex-japan") ||
      path.startsWith("/webcamsex-polen") || path.startsWith("/webcamsex-mexico") ||
      path.startsWith("/webcamsex-tsjechie") || path.startsWith("/webcamsex-filipijnen") ||
      path.startsWith("/webcamsex-thailand") || path === "/countries"
  ) {
    return {
      title: "Webcamsex per Land — Ontdek de Wereld op StartVagina",
      paragraphs: [
        <p key="1">StartVagina toont live cam modellen uit <L to="/countries">alle landen</L> ter wereld. Van <L to="/webcamsex-nederland">Nederlandse</L> en <L to="/webcamsex-belgie">Belgische</L> cam girls tot modellen uit <L to="/webcamsex-colombia">Colombia</L>, <L to="/webcamsex-roemenie">Roemenië</L> en <L to="/webcamsex-japan">Japan</L>. Elk land heeft een eigen pagina met gefilterde modellen en platform-specifieke informatie.</p>,
        <p key="2">Combineer landen met <L to="/categories">categorieën</L> of zoek modellen die <L to="/webcamsex-in-het-nederlands">Nederlands</L>, <L to="/webcamsex-auf-deutsch">Deutsch</L> of <L to="/webcamsex-en-espanol">Español</L> spreken. Vergelijk het aanbod van <L to="/live-sex-cams-chaturbate">Chaturbate</L>, <L to="/live-sex-cams-cam4">CAM4</L> en meer — alles op één plek.</p>,
      ],
    };
  }

  // Language pages
  if (path.startsWith("/webcamsex-in-het-") || path.startsWith("/webcamsex-auf-") ||
      path.startsWith("/webcamsex-en-francais") || path.startsWith("/webcamsex-en-espanol") ||
      path.startsWith("/webcamsex-in-italiano") || path.startsWith("/webcamsex-em-") ||
      path.startsWith("/webcamsex-na-") || path.startsWith("/english-") ||
      path.startsWith("/japanese-") || path.startsWith("/korean-") || path === "/languages"
  ) {
    return {
      title: "Webcamsex in Jouw Taal — Geen Taalbarrière",
      paragraphs: [
        <p key="1">Op StartVagina vind je cam modellen die <L to="/languages">jouw taal spreken</L>. Van <L to="/webcamsex-in-het-nederlands">Nederlandstalige cam girls</L> tot <L to="/webcamsex-en-francais">Franstalige</L>, <L to="/webcamsex-auf-deutsch">Duitstalige</L> en <L to="/webcamsex-en-espanol">Spaanstalige</L> modellen — communiceer direct in je moedertaal voor een persoonlijkere ervaring.</p>,
        <p key="2">Combineer taalfilters met <L to="/categories">categorieën</L> en <L to="/countries">landen</L> om exact te vinden wat je zoekt. Modellen van <L to="/live-sex-cams-chaturbate">Chaturbate</L>, <L to="/live-sex-cams-bongacams">BongaCams</L>, <L to="/live-sex-cams-cam4">CAM4</L> en meer — alles overzichtelijk bij elkaar.</p>,
      ],
    };
  }

  // Blog
  if (path.startsWith("/blog")) {
    return {
      title: "StartVagina Blog — Tips, Vergelijkingen & Top Modellen",
      paragraphs: [
        <p key="1">Op de <L to="/blog">StartVagina blog</L> vind je de nieuwste artikelen over webcamsex: platform-vergelijkingen, top-10 lijsten van populaire cam modellen en tips voor beginners. Alles wat je moet weten over <L to="/live-sex-cams-chaturbate">Chaturbate</L>, <L to="/live-sex-cams-stripchat">Stripchat</L>, <L to="/live-sex-cams-bongacams">BongaCams</L> en meer.</p>,
        <p key="2">Klaar om te kijken? Ontdek live cam modellen per <L to="/categories">categorie</L>, <L to="/countries">land</L> of <L to="/languages">taal</L>. Of ga direct naar de <L to="/">homepage</L> voor het volledige aanbod — meer dan 10.000 modellen online, 24/7.</p>,
      ],
    };
  }

  // Model stream pages
  if (path.startsWith("/chaturbate/") || path.startsWith("/bongacams/") ||
      path.startsWith("/cam4/") || path.startsWith("/stripchat/") || path.startsWith("/xcams/")) {
    const platform = path.split("/")[1];
    const platformMap: Record<string, string> = { chaturbate: "Chaturbate", bongacams: "BongaCams", cam4: "CAM4", stripchat: "Stripchat", xcams: "XCams" };
    const name = platformMap[platform] || platform;
    return {
      title: `Meer ${name} Modellen op StartVagina`,
      paragraphs: [
        <p key="1">Dit model is een van duizenden live {name} cam girls op StartVagina. Ontdek meer modellen op de <L to={`/live-sex-cams-${platform}`}>{name} overzichtspagina</L> of vergelijk met cam girls van andere platformen zoals {Object.entries(platformMap).filter(([k]) => k !== platform).slice(0, 3).map(([k, v]) => <><L to={`/live-sex-cams-${k}`} key={k}>{v}</L>, </>)}en meer.</p>,
        <p key="2">Filter op <L to="/categories">categorie</L>, <L to="/countries">land</L> of <L to="/languages">taal</L> om vergelijkbare modellen te vinden. Alle shows zijn gratis te bekijken — geen registratie nodig.</p>,
      ],
    };
  }

  // Keyword landing pages & default
  return {
    title: "StartVagina — Gratis Webcamsex & Live Sex Cams",
    paragraphs: [
      <p key="1"><strong className="text-foreground">StartVagina.nl</strong> is jouw startpagina voor gratis <strong className="text-foreground">webcamsex</strong>. We bundelen cam girls van <L to="/live-sex-cams-chaturbate">Chaturbate</L>, <L to="/live-sex-cams-stripchat">Stripchat</L>, <L to="/live-sex-cams-bongacams">BongaCams</L>, <L to="/live-sex-cams-cam4">CAM4</L> en <L to="/live-sex-cams-xcams">XCams</L> op één plek.</p>,
      <p key="2">Verken webcamsex per <L to="/categories">categorie</L>, <L to="/countries">land</L> of <L to="/languages">taal</L>. Lees de <L to="/blog">blog</L> voor tips en vergelijkingen, of duik direct de <L to="/">live cams</L> in. Altijd gratis, altijd live.</p>,
    ],
  };
}

const Footer = () => {
  const { pathname } = useLocation();
  const { title, paragraphs } = getFooterContent(pathname);

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
            <Link to="/" className="inline-block">
              <span className="text-xl font-bold font-display">
                <span className="text-primary">Start</span>Vagina
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              Jouw startpagina voor gratis live webcamsex. Alle cam sites, alle modellen, één plek.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3 text-foreground">Categorieën</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/webcamsex-milf" className="hover:text-primary transition-colors">MILF Cams</Link></li>
              <li><Link to="/webcamsex-teen-18-plus" className="hover:text-primary transition-colors">Teen 18+ Cams</Link></li>
              <li><Link to="/webcamsex-koppels" className="hover:text-primary transition-colors">Koppels Webcamsex</Link></li>
              <li><Link to="/webcamsex-anal" className="hover:text-primary transition-colors">Anal Shows</Link></li>
              <li><Link to="/webcamsex-grote-borsten" className="hover:text-primary transition-colors">Big Boobs</Link></li>
              <li><Link to="/webcamsex-latina" className="hover:text-primary transition-colors">Latina Cams</Link></li>
              <li><Link to="/categories" className="hover:text-primary transition-colors font-medium">Alle categorieën →</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3 text-foreground">Platformen</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/live-sex-cams-chaturbate" className="hover:text-primary transition-colors">Chaturbate</Link></li>
              <li><Link to="/live-sex-cams-stripchat" className="hover:text-primary transition-colors">Stripchat</Link></li>
              <li><Link to="/live-sex-cams-bongacams" className="hover:text-primary transition-colors">BongaCams</Link></li>
              <li><Link to="/live-sex-cams-cam4" className="hover:text-primary transition-colors">CAM4</Link></li>
              <li><Link to="/live-sex-cams-xcams" className="hover:text-primary transition-colors">XCams</Link></li>
            </ul>
            <h4 className="font-semibold text-sm mb-3 mt-5 text-foreground">Populaire Landen</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/webcamsex-nederland" className="hover:text-primary transition-colors">🇳🇱 Nederland</Link></li>
              <li><Link to="/webcamsex-belgie" className="hover:text-primary transition-colors">🇧🇪 België</Link></li>
              <li><Link to="/webcamsex-colombia" className="hover:text-primary transition-colors">🇨🇴 Colombia</Link></li>
              <li><Link to="/countries" className="hover:text-primary transition-colors font-medium">Alle landen →</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3 text-foreground">Ontdek</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/new" className="hover:text-primary transition-colors">Nieuwe Cam Girls</Link></li>
              <li><Link to="/top" className="hover:text-primary transition-colors">Top Cams</Link></li>
              <li><Link to="/webcamsex" className="hover:text-primary transition-colors">Webcamsex</Link></li>
              <li><Link to="/cam-girls" className="hover:text-primary transition-colors">Cam Girls</Link></li>
              <li><Link to="/live-sex-cams" className="hover:text-primary transition-colors">Live Sex Cams</Link></li>
              <li><Link to="/sexchat" className="hover:text-primary transition-colors">Sexchat</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
            </ul>
            <h4 className="font-semibold text-sm mb-3 mt-5 text-foreground">Talen</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/webcamsex-in-het-nederlands" className="hover:text-primary transition-colors">🇳🇱 Nederlands</Link></li>
              <li><Link to="/english-webcam-sex-chat" className="hover:text-primary transition-colors">🇬🇧 English</Link></li>
              <li><Link to="/webcamsex-auf-deutsch" className="hover:text-primary transition-colors">🇩🇪 Deutsch</Link></li>
              <li><Link to="/languages" className="hover:text-primary transition-colors font-medium">Alle talen →</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} StartVagina.nl — Alle rechten voorbehouden. 18+ — Alleen voor volwassenen.
          </p>
          <p className="text-xs text-muted-foreground">
            StartVagina is een zoekmachine en host zelf geen content. Alle streams worden aangeboden door externe platformen.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
