import { Link } from "react-router-dom";
import { ArrowRightIcon, CheckIcon, PlayIcon, SparklesIcon } from "lucide-react";
import { SiX, SiInstagram, SiFacebook, SiThreads, SiYoutube, SiTiktok } from "@icons-pack/react-simple-icons";
import Reveal from "../motion/Reveal";
import HudCard from "../motion/HudCard";

const brands = [SiX, SiInstagram, SiFacebook, SiThreads, SiYoutube, SiTiktok];

export default function Hero() {
    const sparklines = [
        <svg className="w-16 h-8 text-red/60" viewBox="0 0 60 30" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M0 22 Q15 8, 30 20 T60 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>,
        <svg className="w-16 h-8 text-red/60" viewBox="0 0 60 30" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M0 25 L10 18 L20 22 L30 12 L40 16 L50 8 L60 14" strokeLinecap="round" strokeLinejoin="round" />
        </svg>,
        <svg className="w-16 h-8 text-red/60" viewBox="0 0 60 30" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M0 28 L15 24 L30 14 L45 8 L60 2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>,
        <svg className="w-16 h-8 text-red/60" viewBox="0 0 60 30" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M0 15 L8 24 L16 8 L24 22 L32 6 L40 18 L48 4 L56 12 L60 2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ];

    return (
        <section className="relative overflow-hidden pt-16 sm:pt-24">
            <div className="relative max-w-4xl mx-auto px-5 sm:px-8 pt-10 pb-14 text-center">
                <Reveal>
                    <div className="inline-flex items-center gap-2.5 glass hud-label text-white/90 border border-white/10 hover:border-red/40 transition-colors duration-300 px-4.5 py-2 mb-8 shadow-[0_4px_12px_rgba(0,0,0,0.5)]" style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}>
                        <span className="relative flex size-2 shrink-0">
                            <span className="animate-telemetry-ping absolute inline-flex h-full w-full rounded-full bg-red/75 opacity-75"></span>
                            <span className="relative inline-flex rounded-full size-2 bg-red shadow-[0_0_8px_rgba(255,53,70,0.9)]"></span>
                        </span>
                        <span className="tracking-[0.18em] text-[10px]">AI Social Automation</span>
                    </div>
                </Reveal>

                <Reveal delay={80}>
                    <h1 className="font-serif text-[2.25rem] leading-[1.05] sm:text-6xl md:text-7xl xl:text-[5.5rem] text-white uppercase break-words sm:whitespace-nowrap">
                        <span className="bg-gradient-to-b from-white to-white/75 bg-clip-text text-transparent">Schedule smarter.</span>
                        <br />
                        <span className="text-red-grad">Grow faster.</span>
                    </h1>
                </Reveal>

                <Reveal delay={160}>
                    <p className="mt-8 text-white/70 text-[17px] leading-relaxed max-w-xl mx-auto">Create, schedule, and auto-engage across every platform — powered by AI that writes your captions, designs your images, and replies for you.</p>
                </Reveal>

                <Reveal delay={240}>
                    <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link to="/login" className="group btn-cyber-primary text-white font-medium hover:shadow-[0_0_36px_rgba(255,53,70,0.55)] inline-flex items-center gap-2 text-[15px] px-8 py-3.5 w-full sm:w-auto justify-center transition-all" style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}>
                            Start for free
                            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                        <a href="#how-it-works" className="glass text-white font-medium border border-white/10 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_0_24px_rgba(255,255,255,0.05)] inline-flex items-center gap-2 text-[15px] px-7 py-3.5 w-full sm:w-auto justify-center transition-all" style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}>
                            <PlayIcon className="size-3.5 fill-white" />
                            See how it works
                        </a>
                    </div>
                </Reveal>

                <Reveal delay={320}>
                    <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 hud-label text-white/35">
                        {["No card required", "Free forever", "Cancel anytime"].map((t) => (
                            <span key={t} className="inline-flex items-center gap-1.5 hover:text-white/60 transition-colors cursor-default">
                                <CheckIcon className="size-3.5 text-red" />
                                {t}
                            </span>
                        ))}
                    </div>
                </Reveal>
            </div>

            {/* Dashboard mockup — HUD panel */}
            <Reveal delay={200} className="relative max-w-5xl mx-auto px-4 sm:px-8">
                <div className="relative transform-gpu shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)]">
                    <HudCard hover={false} notch={26} innerClassName="p-0 overflow-hidden bg-gradient-to-b from-[#13101a] to-[#08070b]">
                        {/* chrome */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/8 bg-white/[0.01]">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red/80 hover:bg-red transition-colors" />
                                <div className="w-3 h-3 rounded-full bg-white/20" />
                                <div className="w-3 h-3 rounded-full bg-white/20" />
                            </div>
                            <div className="flex-1 mx-4 h-6 max-w-xs bg-white/5 border border-white/8 flex items-center justify-center px-3" style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))" }}>
                                <span className="hud-label text-white/30 tracking-[0.15em] text-[9px]">app.scheduler.io</span>
                            </div>
                            <div className="w-12 h-1 bg-white/10 rounded-full" />
                        </div>

                        <div className="p-4 sm:p-6">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                                {[
                                    { val: "12", label: "Scheduled", color: "text-red", borderColor: "var(--color-red)" },
                                    { val: "48", label: "Published", color: "text-white", borderColor: "rgba(255,255,255,0.12)" },
                                    { val: "04", label: "Accounts", color: "text-white", borderColor: "rgba(255,255,255,0.12)" },
                                    { val: "03", label: "AI Rules", color: "text-white", borderColor: "rgba(255,255,255,0.12)" },
                                ].map((s, i) => (
                                    <div key={s.label} className="relative p-4 bg-white/[0.02] hover:bg-white/[0.04] border border-white/8 border-l-2 transition-all duration-300 flex items-center justify-between overflow-hidden group" style={{ borderLeftColor: s.borderColor }}>
                                        <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/25 group-hover:border-white/55 transition-colors" />
                                        <div>
                                            <div className={`text-2xl font-serif tabular-nums ${s.color}`}>{s.val}</div>
                                            <div className="hud-label text-white/35 mt-1 text-[9px]">{s.label}</div>
                                        </div>
                                        <div className="opacity-80 group-hover:opacity-100 transition-opacity">
                                            {sparklines[i]}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid sm:grid-cols-5 gap-3">
                                <div className="sm:col-span-3 p-4 bg-white/[0.02] border border-white/8 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/25 group-hover:border-white/55 transition-colors" />
                                    <div className="hud-label text-white/35 mb-3 flex items-center justify-between">
                                        <span>Recent Activity</span>
                                        <span className="relative flex size-1.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red/60 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full size-1.5 bg-red"></span>
                                        </span>
                                    </div>
                                    <div className="space-y-3">
                                        {[
                                            { text: "Published to X & Facebook", time: "2m", platforms: [SiX, SiFacebook] },
                                            { text: "AI replied to 3 comments", time: "15m", platforms: [SiInstagram] },
                                            { text: "Post scheduled — 09:00", time: "1h", platforms: [SiTiktok, SiYoutube] },
                                        ].map((item, idx) => (
                                            <div key={item.text} className="flex items-center gap-3 py-1 border-b border-white/[0.03] last:border-0 hover:bg-white/[0.01] px-1 transition-colors">
                                                <span className="relative flex size-1.5 shrink-0">
                                                    {idx === 0 && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red/60 opacity-75"></span>}
                                                    <span className={`relative inline-flex rounded-full size-1.5 ${idx === 0 ? "bg-red" : "bg-white/30"}`} />
                                                </span>
                                                <span className="text-sm text-white/70 flex-1 truncate">{item.text}</span>
                                                <div className="flex items-center gap-1.5 shrink-0">
                                                    {item.platforms.map((Icon, pIdx) => (
                                                        <Icon key={pIdx} className="size-3.5 text-white/40" />
                                                    ))}
                                                </div>
                                                <span className="hud-label text-white/30 text-[9px] w-8 text-right">{item.time}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="sm:col-span-2 p-4 bg-white/[0.02] border border-white/8 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/25 group-hover:border-white/55 transition-colors" />
                                    <div className="hud-label text-white/35 mb-4 flex items-center justify-between">
                                        <span>Up Next</span>
                                        <span className="text-[9px] text-red/80 font-bold">LIVE SYNC</span>
                                    </div>
                                    <div className="space-y-3.5">
                                        {[
                                            { time: "Mon 09:00", fill: "w-[75%]", tag: "Promo Campaign", color: "bg-red/60" },
                                            { time: "Tue 12:30", fill: "w-[50%]", tag: "Weekly Video", color: "bg-white/30" },
                                            { time: "Wed 18:00", fill: "w-[60%]", tag: "Product Reel", color: "bg-white/30" }
                                        ].map((item, i) => (
                                            <div key={item.time} className="flex items-start gap-3">
                                                <div className="flex flex-col items-center">
                                                    <div className={`size-2 rounded-full ${i === 0 ? "bg-red shadow-[0_0_8px_var(--color-red)]" : "bg-white/20"}`} />
                                                    {i < 2 && <div className="w-px h-8 bg-white/10 mt-1" />}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between gap-2 mb-1">
                                                        <span className="text-xs text-white/80 font-medium truncate">{item.tag}</span>
                                                        <span className="hud-label text-white/30 text-[8px] shrink-0">{item.time}</span>
                                                    </div>
                                                    <div className="h-1.5 bg-white/5 overflow-hidden">
                                                        <div className={`h-full ${item.color} ${item.fill}`} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </HudCard>
                </div>

                {/* Floating HUD chips with float animations */}
                <div className="absolute -left-3 sm:left-4 top-24 hidden sm:block animate-float-slow z-10">
                    <div className="glass-strong px-4 py-3 border-l-2 border-l-red" style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)" }}>
                        <div className="flex items-center gap-2.5">
                            <span className="grid place-items-center size-8 bg-red/15 text-red shadow-[0_0_12px_rgba(255,53,70,0.2)]">
                                <CheckIcon className="size-4" />
                            </span>
                            <div className="text-left">
                                <div className="text-xs font-medium text-white">Post published</div>
                                <div className="hud-label text-white/40 text-[9px]">+312% reach</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute -right-2 sm:right-3 top-44 hidden sm:block animate-float-slower z-10">
                    <div className="glass-strong px-4 py-3 border-l-2 border-l-red" style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)" }}>
                        <div className="flex items-center gap-2.5">
                            <span className="grid place-items-center size-8 bg-red/15 text-red shadow-[0_0_12px_rgba(255,53,70,0.2)]">
                                <SparklesIcon className="size-4" />
                            </span>
                            <div className="text-left">
                                <div className="text-xs font-medium text-white">AI caption ready</div>
                                <div className="hud-label text-white/40 text-[9px]">0.8s</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Reveal>

            {/* Platform marquee */}
            <Reveal delay={120} className="relative mt-16 sm:mt-20 z-10 max-w-5xl mx-auto px-4 sm:px-8 text-center">
                <p className="text-center hud-label text-white/30 mb-6">Publish everywhere from one console</p>
                <div className="marquee-mask overflow-hidden">
                    <div className="flex w-max animate-marquee gap-16 pr-16">
                        {[...brands, ...brands, ...brands, ...brands, ...brands, ...brands].map((Icon, i) => (
                            <Icon key={i} className="size-8 text-white/30 hover:text-white transition-colors duration-300 shrink-0 cursor-pointer" />
                        ))}
                    </div>
                </div>
            </Reveal>
        </section>
    );
}
