import { useEffect } from "react";

const SITE_URL = "https://staxhomebuyers.com";

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
}

export const usePageMeta = ({ title, description, path }: PageMeta) => {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    document.title = title;
    setOrCreateMeta('meta[name="description"]', { name: "description", content: description });
    setOrCreateMeta('meta[property="og:title"]', { property: "og:title", content: title });
    setOrCreateMeta('meta[property="og:description"]', { property: "og:description", content: description });
    setOrCreateMeta('meta[property="og:url"]', { property: "og:url", content: url });
    setOrCreateLink("canonical", url);
  }, [title, description, path]);
};
