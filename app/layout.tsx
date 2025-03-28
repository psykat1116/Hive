import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "@/provider/ConvexClientProvider";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { Toaster } from "sonner";
import ModalProvider from "@/provider/ModalProvider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Hive | The Ultimate Hub for Team Communication & Collaboration",
  description:
    "Hive is a powerful, real-time messaging and collaboration platform designed to keep teams connected and productive. With instant messaging, organized channels, seamless file sharing, and smart notifications, Hive ensures that communication flows effortlessly. Whether you're working remotely or in the office, Hive keeps everyone in sync with AI-powered insights, integrations, and automation to streamline teamwork. Stay connected, collaborate faster, and build a buzzing workspace with Hive where ideas thrive and teams work in perfect harmony. 🚀🐝",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body className={`${poppins.className} antialiased`}>
          <ConvexClientProvider>
            <NuqsAdapter>
              <Toaster />
              <ModalProvider />
              {children}
            </NuqsAdapter>
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
