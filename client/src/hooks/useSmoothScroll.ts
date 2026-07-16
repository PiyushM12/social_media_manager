import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Initialises Lenis smooth scrolling for the lifetime of the mounting
 * component. Also upgrades in-page anchor links (href="#section") to
 * animated scrolls with an offset for the sticky navbar.
 *
 * Fully disabled when the user prefers reduced motion.
 */
export function useSmoothScroll() {
    useEffect(() => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) return;

        const lenis = new Lenis({
            duration: 1.6,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 0.9,
            touchMultiplier: 1.5,
        });

        let rafId = 0;
        const raf = (time: number) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        const onAnchorClick = (e: MouseEvent) => {
            const target = (e.target as HTMLElement)?.closest('a[href^="#"]') as HTMLAnchorElement | null;
            if (!target) return;
            const id = target.getAttribute("href");
            if (!id || id === "#") return;
            const el = document.querySelector(id);
            if (!el) return;
            e.preventDefault();
            lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.3 });
        };
        document.addEventListener("click", onAnchorClick);

        return () => {
            document.removeEventListener("click", onAnchorClick);
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);
}
