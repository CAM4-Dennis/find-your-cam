import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useMemo } from "react";
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

const platformColors: Record<string, string> = {
  Chaturbate: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Stripchat: "bg-red-500/20 text-red-400 border-red-500/30",
  BongaCams: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  CAM4: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

const LiveModelCard = ({ cam }: { cam: CamModel }) => {
  const [imgError, setImgError] = useState(false);
  const { sfwMode } = useSfwMode();
  const colorClass = platformColors[cam.platform] || "border-border";

  return (
    <Link
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
    </Link>
  );
};

function useBlogModels(articleModels: { name: string; platform: string; slug: string }[], targetCount = 10) {
  const { allCams, isLoading } = useAllCams();

  const models = useMemo(() => {
    if (isLoading || allCams.length === 0) return [];

    // Try to find article models that are currently live
    const liveArticleModels: CamModel[] = [];
    for (const m of articleModels) {
      const found = allCams.find(
        (c) => c.name.toLowerCase() === m.name.toLowerCase() && c.platform === m.platform
      );
      if (found) liveArticleModels.push(found);
    }

    // Fill remaining slots with random live models (prioritize same platform)
    const remaining = targetCount - liveArticleModels.length;
    if (remaining <= 0) return liveArticleModels.slice(0, targetCount);

    const usedIds = new Set(liveArticleModels.map((c) => c.id));
    const platforms = [...new Set(articleModels.map((m) => m.platform))];

    // Prefer models from the same platform(s)
    const samePlatform = allCams.filter((c) => platforms.includes(c.platform) && !usedIds.has(c.id));
    const otherPlatform = allCams.filter((c) => !platforms.includes(c.platform) && !usedIds.has(c.id));

    // Sort by viewers (most popular first), then take what we need
    const fillers = [...samePlatform, ...otherPlatform]
      .sort((a, b) => b.viewers - a.viewers)
      .slice(0, remaining);

    return [...liveArticleModels, ...fillers];
  }, [allCams, isLoading, articleModels, targetCount]);

  return { models, isLoading };
}

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const post = blogPosts.find((p) => p.id === id);
  const { models: liveModels, isLoading: modelsLoading } = useBlogModels(post?.models || [], 10);

  if (!post) {
    return (
      <AgeGate>
        <div className="min-h-screen flex flex-col bg-background">
          <Header />
          <main className="container flex-1 py-12 text-center">
            <p className="text-muted-foreground">Artikel niet gevonden.</p>
            <Button variant="outline" className="mt-4" onClick={() => navigate("/blog")}>
              <ArrowLeft size={16} className="mr-2" /> Terug naar blog
            </Button>
          </main>
          <Footer />
        </div>
      </AgeGate>
    );
  }

  return (
    <AgeGate>
      <div className="min-h-screen flex flex-col bg-background">
        <Helmet>
          <title>{`${post.title} — StartVagina Blog`}</title>
          <meta name="description" content={post.description} />
        </Helmet>

        <Header />

        <main className="container flex-1 py-6 max-w-3xl mx-auto">
          <Button variant="ghost" size="sm" onClick={() => navigate("/blog")} className="text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft size={16} className="mr-1" /> Terug naar blog
          </Button>

          <article className="space-y-6">
            <header className="space-y-3">
              <div className="flex items-center gap-2">
                {post.platform && (
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${platformColors[post.platform] || "bg-secondary text-muted-foreground"}`}>
                    {post.platform}
                  </span>
                )}
                <span className="text-xs text-muted-foreground">
                  {new Date(post.date).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })}
                </span>
              </div>
              <h1 className="text-3xl font-bold font-display text-foreground leading-tight">
                {post.title}
              </h1>
              <p className="text-muted-foreground">{post.description}</p>
            </header>

            <div
              className="prose prose-invert prose-sm max-w-none
                [&_h3]:text-foreground [&_h3]:font-semibold [&_h3]:text-lg [&_h3]:mt-6 [&_h3]:mb-2
                [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4
                [&_ul]:text-muted-foreground [&_li]:mb-1
                [&_strong]:text-foreground"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {post.models.length > 0 && (
              <section className="pt-6 border-t border-border">
                <h2 className="text-xl font-bold text-foreground mb-4">
                  {liveModels.some((m) => post.models.some((pm) => pm.name.toLowerCase() === m.name.toLowerCase()))
                    ? "Deze modellen zijn nu live"
                    : "Populaire modellen — nu live"}
                </h2>
                {modelsLoading ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div key={i} className="rounded-lg bg-secondary animate-pulse aspect-[16/13]" />
                    ))}
                  </div>
                ) : liveModels.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {liveModels.map((cam) => (
                      <LiveModelCard key={cam.id} cam={cam} />
                    ))}
                  </div>
                ) : null}
              </section>
            )}
          </article>
        </main>

        <Footer />
      </div>
    </AgeGate>
  );
};

export default BlogPost;
