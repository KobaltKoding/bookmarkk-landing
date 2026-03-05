import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bookmarkk — Turn your good intentions into a real habit",
  description:
    "Prove your progress with AI quizzes, compete in weekly leagues, and build a reading identity. Join the waitlist now!",
  icons: {
    icon: "/bookmarkk.jpeg",
    apple: "/bookmarkk.jpeg",
  },
  openGraph: {
    title: "Bookmarkk — Turn your good intentions into a real habit",
    description:
      "Prove your progress with AI quizzes, compete in weekly leagues, and build a reading identity. Join the waitlist now!",
    type: "website",
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} antialiased`}>
      <body className="bg-background text-foreground antialiased selection:bg-[#C05746]/20">
        {children}
      </body>
    </html>
  );
}
