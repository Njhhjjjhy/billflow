export function Footer() {
  return (
    <footer className="py-12 bg-[var(--color-text-primary)] border-t-3 border-black">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <span
            className="text-xl font-bold text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Billflow
          </span>
          <span
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 bg-white/10 border border-white/20 rounded-full px-3 py-1"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span aria-hidden="true">🇹🇼</span>
            Made in Taiwan
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-white/15 mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <p>&copy; 2026 Billflow. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
