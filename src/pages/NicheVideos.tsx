import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";
import { Helmet } from "react-helmet-async";
import { useNicheList } from "@/hooks/useNiches";
import { Loader2, Film } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { getRobotsContent } from "@/lib/robotsMeta";

const nicheI18n = {
  nl: {
    title: "Niche Video's — Cam4 Exclusieve Video Content | StartVagina",
    h1: "Niche Video's",
    description: "Ontdek exclusieve niche video's van cam modellen op CAM4. Van amateur tot fetish — browse door tientallen categorieën met gratis preview content.",
    subtitle: "Exclusieve video content van CAM4 cam modellen — browse per niche",
    loading: "Niches laden...",
    posts: "video's",
    members: "volgers",
  },
  en: {
    title: "Niche Videos — Cam4 Exclusive Video Content | StartVagina",
    h1: "Niche Videos",
    description: "Discover exclusive niche videos from cam models on CAM4. From amateur to fetish — browse dozens of categories with free preview content.",
    subtitle: "Exclusive video content from CAM4 cam models — browse by niche",
    loading: "Loading niches...",
    posts: "videos",
    members: "followers",
  },
  fr: {
    title: "Vidéos Niche — Contenu Vidéo Exclusif Cam4 | StartVagina",
    h1: "Vidéos Niche",
    description: "Découvrez des vidéos niche exclusives de modèles cam sur CAM4. De l'amateur au fétiche — parcourez des dizaines de catégories.",
    subtitle: "Contenu vidéo exclusif des modèles cam CAM4 — parcourir par niche",
    loading: "Chargement...",
    posts: "vidéos",
    members: "abonnés",
  },
  de: {
    title: "Nische Videos — Cam4 Exklusive Video Inhalte | StartVagina",
    h1: "Nische Videos",
    description: "Entdecke exklusive Nische Videos von Cam Models auf CAM4. Von Amateur bis Fetisch — durchstöbere dutzende Kategorien.",
    subtitle: "Exklusive Video-Inhalte von CAM4 Cam Models — nach Nische durchsuchen",
    loading: "Laden...",
    posts: "Videos",
    members: "Follower",
  },
  es: {
    title: "Videos Nicho — Contenido Exclusivo Cam4 | StartVagina",
    h1: "Videos Nicho",
    description: "Descubre videos nicho exclusivos de modelos cam en CAM4. Desde amateur hasta fetiche — explora docenas de categorías.",
    subtitle: "Contenido de video exclusivo de modelos cam CAM4 — explorar por nicho",
    loading: "Cargando...",
    posts: "videos",
    members: "seguidores",
  },
  it: {
    title: "Video Niche — Contenuti Video Esclusivi Cam4 | StartVagina",
    h1: "Video Niche",
    description: "Scopri video niche esclusivi delle cam model su CAM4. Dall'amateur al fetish — sfoglia decine di categorie.",
    subtitle: "Contenuti video esclusivi delle cam model CAM4 — sfoglia per niche",
    loading: "Caricamento...",
    posts: "video",
    members: "follower",
  },
};

const NicheVideos = () => {
  const { lang, langPrefix } = useLanguage();
  const t = nicheI18n[lang] || nicheI18n.nl;
  const { data: niches, isLoading } = useNicheList("female");

  return (
    <AgeGate>
      <div className="min-h-screen flex flex-col bg-background">
        <Helmet>
          <title>{t.title}</title>
          <meta name="description" content={t.description} />
          <meta name="robots" content={getRobotsContent(lang)} />
          <link rel="canonical" href="https://www.startvagina.nl/niche-videos" />
          <meta property="og:title" content={t.title} />
          <meta property="og:description" content={t.description} />
          <meta property="og:url" content="https://www.startvagina.nl/niche-videos" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="StartVagina" />
        </Helmet>

        <Header />

        <main className="container flex-1 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-display text-foreground mb-2 flex items-center gap-3">
              <Film className="text-primary" size={28} />
              {t.h1}
            </h1>
            <p className="text-muted-foreground">{t.subtitle}</p>
          </div>

          {isLoading ? (
            <div className="flex items-center gap-2 text-muted-foreground py-12 justify-center">
              <Loader2 size={20} className="animate-spin text-primary" />
              <span>{t.loading}</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {niches
                ?.filter((n) => n.stats.postsCount > 0)
                .map((niche) => (
                  <Link
                    key={niche.slug}
                    to={`${langPrefix}/niche-videos/${niche.slug}`}
                    className="group relative rounded-lg overflow-hidden bg-card border border-border hover:border-primary transition-colors"
                  >
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={niche.thumbnailMedia.mediumSizeImageUrl || niche.thumbnailMedia.url}
                        alt={niche.name.originalText}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h3 className="text-sm font-semibold text-white truncate">
                          {niche.name.originalText}
                        </h3>
                        <p className="text-xs text-white/70 mt-0.5">
                          {niche.stats.postsCount} {t.posts} · {niche.stats.membersCount.toLocaleString()} {t.members}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </AgeGate>
  );
};

export default NicheVideos;
