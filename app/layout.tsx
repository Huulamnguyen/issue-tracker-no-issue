import AnnouncementBar from "@/app/components/AnnouncementBar";
import { Container, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "./Footer";
import NavBar from "./NavBar";
import QueryClientProvider from "./QueryClientProvider";
import AuthProvider from "./auth/Provider";
import "./globals.css";
import "./theme-config.css";

import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ANS Support Center",
  description: "Issue Tracker",
};

export const announcement =
  "🎁💝 Sale up to 20% | Merry Christmas and Happy New Year 2024. Check them out now";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <QueryClientProvider>
          <AuthProvider>
            <Theme
              accentColor="teal"
              className="min-h-screen bg-gray-50 flex flex-col"
            >
              <Link
                href="https://angelinanailsupply.com/collections/promotion"
                target="_blank"
              >
                <AnnouncementBar message={announcement} />
              </Link>
              <NavBar />
              <main className="px-3 pb-3 flex-grow">
                <Container>{children}</Container>
              </main>
              <Footer />
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
