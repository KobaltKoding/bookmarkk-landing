export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="font-bold text-sm">bookmarkk</span>
          <span className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Bookmarkk. All rights reserved.
          </span>
        </div>
        <div className="flex items-center gap-6 text-xs text-text-muted">
          <a href="#how-it-works" className="hover:text-primary transition-colors">
            How It Works
          </a>
          <a href="#try-it" className="hover:text-primary transition-colors">
            Try It
          </a>
          <a href="#faq" className="hover:text-primary transition-colors">
            FAQ
          </a>
        </div>
      </div>
    </footer>
  );
}
