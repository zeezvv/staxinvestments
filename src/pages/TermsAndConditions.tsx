import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsAndConditions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 py-16 max-w-3xl">
          <Button variant="ghost" onClick={() => navigate("/")} className="mb-8">
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Home
          </Button>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Terms &amp; Conditions</h1>
          <p className="text-muted-foreground mb-10">Effective Date: April 14, 2026</p>

          <div className="prose prose-sm max-w-none text-foreground space-y-6">
            <p>
              Welcome to <strong>staxhomebuyers.com</strong> (the "Website"), operated by <strong>Stax Investments LLC</strong> ("Company," "we," "our," or "us"). By accessing or using this Website, you agree to be bound by these Terms &amp; Conditions ("Terms"). If you do not agree, please do not use the Website.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8">1. Use of the Website</h2>
            <p>
              You agree to use this Website only for lawful purposes and in accordance with these Terms. You must not use this Website in any way that could damage, disable, overburden, or impair the Website, or interfere with any other party's use of it.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8">2. Services</h2>
            <p>
              Stax Investments LLC provides real estate investment and property acquisition services. All information presented on this Website is for general informational purposes only and does not constitute a binding offer, contract, or guarantee. Any agreement to purchase property will be governed by a separate written contract.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8">3. User Submissions</h2>
            <p>
              By submitting information through our contact forms (including name, email, phone number, and property details), you grant us permission to contact you regarding your inquiry via phone, email, or text message. You represent that the information you provide is accurate and that you are authorized to submit it.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8">4. SMS/Text Messaging Consent</h2>
            <p>
              If you opt in to receive text messages from Stax Investments LLC, you consent to receive recurring automated text messages (e.g., payment reminders, property updates, and promotional messages) at the phone number you provided. Consent is not a condition of any purchase or transaction.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Reply <strong>STOP</strong> at any time to opt out of text messages.</li>
              <li>Reply <strong>HELP</strong> for assistance.</li>
              <li>Message and data rates may apply. Message frequency varies.</li>
              <li>Carriers are not liable for delayed or undelivered messages.</li>
            </ul>

            <h2 className="text-xl font-bold text-foreground mt-8">5. Privacy</h2>
            <p>
              Your use of this Website is also governed by our{" "}
              <a href="/privacy-policy" className="text-primary underline hover:text-primary/80">
                Privacy Policy
              </a>
              , which describes how we collect, use, and protect your personal information. By using this Website, you consent to the practices described in our Privacy Policy.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8">6. Intellectual Property</h2>
            <p>
              All content on this Website — including text, graphics, logos, images, and software — is the property of Stax Investments LLC or its licensors and is protected by applicable intellectual property laws. You may not copy, modify, distribute, or reproduce any content without our prior written consent.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8">7. Disclaimer of Warranties</h2>
            <p>
              This Website and all information, content, and services provided on it are offered on an "as is" and "as available" basis without warranties of any kind, whether express or implied. We do not guarantee the accuracy, completeness, or reliability of any content on the Website.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8">8. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Stax Investments LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of or inability to use the Website or its content, even if we have been advised of the possibility of such damages.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8">9. Third-Party Links</h2>
            <p>
              This Website may contain links to third-party websites. We do not control or endorse the content of any linked websites and are not responsible for their practices. Accessing third-party sites is at your own risk.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8">10. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Stax Investments LLC, its officers, directors, employees, and agents from any claims, losses, liabilities, damages, costs, or expenses arising out of your use of the Website or your violation of these Terms.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8">11. Modifications</h2>
            <p>
              We reserve the right to update or modify these Terms at any time without prior notice. Your continued use of the Website after any changes constitutes your acceptance of the revised Terms. We encourage you to review this page periodically.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8">12. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of Ohio, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved in the courts located in Ohio.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8">13. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Email:</strong> leads@staxhomebuyers.com</li>
              <li><strong>Phone:</strong> (234) 437-1980</li>
              <li><strong>Website:</strong> staxhomebuyers.com</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
