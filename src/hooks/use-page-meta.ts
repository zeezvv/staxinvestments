import { useEffect } from "react";

const SITE_URL = "https://staxhomebuyers.com";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const DEFAULT_ROBOTS = "index, follow, max-image-preview:large";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": ORGANIZATION_ID,
  name: "Stax Home Buyers",
  url: SITE_URL,
  description:
    "Stax Home Buyers helps homeowners sell houses as-is for cash with no repairs, no agent fees, and flexible closing options.",
  telephone: "+1-234-437-1980",
  email: "leads@staxhomebuyers.com",
  areaServed: ["Middletown, Ohio", "Indianapolis, Indiana", "Southwest Ohio"],
  logo: `${SITE_URL}/nobg-2.png`,
  image: `${SITE_URL}/nobg-2.png`,
};

const setOrCreateMeta = (selector: string, attrs: Record<string, string>) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
};

const setOrCreateLink = (rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

interface PageMeta {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  jsonLd?: object | object[];
}

export const usePageMeta = ({ title, description, path, noindex, jsonLd }: PageMeta) => {
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : "";

  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    document.title = title;
    setOrCreateMeta('meta[name="description"]', { name: "description", content: description });
    setOrCreateMeta('meta[property="og:title"]', { property: "og:title", content: title });
    setOrCreateMeta('meta[property="og:description"]', { property: "og:description", content: description });
    setOrCreateMeta('meta[property="og:url"]', { property: "og:url", content: url });
    setOrCreateMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    setOrCreateMeta('meta[property="og:site_name"]', { property: "og:site_name", content: "Stax Home Buyers" });
    setOrCreateMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    setOrCreateMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    setOrCreateLink("canonical", url);
  }, [title, description, path]);

  useEffect(() => {
    if (!noindex) return;
    setOrCreateMeta('meta[name="robots"]', { name: "robots", content: "noindex, follow" });
    return () => {
      setOrCreateMeta('meta[name="robots"]', { name: "robots", content: DEFAULT_ROBOTS });
    };
  }, [noindex]);

  useEffect(() => {
    if (!jsonLdKey) return;
    const items = JSON.parse(jsonLdKey);
    const list: object[] = Array.isArray(items) ? items : [items];
    const scripts = list.map((item) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.dataset.seo = "page";
      s.text = JSON.stringify(item);
      document.head.appendChild(s);
      return s;
    });
    return () => scripts.forEach((s) => s.remove());
  }, [jsonLdKey]);
};
