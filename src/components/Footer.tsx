import { Link } from "react-router-dom";
import { Phone, Globe, FileText, Shield, Home } from "lucide-react";

const footerLogo = "/nobg-2.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[hsl(var(--footer-background))] text-primary-foreground w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-14 lg:py-18 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Brand column */}
          <div className="flex flex-col items-center text-center">
            <div className="flex flex-col items-start text-left space-y-3">
              <Link to="/" className="inline-flex items-center gap-4 hover:opacity-90 transition-opacity">
                <img src={footerLogo} alt="Stax Investments LLC" className="w-20 h-20 object-contain" />
                <div className="flex flex-col items-start text-left">
                  <span className="font-display text-sm font-bold text-primary-foreground leading-tight">
                    Stax
                  </span>
                  <span className="font-display text-sm font-bold text-primary-foreground leading-tight">
                    Investments
                  </span>
                  <span className="font-display text-sm font-bold text-primary-foreground leading-tight">
                    LLC
                  </span>
                </div>
              </Link>
              <p className="text-sm font-medium text-primary-foreground leading-relaxed">
                The simple way to sell your home fast for cash.
              </p>
              <p className="text-sm text-primary-foreground/70 leading-relaxed">
                Fair cash offers. No repairs. No realtor fees.
              </p>
            </div>
          </div>

          {/* Quick Links column */}
          <div className="flex flex-col items-center md:items-center text-center space-y-5">
            <h3 className="font-display text-sm font-semibold text-primary-foreground">
              Quick Links
            </h3>
            <nav className="flex flex-col items-center gap-3">
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
          </div>

          {/* Contact column */}
          <div className="flex flex-col items-center md:items-center text-center space-y-5">
            <h3 className="font-display text-sm font-semibold text-primary-foreground">
              Contact
            </h3>
            <div className="flex flex-col items-center gap-3 text-sm">
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
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Serving homeowners looking for a fast, simple sale.
            </p>
          </div>
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
