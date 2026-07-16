import { CheckCircleIcon, LinkIcon, SparklesIcon, SendIcon } from "lucide-react";
import Reveal from "../motion/Reveal";
import HudCard from "../motion/HudCard";

const steps = [
    { icon: LinkIcon, title: "Connect Accounts", description: "Link your social profiles in seconds. X, LinkedIn, Facebook, and Instagram — all supported." },
    { icon: SparklesIcon, title: "Create or Generate", description: "Write your own post, or let AI craft a caption and image from a single prompt." },
    { icon: SendIcon, title: "Schedule & Publish", description: "Pick a time, select platforms, and deploy. We publish automatically — on time, every time." },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="relative py-24 sm:py-28 scroll-mt-24">
            <div className="max-w-5xl mx-auto px-5 sm:px-6">
                <Reveal className="text-center mb-16">
                    <div className="mb-5 inline-flex items-center gap-2 glass hud-label text-white/70 px-3.5 py-1.5">
                        <CheckCircleIcon className="size-3 text-red" />
                        Simple setup
                    </div>
                    <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl leading-[1.02] text-white uppercase">
                        Live in <span className="text-red-grad">minutes</span>
                    </h2>
                    <p className="mt-5 text-white/50 max-w-lg mx-auto leading-relaxed">No complicated onboarding, no steep learning curve. Just connect, create, and grow.</p>
                </Reveal>

                <div className="relative grid md:grid-cols-3 gap-4 md:gap-5">
                    <div className="hidden md:block absolute top-9 left-[16.66%] right-[16.66%] h-px bg-[linear-gradient(90deg,transparent,rgba(255,53,70,0.5),transparent)]" />

                    {steps.map((s, i) => (
                        <Reveal key={s.title} delay={i * 120}>
                            <HudCard notch={16} className="h-full" innerClassName="p-6 text-center md:text-left">
                                <div className="relative z-10 mx-auto md:mx-0 mb-5 grid place-items-center size-14 bg-red text-white shadow-[0_0_24px_rgba(255,53,70,0.5)]" style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}>
                                    <s.icon className="size-6" />
                                    <span className="absolute -top-2 -right-2 size-6 bg-white text-ink font-mono text-[10px] font-bold flex items-center justify-center">0{i + 1}</span>
                                </div>
                                <h3 className="text-lg font-medium text-white mb-2">{s.title}</h3>
                                <p className="text-white/45 text-sm leading-relaxed">{s.description}</p>
                            </HudCard>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
