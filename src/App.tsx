import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SfwProvider } from "@/hooks/useSfwMode";
import Index from "./pages/Index.tsx";
import CamStream from "./pages/CamStream.tsx";
import Categories from "./pages/Categories.tsx";
import Countries from "./pages/Countries.tsx";
import New from "./pages/New.tsx";
import TopCams from "./pages/TopCams.tsx";
import NotFound from "./pages/NotFound.tsx";
import Blog from "./pages/Blog.tsx";
import BlogPost from "./pages/BlogPost.tsx";
import KeywordLanding from "./pages/KeywordLanding.tsx";
import PlatformLanding from "./pages/PlatformLanding.tsx";
import CategoryLanding from "./pages/CategoryLanding.tsx";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <SfwProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/chaturbate/:username" element={<CamStream />} />
              <Route path="/bongacams/:username" element={<CamStream />} />
              <Route path="/cam4/:username" element={<CamStream />} />
              <Route path="/stripchat/:username" element={<CamStream />} />
              <Route path="/xcams/:username" element={<CamStream />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/countries" element={<Countries />} />
              <Route path="/new" element={<New />} />
              <Route path="/top" element={<TopCams />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/webcamsex" element={<KeywordLanding />} />
              <Route path="/gratis-webcam-sex" element={<KeywordLanding />} />
              <Route path="/sexchat" element={<KeywordLanding />} />
              <Route path="/cam-girls" element={<KeywordLanding />} />
              <Route path="/live-sex-cams" element={<KeywordLanding />} />
              <Route path="/live-sex-cams-cam4" element={<PlatformLanding />} />
              <Route path="/live-sex-cams-chaturbate" element={<PlatformLanding />} />
              <Route path="/live-sex-cams-bongacams" element={<PlatformLanding />} />
              <Route path="/live-sex-cams-stripchat" element={<PlatformLanding />} />
              <Route path="/live-sex-cams-xcams" element={<PlatformLanding />} />
              <Route path="/webcamsex-teen-18-plus" element={<CategoryLanding />} />
              <Route path="/webcamsex-milf" element={<CategoryLanding />} />
              <Route path="/webcamsex-mature" element={<CategoryLanding />} />
              <Route path="/webcamsex-asian" element={<CategoryLanding />} />
              <Route path="/webcamsex-latina" element={<CategoryLanding />} />
              <Route path="/webcamsex-ebony" element={<CategoryLanding />} />
              <Route path="/webcamsex-grote-borsten" element={<CategoryLanding />} />
              <Route path="/webcamsex-kleine-borsten" element={<CategoryLanding />} />
              <Route path="/webcamsex-anal" element={<CategoryLanding />} />
              <Route path="/webcamsex-koppels" element={<CategoryLanding />} />
              <Route path="/webcamsex-squirt" element={<CategoryLanding />} />
              <Route path="/webcamsex-bdsm" element={<CategoryLanding />} />
              <Route path="/webcamsex-tattoo" element={<CategoryLanding />} />
              <Route path="/webcamsex-hairy" element={<CategoryLanding />} />
              <Route path="/webcamsex-voeten" element={<CategoryLanding />} />
              <Route path="/webcamsex-outdoor" element={<CategoryLanding />} />
              <Route path="/webcamsex-mobiel" element={<CategoryLanding />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SfwProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
