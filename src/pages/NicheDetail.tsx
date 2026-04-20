import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";
import { Helmet } from "react-helmet-async";
import { useNicheFeed, useNicheList } from "@/hooks/useNiches";
import { Loader2, ArrowLeft } from "lucide-react";
import VideoPreviewCard from "@/components/VideoPreviewCard";
import { useLanguage } from "@/i18n/LanguageContext";
import { getRobotsContent } from "@/lib/robotsMeta";
import { getNicheSeo } from "@/data/nicheSeoData";

function makeAffiliateLink(username: string): string {
  return `https://offers.cam4tracking.com/aff_c?offer_id=278&aff_id=1961&aff_sub=startvagina&aff_sub2=${encodeURIComponent(username)}&url=${encodeURIComponent(`https://www.cam4.com/${username}`)}`;
}

const detailI18n = {
  nl: {
    back: "Alle niches",
    loading: "Video's laden...",
    loadMore: "Meer laden",
    noVideos: "Geen video's gevonden in deze niche.",
    watchOn: "Bekijk op CAM4",
    reactions: "reacties",
  },
  en: {
    back: "All niches",
    loading: "Loading videos...",
    loadMore: "Load more",
    noVideos: "No videos found in this niche.",
    watchOn: "Watch on CAM4",
    reactions: "reactions",
  },
  fr: {
    back: "Toutes les niches",
    loading: "Chargement...",
    loadMore: "Charger plus",
    noVideos: "Aucune vidéo trouvée.",
    watchOn: "Voir sur CAM4",
    reactions: "réactions",
  },
  de: {
    back: "Alle Nischen",
    loading: "Videos laden...",
    loadMore: "Mehr laden",
    noVideos: "Keine Videos gefunden.",
    watchOn: "Auf CAM4 ansehen",
    reactions: "Reaktionen",
  },
  es: {
    back: "Todos los nichos",
    loading: "Cargando...",
    loadMore: "Cargar más",
    noVideos: "No se encontraron videos.",
    watchOn: "Ver en CAM4",
    reactions: "reacciones",
  },
  it: {
    back: "Tutte le niche",
    loading: "Caricamento...",
    loadMore: "Carica altro",
    noVideos: "Nessun video trovato.",
    watchOn: "Guarda su CAM4",
    reactions: "reazioni",
  },
};

const NicheDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang, langPrefix } = useLanguage();
  const t = detailI18n[lang] || detailI18n.nl;

  const { data: niches } = useNicheList("female");
  const nicheInfo = niches?.find((n) => n.slug === slug);

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useNicheFeed(slug || "", "VIDEO");

  const posts = data?.pages.flatMap((p) => p.content) ?? [];
  // Filter to only posts that have at least one video
  const videoPosts = posts.filter((p) =>
    p.medias.some((m) => m.mediaType === "VIDEO") && p.visible && !p.deleted
  );

  const nicheName = nicheInfo?.name.originalText || slug || "";
  const nicheDesc = nicheInfo?.description.originalText || "";
  const seo = getNicheSeo(slug || "", nicheName, lang);

  return (
    <AgeGate>
      <div className="min-h-screen flex flex-col bg-background">
        <Helmet>
          <title>{seo.title}</title>
          <meta name="description" content={seo.description} />
          <meta name="robots" content={getRobotsContent(lang)} />
          <link rel="canonical" href={`https://www.startvagina.nl/niche-videos/${slug}`} />
          <meta property="og:title" content={seo.title} />
          <meta property="og:description" content={seo.description} />
          <meta property="og:url" content={`https://www.startvagina.nl/niche-videos/${slug}`} />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="StartVagina" />
          {nicheInfo?.thumbnailMedia?.mediumSizeImageUrl && (
            <meta property="og:image" content={nicheInfo.thumbnailMedia.mediumSizeImageUrl} />
          )}
        </Helmet>

        <Header />

        <main className="container flex-1 py-8">
          {/* Back + title */}
          <div className="mb-8">
            <Link
              to={`${langPrefix}/niche-videos`}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
            >
              <ArrowLeft size={16} /> {t.back}
            </Link>

            {nicheInfo?.bannerMedia && (
              <div className="relative rounded-lg overflow-hidden mb-6 h-32 md:h-48">
                <img
                  src={nicheInfo.bannerMedia.mediumSizeImageUrl || nicheInfo.bannerMedia.url}
                  alt={nicheName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h1 className="text-2xl md:text-3xl font-bold font-display text-white">{nicheName}</h1>
                  {nicheDesc && (
                    <p className="text-white/80 text-sm mt-1 max-w-2xl">{nicheDesc}</p>
                  )}
                </div>
              </div>
            )}

            {!nicheInfo?.bannerMedia && (
              <h1 className="text-3xl font-bold font-display text-foreground mb-2">{nicheName}</h1>
            )}
          </div>

          {/* Video grid */}
          {isLoading ? (
            <div className="flex items-center gap-2 text-muted-foreground py-12 justify-center">
              <Loader2 size={20} className="animate-spin text-primary" />
              <span>{t.loading}</span>
            </div>
          ) : videoPosts.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">{t.noVideos}</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {videoPosts.map((post) => {
                  const video = post.medias.find((m) => m.mediaType === "VIDEO");
                  if (!video) return null;

                  return (
                    <VideoPreviewCard
                      key={post.id}
                      postId={post.id}
                      title={post.title || post.text}
                      username={post.username}
                      avatarUrl={post.ownerInfo.avatarSmallSizeUrl || post.ownerInfo.avatarUrl}
                      videoUrl={video.mediaUrl}
                      thumbnailUrl={video.thumbnailUrl || post.coverThumbnailUrl}
                      duration={video.duration}
                      reactionsCount={post.reactionsCount}
                      affiliateLink={makeAffiliateLink(post.username)}
                      lang={lang}
                    />
                  );
                })}
              </div>

              {/* Load more */}
              {hasNextPage && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {isFetchingNextPage && <Loader2 size={16} className="animate-spin" />}
                    {t.loadMore}
                  </button>
                </div>
              )}
            </>
          )}
        </main>

        <Footer />
      </div>
    </AgeGate>
  );
};

export default NicheDetail;
