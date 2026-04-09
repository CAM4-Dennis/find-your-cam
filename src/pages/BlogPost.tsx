import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import blogPosts from "@/data/blog-posts.json";

const platformColors: Record<string, string> = {
  Chaturbate: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Stripchat: "bg-red-500/20 text-red-400 border-red-500/30",
  BongaCams: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  CAM4: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const post = blogPosts.find((p) => p.id === id);

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
                <h2 className="text-xl font-bold text-foreground mb-4">Bekijk deze modellen live</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {post.models.map((model) => (
                    <Link
                      key={model.slug}
                      to={`/cam/${model.slug}`}
                      className={`block p-3 rounded-lg border text-center hover:scale-105 transition-transform ${platformColors[model.platform] || "bg-secondary border-border"}`}
                    >
                      <div className="font-medium text-sm text-foreground truncate">{model.name}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{model.platform}</div>
                    </Link>
                  ))}
                </div>
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
