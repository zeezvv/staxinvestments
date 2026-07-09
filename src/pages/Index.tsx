import Navbar from "@/components/Navbar";
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

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <MarqueeBanner />
    <HeroSection />
    <BenefitCards />
    <WhoWeAre />
    <HowItWorks />
    <MovingBanner />
    <WhyUs />
    <Situations />
    <Testimonials />
    
    <ContactForm />
    <Footer />
  </div>
);

export default Index;
