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
              <strong>StartVagina.nl</strong> is dé plek voor gratis <strong>webcamsex</strong> en <strong>live sex cams</strong> in Nederland en België. 
              Wij bundelen duizenden <strong>cam girls</strong> en <strong>webcam modellen</strong> van de beste platformen zoals 
              Chaturbate, Stripchat, BongaCams en Cam4 op één overzichtelijke pagina.
            </p>
            <p>
              Of je nu op zoek bent naar <strong>sexchat</strong>, <strong>erotische webcam</strong> shows, <strong>live sex chat</strong> of 
              gratis <strong>cam meisjes</strong> — bij StartVagina vind je altijd een model dat bij je past. 
              Filter op leeftijd, land, categorie en meer om de perfecte <strong>live cam</strong> ervaring te vinden.
            </p>
            <p>
              Ontdek <strong>Nederlandse webcamsex</strong> en <strong>Belgische webcamsex</strong> modellen die nu live zijn. 
              Van jonge cam girls tot ervaren webcam modellen, van solo shows tot koppels — alles gratis en direct te bekijken.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="text-xl font-bold font-display">
              <span className="text-primary">Start</span>Vagina
            </span>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              De zoekmachine voor gratis live webcamsex. Bekijk duizenden cam girls en webcam modellen van de beste platformen op één plek.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3 text-foreground">Categorieën</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/" className="hover:text-primary transition-colors">Populaire Cams</a></li>
              <li><a href="/" className="hover:text-primary transition-colors">Nieuwe Cam Girls</a></li>
              <li><a href="/" className="hover:text-primary transition-colors">Koppels Webcamsex</a></li>
              <li><a href="/" className="hover:text-primary transition-colors">Outdoor Cams</a></li>
              <li><a href="/" className="hover:text-primary transition-colors">Mobiele Cams</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3 text-foreground">Platformen</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/" className="hover:text-primary transition-colors">Chaturbate Cams</a></li>
              <li><a href="/" className="hover:text-primary transition-colors">Stripchat Cams</a></li>
              <li><a href="/" className="hover:text-primary transition-colors">BongaCams</a></li>
              <li><a href="/" className="hover:text-primary transition-colors">Cam4</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3 text-foreground">Info</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/about" className="hover:text-primary transition-colors">Over StartVagina</a></li>
              <li><a href="/privacy" className="hover:text-primary transition-colors">Privacybeleid</a></li>
              <li><a href="/terms" className="hover:text-primary transition-colors">Voorwaarden</a></li>
              <li><a href="/contact" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} StartVagina.nl — Alle rechten voorbehouden. 18+ — Alleen voor volwassenen.
          </p>
          <p className="text-xs text-muted-foreground">
            StartVagina is een zoekmachine voor gratis webcamsex en live sex cams en host zelf geen content.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
