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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SfwProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
