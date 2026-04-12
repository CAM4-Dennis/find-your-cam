import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
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
const CountryLanding = lazy(() => import("./pages/CountryLanding.tsx"));

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
    <Route path="xcams/:username" element={<CamStream />} />
    <Route path="categories" element={<Categories />} />
    <Route path="countries" element={<Countries />} />
    <Route path="languages" element={<Languages />} />
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
    <Route path="new" element={<New />} />
    <Route path="top" element={<TopCams />} />
    <Route path="blog" element={<Blog />} />
    <Route path="blog/:id" element={<BlogPost />} />
    <Route path="webcamsex" element={<KeywordLanding />} />
    <Route path="gratis-webcam-sex" element={<KeywordLanding />} />
    <Route path="sexchat" element={<KeywordLanding />} />
    <Route path="cam-girls" element={<KeywordLanding />} />
    <Route path="live-sex-cams" element={<KeywordLanding />} />
    <Route path="live-sex-cams-cam4" element={<PlatformLanding />} />
    <Route path="live-sex-cams-chaturbate" element={<PlatformLanding />} />
    <Route path="live-sex-cams-bongacams" element={<PlatformLanding />} />
    <Route path="live-sex-cams-stripchat" element={<PlatformLanding />} />
    <Route path="live-sex-cams-xcams" element={<PlatformLanding />} />
    <Route path="webcamsex-teen-18-plus" element={<CategoryLanding />} />
    <Route path="webcamsex-milf" element={<CategoryLanding />} />
    <Route path="webcamsex-mature" element={<CategoryLanding />} />
    <Route path="webcamsex-asian" element={<CategoryLanding />} />
    <Route path="webcamsex-latina" element={<CategoryLanding />} />
    <Route path="webcamsex-ebony" element={<CategoryLanding />} />
    <Route path="webcamsex-grote-borsten" element={<CategoryLanding />} />
    <Route path="webcamsex-kleine-borsten" element={<CategoryLanding />} />
    <Route path="webcamsex-anal" element={<CategoryLanding />} />
    <Route path="webcamsex-koppels" element={<CategoryLanding />} />
    <Route path="webcamsex-squirt" element={<CategoryLanding />} />
    <Route path="webcamsex-bdsm" element={<CategoryLanding />} />
    <Route path="webcamsex-tattoo" element={<CategoryLanding />} />
    <Route path="webcamsex-hairy" element={<CategoryLanding />} />
    <Route path="webcamsex-voeten" element={<CategoryLanding />} />
    <Route path="webcamsex-outdoor" element={<CategoryLanding />} />
    <Route path="webcamsex-mobiel" element={<CategoryLanding />} />
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
