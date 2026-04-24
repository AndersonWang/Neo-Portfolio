import type { Metadata } from "next";
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
      <body className="min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
