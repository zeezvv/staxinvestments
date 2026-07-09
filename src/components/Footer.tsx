import { Link } from "react-router-dom";
import { Phone, Globe, FileText, Shield, Home, ChevronRight } from "lucide-react";
import footerLogo from "@/assets/nobg-2.png.asset.json";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[hsl(var(--footer-background))] text-primary-foreground w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 lg:py-16 flex flex-col items-center text-center gap-10">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="bg-primary-foreground/10 rounded-lg p-2">
              <img src={footerLogo.url} alt="Stax Investments LLC" className="w-10 h-10 object-contain" />
            </div>
            <span className="font-display text-sm font-bold text-primary-foreground">
              Stax Investments LLC
            </span>
          </Link>

          {/* Tagline */}
          <div className="space-y-2 max-w-md">
            <p className="text-sm font-medium text-primary-foreground leading-relaxed">
              The simple way to sell your home fast for cash.
            </p>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Fair cash offers. No repairs. No realtor fees.
            </p>
          </div>

          {/* Quick Links */}
          <nav className="flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-3">
            <Link
              to="/privacy-policy"
              className="group inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              <Shield className="w-4 h-4 text-primary-foreground/50 group-hover:text-primary-foreground/80 transition-colors" />
              <span>Privacy Policy</span>
            </Link>
            <Link
              to="/terms-and-conditions"
              className="group inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              <FileText className="w-4 h-4 text-primary-foreground/50 group-hover:text-primary-foreground/80 transition-colors" />
              <span>Terms & Conditions</span>
            </Link>
            <Link
              to="/cash-offer"
              className="group inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              <Home className="w-4 h-4 text-primary-foreground/50 group-hover:text-primary-foreground/80 transition-colors" />
              <span>Get a Cash Offer</span>
            </Link>
          </nav>

          {/* Contact */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
            <a
              href="tel:+12344371980"
              className="group inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              <Phone className="w-4 h-4 text-primary-foreground/50 group-hover:text-primary-foreground/80 transition-colors" />
              <span>(234) 437-1980</span>
            </a>
            <div className="inline-flex items-center gap-2 text-primary-foreground/80">
              <Globe className="w-4 h-4 text-primary-foreground/50" />
              <span>staxhomebuyers.com</span>
            </div>
          </div>

          {/* CTA */}
          <Link
            to="/cash-offer"
            className="inline-flex items-center gap-2 text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-lg transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
            Get Your Cash Offer
          </Link>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/15" />

        {/* Copyright */}
        <div className="py-6 text-center">
          <p className="text-sm text-primary-foreground/60">
            © {currentYear} Stax Investments LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
