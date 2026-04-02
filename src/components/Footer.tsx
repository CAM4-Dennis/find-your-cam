const Footer = () => {
  return (
    <footer className="border-t border-border bg-card mt-12">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="text-xl font-bold font-display">
              <span className="text-primary">Start</span>Vagina
            </span>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              De zoekmachine voor gratis live webcams. Bekijk duizenden modellen van de beste cam-platformen op één plek.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3 text-foreground">Navigatie</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="/categories" className="hover:text-primary transition-colors">Categorieën</a></li>
              <li><a href="/countries" className="hover:text-primary transition-colors">Landen</a></li>
              <li><a href="/top" className="hover:text-primary transition-colors">Top Cams</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3 text-foreground">Platformen</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/platform/chaturbate" className="hover:text-primary transition-colors">Chaturbate</a></li>
              <li><a href="/platform/stripchat" className="hover:text-primary transition-colors">Stripchat</a></li>
              <li><a href="/platform/cams" className="hover:text-primary transition-colors">Cams.com</a></li>
              <li><a href="/platform/bongacams" className="hover:text-primary transition-colors">BongaCams</a></li>
              <li><a href="/platform/streamate" className="hover:text-primary transition-colors">Streamate</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3 text-foreground">Info</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/about" className="hover:text-primary transition-colors">Over ons</a></li>
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
            StartVagina is een zoekmachine voor live webcams en host zelf geen content.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
