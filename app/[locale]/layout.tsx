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

const jostSans = Jost({
  variable: "--font-jost-sans",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "3ka MK",
  description: "Your best sports apparel.",
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
            <Navbar />
            {children}
            <Footer />
          </ReduxProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
