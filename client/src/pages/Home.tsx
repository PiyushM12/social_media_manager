import { useEffect } from "react";
import Navbar from "../components/Home/Navbar";
import Hero from "../components/Home/Hero";
import Features from "../components/Home/Features";
import HowItWorks from "../components/Home/HowItWorks";
import Testimonials from "../components/Home/Testimonials";
import Pricing from "../components/Home/Pricing";
import CTA from "../components/Home/CTA";
import Footer from "../components/Home/Footer";
import GridBackdrop from "../components/motion/GridBackdrop";
import { useSmoothScroll } from "../hooks/useSmoothScroll";

export default function Landing() {
    useSmoothScroll();

    useEffect(() => {
        const prev = document.body.style.backgroundColor;
        document.body.style.backgroundColor = "#070709";
        return () => {
            document.body.style.backgroundColor = prev;
        };
    }, []);

    return (
        <div className="landing-dark min-h-screen font-sans antialiased overflow-x-hidden">
            <GridBackdrop />
            <Navbar />
            <Hero />
            <Features />
            <HowItWorks />
            <Testimonials />
            <Pricing />
            <CTA />
            <Footer />
        </div>
    );
}
