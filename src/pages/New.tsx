import { useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";
import CamGrid from "@/components/CamGrid";
import { Helmet } from "react-helmet-async";
import { useAllCams } from "@/hooks/useAllCams";

const New = () => {
  const { allCams, isLoading } = useAllCams();

  const newCams = useMemo(() => {
    return allCams
      .filter(m => m.isNew)
      .sort(() => Math.random() - 0.5);
  }, [allCams]);

  // Also show young models who are newer to camming (low viewer count as heuristic)
  const recentlyDiscovered = useMemo(() => {
    return allCams
      .filter(m => !m.isNew && m.viewers <= 50)
      .sort(() => Math.random() - 0.5)
      .slice(0, 30);
  }, [allCams]);

  return (
    <AgeGate>
      <div className="min-h-screen flex flex-col bg-background">
        <Helmet>
          <title>Nieuwe Cam Girls — StartVagina | Vers Talent Live</title>
          <meta name="description" content="Ontdek nieuwe cam girls die net begonnen zijn met webcammen. Vers talent live op StartVagina — als eerste ontdekken!" />
        </Helmet>

        <Header />

        <main className="container flex-1 py-6 space-y-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-display mb-2">
              🆕 Nieuwe Cam Girls
            </h1>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Ontdek vers talent! Deze modellen zijn net begonnen en staan voor het eerst live. Wees erbij vanaf het begin.
            </p>
          </div>

          <CamGrid
            title="⭐ Net Begonnen"
            models={newCams}
            totalOnline={newCams.length}
            isLoading={isLoading}
          />

          {recentlyDiscovered.length > 0 && (
            <CamGrid
              title="💎 Verborgen Pareltjes"
              models={recentlyDiscovered}
              totalOnline={recentlyDiscovered.length}
              isLoading={isLoading}
            />
          )}
        </main>

        <Footer />
      </div>
    </AgeGate>
  );
};

export default New;
