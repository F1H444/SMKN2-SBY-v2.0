import type { Metadata } from "next";
import "@/styles/globals.css";
import { Lamphome } from "@/components/ui/(navbar)/lamphome";
import { ThemeProvider } from "next-themes";
import { Poppins } from "next/font/google";
import { AuthProvider } from "@/app/context/AuthContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "SMKN 2 SURABAYA",
  description: "Website Sekolah SMKN 2 SURABAYA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={poppins.variable} suppressHydrationWarning>
      <head>
        <link rel="preload" href="/img/smkn2.webp" as="image" />
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="theme"
        >
          {/* Membungkus komponen dengan AuthProvider agar status login tersedia */}
          <AuthProvider>
            <Lamphome
              logoSrc="/img/logo-light.png"
              logoSrcDark="/img/logo-dark.png"
              logoAlt="Logo SMKN2 Surabaya"
            >
              {children}
            </Lamphome>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
