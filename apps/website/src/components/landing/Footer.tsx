export function Footer() {
  return (
    <footer className="py-12 bg-[var(--color-bg-secondary)] border-t-2 border-black">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <span
            className="text-xl font-bold text-[var(--color-text-primary)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Billflow
          </span>
          <span
            className="text-sm text-[var(--color-text-secondary)]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Made in Taiwan
          </span>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--color-text-muted)]">
          <p>&copy; 2026 Billflow. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[var(--color-text-primary)] transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-[var(--color-text-primary)] transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
