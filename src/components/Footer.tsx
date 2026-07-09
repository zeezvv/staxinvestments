import { Link } from "react-router-dom";
import { Phone, Globe, FileText, Shield, Home, ChevronRight } from "lucide-react";
import staxLogo from "@/assets/stax-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[hsl(var(--footer-background))] text-primary-foreground w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16 lg:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Brand column */}
          <div className="space-y-6">
            <Link to="/" className="inline-flex items-center gap-3 hover:opacity-90 transition-opacity">
              <div className="bg-primary-foreground/10 rounded-lg p-2">
                <img src={staxLogo} alt="Stax Investments LLC" className="w-8 h-8 object-contain" />
              </div>
              <span className="font-display text-lg font-bold text-primary-foreground">
                Stax Investments LLC
              </span>
            </Link>
            <p className="text-lg font-medium text-primary-foreground leading-relaxed">
              The simple way to sell your home fast for cash.
            </p>
            <p className="text-primary-foreground/70 leading-relaxed">
              Fair cash offers. No repairs. No realtor fees.
            </p>
            <Link
              to="/cash-offer"
              className="inline-flex items-center gap-2 text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-3 rounded-lg transition-colors"
            >
              <Home className="w-4 h-4" />
              Get Your Cash Offer
            </Link>
          </div>

          {/* Quick Links column */}
          <div className="space-y-6">
            <h3 className="font-display text-lg font-semibold text-primary-foreground">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-3">
              <Link
                to="/privacy-policy"
                className="group inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <Shield className="w-4 h-4 text-primary-foreground/50 group-hover:text-primary-foreground/80 transition-colors" />
                <span>Privacy Policy</span>
                <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
              <Link
                to="/terms-and-conditions"
                className="group inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <FileText className="w-4 h-4 text-primary-foreground/50 group-hover:text-primary-foreground/80 transition-colors" />
                <span>Terms & Conditions</span>
                <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
              <Link
                to="/cash-offer"
                className="group inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <Home className="w-4 h-4 text-primary-foreground/50 group-hover:text-primary-foreground/80 transition-colors" />
                <span>Get a Cash Offer</span>
                <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
              <Link
                to="/"
                className="group inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <Globe className="w-4 h-4 text-primary-foreground/50 group-hover:text-primary-foreground/80 transition-colors" />
                <span>Home</span>
                <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
            </nav>
          </div>

          {/* Contact column */}
          <div className="space-y-6">
            <h3 className="font-display text-lg font-semibold text-primary-foreground">
              Contact
            </h3>
            <div className="flex flex-col gap-4">
              <a
                href="tel:+12344371980"
                className="group inline-flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <div className="bg-primary-foreground/10 rounded-full p-2 group-hover:bg-primary-foreground/20 transition-colors">
                  <Phone className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-lg font-medium">(234) 437-1980</span>
              </a>
              <div className="inline-flex items-center gap-3 text-primary-foreground/80">
                <div className="bg-primary-foreground/10 rounded-full p-2">
                  <Globe className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-lg font-medium">staxhomebuyers.com</span>
              </div>
            </div>
            <p className="text-primary-foreground/70 leading-relaxed pt-2">
              Serving homeowners looking for a fast, simple sale.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/15" />

        {/* Copyright */}
        <div className="py-8 text-center">
          <p className="text-sm text-primary-foreground/60">
            © {currentYear} Stax Investments LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
