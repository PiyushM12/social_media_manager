import { useEffect, useRef, useState } from "react";
import type { ElementType, ReactNode } from "react";

type RevealProps = {
    children: ReactNode;
    className?: string;
    /** delay before the transition starts, in ms */
    delay?: number;
    /** render as a different element (e.g. "li", "section") */
    as?: ElementType;
    /** re-trigger every time it enters the viewport instead of once */
    repeat?: boolean;
};

/**
 * Fades + slides its children in when scrolled into view.
 * Uses IntersectionObserver — cheap and jank-free.
 */
export default function Reveal({ children, className = "", delay = 0, as, repeat = false }: RevealProps) {
    const Tag = (as ?? "div") as ElementType;
    const ref = useRef<HTMLElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    if (!repeat) io.disconnect();
                } else if (repeat) {
                    setVisible(false);
                }
            },
            { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
        );

        io.observe(el);
        return () => io.disconnect();
    }, [repeat]);

    return (
        <Tag ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </Tag>
    );
}
