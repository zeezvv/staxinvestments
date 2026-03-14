import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 py-16 max-w-3xl">
          <Button variant="ghost" onClick={() => navigate("/")} className="mb-8">
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Home
          </Button>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground mb-10">Effective Date: March 14, 2026</p>

          <div className="prose prose-sm max-w-none text-foreground space-y-6">
            <p>
              Stax Investments LLC ("Stax Investments", "we", "our", or "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and share information when you visit our website, interact with our Facebook ads, or otherwise engage with our services.
            </p>
            <p>
              By accessing or using our website or submitting your information through our forms, you agree to the terms of this Privacy Policy.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8">Information We Collect</h2>
            <p>We may collect personal information that you voluntarily provide to us when you:</p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Submit a property information request</li>
              <li>Request a cash offer</li>
              <li>Fill out a contact form on our website</li>
              <li>Respond to or interact with our Facebook ads</li>
              <li>Communicate with us by phone, email, or SMS</li>
            </ul>
            <p>This information may include:</p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Name</li>
              <li>Phone number (including mobile number)</li>
              <li>Email address</li>
              <li>Mailing address</li>
              <li>Property address</li>
              <li>Information about your property</li>
              <li>Timeline to sell or property condition</li>
              <li>Any additional information you choose to provide</li>
            </ul>
            <p>We may also automatically collect certain technical information when you visit our website such as IP address, browser type, device type, pages visited, time spent on site, and referring website.</p>

            <h2 className="text-xl font-bold text-foreground mt-8">How We Use Your Information</h2>
            <p>We use the information we collect in order to:</p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Evaluate your property for a potential real estate transaction</li>
              <li>Contact you regarding your inquiry</li>
              <li>Schedule appointments</li>
              <li>Provide property offer updates</li>
              <li>Communicate regarding our real estate services</li>
              <li>Improve our website and services</li>
              <li>Maintain internal business records</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p>Information submitted through our website or our Facebook ads is used solely for the purpose of evaluating a potential real estate purchase and communicating with you regarding your request.</p>

            <h2 className="text-xl font-bold text-foreground mt-8">Sharing of Information</h2>
            <p>
              <strong>We do not sell or rent your personal information to third parties for their marketing purposes.</strong>
            </p>
            <p>We may share your information with trusted service providers who assist us in operating our business and communicating with you. These may include:</p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Customer relationship management platforms</li>
              <li>Messaging providers</li>
              <li>Website hosting providers</li>
              <li>Email service providers</li>
              <li>Analytics providers</li>
            </ul>
            <p>These third parties are contractually obligated to maintain the confidentiality and security of your information and may only use your information to provide services on our behalf.</p>
            <p>We may also disclose your information if required by law or to protect our legal rights.</p>

            <h2 className="text-xl font-bold text-foreground mt-8">Consent to Communications</h2>
            <p>
              By submitting your contact information through our website, responding to our Facebook ads, requesting an offer, or otherwise communicating with Stax Investments LLC, you provide your <strong>express written consent</strong> to receive communications from us via phone call, email, and SMS text message regarding your property inquiry, appointment scheduling, offer updates, and related real estate services.
            </p>
            <p>Consent to receive SMS messages is not a condition of any purchase or sale of property.</p>
            <p>Message frequency may vary depending on your interaction with our team. Message and data rates may apply.</p>
            <p>
              You may opt out of receiving SMS messages at any time by replying <strong>STOP</strong> to any text message you receive from us. For assistance, reply <strong>HELP</strong> or contact us directly at (234) 437-1980.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8">Cookies and Tracking Technologies</h2>
            <p>Our website may use cookies and similar technologies to improve user experience and analyze website traffic. Cookies are small files stored on your device that help us understand how users interact with our site.</p>
            <p>You may disable cookies through your browser settings; however, some features of the site may not function properly if cookies are disabled.</p>

            <h2 className="text-xl font-bold text-foreground mt-8">Data Security</h2>
            <p>We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, or misuse. However, no method of transmission over the Internet is completely secure and we cannot guarantee absolute security.</p>

            <h2 className="text-xl font-bold text-foreground mt-8">Data Retention</h2>
            <p>We retain personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.</p>

            <h2 className="text-xl font-bold text-foreground mt-8">Protection of Children's Personal Information</h2>
            <p>Our services are not directed to individuals under the age of 18. We do not knowingly collect, use, or disclose personal information from anyone under the age of 18.</p>
            <p>If we learn that we have inadvertently collected personal information from an individual under the age of 18 without verified parental consent, we will take steps to delete that information as quickly as possible.</p>

            <h2 className="text-xl font-bold text-foreground mt-8">Third Party Links</h2>
            <p>Our website may contain links to third party websites. We are not responsible for the privacy practices or content of those third party websites.</p>

            <h2 className="text-xl font-bold text-foreground mt-8">Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.</p>

            <h2 className="text-xl font-bold text-foreground mt-8">Contact Us</h2>
            <p>If you have any questions regarding this Privacy Policy, please contact us at:</p>
            <p className="text-muted-foreground">
              <strong className="text-foreground">Stax Investments LLC</strong><br />
              Phone: (234) 437-1980<br />
              Email: info@staxinvestments.com
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
