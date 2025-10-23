import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { TranslationWrapper } from "@/hooks/use-translation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Sawaid Al Islah",
  description: "Providing relief and hope to communities in need.",
  icons: {
    icon: [{ url: "/Logo/sawaid-logo-radius.webp", type: "image/webp" }],
    apple: [
      {
        url: "/Logo/sawaid-logo-radius.webp",
        sizes: "180x180",
        type: "image/webp",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The lang and dir attributes will be managed dynamically on the client
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Cairo:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <TranslationWrapper>
          <Header />
          {children}
          <Footer />
          <Toaster />
        </TranslationWrapper>
      </body>
    </html>
  );
}
