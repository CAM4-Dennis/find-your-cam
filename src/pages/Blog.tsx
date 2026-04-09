import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";
import { Helmet } from "react-helmet-async";
import blogPosts from "@/data/blog-posts.json";

const platformColors: Record<string, string> = {
  Chaturbate: "bg-orange-500/20 text-orange-400",
  Stripchat: "bg-red-500/20 text-red-400",
  BongaCams: "bg-purple-500/20 text-purple-400",
  CAM4: "bg-blue-500/20 text-blue-400",
};

const Blog = () => {
  const sorted = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <AgeGate>
      <div className="min-h-screen flex flex-col bg-background">
        <Helmet>
          <title>Blog — StartVagina | Cam Nieuws, Top Modellen & Gidsen</title>
          <meta name="description" content="Lees de laatste cam nieuws, top model lijsten en beginnersgidsen. Ontdek trending modellen op Chaturbate, Stripchat, BongaCams en CAM4." />
        </Helmet>

        <Header />

        <main className="container flex-1 py-8">
          <h1 className="text-3xl font-bold font-display text-foreground mb-2">Blog</h1>
          <p className="text-muted-foreground mb-8">Top modellen, trending performers en gidsen voor cam liefhebbers.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors"
              >
                <div className="p-5 space-y-3">
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
                  <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.description}
                  </p>
                  {post.models.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {post.models.slice(0, 4).map((m) => (
                        <span key={m.slug} className="text-[10px] bg-secondary text-muted-foreground px-1.5 py-0.5 rounded">
                          {m.name}
                        </span>
                      ))}
                      {post.models.length > 4 && (
                        <span className="text-[10px] bg-secondary text-muted-foreground px-1.5 py-0.5 rounded">
                          +{post.models.length - 4} meer
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </AgeGate>
  );
};

export default Blog;
