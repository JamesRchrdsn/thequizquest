import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import ThemeProvider from "@/components/ThemeProvider";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TheQuizQuest",
  description: "Quiz interactif",
};

interface LayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default async function Layout({ children, params }: LayoutProps) {
  let messages;
  try {
    messages = (await import(`../../data/messages/${params.locale}.json`))
      .default;
  } catch (error) {
    console.error(
      `Erreur lors du chargement des traductions pour ${params.locale}:`,
      error
    );
    messages = (await import(`../../data/messages/en.json`)).default;
  }

  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <NextIntlClientProvider locale={params.locale} messages={messages}>
            <Header locale={params.locale} />
            <main className="flex-1">{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
