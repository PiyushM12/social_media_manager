import { CalendarDaysIcon, Wand2Icon, Share2Icon, ZapIcon, BarChart3Icon, HashIcon, SparklesIcon, ImageIcon } from "lucide-react";
import { SiX, SiInstagram, SiFacebook, SiThreads } from "@icons-pack/react-simple-icons";
import Reveal from "../motion/Reveal";
import HudCard from "../motion/HudCard";

const small = [
    { icon: CalendarDaysIcon, title: "Smart Scheduling", description: "Queue posts across every platform in one click. Set it once — the timeline handles the rest.", code: "SYS.01" },
    { icon: Share2Icon, title: "Multi-Platform", description: "X, LinkedIn, Facebook & Instagram from one unified console.", code: "SYS.02" },
    { icon: BarChart3Icon, title: "Activity Dashboard", description: "A bird's-eye view of published, scheduled, and engaged content.", code: "SYS.03" },
    { icon: ZapIcon, title: "Instant Publishing", description: "Go live now or schedule for peak times, full timezone support.", code: "SYS.04" },
    { icon: HashIcon, title: "Hashtag Engine", description: "AI-picked hashtags that push your content in front of more people.", code: "SYS.05" },
];

export default function Features() {
    return (
        <section id="features" className="relative py-24 sm:py-28 scroll-mt-24">
            <div className="max-w-6xl mx-auto px-5 sm:px-6">
                <Reveal className="text-center mb-14 sm:mb-16">
                    <div className="mb-5 inline-flex items-center gap-2 glass hud-label text-white/70 px-3.5 py-1.5">
                        <ZapIcon className="size-3 text-red" />
                        Everything you need
                    </div>
                    <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl leading-[1.02] text-white uppercase">
                        Automate your entire
                        <br />
                        <span className="text-red-grad">social workflow</span>
                    </h2>
                    <p className="mt-5 text-white/50 max-w-xl mx-auto leading-relaxed">From content creation to scheduling — Scheduler runs the whole pipeline, so you can focus on what actually matters.</p>
                </Reveal>

                {/* Bento grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 auto-rows-[minmax(180px,1fr)] gap-4">
                    {/* Big showcase card */}
                    <Reveal className="sm:col-span-2 lg:col-span-4 lg:row-span-2">
                        <HudCard notch={24} className="h-full" innerClassName="p-7 flex flex-col">
                            <div className="flex items-center justify-between mb-5">
                                <span className="grid place-items-center size-11 bg-red/15 text-red border border-red/25">
                                    <Wand2Icon className="size-5" />
                                </span>
                                <span className="hud-label text-red/80">// FLAGSHIP</span>
                            </div>
                            <h3 className="font-serif text-3xl sm:text-4xl text-white mb-2 uppercase">AI Content Engine</h3>
                            <p className="text-white/50 leading-relaxed max-w-md">Generate on-brand captions and stunning images from a single prompt. Never stare at a blank page again.</p>

                            {/* mini generation visual */}
                            <div className="mt-auto pt-6">
                                <div className="bg-white/[0.03] border border-white/8 p-4">
                                    <div className="flex items-center gap-2 hud-label text-white/40 mb-3">
                                        <SparklesIcon className="size-3.5 text-red" />
                                        <span className="truncate normal-case">"Launch post for our new AI feature"</span>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="shrink-0 size-16 bg-red/12 grid place-items-center border border-red/20">
                                            <ImageIcon className="size-6 text-red/80" />
                                        </div>
                                        <div className="flex-1 space-y-2 py-1">
                                            <div className="h-2.5 bg-white/15 w-[92%]" />
                                            <div className="h-2.5 bg-white/10 w-[78%]" />
                                            <div className="h-2.5 bg-white/10 w-[60%]" />
                                            <div className="flex gap-1.5 pt-1">
                                                {["#AI", "#launch", "#social"].map((t) => (
                                                    <span key={t} className="px-2 py-0.5 bg-red/12 text-red/90 font-mono text-[10px] tracking-wide">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </HudCard>
                    </Reveal>

                    {/* Small cards */}
                    {small.map((f, i) => (
                        <Reveal key={f.title} delay={(i % 2) * 90} className="sm:col-span-1 lg:col-span-2">
                            <HudCard notch={16} className="h-full" innerClassName="p-6 flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="grid place-items-center size-10 bg-white/5 text-red border border-white/10">
                                        <f.icon className="size-5" />
                                    </span>
                                    <span className="hud-label text-white/25">{f.code}</span>
                                </div>
                                <h3 className="text-[17px] font-medium text-white mb-1.5">{f.title}</h3>
                                <p className="text-sm text-white/45 leading-relaxed">{f.description}</p>

                                {f.title === "Multi-Platform" && (
                                    <div className="mt-auto pt-4 flex items-center gap-2.5">
                                        {[SiX, SiInstagram, SiFacebook, SiThreads].map((Icon, k) => (
                                            <span key={k} className="grid place-items-center size-8 bg-white/5 border border-white/8 text-white/60">
                                                <Icon className="size-4" />
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </HudCard>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
