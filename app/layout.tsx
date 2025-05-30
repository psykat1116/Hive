import "./globals.css";
import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";

import ModalProvider from "@/provider/ModalProvider";
import ConvexClientProvider from "@/provider/ConvexClientProvider";

const inter = Geist({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Hive | The Ultimate Hub for Team Communication & Collaboration",
  description:
    "Hive is a powerful, real-time messaging and collaboration platform designed to keep teams connected and productive. With instant messaging, organized channels, seamless file sharing, and smart notifications, Hive ensures that communication flows effortlessly. Whether you're working remotely or in the office, Hive keeps everyone in sync with AI-powered insights, integrations, and automation to streamline teamwork. Stay connected, collaborate faster, and build a buzzing workspace with Hive where ideas thrive and teams work in perfect harmony. 🚀🐝",
  applicationName: "Hive",
  authors: {
    name: "Saikat Samanta",
    url: "https://portfolio-one-gilt-34.vercel.app/",
  },
  creator: "Saikat Samanta",
  keywords: [
    "Hive",
    "Team Communication",
    "Collaboration",
    "Messaging",
    "Productivity",
    "Remote Work",
    "Real-Time Messaging",
    "Teamwork",
    "slack",
    "slack clone",
    "slack alternative",
    "slack clone github",
    "slack clone code with antonio",
  ],
  openGraph: {
    title: "Hive | The Ultimate Hub for Team Communication & Collaboration",
    description:
      "Hive is a powerful, real-time messaging and collaboration platform designed to keep teams connected and productive. With instant messaging, organized channels, seamless file sharing, and smart notifications, Hive ensures that communication flows effortlessly. Whether you're working remotely or in the office, Hive keeps everyone in sync with AI-powered insights, integrations, and automation to streamline teamwork. Stay connected, collaborate faster, and build a buzzing workspace with Hive where ideas thrive and teams work in perfect harmony. 🚀🐝",
    url: "https://hive-rouge.vercel.app/",
    siteName: "Hive",
    images: [
      {
        url: "https://hive-rouge.vercel.app/OpenGraph.png",
        width: 1920,
        height: 949,
        alt: "Hive",
        type: "image/png",
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
    <ConvexAuthNextjsServerProvider>
      <ConvexClientProvider>
        <NuqsAdapter>
          <html lang="en">
            <body className={`${inter.className} antialiased`}>
              <Toaster />
              <ModalProvider />
              {children}
            </body>
          </html>
        </NuqsAdapter>
      </ConvexClientProvider>
    </ConvexAuthNextjsServerProvider>
  );
}
