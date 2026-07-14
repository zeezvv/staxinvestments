import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/react";
import Index from "./pages/Index.tsx";
import MiddletownOhio from "./pages/MiddletownOhio.tsx";
import CashOffer from "./pages/CashOffer.tsx";
import CashOfferIndianapolis from "./pages/CashOfferIndianapolis.tsx";
import ThankYou from "./pages/ThankYou.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import Unsubscribe from "./pages/Unsubscribe.tsx";
import TermsAndConditions from "./pages/TermsAndConditions.tsx";
import NotFound from "./pages/NotFound.tsx";
import Sorry from "./pages/Sorry.tsx";
import FloatingHamburgerMenu from "./components/FloatingHamburgerMenu.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Analytics />
      <BrowserRouter>
        <FloatingHamburgerMenu />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Index />} />
          <Route path="/we-buy-houses-middletown-ohio" element={<MiddletownOhio />} />
          <Route path="/cash-offer" element={<CashOffer />} />
          <Route path="/cash-offer/indianapolis" element={<CashOfferIndianapolis />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/unsubscribe" element={<Unsubscribe />} />
          <Route path="/sorry" element={<Sorry />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
