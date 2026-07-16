import { StarIcon, QuoteIcon } from "lucide-react";
import Reveal from "../motion/Reveal";
import HudCard from "../motion/HudCard";

const testimonials = [
    { name: "Sarah K.", role: "Marketing Manager", avatar: "S", text: "Scheduler has saved our team 10+ hours a week. The AI composer is genuinely impressive — it writes content that sounds like us." },
    { name: "Marcus L.", role: "Indie Creator", avatar: "M", text: "I used to dread posting. Now I queue a whole week of content in 20 minutes. The smart scheduling alone is worth it." },
    { name: "Priya D.", role: "Startup Founder", avatar: "P", text: "Finally a scheduler that's beautiful AND powerful. The clean console makes it easy to see exactly what's going out and when." },
];

export default function Testimonials() {
    return (
        <section className="relative py-24 sm:py-28">
            <div className="max-w-6xl mx-auto px-5 sm:px-6">
                <Reveal className="text-center mb-14">
                    <div className="mb-5 inline-flex items-center gap-2 glass hud-label text-white/70 px-3.5 py-1.5">
                        <StarIcon className="size-3 text-red fill-red" />
                        Testimonials
                    </div>
                    <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl leading-[1.02] text-white uppercase">
                        Loved by <span className="text-red-grad">creators & teams</span>
                    </h2>
                    <p className="mt-5 text-white/50 max-w-md mx-auto">Join thousands of operators who automate their social media with Scheduler.</p>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                    {testimonials.map((t, i) => (
                        <Reveal key={t.name} delay={i * 100}>
                            <HudCard notch={16} className="h-full" innerClassName="p-6 flex flex-col gap-5">
                                <div className="flex items-center justify-between">
                                    <QuoteIcon className="size-7 text-white/12" />
                                    <div className="flex gap-0.5">
                                        {Array.from({ length: 5 }).map((_, s) => (
                                            <StarIcon key={s} className="size-4 text-red fill-red" />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-white/70 leading-relaxed flex-1">"{t.text}"</p>
                                <div className="flex items-center gap-3 pt-4 border-t border-white/8">
                                    <div className="size-10 bg-red/15 text-red border border-red/25 flex items-center justify-center text-sm font-bold shrink-0">{t.avatar}</div>
                                    <div>
                                        <div className="text-sm font-medium text-white">{t.name}</div>
                                        <div className="hud-label text-white/40">{t.role}</div>
                                    </div>
                                </div>
                            </HudCard>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
