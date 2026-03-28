import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

type Status = "loading" | "valid" | "already" | "invalid" | "success" | "error";

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }
    fetch(`${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${token}`, {
      headers: { apikey: SUPABASE_ANON_KEY },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.valid === false && data.reason === "already_unsubscribed") setStatus("already");
        else if (data.valid) setStatus("valid");
        else setStatus("invalid");
      })
      .catch(() => setStatus("error"));
  }, [token]);

  const handleUnsubscribe = async () => {
    if (!token) return;
    try {
      const { data } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (data?.success) setStatus("success");
      else if (data?.reason === "already_unsubscribed") setStatus("already");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-24">
        <div className="max-w-md w-full text-center space-y-6">
          {status === "loading" && <p className="text-muted-foreground">Verifying...</p>}
          {status === "valid" && (
            <>
              <h1 className="text-2xl font-bold text-foreground">Unsubscribe</h1>
              <p className="text-muted-foreground">Are you sure you want to unsubscribe from our emails?</p>
              <button
                onClick={handleUnsubscribe}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Confirm Unsubscribe
              </button>
            </>
          )}
          {status === "success" && (
            <>
              <h1 className="text-2xl font-bold text-foreground">Unsubscribed</h1>
              <p className="text-muted-foreground">You have been successfully unsubscribed. You will no longer receive emails from us.</p>
            </>
          )}
          {status === "already" && (
            <>
              <h1 className="text-2xl font-bold text-foreground">Already Unsubscribed</h1>
              <p className="text-muted-foreground">This email address has already been unsubscribed.</p>
            </>
          )}
          {status === "invalid" && (
            <>
              <h1 className="text-2xl font-bold text-foreground">Invalid Link</h1>
              <p className="text-muted-foreground">This unsubscribe link is invalid or has expired.</p>
            </>
          )}
          {status === "error" && (
            <>
              <h1 className="text-2xl font-bold text-foreground">Something Went Wrong</h1>
              <p className="text-muted-foreground">Please try again later or contact us directly.</p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Unsubscribe;
