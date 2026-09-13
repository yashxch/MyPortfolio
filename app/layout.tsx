import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/layout/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SoundProvider } from "@/components/ui/AudioToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yashwanth CH — Systems & AI Engineer",
  description:
    "Personal engineering portfolio of Yashwanth CH. Software engineer building systems across AI, automation, cloud and infrastructure.",
  keywords: [
    "Yashwanth CH",
    "Systems Engineer",
    "AI Developer",
    "Cloud Infrastructure",
    "SRMIST",
    "Algoshack",
    "Optical Networks",
    "Synthetic Data",
    "IoT",
  ],
  authors: [{ name: "Yashwanth CH" }],
  openGraph: {
    title: "Yashwanth CH — Systems & AI Engineer",
    description:
      "Software engineer building systems across AI, automation, cloud and infrastructure. Chennai, India.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-[#080809] text-white`}
    >
      <body className="min-h-full flex flex-col bg-[#080809] text-neutral-100 selection:bg-white selection:text-black">
        <SoundProvider>
          <SmoothScroll>
            <CustomCursor />
            <Navbar />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
          </SmoothScroll>
        </SoundProvider>
      </body>
    </html>
  );
}
