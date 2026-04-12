import { useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";
import CamGrid from "@/components/CamGrid";
import { Helmet } from "react-helmet-async";
import { useAllCams } from "@/hooks/useAllCams";
import { useLanguage } from "@/i18n/LanguageContext";

const TopCams = () => {
  const { allCams, isLoading } = useAllCams();
  const { t } = useLanguage();

  const topByViewers = useMemo(() => {
    return [...allCams].sort((a, b) => b.viewers - a.viewers).slice(0, 30);
  }, [allCams]);

  const topHD = useMemo(() => {
    return allCams
      .filter(m => m.isHD)
      .sort((a, b) => b.viewers - a.viewers)
      .slice(0, 15);
  }, [allCams]);

  const topPerPlatform = useMemo(() => {
    const platforms = ["Cam4", "Chaturbate", "BongaCams", "Stripchat"];
    return platforms.map(platform => ({
      platform,
      models: allCams
        .filter(m => m.platform === platform)
        .sort((a, b) => b.viewers - a.viewers)
        .slice(0, 15),
    })).filter(p => p.models.length > 0);
  }, [allCams]);

  return (
    <AgeGate>
      <div className="min-h-screen flex flex-col bg-background">
        <Helmet>
          <title>{t.topTitle}</title>
          <meta name="description" content={t.topDescription} />
        </Helmet>

        <Header />

        <main className="container flex-1 py-6 space-y-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-display mb-2">
              {t.topH1}
            </h1>
            <p className="text-sm text-muted-foreground max-w-2xl">
              {t.topDescription}
            </p>
          </div>

          <CamGrid
            title={t.topSectionMostViewed}
            models={topByViewers}
            totalOnline={topByViewers.length}
            isLoading={isLoading}
          />

          {topHD.length > 0 && (
            <CamGrid
              title={t.topSectionHD}
              models={topHD}
              totalOnline={topHD.length}
              isLoading={isLoading}
            />
          )}

          {topPerPlatform.map(({ platform, models }) => (
            <CamGrid
              key={platform}
              title={`🏅 Top ${platform}`}
              models={models}
              totalOnline={models.length}
              isLoading={isLoading}
            />
          ))}
        </main>

        <Footer />
      </div>
    </AgeGate>
  );
};

export default TopCams;
