import { CheckIcon, CircleCheckBigIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "../motion/Reveal";
import HudCard from "../motion/HudCard";

const pricingPlans = [
    {
        name: "Starter",
        price: "Free",
        period: "",
        description: "Perfect for creators just getting started with automation.",
        features: ["2 social accounts", "10 scheduled posts/month", "AI content (5 credits/mo)", "Basic console"],
        cta: "Get Started Free",
        highlight: false,
    },
    {
        name: "Pro",
        price: "$29",
        period: "/mo",
        description: "Everything you need to grow and automate your social presence.",
        features: ["Unlimited accounts", "Unlimited scheduling", "AI content (200 credits/mo)", "Priority support"],
        cta: "Start 14-day Trial",
        highlight: true,
    },
    {
        name: "Agency",
        price: "$79",
        period: "/mo",
        description: "For teams and agencies managing multiple brands at scale.",
        features: ["Everything in Pro", "5 team members", "Unlimited AI credits", "Custom AI personas", "Dedicated support"],
        cta: "Contact Sales",
        highlight: false,
    },
];

export default function Pricing() {
    return (
        <section id="pricing" className="relative py-24 sm:py-28 scroll-mt-24">
            <div className="max-w-6xl mx-auto px-5 sm:px-6">
                <Reveal className="text-center mb-16">
                    <div className="mb-5 inline-flex items-center gap-2 glass hud-label text-white/70 px-3.5 py-1.5">
                        <CircleCheckBigIcon className="size-3 text-red" />
                        Simple pricing
                    </div>
                    <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl leading-[1.02] text-white uppercase">
                        Plans for every <span className="text-red-grad">stage</span>
                    </h2>
                    <p className="mt-5 text-white/50 max-w-md mx-auto">Start free, upgrade when you're ready. Cancel anytime — no hidden fees.</p>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
                    {pricingPlans.map((plan, i) => (
                        <Reveal key={plan.name} delay={i * 110} className={plan.highlight ? "md:-mt-4" : ""}>
                            <HudCard notch={20} hover={!plan.highlight} className={`h-full ${plan.highlight ? "hud-pro" : ""}`} innerClassName="p-7 flex flex-col gap-6">
                                {plan.highlight && <div className="hud-label text-red mb-1">// Most Popular</div>}
                                <div>
                                    <div className={`hud-label mb-2 ${plan.highlight ? "text-red" : "text-white/50"}`}>{plan.name}</div>
                                    <div className="flex items-end gap-1">
                                        <span className="font-serif text-5xl leading-none text-white">{plan.price}</span>
                                        <span className="hud-label text-white/40 mb-1.5">{plan.period}</span>
                                    </div>
                                    <p className="text-sm mt-3 leading-relaxed text-white/50">{plan.description}</p>
                                </div>

                                <ul className="space-y-3">
                                    {plan.features.map((f) => (
                                        <li key={f} className="flex items-center gap-2.5 text-sm">
                                            <span className={`size-4.5 flex items-center justify-center shrink-0 ${plan.highlight ? "bg-red" : "bg-white/10"}`}>
                                                <CheckIcon className={`size-3 ${plan.highlight ? "text-white" : "text-red"}`} />
                                            </span>
                                            <span className="text-white/70">{f}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link to="/login" className={`mt-auto text-center font-medium text-sm px-6 py-3.5 transition-all ${plan.highlight ? "bg-red text-white hover:shadow-[0_0_28px_rgba(255,53,70,0.55)]" : "glass text-white hover:bg-white/10"}`} style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}>
                                    {plan.cta}
                                </Link>
                            </HudCard>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
