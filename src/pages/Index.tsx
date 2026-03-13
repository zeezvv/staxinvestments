import Navbar from "@/components/Navbar";
import MarqueeBanner from "@/components/MarqueeBanner";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <MarqueeBanner />
    <HeroSection />
    <HowItWorks />
    <WhyUs />
    <Testimonials />
    <ContactForm />
    <Footer />
  </div>
);

export default Index;
