import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import profile from "../../content/profile.json";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const site = "https://clementndome.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: {
    default: "Clement Ndome | Geospatial Software Engineer",
    template: "%s — Clement Ndome",
  },
  description: "GIS, backend and applied AI: from spatial databases to deployed decision-support tools. Nairobi, Kenya.",
  authors: [{ name: "Clement Ndome" }],
  icons: {
    icon: [
      { url: "/my-favicon/favicon.ico" },
      { url: "/my-favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/my-favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/my-favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/my-favicon/favicon.ico",
  },
  manifest: "/my-favicon/site.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "Clement Ndome" },
  openGraph: {
    type: "website",
    url: site,
    siteName: "Clement Ndome",
    title: "Clement Ndome | Geospatial Software Engineer",
    description: "GIS, backend and applied AI: from spatial databases to deployed decision-support tools.",
    images: [{ url: "/og/og-general.png", width: 1200, height: 630, alt: "Clement Ndome — Geospatial Software Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clement Ndome | Geospatial Software Engineer",
    description: "GIS, backend and applied AI: from spatial databases to deployed decision-support tools.",
    images: ["/og/og-general.png"],
  },
};

export const viewport: Viewport = { themeColor: "#022c22" };

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site}/#person`,
    name: "Clement Ndome",
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
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <link rel="preload" as="image" href="/background-image.png" />
      </head>
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
