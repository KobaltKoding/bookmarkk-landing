"use client";

interface FooterProps {
  onOpenLegal?: (tab: "privacy" | "terms") => void;
}

export default function Footer({ onOpenLegal }: FooterProps) {
  return (
    <footer className="relative z-20 border-t border-white/5 py-8 px-6 bg-[#030303]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="font-bold text-sm">bookmarkk</span>
          <span className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Bookmarkk. All rights reserved.
          </span>
        </div>
        <div className="flex items-center gap-6 text-xs text-text-muted">
          <button
            onClick={() => onOpenLegal?.("privacy")}
            className="hover:text-white transition-colors"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => onOpenLegal?.("terms")}
            className="hover:text-white transition-colors"
          >
            Terms of Service
          </button>
        </div>
      </div>
    </footer>
  );
}
