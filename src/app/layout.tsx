import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import profile from "../../content/profile.json";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const site = "https://clementndome.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: {
    default: "Clement Ndome — Geospatial Software Engineer",
    template: "%s — Clement Ndome",
  },
  description: "GIS, backend and applied AI: from spatial databases to deployed decision-support tools. Nairobi, Kenya.",
  authors: [{ name: "Clement Ndome Mwakavi" }],
  openGraph: {
    type: "website",
    url: site,
    siteName: "Clement Ndome",
    title: "Clement Ndome — Geospatial Software Engineer",
    description: "GIS, backend and applied AI: from spatial databases to deployed decision-support tools.",
  },
  twitter: { card: "summary_large_image", title: "Clement Ndome — Geospatial Software Engineer" },
};

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site}/#person`,
    name: "Clement Ndome Mwakavi",
    jobTitle: "Geospatial Software Engineer",
    url: site,
    email: `mailto:${(profile as { email: string }).email}`,
    address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
    worksFor: { "@type": "Organization", name: "ForbSpace Inc." },
    affiliation: { "@type": "Organization", name: "SpatioNEX" },
    sameAs: Object.values((profile as { socials: Record<string, string> }).socials),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ga = (profile as { analytics?: string }).analytics;
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <JsonLd />
        {ga ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} />
            <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${ga}',{page_path:location.pathname+location.search});` }} />
          </>
        ) : null}
        {children}
      </body>
    </html>
  );
}
