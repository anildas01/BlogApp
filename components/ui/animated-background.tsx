export function AnimatedBackground() {
    return (
        <div className="fixed inset-0 -z-50 overflow-hidden bg-white dark:bg-slate-950">
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-slate-100/[0.03] bg-[bottom_1px_center]"></div>
        </div>
    );
}

// Add these to your globals.css or tailwind config if not present
// For the grid pattern, we can use a small SVG data URI utility in Tailwind or inline style
// For now, using a simple inline style for the grid effect if Tailwind plugin isn't there
// But I'll simulate the grid class with standard CSS in globals or a custom component style
