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
              <Route path="/cam/:slug" element={<CamStream />} />
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SfwProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
