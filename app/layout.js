import "./globals.css";
import { Noto_Serif } from "next/font/google";
import LayoutWrapper from "./components/LayoutWrapper";

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata = {
  metadataBase: new URL("https://www.autopunditz.com"),
  title: {
    default: "AutoPunditz — India's #1 Auto News",
    template: "%s | AutoPunditz",
  },
  description:
    "Latest news, reviews, and analysis on bikes, cars, EVs, and the Indian automobile industry.",
  keywords: [
    "auto news india",
    "bike news",
    "car news",
    "EV news",
    "two wheeler",
    "four wheeler",
    "autopunditz",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.autopunditz.com",
    siteName: "AutoPunditz",
    title: "AutoPunditz — India's #1 Auto News",
    description:
      "Latest news, reviews, and analysis on bikes, cars, EVs, and the Indian automobile industry.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@autopunditz",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }) {

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={notoSerif.className}
    >
      <body className="min-h-full flex flex-col"  cz-shortcut-listen="true">
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}