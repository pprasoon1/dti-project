
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import SoilInput from "./pages/SoilInput";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";
import Visualization from '@/pages/Visualization';
import CropLibrary from '@/pages/CropLibrary';
import FarmerResources from '@/pages/FarmerResources';
import Test from "./pages/Test";
import AboutPage from "./pages/About";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/soil-input" element={<SoilInput />} />
           <Route path="/about" element= {<AboutPage />} />
            <Route path="/results" element={<Results />} />
            <Route path="/visualization" element={<Visualization />} />
            <Route path="/crop-library" element={<CropLibrary />} />
            <Route path="/farmer-resources" element={<FarmerResources />} />
            
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

// // In your router configuration:
// {
//   path: "/visualization",
//   element: <Visualization />
// },
// {
//   path: "/crop-library",
//   element: <CropLibrary />
// },
// {
//   path: "/farmer-resources",
//   element: <FarmerResources />
// }
