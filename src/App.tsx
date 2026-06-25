import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Outlet, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SfwProvider } from "@/hooks/useSfwMode";
import { LanguageProvider } from "@/i18n/LanguageContext";
import LanguageDetector from "@/components/LanguageDetector";

// Eager: landing page (most common entry)
import Index from "./pages/Index.tsx";

// Lazy: all other pages
const CamStream = lazy(() => import("./pages/CamStream.tsx"));
const Categories = lazy(() => import("./pages/Categories.tsx"));
const Countries = lazy(() => import("./pages/Countries.tsx"));
const New = lazy(() => import("./pages/New.tsx"));
const TopCams = lazy(() => import("./pages/TopCams.tsx"));
const Blog = lazy(() => import("./pages/Blog.tsx"));
const BlogPost = lazy(() => import("./pages/BlogPost.tsx"));
const KeywordLanding = lazy(() => import("./pages/KeywordLanding.tsx"));
const Languages = lazy(() => import("./pages/Languages.tsx"));
const LanguageLanding = lazy(() => import("./pages/LanguageLanding.tsx"));
const PlatformLanding = lazy(() => import("./pages/PlatformLanding.tsx"));
const CategoryLanding = lazy(() => import("./pages/CategoryLanding.tsx"));
const ComparisonLanding = lazy(() => import("./pages/ComparisonLanding.tsx"));
const CountryLanding = lazy(() => import("./pages/CountryLanding.tsx"));
const NicheVideos = lazy(() => import("./pages/NicheVideos.tsx"));
const NicheDetail = lazy(() => import("./pages/NicheDetail.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));

const queryClient = new QueryClient();

/** Layout wrapper that provides language context */
const LanguageLayout = () => (
  <LanguageProvider>
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <Outlet />
    </Suspense>
  </LanguageProvider>
);

/** All the page routes — used as children of the language layout */
const pageRoutes = (
  <>
    <Route index element={<Index />} />
    <Route path="chaturbate/:username" element={<CamStream />} />
    <Route path="bongacams/:username" element={<CamStream />} />
    <Route path="cam4/:username" element={<CamStream />} />
    <Route path="stripchat/:username" element={<CamStream />} />
    <Route path="jerkmate/:username" element={<CamStream />} />
    <Route path="xcams/:username" element={<CamStream />} />
    <Route path="categorieen" element={<Categories />} />
    <Route path="landen" element={<Countries />} />
    <Route path="talen" element={<Languages />} />
    <Route path="webcamsex-in-het-nederlands" element={<LanguageLanding />} />
    <Route path="english-webcam-sex-chat" element={<LanguageLanding />} />
    <Route path="webcamsex-auf-deutsch" element={<LanguageLanding />} />
    <Route path="webcamsex-en-francais" element={<LanguageLanding />} />
    <Route path="webcamsex-en-espanol" element={<LanguageLanding />} />
    <Route path="webcamsex-in-italiano" element={<LanguageLanding />} />
    <Route path="webcamsex-em-portugues" element={<LanguageLanding />} />
    <Route path="webcamsex-na-russkom" element={<LanguageLanding />} />
    <Route path="japanese-webcam-sex" element={<LanguageLanding />} />
    <Route path="korean-webcam-sex" element={<LanguageLanding />} />
    <Route path="nieuwe-cam-girls" element={<New />} />
    <Route path="populairste-cam-girls" element={<TopCams />} />
    <Route path="blog" element={<Blog />} />
    <Route path="blog/:id" element={<BlogPost />} />
    <Route path="webcamsex" element={<KeywordLanding />} />
    <Route path="gratis-webcam-sex" element={<KeywordLanding />} />
    <Route path="sexchat" element={<KeywordLanding />} />
    <Route path="cam-girls" element={<KeywordLanding />} />
    <Route path="live-sex-cams" element={<KeywordLanding />} />
    <Route path="chaturbate-vs-stripchat" element={<ComparisonLanding />} />
    <Route path="chaturbate-vs-bongacams" element={<ComparisonLanding />} />
    <Route path="chaturbate-vs-cam4" element={<ComparisonLanding />} />
    <Route path="chaturbate-vs-jerkmate" element={<ComparisonLanding />} />
    <Route path="stripchat-vs-bongacams" element={<ComparisonLanding />} />
    <Route path="stripchat-vs-cam4" element={<ComparisonLanding />} />
    <Route path="stripchat-vs-jerkmate" element={<ComparisonLanding />} />
    <Route path="cam4-vs-bongacams" element={<ComparisonLanding />} />
    <Route path="cam4-vs-jerkmate" element={<ComparisonLanding />} />
    <Route path="bongacams-vs-jerkmate" element={<ComparisonLanding />} />
    <Route path="live-sex-cams-cam4" element={<PlatformLanding />} />
    <Route path="live-sex-cams-chaturbate" element={<PlatformLanding />} />
    <Route path="live-sex-cams-bongacams" element={<PlatformLanding />} />
    <Route path="live-sex-cams-stripchat" element={<PlatformLanding />} />
    <Route path="live-sex-cams-jerkmate" element={<PlatformLanding />} />
    <Route path="live-sex-cams-flirt4free" element={<PlatformLanding />} />
    <Route path="live-sex-cams-xcams" element={<PlatformLanding />} />
    <Route path="live-sex-cams-islive" element={<PlatformLanding />} />
    <Route path="jonge-cam-girls-18-plus" element={<CategoryLanding />} />
    <Route path="milf-webcamsex-ervaren-vrouwen" element={<CategoryLanding />} />
    <Route path="mature-webcamsex-oudere-vrouwen" element={<CategoryLanding />} />
    <Route path="aziatische-cam-girls-live" element={<CategoryLanding />} />
    <Route path="latina-cam-girls-live" element={<CategoryLanding />} />
    <Route path="ebony-cam-girls-live" element={<CategoryLanding />} />
    <Route path="cam-girls-grote-borsten" element={<CategoryLanding />} />
    <Route path="petite-cam-girls-kleine-borsten" element={<CategoryLanding />} />
    <Route path="anale-cam-shows-live" element={<CategoryLanding />} />
    <Route path="cam-koppels-live-sex" element={<CategoryLanding />} />
    <Route path="squirt-cam-shows-live" element={<CategoryLanding />} />
    <Route path="bdsm-bondage-cam-shows" element={<CategoryLanding />} />
    <Route path="getatoeeerde-cam-girls" element={<CategoryLanding />} />
    <Route path="behaarde-cam-girls-natural" element={<CategoryLanding />} />
    <Route path="voeten-fetish-cam-shows" element={<CategoryLanding />} />
    <Route path="outdoor-cam-shows-buiten" element={<CategoryLanding />} />
    <Route path="mobiele-cam-shows-live" element={<CategoryLanding />} />
    <Route path="contact" element={<Contact />} />
    <Route path="videos" element={<NicheVideos />} />
    <Route path="videos/:slug" element={<NicheDetail />} />
    {/* Redirects: old static slugs → new slugs */}
    <Route path="new" element={<Navigate to="/nieuwe-cam-girls" replace />} />
    <Route path="top" element={<Navigate to="/populairste-cam-girls" replace />} />
    <Route path="categories" element={<Navigate to="/categorieen" replace />} />
    <Route path="countries" element={<Navigate to="/landen" replace />} />
    <Route path="languages" element={<Navigate to="/talen" replace />} />
    <Route path="niche-videos" element={<Navigate to="/videos" replace />} />
    <Route path="niche-videos/:slug" element={<Navigate to="/videos/:slug" replace />} />
    {/* Redirects: old category slugs → new slugs */}
    <Route path="webcamsex-teen-18-plus" element={<Navigate to="/jonge-cam-girls-18-plus" replace />} />
    <Route path="webcamsex-milf" element={<Navigate to="/milf-webcamsex-ervaren-vrouwen" replace />} />
    <Route path="webcamsex-mature" element={<Navigate to="/mature-webcamsex-oudere-vrouwen" replace />} />
    <Route path="webcamsex-asian" element={<Navigate to="/aziatische-cam-girls-live" replace />} />
    <Route path="webcamsex-latina" element={<Navigate to="/latina-cam-girls-live" replace />} />
    <Route path="webcamsex-ebony" element={<Navigate to="/ebony-cam-girls-live" replace />} />
    <Route path="webcamsex-grote-borsten" element={<Navigate to="/cam-girls-grote-borsten" replace />} />
    <Route path="webcamsex-kleine-borsten" element={<Navigate to="/petite-cam-girls-kleine-borsten" replace />} />
    <Route path="webcamsex-anal" element={<Navigate to="/anale-cam-shows-live" replace />} />
    <Route path="webcamsex-koppels" element={<Navigate to="/cam-koppels-live-sex" replace />} />
    <Route path="webcamsex-squirt" element={<Navigate to="/squirt-cam-shows-live" replace />} />
    <Route path="webcamsex-bdsm" element={<Navigate to="/bdsm-bondage-cam-shows" replace />} />
    <Route path="webcamsex-tattoo" element={<Navigate to="/getatoeeerde-cam-girls" replace />} />
    <Route path="webcamsex-hairy" element={<Navigate to="/behaarde-cam-girls-natural" replace />} />
    <Route path="webcamsex-voeten" element={<Navigate to="/voeten-fetish-cam-shows" replace />} />
    <Route path="webcamsex-outdoor" element={<Navigate to="/outdoor-cam-shows-buiten" replace />} />
    <Route path="webcamsex-mobiel" element={<Navigate to="/mobiele-cam-shows-live" replace />} />
    {/* Redirects: old country slugs → new slugs */}
    <Route path="webcamsex-nederland" element={<Navigate to="/nederlandse-cam-girls" replace />} />
    <Route path="webcamsex-belgie" element={<Navigate to="/belgische-cam-girls" replace />} />
    <Route path="webcamsex-duitsland" element={<Navigate to="/duitse-cam-girls" replace />} />
    <Route path="webcamsex-colombia" element={<Navigate to="/colombiaanse-cam-girls" replace />} />
    <Route path="webcamsex-roemenie" element={<Navigate to="/roemeense-cam-girls" replace />} />
    <Route path="webcamsex-italie" element={<Navigate to="/italiaanse-cam-girls" replace />} />
    <Route path="webcamsex-spanje" element={<Navigate to="/spaanse-cam-girls" replace />} />
    <Route path="webcamsex-frankrijk" element={<Navigate to="/franse-cam-girls" replace />} />
    <Route path="webcamsex-verenigd-koninkrijk" element={<Navigate to="/britse-cam-girls" replace />} />
    <Route path="webcamsex-verenigde-staten" element={<Navigate to="/amerikaanse-cam-girls" replace />} />
    <Route path="webcamsex-rusland" element={<Navigate to="/russische-cam-girls" replace />} />
    <Route path="webcamsex-oekraine" element={<Navigate to="/oekraiense-cam-girls" replace />} />
    <Route path="webcamsex-brazilie" element={<Navigate to="/braziliaanse-cam-girls" replace />} />
    <Route path="webcamsex-japan" element={<Navigate to="/japanse-cam-girls" replace />} />
    <Route path="webcamsex-polen" element={<Navigate to="/poolse-cam-girls" replace />} />
    <Route path="webcamsex-mexico" element={<Navigate to="/mexicaanse-cam-girls" replace />} />
    <Route path="webcamsex-tsjechie" element={<Navigate to="/tsjechische-cam-girls" replace />} />
    <Route path="webcamsex-filipijnen" element={<Navigate to="/filipijnse-cam-girls" replace />} />
    <Route path="webcamsex-thailand" element={<Navigate to="/thaise-cam-girls" replace />} />
    <Route path="*" element={<CountryLanding />} />
  </>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <SfwProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <LanguageDetector />
            <Routes>
              {/* Language-prefixed: /en/*, /fr/*, etc. use Outlet + relative child routes */}
              <Route path="/en" element={<LanguageLayout />}>{pageRoutes}</Route>
              <Route path="/fr" element={<LanguageLayout />}>{pageRoutes}</Route>
              <Route path="/it" element={<LanguageLayout />}>{pageRoutes}</Route>
              <Route path="/de" element={<LanguageLayout />}>{pageRoutes}</Route>
              <Route path="/es" element={<LanguageLayout />}>{pageRoutes}</Route>
              {/* Default Dutch (no prefix) */}
              <Route path="/" element={<LanguageLayout />}>{pageRoutes}</Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SfwProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
