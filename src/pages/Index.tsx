import MarqueeBanner from "@/components/MarqueeBanner";
import HeroSection from "@/components/HeroSection";
import BenefitCards from "@/components/BenefitCards";
import WhoWeAre from "@/components/WhoWeAre";
import HowItWorks from "@/components/HowItWorks";
import WhyUs from "@/components/WhyUs";
import Situations from "@/components/Situations";
import Testimonials from "@/components/Testimonials";

import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { usePageMeta, ORGANIZATION_ID } from "@/hooks/use-page-meta";

const homeJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": ORGANIZATION_ID,
    name: "Stax Home Buyers",
    url: "https://staxhomebuyers.com",
    description:
      "Stax Home Buyers helps homeowners sell houses as-is for cash with no repairs, no agent fees, and flexible closing options.",
    telephone: "+1-234-437-1980",
    email: "leads@staxhomebuyers.com",
    areaServed: ["Middletown, Ohio", "Indianapolis, Indiana", "Southwest Ohio"],
    logo: "https://staxhomebuyers.com/nobg-2.png",
    image: "https://staxhomebuyers.com/nobg-2.png",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://staxhomebuyers.com/#website",
    name: "Stax Home Buyers",
    url: "https://staxhomebuyers.com",
    publisher: { "@id": ORGANIZATION_ID },
  },
];

const Index = () => {
  usePageMeta({
    path: "/",
    title: "We Buy Houses for Cash in Ohio & Indiana | Stax Home Buyers",
    description:
      "Sell your house as-is for cash. Stax Home Buyers makes no-obligation offers in Ohio and Indianapolis with no repairs, no agent fees and flexible closing.",
    jsonLd: homeJsonLd,
  });

  return (
    <div className="min-h-screen bg-background">
      <MarqueeBanner />
      <HeroSection />
      <BenefitCards />
      <WhoWeAre />
      <HowItWorks />
      <WhyUs />
      <Situations />
      <Testimonials />

      <ContactForm />
      <Footer showAreaLinks />
    </div>
  );
};

export default Index;
