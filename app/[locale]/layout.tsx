import type { Metadata } from "next";
import { Jost } from "next/font/google";
import Navbar from "../Components/Common/Navbar";
import "./globals.css";
import Footer from "../Components/Common/Footer";
import ReduxProvider from "../ReduxProvider";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "../../i18n/routing";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import InitialLoader from "../Components/Common/InitialLoader";

const jostSans = Jost({
  variable: "--font-jost-sans",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "TROJKA.mk",
  description:
    "TROJKA.mk — original basketball-inspired streetwear. Unique, in-house designs based on NBA icons like Nikola Jokić, Pero Antić, and Luka Dončić. Premium tees, hoodies, and jerseys for ballers.",
  keywords: [
    "TROJKA.mk", "basketball clothing", "NBA apparel", "original designs",
    "streetwear", "hoodies", "t-shirts", "jerseys", "Nikola Jokic",
    "Pero Antic", "Luka Doncic", "The Joker design", "Antic MVP",
    "Luka goes to Hollywood",
    "оригинална облека", "кошаркарска облека", "НБА", "стритвер",
    "маици", "дуксери", "дизајни", "Никола Јокиќ", "Перо Антиќ",
    "Лука Дончиќ", "бренд", "модерна облека",
    "originalna odeća", "košarkaška odeća", "NBA", "streetwear",
    "majice", "duksevi", "dizajn", "Nikola Jokić", "Pero Antić",
    "Luka Dončić", "modni brend",
  ],
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  // IMPORTANT: params is a Promise with typed routes, so we await it below.
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang="en">
      <body className={`${jostSans.className} antialiased`}>
        <NextIntlClientProvider locale={locale}>
          <ReduxProvider>
            <InitialLoader />
            {/* Subtle global watermark background */}
            <div
              aria-hidden
              className="fixed inset-0 -z-10 pointer-events-none"
              style={{
                backgroundImage: "url(/logo.png)",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'min(60vw, 600px)',
                opacity: 0.04,
                filter: 'grayscale(100%)',
              }}
            />
            <Navbar />
            {children}
            <Footer />
          </ReduxProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
