import { useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";
import CamGrid from "@/components/CamGrid";
import { Helmet } from "react-helmet-async";
import { useAllCams } from "@/hooks/useAllCams";
import { useLanguage } from "@/i18n/LanguageContext";

const New = () => {
  const { allCams, isLoading } = useAllCams();
  const { t } = useLanguage();

  const newCams = useMemo(() => {
    return allCams
      .filter(m => m.isNew)
      .sort(() => Math.random() - 0.5);
  }, [allCams]);

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
          <title>{t.newTitle}</title>
          <meta name="description" content={t.newDescription} />
        </Helmet>

        <Header />

        <main className="container flex-1 py-6 space-y-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-display mb-2">
              {t.newH1}
            </h1>
            <p className="text-sm text-muted-foreground max-w-2xl">
              {t.newDescription}
            </p>
          </div>

          <CamGrid
            title={t.newSectionJustStarted}
            models={newCams}
            totalOnline={newCams.length}
            isLoading={isLoading}
          />

          {recentlyDiscovered.length > 0 && (
            <CamGrid
              title={t.newSectionHiddenGems}
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
