import { useParams, useNavigate } from "react-router-dom";
import LocalLink from "@/components/LocalLink";
import { useState, useMemo, Fragment } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import blogPosts from "@/data/blog-posts.json";
import { useAllCams } from "@/hooks/useAllCams";
import { useSfwMode } from "@/hooks/useSfwMode";
import type { CamModel } from "@/types/cam";
import { useLanguage } from "@/i18n/LanguageContext";

/* ── constants ─────────────────────────────────────────────── */

const platformColors: Record<string, string> = {
  Chaturbate: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Stripchat: "bg-red-500/20 text-red-400 border-red-500/30",
  BongaCams: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  CAM4: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Jerkmate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "Flirt4Free": "bg-pink-500/20 text-pink-400 border-pink-500/30",
  XCams: "bg-teal-500/20 text-teal-400 border-teal-500/30",
  Islive: "bg-green-500/20 text-green-400 border-green-500/30",
};

const platformListColors: Record<string, string> = {
  Chaturbate: "bg-orange-500/20 text-orange-400",
  Stripchat: "bg-red-500/20 text-red-400",
  BongaCams: "bg-purple-500/20 text-purple-400",
  CAM4: "bg-blue-500/20 text-blue-400",
};

/* ── types ──────────────────────────────────────────────────── */

interface BlogModel {
  name: string;
  platform: string;
  slug: string;
}

interface BlogFilters {
  gender?: string;
  platform?: string;
  tags?: string[];
  languages?: string[];
  country?: string;
}

type BlogPost = (typeof blogPosts)[number] & {
  filters?: BlogFilters;
};

/* ── small components ──────────────────────────────────────── */

const LiveModelCard = ({ cam }: { cam: CamModel }) => {
  const [imgError, setImgError] = useState(false);
  const { sfwMode } = useSfwMode();
  const colorClass = platformColors[cam.platform] || "border-border";

  return (
    <LocalLink
      to={`/${cam.slug}`}
      state={{ model: cam }}
      className="group block rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all hover:scale-[1.03] bg-card"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        <img
          src={imgError ? cam.thumbnailFallback : cam.thumbnail}
          alt={`${cam.name} live cam`}
          className={`w-full h-full object-cover group-hover:opacity-90 transition-opacity ${sfwMode ? "blur-xl scale-110" : ""}`}
          loading="lazy"
          onError={() => setImgError(true)}
        />
        <span className={`absolute top-1.5 right-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded ${colorClass}`}>
          {cam.platform}
        </span>
        <span className="absolute bottom-1.5 left-1.5 text-[9px] bg-green-500/80 text-white px-1.5 py-0.5 rounded font-medium">
          🔴 LIVE
        </span>
      </div>
      <div className="p-2">
        <div className="text-xs font-medium text-foreground truncate">{cam.name}</div>
        <div className="text-[10px] text-muted-foreground">{cam.viewers.toLocaleString()} kijkers</div>
      </div>
    </LocalLink>
  );
};

/* ── Horizontal cam strip (above/between content) ────────── */

const CamStrip = ({
  cams,
  title,
  isLoading,
}: {
  cams: CamModel[];
  title?: string;
  isLoading?: boolean;
}) => {
  if (!isLoading && cams.length === 0) return null;

  return (
    <div className="my-6">
      {title && (
        <h3 className="text-sm font-semibold text-primary/80 mb-3 flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          {title}
        </h3>
      )}
      {isLoading ? (
        <div className="flex gap-3 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex-none w-36 rounded-lg bg-secondary animate-pulse aspect-[16/13]" />
          ))}
        </div>
      ) : (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-border">
          {cams.map((cam) => (
            <div key={cam.id} className="flex-none w-36 sm:w-40">
              <LiveModelCard cam={cam} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ── Related articles section ────────────────────────────── */

const RelatedArticles = ({ posts }: { posts: BlogPost[] }) => {
  const { lang } = useLanguage();

  if (posts.length === 0) return null;

  const locale =
    lang === "nl" ? "nl-NL" : lang === "de" ? "de-DE" : lang === "fr" ? "fr-FR" : lang === "it" ? "it-IT" : lang === "es" ? "es-ES" : "en-US";
  const sectionTitle: Record<string, string> = {
    nl: "Gerelateerde artikelen",
    en: "Related articles",
    fr: "Articles similaires",
    de: "Verwandte Artikel",
    es: "Artículos relacionados",
    it: "Articoli correlati",
  };

  return (
    <section className="pt-6 border-t border-border">
      <h2 className="text-xl font-bold text-foreground mb-4">{sectionTitle[lang] || sectionTitle.en}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <LocalLink
            key={post.id}
            to={`/blog/${post.id}`}
            className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors p-4 space-y-2"
          >
            <div className="flex items-center gap-2">
              {post.platform && (
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded ${platformListColors[post.platform] || "bg-secondary text-muted-foreground"}`}
                >
                  {post.platform}
                </span>
              )}
              <span className="text-xs text-muted-foreground">
                {new Date(post.date).toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" })}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
              {post.title}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2">{post.description}</p>
          </LocalLink>
        ))}
      </div>
    </section>
  );
};

/* ── hooks & helpers ─────────────────────────────────────── */

/** Filter allCams by blog post filters, falling back to broader criteria */
function useFilteredCams(
  filters: BlogFilters | undefined,
  articleModels: BlogModel[] = [],
) {
  const { allCams, isLoading } = useAllCams();

  const cams = useMemo(() => {
    if (isLoading || allCams.length === 0) return [];

    // First try: exact filter match
    let pool = filterPool(allCams, filters);

    // If too few results, broaden (gender + platform only)
    if (pool.length < 10 && filters) {
      pool = filterPool(allCams, { gender: filters.gender, platform: filters.platform });
    }
    // If still too few, gender only
    if (pool.length < 10 && filters?.gender) {
      pool = filterPool(allCams, { gender: filters.gender });
    }
    // Final fallback: all cams
    if (pool.length < 10) {
      pool = [...allCams];
    }

    // Prioritise article-mentioned models that are live
    const mentioned = new Set(articleModels.map((m) => m.name.toLowerCase()));
    const live = pool.filter((c) => mentioned.has(c.name.toLowerCase()));
    const rest = pool
      .filter((c) => !mentioned.has(c.name.toLowerCase()))
      .sort((a, b) => b.viewers - a.viewers);

    return [...live, ...rest];
  }, [allCams, isLoading, filters, articleModels]);

  return { cams, isLoading };
}

function filterPool(cams: CamModel[], filters?: BlogFilters): CamModel[] {
  if (!filters) return [...cams];
  return cams.filter((c) => {
    if (filters.gender && c.gender.toLowerCase() !== filters.gender.toLowerCase()) return false;
    if (filters.platform && c.platform !== filters.platform) return false;
    if (filters.tags?.length) {
      const ct = c.tags.map((t) => t.toLowerCase());
      if (!filters.tags.some((ft) => ct.some((t) => t.includes(ft.toLowerCase())))) return false;
    }
    if (filters.languages?.length) {
      const cl = c.languages.map((l) => l.toLowerCase());
      if (!filters.languages.some((fl) => cl.includes(fl.toLowerCase()))) return false;
    }
    if (filters.country && c.country.toLowerCase() !== filters.country.toLowerCase()) return false;
    return true;
  });
}

/** Split HTML content at <h3> boundaries into groups of N */
function splitContent(html: string, groupSize = 3): string[] {
  const parts = html.split(/(?=<h3)/);
  if (parts.length <= 1) return [html];
  const sections: string[] = [];
  for (let i = 0; i < parts.length; i += groupSize) {
    sections.push(parts.slice(i, Math.min(i + groupSize, parts.length)).join(""));
  }
  return sections;
}

/** Turn model names in HTML into links to their StartVagina profile */
function linkModelNames(html: string, models: BlogModel[], localePath: (p: string) => string): string {
  if (!models.length) return html;

  // Sort longest name first to avoid partial matches
  const sorted = [...models].sort((a, b) => b.name.length - a.name.length);

  // Build one big alternation regex for a single-pass replace
  const pattern = sorted
    .map((m) => m.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  const re = new RegExp(`(${pattern})`, "gi");

  const lookup = new Map(sorted.map((m) => [m.name.toLowerCase(), m]));

  return html.replace(re, (match) => {
    const model = lookup.get(match.toLowerCase());
    if (!model) return match;
    const url = localePath(`/${model.slug}`);
    return `<a href="${url}" class="text-primary hover:underline font-medium">${match}</a>`;
  });
}

/** Fix internal /blog/ links to include language prefix */
function fixBlogLinks(html: string, localePath: (p: string) => string): string {
  return html.replace(/href="\/blog\//g, `href="${localePath("/blog/")}`);
}

/** Auto-find related posts based on shared category, platform, or models */
function getRelatedPosts(currentId: string, currentPost: BlogPost, maxCount = 3): BlogPost[] {
  const scored = (blogPosts as BlogPost[])
    .filter((p) => p.id !== currentId)
    .map((p) => {
      let score = 0;
      if (p.category === currentPost.category) score += 3;
      if (p.platform && p.platform === currentPost.platform) score += 2;
      // Shared models
      const currentNames = new Set(currentPost.models.map((m) => m.name.toLowerCase()));
      score += p.models.filter((m) => currentNames.has(m.name.toLowerCase())).length;
      return { post: p as BlogPost, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  const result = scored.slice(0, maxCount).map((s) => s.post);

  // Fill remaining slots with recent posts
  if (result.length < maxCount) {
    const usedIds = new Set([currentId, ...result.map((p) => p.id)]);
    const filler = (blogPosts as BlogPost[])
      .filter((p) => !usedIds.has(p.id))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, maxCount - result.length);
    result.push(...filler);
  }

  return result;
}

/* ── Main component ──────────────────────────────────────── */

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { localePath, lang } = useLanguage();

  const post = (blogPosts as BlogPost[]).find((p) => p.id === id);
  const filters = post?.filters;
  const { cams, isLoading: camsLoading } = useFilteredCams(filters, post?.models || []);
  const relatedPosts = useMemo(() => (post ? getRelatedPosts(post.id, post) : []), [post]);

  if (!post) {
    return (
      <AgeGate>
        <div className="min-h-screen flex flex-col bg-background">
          <Header />
          <main className="container flex-1 py-12 text-center">
            <p className="text-muted-foreground">Artikel niet gevonden.</p>
            <Button variant="outline" className="mt-4" onClick={() => navigate(localePath("/blog"))}>
              <ArrowLeft size={16} className="mr-2" /> Terug naar blog
            </Button>
          </main>
          <Footer />
        </div>
      </AgeGate>
    );
  }

  // Process content: link model names + fix blog links
  const processedContent = fixBlogLinks(
    linkModelNames(post.content, post.models, localePath),
    localePath,
  );

  // Split content into sections for interleaving cam strips
  const contentSections = splitContent(processedContent, 3);

  // Distribute cams across strips (no overlap)
  const topCams = cams.slice(0, 6);
  const bottomCams = cams.slice(6, 16);
  // For mid strips: one strip per content gap (max 2)
  const midStrips: CamModel[][] = [];
  const midStart = 16;
  const gaps = Math.max(0, contentSections.length - 1);
  for (let i = 0; i < Math.min(gaps, 2); i++) {
    midStrips.push(cams.slice(midStart + i * 6, midStart + (i + 1) * 6));
  }

  // Strip titles
  const camLabel = filters?.platform || "cam";
  const stripTitles: Record<string, Record<string, string>> = {
    top: {
      nl: `Live ${camLabel} modellen`,
      en: `Live ${camLabel} models`,
      fr: `Modèles ${camLabel} en direct`,
      de: `Live ${camLabel} Models`,
      es: `Modelos ${camLabel} en vivo`,
      it: `Modelle ${camLabel} dal vivo`,
    },
    mid: {
      nl: `Meer live ${camLabel} shows`,
      en: `More live ${camLabel} shows`,
      fr: `Plus de shows ${camLabel}`,
      de: `Mehr live ${camLabel} Shows`,
      es: `Más shows ${camLabel} en vivo`,
      it: `Più show ${camLabel} dal vivo`,
    },
    bottom: {
      nl: "Populaire modellen — nu live",
      en: "Popular models — live now",
      fr: "Modèles populaires — en direct",
      de: "Beliebte Models — jetzt live",
      es: "Modelos populares — en vivo ahora",
      it: "Modelle popolari — in diretta ora",
    },
  };

  const locale =
    lang === "nl" ? "nl-NL" : lang === "de" ? "de-DE" : lang === "fr" ? "fr-FR" : lang === "it" ? "it-IT" : lang === "es" ? "es-ES" : "en-US";

  return (
    <AgeGate>
      <div className="min-h-screen flex flex-col bg-background">
        <Helmet>
          <title>{`${post.title} — StartVagina Blog`}</title>
          <meta name="description" content={post.description} />
          <meta property="og:title" content={`${post.title} — StartVagina Blog`} />
          <meta property="og:description" content={post.description} />
          <meta property="og:type" content="article" />
          <meta property="og:site_name" content="StartVagina" />
        </Helmet>

        <Header />

        <main className="container flex-1 py-6 max-w-3xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(localePath("/blog"))}
            className="text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft size={16} className="mr-1" /> Terug naar blog
          </Button>

          <article className="space-y-4">
            {/* Header */}
            <header className="space-y-3">
              <div className="flex items-center gap-2">
                {post.platform && (
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded ${platformListColors[post.platform] || "bg-secondary text-muted-foreground"}`}
                  >
                    {post.platform}
                  </span>
                )}
                <span className="text-xs text-muted-foreground">
                  {new Date(post.date).toLocaleDateString(locale, {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <h1 className="text-3xl font-bold font-display text-foreground leading-tight">
                {post.title}
              </h1>
              <p className="text-muted-foreground">{post.description}</p>
            </header>

            {/* ─── Top cam strip (above article) ─── */}
            <CamStrip cams={topCams} title={stripTitles.top[lang] || stripTitles.top.en} isLoading={camsLoading} />

            {/* ─── Content with interleaved cam strips ─── */}
            {contentSections.map((section, i) => (
              <Fragment key={i}>
                <div
                  className="prose prose-invert prose-sm max-w-none
                    [&_h3]:text-foreground [&_h3]:font-semibold [&_h3]:text-lg [&_h3]:mt-6 [&_h3]:mb-2
                    [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4
                    [&_ul]:text-muted-foreground [&_li]:mb-1
                    [&_strong]:text-foreground
                    [&_a]:text-primary [&_a]:no-underline [&_a:hover]:underline"
                  dangerouslySetInnerHTML={{ __html: section }}
                />
                {/* Insert a cam strip between content sections (max 2) */}
                {i < contentSections.length - 1 && midStrips[i] && midStrips[i].length > 0 && (
                  <CamStrip
                    cams={midStrips[i]}
                    title={stripTitles.mid[lang] || stripTitles.mid.en}
                    isLoading={camsLoading}
                  />
                )}
              </Fragment>
            ))}

            {/* ─── Bottom cam grid (larger) ─── */}
            {(camsLoading || bottomCams.length > 0) && (
              <section className="pt-6 border-t border-border">
                <h2 className="text-xl font-bold text-foreground mb-4">
                  {stripTitles.bottom[lang] || stripTitles.bottom.en}
                </h2>
                {camsLoading ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div key={i} className="rounded-lg bg-secondary animate-pulse aspect-[16/13]" />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {bottomCams.map((cam) => (
                      <LiveModelCard key={cam.id} cam={cam} />
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* ─── Related articles ─── */}
            <RelatedArticles posts={relatedPosts} />
          </article>
        </main>

        <Footer />
      </div>
    </AgeGate>
  );
};

export default BlogPost;
