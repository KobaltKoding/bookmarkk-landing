"use client";

interface FooterProps {
  onOpenLegal?: (tab: "privacy" | "terms") => void;
}

export default function Footer({ onOpenLegal }: FooterProps) {
  return (
    <footer className="relative z-20 py-12 px-6 bg-transparent">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <span className="font-black text-xl text-[#1D59BB] tracking-tighter">bookmarkk</span>
          <span className="text-sm text-[#75BAFF] font-medium">
            &copy; {new Date().getFullYear()} Bookmarkk. All rights reserved.
          </span>
        </div>
        <div className="flex items-center gap-8 text-sm font-bold">
          <button
            onClick={() => onOpenLegal?.("privacy")}
            className="text-[#75BAFF] hover:text-[#1D59BB] transition-colors"
          >
            Privacy
          </button>
          <button
            onClick={() => onOpenLegal?.("terms")}
            className="text-[#75BAFF] hover:text-[#1D59BB] transition-colors"
          >
            Terms
          </button>
        </div>
      </div>
    </footer>
  );
}
