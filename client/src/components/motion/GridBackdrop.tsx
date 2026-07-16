/**
 * Fixed futuristic backdrop for the landing page — deep black with a fine
 * grid, faint scanlines, and a couple of glowing red accent lines. NO radial
 * gradients, fully static (zero repaint) so scrolling stays perfectly smooth.
 */
export default function GridBackdrop() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-ink transform-gpu will-change-transform">
            {/* grid, fading toward the bottom */}
            <div className="absolute inset-0 grid-bg [mask-image:linear-gradient(180deg,rgba(0,0,0,0.9),transparent_85%)]" />
            {/* subtle scanlines */}
            <div className="absolute inset-0 scanlines opacity-40" />

            {/* edge darkening via linear gradients (no radial) */}
            <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(4,3,6,0.9),transparent)]" />
            <div className="absolute inset-x-0 bottom-0 h-56 bg-[linear-gradient(0deg,rgba(4,3,6,0.95),transparent)]" />
            <div className="absolute inset-y-0 left-0 w-40 bg-[linear-gradient(90deg,rgba(4,3,6,0.8),transparent)]" />
            <div className="absolute inset-y-0 right-0 w-40 bg-[linear-gradient(270deg,rgba(4,3,6,0.8),transparent)]" />
        </div>
    );
}
