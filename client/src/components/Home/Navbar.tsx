import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon, MenuIcon, XIcon } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const links = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50">
            <div className="px-3 sm:px-5 pt-3">
                <div className={`max-w-6xl mx-auto transition-all duration-300 ${scrolled || open ? "glass-strong shadow-[0_10px_40px_-12px_rgba(0,0,0,0.7)] border-white/10" : "border border-transparent"}`} style={{ clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))" }}>
                    <div className="px-4 sm:px-5 h-14 flex items-center justify-between">
                        <Link to="/" onClick={() => scrollTo(0, 0)} className="flex items-center gap-2.5 group">
                            <span className="grid place-items-center size-8 bg-red text-white shadow-[0_0_18px_rgba(255,53,70,0.6)]" style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))" }}>
                                <img src="/logo.svg" alt="logo" className="size-5 brightness-0 invert transition-transform duration-300 group-hover:rotate-[-8deg]" />
                            </span>
                            <span className="text-xl font-serif tracking-tight text-white">SCHEDULER</span>
                        </Link>

                        <div className="hidden md:flex items-center gap-8 text-sm text-white/55">
                            {links.map((l) => (
                                <a key={l.href} href={l.href} className="relative py-1 transition-colors hover:text-white after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-red after:transition-all after:duration-300 hover:after:w-full">
                                    {l.label}
                                </a>
                            ))}
                        </div>

                        <div className="flex items-center gap-2.5">
                            {user ? (
                                <Link to="/dashboard" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium bg-red text-white px-4 py-2 rounded-full hover:shadow-[0_0_20px_rgba(255,53,70,0.5)] transition-all">
                                    Dashboard <ArrowRightIcon className="size-3.5" />
                                </Link>
                            ) : (
                                <>
                                    <Link to="/login" className="text-sm text-white/60 hover:text-white transition-colors hidden sm:block">
                                        Sign In
                                    </Link>
                                    <Link to="/login" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium bg-red text-white px-4 py-2 rounded-full hover:shadow-[0_0_20px_rgba(255,53,70,0.5)] transition-all">
                                        Get Started <ArrowRightIcon className="size-3.5" />
                                    </Link>
                                </>
                            )}

                            <button aria-label="Toggle menu" onClick={() => setOpen((v) => !v)} className="md:hidden inline-flex items-center justify-center size-10 rounded-lg glass text-white active:scale-95 transition">
                                {open ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    <div className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-400 ease-out ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                        <div className="px-3 pb-3 pt-1 flex flex-col gap-1">
                            {links.map((l) => (
                                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 px-3 rounded-lg text-white/70 hover:bg-white/8 hover:text-white transition-colors">
                                    {l.label}
                                </a>
                            ))}
                            <div className="h-px bg-white/10 my-1.5" />
                            {user ? (
                                <Link to="/dashboard" onClick={() => setOpen(false)} className="flex items-center justify-center gap-1.5 text-sm font-medium bg-red text-white px-4 py-3 rounded-lg">
                                    Go to Dashboard <ArrowRightIcon className="size-4" />
                                </Link>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    <Link to="/login" onClick={() => setOpen(false)} className="text-center py-3 rounded-lg border border-white/12 text-white/80">
                                        Sign In
                                    </Link>
                                    <Link to="/login" onClick={() => setOpen(false)} className="flex items-center justify-center gap-1.5 text-sm font-medium bg-red text-white px-4 py-3 rounded-lg">
                                        Get Started <ArrowRightIcon className="size-4" />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
