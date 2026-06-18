import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const viewport: Viewport = { themeColor: "#13100c" };

export const metadata: Metadata = {
  metadataBase: new URL("https://gq-cutz-barber-boutique.vercel.app"),
  title:
    "GQ Cutz Barber Boutique — South Orange, NJ · It is not just a haircut, it is a lifestyle",
  description:
    "GQ Cutz Barber Boutique in South Orange, NJ. A boutique grooming experience by Gareth Green: precision cuts, beard work, and the house ritual of hot towel, scalp massage and skin exfoliation. 4.9 stars across 150+ reviews. Book on Booksy.",
  keywords: [
    "barber South Orange NJ",
    "barber boutique South Orange",
    "GQ Cutz",
    "Black owned barber New Jersey",
    "hot towel shave South Orange",
    "beard trim South Orange NJ",
    "fade haircut South Orange",
  ],
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
  openGraph: {
    title: "GQ Cutz Barber Boutique — South Orange, NJ",
    description:
      "It is not just a haircut, it is a lifestyle. A boutique grooming experience by Gareth Green. Hot towel, scalp massage, skin exfoliation. 4.9 stars, 150+ reviews.",
    url: "https://gq-cutz-barber-boutique.vercel.app",
    siteName: "GQ Cutz Barber Boutique",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "GQ Cutz Barber Boutique, South Orange, New Jersey",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "GQ Cutz Barber Boutique — South Orange, NJ",
    description:
      "It is not just a haircut, it is a lifestyle. The boutique grooming ritual by Gareth Green. 4.9 stars, 150+ reviews.",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=ranade@300,400,500,700,1,2&f[]=satoshi@400,500,700&display=swap"
        />
        <style>{`
          :root {
            --font-display: "Ranade";
            --font-body: "Satoshi";
          }
        `}</style>
      </head>
      <body>
        {/* Arm scroll reveals before hydration (no flash), but only when the tab
            is visible and motion is allowed, so content is never stranded
            invisible (DESIGN_LESSONS 06-03). */}
        <Script id="reveal-arm" strategy="beforeInteractive">
          {`(function(){try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&document.visibilityState!=='hidden'){document.documentElement.classList.add('reveal-armed');}}catch(e){}})();`}
        </Script>
        {children}
      </body>
    </html>
  );
}
