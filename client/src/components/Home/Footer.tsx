import { Link } from "react-router-dom";
import {
  SiX,
  SiInstagram,
  SiThreads,
  SiFacebook,
} from "@icons-pack/react-simple-icons";

const footerLinks = {
  Product: ["Features", "How it works", "Pricing", "Changelog"],
  Company: ["About", "Blog", "Careers", "Press"],
  Legal: ["Privacy", "Terms", "Security", "Cookies"],
};

const socials = [SiX, SiInstagram, SiThreads, SiFacebook];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 mt-20 bg-gradient-to-b from-[#0e0d15] to-[#070709] shadow-[0_-15px_40px_-15px_rgba(0,0,0,0.8)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-12 mb-14">
          <div className="col-span-3 lg:col-span-2">
            <Link
              to="/"
              onClick={() => scrollTo(0, 0)}
              className="inline-flex items-center gap-2.5 mb-4"
            >
              <span
                className="grid place-items-center size-7 bg-red text-white shadow-[0_0_16px_rgba(255,53,70,0.5)]"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px))",
                }}
              >
                <img
                  src="/logo.svg"
                  alt="logo"
                  className="size-4 brightness-0 invert"
                />
              </span>
              <span className="font-serif text-xl text-white tracking-tight">
                SCHEDULER
              </span>
            </Link>
            <p className="text-sm text-white/45 leading-relaxed max-w-xs">
              The AI-powered social media console that helps creators and teams
              grow faster with less effort.
            </p>
            <div className="flex items-center gap-2 mt-5">
              {socials.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social link"
                  className="grid place-items-center size-9 glass text-white/50 hover:text-red hover:border-red/40 transition-colors"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <div className="hud-label mb-4 text-white/70">{category}</div>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/45 hover:text-red transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/8">
          <p className="hud-label text-white/35">
            Made with <span className="heart-beat text-red-500">❤️</span> by
            Piyush Mishra
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="hud-label text-white/35 hover:text-white/70 transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="hud-label text-white/35 hover:text-white/70 transition-colors"
            >
              Terms
            </a>
            <Link
              to="/login"
              className="hud-label text-white/35 hover:text-white/70 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
