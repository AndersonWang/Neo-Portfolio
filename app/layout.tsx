import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Anderson Wang — Senior Product Designer",
    template: "%s · Anderson Wang",
  },
  description:
    "Senior Product Designer crafting bold, considered digital experiences. Portfolio of product design, design systems, and interaction design.",
  openGraph: {
    title: "Anderson Wang — Senior Product Designer",
    description:
      "Senior Product Designer crafting bold, considered digital experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        style={{
          minHeight:       "100vh",
          display:         "flex",
          flexDirection:   "column",
          backgroundColor: "var(--bg-page)",
          color:           "var(--text-primary)",
          fontFamily:      "var(--font-body)",
        }}
        className="antialiased"
      >
        <Nav />

        {/* Push content below fixed nav */}
        <div style={{ paddingTop: "64px", flex: 1, display: "flex", flexDirection: "column" }}>
          <PageTransition>
            {children}
          </PageTransition>
        </div>

        <Footer />
      </body>
    </html>
  );
}
