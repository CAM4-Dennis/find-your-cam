import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card mt-12">
      <div className="container py-10">
        {/* SEO content block */}
        <div className="mb-8 max-w-4xl">
          <h2 className="text-lg font-bold font-display text-foreground mb-3">
            StartVagina — Dé Zoekmachine voor Gratis Webcamsex
          </h2>
          <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
            <p>
              <strong className="text-foreground">StartVagina.nl</strong> bundelt duizenden live <strong className="text-foreground">cam girls</strong> van 
              de vijf grootste platformen — <Link to="/live-sex-cams-chaturbate" className="text-primary hover:underline">Chaturbate</Link>, <Link to="/live-sex-cams-stripchat" className="text-primary hover:underline">Stripchat</Link>, <Link to="/live-sex-cams-bongacams" className="text-primary hover:underline">BongaCams</Link>, <Link to="/live-sex-cams-cam4" className="text-primary hover:underline">CAM4</Link> en <Link to="/live-sex-cams-xcams" className="text-primary hover:underline">XCams</Link> — op 
              één overzichtelijke pagina. Geen registratie, geen kosten, direct kijken.
            </p>
            <p>
              Filter op <Link to="/categories" className="text-primary hover:underline">categorie</Link> (van <Link to="/webcamsex-milf" className="text-primary hover:underline">MILF</Link> en <Link to="/webcamsex-asian" className="text-primary hover:underline">Asian</Link> tot <Link to="/webcamsex-koppels" className="text-primary hover:underline">Koppels</Link> en <Link to="/webcamsex-bdsm" className="text-primary hover:underline">BDSM</Link>), 
              zoek per <Link to="/countries" className="text-primary hover:underline">land</Link> (<Link to="/webcamsex-nederland" className="text-primary hover:underline">Nederlandse cam girls</Link>, <Link to="/webcamsex-belgie" className="text-primary hover:underline">Belgische modellen</Link>, <Link to="/webcamsex-colombia" className="text-primary hover:underline">Colombiaanse schoonheden</Link>) 
              of vind modellen die <Link to="/webcamsex-in-het-nederlands" className="text-primary hover:underline">jouw taal spreken</Link>. 
              Met meer dan 10.000 modellen tegelijk online is er altijd iemand live die bij je past.
            </p>
            <p>
              StartVagina toont real-time data: kijkersaantallen, HD-kwaliteit, leeftijd, tags en gesproken talen. 
              Vergelijk het aanbod van alle platformen in één overzicht en ontdek je nieuwe favoriete <strong className="text-foreground">webcam model</strong>. 
              Lees onze <Link to="/blog" className="text-primary hover:underline">blog</Link> voor tips, vergelijkingen en top-10 lijsten van de populairste cam modellen.
            </p>
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
