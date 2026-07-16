import type { CSSProperties, ReactNode } from "react";

type HudCardProps = {
    children: ReactNode;
    className?: string;
    /** inner padding + layout classes */
    innerClassName?: string;
    /** notch size, e.g. 14 / 18 / 24 */
    notch?: number;
    /** enable hover lift + red glow */
    hover?: boolean;
};

/**
 * Angular "HUD" panel with notched corners and a red gradient edge.
 * The shape is drawn with clip-path on a 1px wrapper (the border) and an
 * inner panel, so it reads as a futuristic cut-corner card.
 */
export default function HudCard({ children, className = "", innerClassName = "", notch = 16, hover = true }: HudCardProps) {
    return (
        <div className={`hud ${hover ? "hud-hover" : ""} ${className}`} style={{ "--notch": `${notch}px` } as CSSProperties}>
            <div className={`hud-inner ${innerClassName}`}>{children}</div>
        </div>
    );
}
