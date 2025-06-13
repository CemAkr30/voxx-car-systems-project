"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { useEffect, useState } from "react";
import { Car, Home, MapPin, Terminal, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import CustomSidebar from "@/components/web/custom-sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const navigationItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Home,
    description: "Ana sayfa ve genel bakış",
    url: "/dashboard",
  },
  {
    id: "arac",
    label: "Araç",
    icon: Car,
    description: "Araç yönetimi ve takibi",
    url: "/vehicle/brand",
    children: [
      {
        id: "marka",
        label: "Marka",
        description: "Araç markaları yönetimi",
        url: "/vehicle/brand",
      },
      {
        id: "model",
        label: "Model",
        description: "Araç modelleri yönetimi",
        url: "/vehicle/model",
      },
      {
        id: "arac-listesi",
        label: "Araç Listesi",
        description: "Tüm araçlar",
        url: "/vehicle/list",
      },
    ],
  },
  {
    id: "ssh",
    label: "SSH",
    icon: Terminal,
    description: "SSH bağlantıları ve terminal",
    url: "/ssh/crash",
    children: [
      {
        id: "kaza",
        label: "Kaza",
        description: "Kaza kayıtları yönetimi",
        url: "/ssh/crash",
      },
    ],
  },
  {
    id: "adres",
    label: "Adres",
    icon: MapPin,
    description: "Adres yönetimi ve haritalar",
    url: "/address",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [user, setUser] = useState<string>("");

  useEffect(() => {
    // Token kontrolü
    const token = localStorage.getItem("access_token");
    if (!token) {
      //    router.push("/login")
      return;
    }

    // Token'dan kullanıcı bilgisi çıkar (basit örnek)
    setUser("Admin User");
  }, [router]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          <CustomSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <h1 className="text-lg font-semibold">Dashboard</h1>
            </header>
            <main className="flex-1 p-6">{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
