import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";
import Reveal from "../motion/Reveal";
import HudCard from "../motion/HudCard";

export default function CTA() {
    return (
        <section className="py-20 sm:py-24">
            <div className="max-w-6xl mx-auto px-5 sm:px-8">
                <Reveal>
                    <HudCard hover={false} notch={30} innerClassName="relative overflow-hidden p-12 sm:p-20 text-center">
                        {/* grid + scanlines, no radial */}
                        <div className="absolute inset-0 grid-bg [mask-image:linear-gradient(180deg,rgba(0,0,0,0.7),transparent)] pointer-events-none" />
                        <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-[linear-gradient(90deg,transparent,rgba(255,53,70,0.7),transparent)]" />

                        <div className="relative">
                            <div className="mb-6 inline-flex items-center gap-2 glass hud-label text-red px-3.5 py-1.5">Ready to deploy?</div>
                            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl leading-[1.02] text-white uppercase">
                                Automate your social
                                <br />
                                <span className="text-red-grad">media today</span>
                            </h2>
                            <p className="mt-6 text-white/55 max-w-lg mx-auto text-lg leading-relaxed">Join thousands of creators and marketers who trust Scheduler to grow their audience on autopilot.</p>

                            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                                <Link to="/login" className="group bg-red text-white font-medium hover:shadow-[0_0_40px_rgba(255,53,70,0.6)] inline-flex items-center gap-2 text-[15px] px-10 py-4 w-full sm:w-auto justify-center transition-all" style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}>
                                    Get Started Free
                                    <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
                                </Link>
                                <a href="#pricing" className="glass text-white font-medium hover:bg-white/10 inline-flex items-center gap-2 text-[15px] px-10 py-4 w-full sm:w-auto justify-center transition-all" style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}>
                                    View Pricing
                                </a>
                            </div>

                            <p className="mt-6 hud-label text-white/35">No card required · Cancel anytime</p>
                        </div>
                    </HudCard>
                </Reveal>
            </div>
        </section>
    );
}
