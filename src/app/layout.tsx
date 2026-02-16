import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bookmarkk — Turn Reading Into a Sport You Can Win",
  description:
    "Bookmarkk is Strava for books. Prove your progress with AI quizzes, compete in weekly leagues, and build a reading identity. Join the waitlist.",
  openGraph: {
    title: "Bookmarkk — Turn Reading Into a Sport You Can Win",
    description:
      "Prove your progress with AI quizzes, compete in weekly leagues, and build a reading identity.",
    type: "website",
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <body className="bg-background text-foreground antialiased selection:bg-[#C05746]/20">
        {children}
      </body>
    </html>
  );
}
