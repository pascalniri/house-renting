import type { Metadata } from "next";
import { Geist, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Estates | Premium Real Estate Listings",
  description: "Discover a curated collection of premium properties tailored to your lifestyle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} h-full antialiased`}>
      <body className={`${geistSans.className} min-h-full flex flex-col`}>
        {children}
        <Toaster position="bottom-right" toastOptions={{ style: { fontSize: '12px' } }} />
      </body>
    </html>
  );
}