"use client";

import { useEffect, useState, type CSSProperties } from "react";

/* ------------------------------------------------------------------ */
/*  Content data — edit here to update listings, reviews, and copy.    */
/* ------------------------------------------------------------------ */

const PHONE_DISPLAY = "(512) 808-3699";
const PHONE_HREF = "tel:+15128083699";
const EMAIL = "tijana.jones@exprealty.com";
const YOUTUBE_ID = "PWovhygLE4g";
const YOUTUBE_URL = `https://www.youtube.com/watch?v=${YOUTUBE_ID}`;
const YOUTUBE_THUMB = `https://img.youtube.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`;
const OFFICE = "9600 Great Hills Trail, Suite 150, Austin, TX 78759";

const SERVICE_AREAS = [
  "Austin",
  "Lakeway",
  "Round Rock",
  "Georgetown",
  "Liberty Hill",
  "Kyle",
  "Buda",
  "Manor",
  "Jonestown",
];

type Listing = {
  img: string;
  alt: string;
  pill: string;
  pillClass: string;
  price: string;
  priceSuffix?: string;
  specs: string;
  address: string;
  cta: string;
};

const SALE_LISTINGS: Listing[] = [
  {
    img: "/listing-lakeway.jpg",
    alt: "312 Bisset Ct, Lakeway",
    pill: "Luxury · For sale",
    pillClass: "pill-red",
    price: "$1,399,999",
    specs: "4 bd · 5 ba · 5,003 sqft",
    address: "312 Bisset Ct, Lakeway, TX 78738",
    cta: "Ask about this home",
  },
  {
    img: "/listing-libertyhill.jpg",
    alt: "113 Dycus Bnd, Liberty Hill",
    pill: "Price cut · For sale",
    pillClass: "pill-dark",
    price: "$449,900",
    specs: "4 bd · 3 ba · 2,380 sqft",
    address: "113 Dycus Bnd, Liberty Hill, TX",
    cta: "Ask about this home",
  },
  {
    img: "/listing-mesquite.jpg",
    alt: "3701 Mesquite Valley Rd, Austin",
    pill: "Versatile loft · For sale",
    pillClass: "pill-dark",
    price: "$365,000",
    specs: "3 bd · 3 ba · 2,115 sqft",
    address: "3701 Mesquite Valley Rd, Austin, TX",
    cta: "Ask about this home",
  },
];

const ZILLOW_PROFILE = "https://www.zillow.com/profile/tiusa551";

type Sold = { role: "Seller" | "Buyer"; address: string; city: string; specs: string; sold: string };

// Confirmed Texas closings pulled from Zillow. Add more here as they're provided;
// `role` drives the "Seller's agent" / "Buyer's agent" tag.
const SOLD_LISTINGS: Sold[] = [
  { role: "Seller", address: "3206 Wildcatter Dr", city: "Belton, TX", specs: "3 bd · 2 ba · 1,883 sqft", sold: "Sold Dec 2025" },
  { role: "Buyer", address: "1322 Yellow Rose", city: "Salado, TX", specs: "4 bd · 2 ba · 2,368 sqft", sold: "Sold May 2025" },
];

const RENT_LISTING: Listing = {
  img: "/listing-georgetown.jpg",
  alt: "103 Harness Ln, Georgetown",
  pill: "For rent · New",
  pillClass: "pill-green",
  price: "$2,350",
  priceSuffix: "/mo",
  specs: "2 bd · 2 ba · 1,792 sqft",
  address: "103 Harness Ln, Georgetown, TX",
  cta: "Schedule a tour",
};

const REVIEWS = [
  {
    quote:
      "Tijana went above and beyond for our family, just like she does for all her clients. She made buying our first home in a seller's market stress-free and helped us get the home we wanted.",
    name: "Bought a first home",
    meta: "Verified Zillow review · Austin, TX",
  },
  {
    quote:
      "What drew us to Tijana was how fast her previous listings sold — in a matter of three days we were under contract, and in less than a month we were closed.",
    name: "Sold a single-family home",
    meta: "Verified Zillow review · Austin, TX",
  },
  {
    quote:
      "I wish I could give this gem 10 stars… or 15… or 20!! Tijana is one in a million. She improvises and adapts to any situation that may arise, pivots, and then navigates through.",
    name: "Sold a single-family home",
    meta: "Verified Zillow review · Austin, TX",
  },
  {
    quote:
      "Tijana is simply on a different level. Calm under pressure, and exceptional in every detail. When it matters the most, she is the one you want.",
    name: "eXp Luxury client",
    meta: "Verified Zillow review · Austin, TX",
  },
];

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

function PhoneIcon({ size = 19, color = "#D8C08A", width = 2.4 }: { size?: number; color?: string; width?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function CheckIcon({ size = 22, color = "#16A34A", width = 2.6 }: { size?: number; color?: string; width?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
    </svg>
  );
}

function PlayIcon({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#fff" stroke="none">
      <path d="M8 5.14v13.72L19 12 8 5.14z" />
    </svg>
  );
}

function TrendingIcon({ color = "currentColor", size = 24, width = 2.4 }: { color?: string; size?: number; width?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 7 13.5 15.5 8.5 10.5 2 17" />
      <path d="M16 7h6v6" />
    </svg>
  );
}

function Logo({ size = 40, stroke = "#1C1613", width = 6 }: { size?: number; stroke?: string; width?: number }) {
  return (
    <svg width={size} height={size * 0.85} viewBox="0 0 100 80" fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="square" aria-hidden="true">
      <path d="M10 16 H52" />
      <path d="M31 16 V60" />
      <path d="M74 6 V56 C74 70 62 74 51 68" />
      <path d="M74 6 L58 16" />
    </svg>
  );
}

const WHY_CARDS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: "Sold in days, not months",
    body: "Sellers came to Tijana because of how fast her listings move — under contract in 3 days, closed in under a month.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
    title: "Answers at all hours",
    body: '"She always answered any texts or calls we had at all hours." When the right home appears, you won\'t wait until Monday.',
  },
  {
    icon: <TrendingIcon />,
    title: "A proven negotiator",
    body: "First-time buyers won homes in a seller's market. #1 production doesn't come from taking the first offer.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <path d="M9 22V12h6v10" />
      </svg>
    ),
    title: "A home, not just a sale",
    body: "Her team's goal isn't the closing table — it's a place you'll call home for a very long time. Very specific criteria? A 13-day timeline? Done, with days to spare.",
  },
];

const MEET_BULLETS = [
  { lead: "#1 eXp Realty agent in North Dakota", rest: " — a track record built on results, not promises." },
  { lead: "365+ homes and $102M+ closed", rest: " in 7+ years across every price point." },
  { lead: "Now with eXp Luxury in Austin, TX", rest: ", as a member of CK Residential Group." },
  { lead: "A committed, dedicated team", rest: " focused on finding you the right home — not just closing a deal." },
];

const EASE = "cubic-bezier(0.22,1,0.36,1)";

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [counts, setCounts] = useState({ homes: 365, vol: 102, yrs: 7, rev: 44 });

  // Animated stat counters (respects prefers-reduced-motion)
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const dur = 1800;
    const ease = (x: number) => 1 - Math.pow(1 - x, 3);
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const e = ease(p);
      setCounts({
        homes: Math.round(365 * e),
        vol: Math.round(102 * e),
        yrs: Math.round(7 * e),
        rev: Math.round(44 * e),
      });
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Header restyle + sticky CTA bar on scroll
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setShowSticky(y > 720);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when the viewport grows past the desktop breakpoint
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1080) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Scroll-reveal via IntersectionObserver, with a failsafe
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("reveal-in");
            io.unobserve(en.target);
          }
        }),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    const failsafe = window.setTimeout(() => els.forEach((el) => el.classList.add("reveal-in")), 5000);
    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  const headerStyle: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 90,
    transition: "background 220ms ease, box-shadow 220ms ease",
    background: scrolled ? "rgba(255,255,255,0.94)" : "transparent",
    backdropFilter: scrolled ? "blur(12px)" : "none",
    WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
    boxShadow: scrolled ? "0 1px 0 #ECE8DF, 0 8px 24px rgba(28,22,19,0.10)" : "none",
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div style={{ background: "#FFFFFF" }}>
      {/* ============ FIXED HEADER ============ */}
      <header style={headerStyle}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 76, display: "flex", alignItems: "center", gap: 24 }}>
          <a href="#top" style={{ display: "inline-flex", alignItems: "center", gap: 11, flexShrink: 0 }}>
            <Logo size={40} width={6} />
            <span style={{ display: "flex", flexDirection: "column", gap: 3, lineHeight: 1 }}>
              <b style={{ fontFamily: "var(--font-manrope)", fontWeight: 600, fontSize: "1rem", letterSpacing: "0.24em", color: "#1C1613", whiteSpace: "nowrap" }}>TIJANA JONES</b>
              <span style={{ fontFamily: "var(--font-manrope)", fontWeight: 600, fontSize: "0.58rem", letterSpacing: "0.42em", color: "#B49B67", whiteSpace: "nowrap" }}>REAL ESTATE</span>
            </span>
          </a>
          <nav className="nav-desktop" style={{ gap: 26, marginLeft: 16, flexWrap: "nowrap" }}>
            <a className="nav-link" href="#video">Meet Tijana</a>
            <a className="nav-link" href="#why">Why Tijana</a>
            <a className="nav-link" href="#listings">Listings</a>
            <a className="nav-link" href="#sold">Sold</a>
            <a className="nav-link" href="#reviews">Reviews</a>
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginLeft: "auto" }}>
            <a href={PHONE_HREF} data-m="callnum" style={{ display: "inline-flex", alignItems: "center", gap: 9, color: "#1C1613", whiteSpace: "nowrap" }}>
              <PhoneIcon />
              <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
                <small style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.75 }}>Call or text</small>
                <b className="ff-arch" style={{ fontSize: "0.92rem", fontWeight: 800 }}>{PHONE_DISPLAY}</b>
              </span>
            </a>
            <a href="#contact" className="btn btn-red btn-sm">Book a 10-min call</a>
            <button
              className="nav-burger"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={menuOpen}
              style={{ width: 44, height: 44, border: "1.5px solid #D6CDBD", borderRadius: 10, background: "rgba(255,255,255,0.9)", color: "#1C1613", cursor: "pointer", alignItems: "center", justifyContent: "center", padding: 0 }}
            >
              {menuOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round"><path d="M6 6 18 18" /><path d="M18 6 6 18" /></svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round"><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div style={{ background: "rgba(255,255,255,0.98)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderTop: "1px solid #ECE8DF", borderBottom: "1px solid #ECE8DF", boxShadow: "0 16px 40px rgba(28,22,19,0.14)", padding: "16px 24px 22px", display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              { href: "#video", label: "Meet Tijana" },
              { href: "#why", label: "Why Tijana" },
              { href: "#listings", label: "Listings" },
              { href: "#sold", label: "Sold" },
              { href: "#reviews", label: "Reviews" },
            ].map((l) => (
              <a key={l.href} href={l.href} onClick={closeMenu} className="ff-arch" style={{ fontWeight: 800, fontSize: "1.05rem", color: "#1C1613", padding: "12px 4px", borderBottom: "1px solid #ECE8DF" }}>
                {l.label}
              </a>
            ))}
            <a href={PHONE_HREF} onClick={closeMenu} className="ff-arch" style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 800, fontSize: "1.05rem", color: "#1C1613", padding: "14px 4px 6px" }}>
              <PhoneIcon size={18} color="#B49B67" />
              {PHONE_DISPLAY}
            </a>
            <a href="#contact" onClick={closeMenu} className="btn btn-red" style={{ marginTop: 10, padding: "15px 22px", fontSize: "1rem", borderRadius: 10 }}>Book a 10-min call</a>
          </div>
        )}
      </header>

      {/* ============ HERO ============ */}
      <section id="top" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", padding: "116px 0 72px", overflow: "hidden", background: "radial-gradient(1100px 600px at 82% 18%, rgba(214,188,138,0.28), transparent 60%), #FFFFFF" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(23,19,16,0.05) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
        <div data-m="hero" style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1.12fr 0.88fr", gap: 56, alignItems: "center", width: "100%" }}>
          <div style={{ color: "#1C1613", maxWidth: 640 }}>
            <div className="ff-arch" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 800, fontSize: "0.8125rem", letterSpacing: "0.05em", padding: "7px 14px", borderRadius: 999, textTransform: "uppercase", background: "#C8102E", color: "#fff", boxShadow: "0 6px 16px rgba(200,16,46,0.4)", marginBottom: 24, animation: `fadeUp 700ms ${EASE} 60ms backwards` }}>
              <span style={{ color: "#F3E3C3" }}>★</span> #1 eXp agent, North Dakota — now in Austin, TX
            </div>
            <h1 className="ff-arch" style={{ fontSize: "clamp(2.75rem,5.6vw,4.6rem)", fontWeight: 900, lineHeight: 0.99, letterSpacing: "-0.035em", color: "#1C1613", margin: "0 0 22px", textWrap: "balance", animation: `fadeUp 700ms ${EASE} 150ms backwards` }}>
              Find the home you&apos;ll never want to leave.
            </h1>
            <p style={{ fontSize: "clamp(1.125rem,1.6vw,1.3rem)", lineHeight: 1.5, fontWeight: 500, color: "#6B5F52", maxWidth: 540, margin: "0 0 30px", textWrap: "pretty", animation: `fadeUp 700ms ${EASE} 240ms backwards` }}>
              Buy, sell, or lease with Tijana Jones — luxury real estate in Austin backed by a team committed to more than the sale: finding the place you&apos;ll call home for years.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 44, animation: `fadeUp 700ms ${EASE} 330ms backwards` }}>
              <a href="#listings" className="btn btn-red btn-lg pulse-on-load">
                See current listings
                <ArrowIcon />
              </a>
              <a href="#contact" className="btn btn-ghost btn-lg">
                <CalendarIcon />
                Book a 10-minute call
              </a>
            </div>
            <div data-m="stats" style={{ display: "grid", gridTemplateColumns: "repeat(4,auto)", gap: 36, justifyContent: "start", animation: `fadeUp 700ms ${EASE} 420ms backwards` }}>
              <Stat value={`${counts.homes}+`} label="homes sold" />
              <Stat value={`$${counts.vol}M+`} label="in homes closed" color="#B49B67" />
              <Stat value={`${counts.yrs}+`} label="years in real estate" />
              <div>
                <div className="ff-arch" style={{ fontWeight: 900, fontSize: "2.1rem", letterSpacing: "-0.02em", color: "#1C1613", fontFeatureSettings: "'tnum'" }}>
                  5.0<span style={{ color: "#C6AC72", fontSize: "1.5rem" }}> ★</span>
                </div>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#948875" }}>{counts.rev} Zillow reviews</div>
              </div>
            </div>
          </div>
          <div data-m="portrait" style={{ position: "relative", justifySelf: "end", animation: `fadeUp 800ms ${EASE} 300ms backwards` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/tijana-portrait.jpg" alt="Tijana Jones, Austin realtor" style={{ display: "block", width: "min(420px,100%)", borderRadius: 20, boxShadow: "0 16px 40px rgba(28,22,19,0.20), 0 4px 10px rgba(28,22,19,0.10)", animation: `heroZoom 16s ${EASE} forwards` }} />
            <div data-m="badge-l" style={{ position: "absolute", top: 22, left: -34, background: "#fff", borderRadius: 14, padding: "12px 16px", boxShadow: "0 12px 32px rgba(28,22,19,0.24)", display: "flex", alignItems: "center", gap: 10, animation: "floaty 5s ease-in-out infinite" }}>
              <span style={{ color: "#C6AC72", fontSize: "1.05rem", letterSpacing: 1 }}>★★★★★</span>
              <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
                <b className="ff-arch" style={{ fontWeight: 900, fontSize: "0.95rem", color: "#1C1613" }}>Top Agent on Zillow</b>
                <small style={{ fontSize: "0.72rem", color: "#6B5F52", fontWeight: 600 }}>5.0 · 44 verified reviews</small>
              </span>
            </div>
            <div data-m="badge-r" style={{ position: "absolute", bottom: 26, right: -26, background: "#211B15", borderRadius: 14, padding: "12px 16px", boxShadow: "0 12px 32px rgba(28,22,19,0.4)", display: "flex", alignItems: "center", gap: 11, animation: "floaty 5s ease-in-out 1.4s infinite" }}>
              <TrendingIcon color="#D8C08A" />
              <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
                <b className="ff-arch" style={{ fontWeight: 900, fontSize: "0.95rem", color: "#fff" }}>$102M+ sold</b>
                <small style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.65)", fontWeight: 600 }}>365+ homes closed</small>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SERVICE-AREA MARQUEE ============ */}
      <div style={{ background: "#171310", overflow: "hidden", padding: "14px 0" }}>
        <div style={{ display: "flex", width: "max-content", animation: "marquee 26s linear infinite" }}>
          {[0, 1].map((dup) => (
            <div key={dup} aria-hidden={dup === 1} className="ff-arch" style={{ display: "flex", alignItems: "center", gap: 28, paddingRight: 28, fontWeight: 800, fontSize: "0.9rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#D8C08A", whiteSpace: "nowrap" }}>
              {SERVICE_AREAS.map((area) => (
                <span key={area} style={{ display: "inline-flex", alignItems: "center", gap: 28 }}>
                  <span>{area}</span>
                  <span style={{ opacity: 0.5 }}>✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ============ MEET TIJANA / VIDEO ============ */}
      <section id="video" className="section" style={{ background: "#FFFFFF" }}>
        <div data-reveal className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginBottom: 56 }}>
          <Logo size={150} width={4.5} />
          <div style={{ fontFamily: "var(--font-manrope)", fontWeight: 600, fontSize: "clamp(1.5rem,2.4vw,2rem)", letterSpacing: "0.3em", textIndent: "0.3em", color: "#1C1613", textAlign: "center", lineHeight: 1.2, whiteSpace: "nowrap" }}>TIJANA JONES</div>
          <div style={{ fontFamily: "var(--font-manrope)", fontWeight: 600, fontSize: "0.9rem", letterSpacing: "0.52em", textIndent: "0.52em", color: "#B49B67", textAlign: "center" }}>REAL ESTATE</div>
        </div>
        <div data-m="grid2" className="container" style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 56, alignItems: "center" }}>
          <div data-reveal style={{ position: "relative" }}>
            {/* Link-out until the self-hosted MP4 is provided, then swap to a native <video> player. */}
            <a href={YOUTUBE_URL} target="_blank" rel="noopener" className="video-card" style={{ position: "relative", display: "block", borderRadius: 20, overflow: "hidden", aspectRatio: "16/9", background: "#171310" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={YOUTUBE_THUMB} alt="Watch: Meet Tijana Jones on YouTube" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              <span style={{ position: "absolute", inset: 0, background: "rgba(23,19,16,0.22)" }} />
              <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 84, height: 84, borderRadius: "50%", background: "#C8102E", display: "grid", placeItems: "center", boxShadow: "0 8px 22px rgba(200,16,46,0.5)", animation: "pulseRing 2.6s ease-out 1s infinite" }}>
                <PlayIcon />
              </span>
            </a>
            <div className="ff-arch" style={{ position: "absolute", top: -14, left: 24, background: "#211B15", color: "#fff", fontWeight: 800, fontSize: "0.8125rem", letterSpacing: "0.06em", textTransform: "uppercase", padding: "7px 14px", borderRadius: 999, boxShadow: "0 6px 16px rgba(28,22,19,0.3)" }}>▶ Watch: her story in 2 minutes</div>
            <a href={YOUTUBE_URL} target="_blank" rel="noopener" className="btn btn-red btn-sm" style={{ marginTop: 16 }}>
              <PlayIcon size={18} />
              Watch on YouTube
            </a>
          </div>
          <div data-reveal>
            <div className="kicker">Meet Tijana</div>
            <h2 className="h2" style={{ margin: "0 0 16px" }}>From #1 in North Dakota to luxury real estate in Austin.</h2>
            <p style={{ color: "#6B5F52", fontSize: "1.0625rem", margin: "0 0 24px", textWrap: "pretty" }}>Seven years, 365+ closings, and one philosophy that never changed: your home matters more than her commission.</p>
            <ul style={{ listStyle: "none", margin: "0 0 28px", padding: 0, display: "flex", flexDirection: "column", gap: 14 }}>
              {MEET_BULLETS.map((b) => (
                <li key={b.lead} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ flexShrink: 0, marginTop: 3 }}><CheckIcon /></span>
                  <span><b style={{ color: "#1C1613" }}>{b.lead}</b>{b.rest}</span>
                </li>
              ))}
            </ul>
            <a href="#contact" className="btn btn-dark btn-md">Work with Tijana</a>
          </div>
        </div>
      </section>

      {/* ============ WHY TIJANA ============ */}
      <section id="why" className="section" style={{ background: "#FCFBF8" }}>
        <div className="container">
          <div data-reveal style={{ maxWidth: 720, margin: "0 auto 48px", textAlign: "center" }}>
            <div className="kicker">Why Tijana</div>
            <h2 className="h2" style={{ margin: "0 0 14px" }}>Any agent can list a house. Few can do this.</h2>
            <p className="lead">Straight from 44 five-star client reviews — perfect 5.0 in local knowledge, responsiveness, process expertise, and negotiation.</p>
          </div>
          <div data-m="grid4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
            {WHY_CARDS.map((c) => (
              <div key={c.title} data-reveal className="card card-lift" style={{ padding: "28px 24px" }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: "#FAF6EC", color: "#B49B67", display: "grid", placeItems: "center", marginBottom: 18 }}>{c.icon}</div>
                <h3 className="ff-arch" style={{ fontSize: "1.2rem", fontWeight: 800, letterSpacing: "-0.015em", color: "#1C1613", margin: "0 0 8px" }}>{c.title}</h3>
                <p style={{ color: "#6B5F52", fontSize: "0.9375rem", margin: 0 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ LISTINGS ============ */}
      <section id="listings" className="section" style={{ background: "#FFFFFF" }}>
        <div className="container">
          <div data-reveal style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap", marginBottom: 40 }}>
            <div style={{ maxWidth: 640 }}>
              <div className="kicker">Current listings</div>
              <h2 className="h2">For sale &amp; for rent right now.</h2>
            </div>
            <a href="#contact" className="btn btn-ghost btn-md">Get early access to new listings</a>
          </div>
          <div data-m="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginBottom: 24 }}>
            {SALE_LISTINGS.map((l) => (
              <ListingCard key={l.address} listing={l} mediaHeight={220} reveal />
            ))}
          </div>
          <div data-reveal data-m="gridrent" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24, alignItems: "stretch" }}>
            <ListingCard listing={RENT_LISTING} mediaHeight={180} />
            <div style={{ background: "linear-gradient(135deg, #211B15, #241C15)", borderRadius: 20, padding: 36, display: "flex", flexDirection: "column", justifyContent: "center", gap: 14, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(500px 260px at 90% 10%, rgba(217,164,65,0.24), transparent 65%)", pointerEvents: "none" }} />
              <h3 className="ff-arch" style={{ fontSize: "clamp(1.35rem,2vw,1.75rem)", fontWeight: 800, letterSpacing: "-0.015em", color: "#fff", margin: 0, position: "relative", textWrap: "balance" }}>Don&apos;t see your home here? The best ones move fast.</h3>
              <p style={{ color: "rgba(255,255,255,0.78)", margin: 0, position: "relative", maxWidth: 520 }}>Renting for now or buying for good — tell Tijana what you&apos;re looking for and hear about matching homes before they hit the market. Tenant representation included.</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", position: "relative", marginTop: 6 }}>
                <a href="#contact" className="btn btn-red btn-md">Tell me what you need</a>
                <a href={PHONE_HREF} className="btn btn-ghost-light btn-md">Call {PHONE_DISPLAY}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ RECENTLY SOLD ============ */}
      <section id="sold" className="section" style={{ background: "#FCFBF8" }}>
        <div className="container">
          <div data-reveal style={{ maxWidth: 760, margin: "0 auto 48px", textAlign: "center" }}>
            <div className="kicker">Track record</div>
            <h2 className="h2" style={{ margin: "0 0 14px" }}>Recently sold — for buyers and sellers alike.</h2>
            <p className="lead">A snapshot of recent Central Texas closings. Tijana works both sides of the deal — see her full history of 365+ homes on Zillow.</p>
          </div>
          <div data-m="grid4" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24, maxWidth: 720, margin: "0 auto" }}>
            {SOLD_LISTINGS.map((s) => (
              <SoldCard key={s.address} s={s} />
            ))}
          </div>
          <div data-reveal style={{ textAlign: "center", marginTop: 36 }}>
            <a href={ZILLOW_PROFILE} target="_blank" rel="noopener" className="btn btn-ghost btn-md">See all of Tijana&apos;s sold homes on Zillow ↗</a>
          </div>
        </div>
      </section>

      {/* ============ REVIEWS ============ */}
      <section id="reviews" className="section" style={{ background: "#FFFFFF" }}>
        <div className="container">
          <div data-reveal style={{ maxWidth: 760, margin: "0 auto 44px", textAlign: "center" }}>
            <div className="kicker">Client reviews</div>
            <h2 className="h2" style={{ margin: "0 0 14px" }}>44 five-star reviews on Zillow.</h2>
            <p className="lead" style={{ marginBottom: 20 }}>
              Read a few words from Tijana&apos;s clients below, or{" "}
              <a href={ZILLOW_PROFILE} target="_blank" rel="noopener" style={{ color: "#B49B67", textDecoration: "underline" }}>view all 44 verified Zillow reviews</a>.
            </p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "#fff", border: "1px solid #ECE8DF", borderRadius: 999, padding: "10px 20px", boxShadow: "0 1px 2px rgba(28,22,19,0.06)" }}>
              <span style={{ color: "#C6AC72", fontSize: "1.2rem", letterSpacing: 2 }}>★★★★★</span>
              <b className="ff-arch" style={{ fontWeight: 900, color: "#1C1613" }}>5.0 on Zillow</b>
              <span style={{ color: "#6B5F52", fontSize: "0.9375rem" }}>· 44 reviews · Top Agent badge</span>
            </div>
            <p style={{ fontSize: "0.8125rem", color: "#948875", margin: "14px 0 0" }}>Zillow rating as of July 2026. Testimonials are from Tijana&apos;s clients, republished from Zillow.</p>
          </div>
          <div data-m="grid4" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
            {REVIEWS.map((r) => (
              <div key={r.quote} data-reveal className="card" style={{ padding: 28, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
                  <span aria-hidden style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "2.6rem", lineHeight: 0.8, color: "#E4D6B6", fontWeight: 700 }}>&ldquo;</span>
                  <span style={{ color: "#C6AC72", letterSpacing: 2, fontSize: "1.05rem" }}>★★★★★</span>
                </div>
                <p style={{ color: "#3D332A", margin: "0 0 18px", textWrap: "pretty", flex: 1 }}>{r.quote}</p>
                <div style={{ width: 34, height: 3, background: "#D8C08A", borderRadius: 2, marginBottom: 14 }} />
                <div>
                  <b className="ff-arch" style={{ display: "block", color: "#1C1613", fontWeight: 800, fontSize: "1rem" }}>{r.name}</b>
                  <span style={{ fontSize: "0.85rem", color: "#6B5F52" }}>{r.meta}</span>
                </div>
              </div>
            ))}
          </div>
          <div data-reveal className="card" style={{ marginTop: 24, padding: "24px 28px", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <span style={{ width: 52, height: 52, borderRadius: "50%", background: "#FAF6EC", display: "grid", placeItems: "center", flexShrink: 0 }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="#B49B67" stroke="none"><path d="m12 2 2.9 6.2 6.8.8-5 4.6 1.3 6.7L12 17.8 5.9 20.9l1.3-6.7-5-4.6 6.8-.8L12 2z" /></svg>
            </span>
            <div style={{ flex: 1, minWidth: 240 }}>
              <div className="ff-arch" style={{ fontWeight: 800, fontSize: "1.15rem", letterSpacing: "-0.01em", color: "#1C1613", marginBottom: 4 }}>See all 44 verified reviews on Zillow</div>
              <div style={{ fontSize: "0.9375rem", color: "#6B5F52" }}>We&apos;re proud of the experiences her clients have had. See what dozens of Austin-area homeowners are saying on Zillow.</div>
            </div>
            <a href={ZILLOW_PROFILE} target="_blank" rel="noopener" className="btn btn-gold btn-md">View all reviews on Zillow ↗</a>
          </div>
        </div>
      </section>

      {/* ============ CONTACT / FINAL CTA ============ */}
      <section id="contact" className="section" style={{ background: "radial-gradient(900px 500px at 78% 20%, rgba(217,164,65,0.22), transparent 60%), linear-gradient(150deg, #171310, #211B15 70%, #241C15)" }}>
        <div data-m="grid2" className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
          <div data-reveal style={{ color: "#fff" }}>
            <div className="kicker kicker-gold">Ready when you are</div>
            <h2 className="ff-arch" style={{ fontSize: "clamp(1.9rem,3.4vw,2.9rem)", fontWeight: 900, lineHeight: 1.02, letterSpacing: "-0.025em", color: "#fff", margin: "0 0 18px", textWrap: "balance" }}>Ten minutes with Tijana beats ten weekends of open houses.</h2>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.0625rem", margin: "0 0 30px", maxWidth: 480, textWrap: "pretty" }}>Tell her what you&apos;re looking for. She&apos;ll tell you exactly what&apos;s possible — no pressure, no spam, no obligation.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <a href={PHONE_HREF} className="contact-link">
                <ContactTile><PhoneIcon size={20} width={2.2} /></ContactTile>
                <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.25 }}>
                  <small style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.65 }}>Call or text anytime</small>
                  <b className="ff-arch" style={{ fontWeight: 800, fontSize: "1.05rem" }}>{PHONE_DISPLAY}</b>
                </span>
              </a>
              <a href={`mailto:${EMAIL}`} className="contact-link">
                <ContactTile>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D8C08A" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 5L2 7" /></svg>
                </ContactTile>
                <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.25 }}>
                  <small style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.65 }}>Send an email</small>
                  <b className="ff-arch" style={{ fontWeight: 800, fontSize: "1.05rem" }}>{EMAIL}</b>
                </span>
              </a>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 14, color: "#fff" }}>
                <ContactTile>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D8C08A" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>
                </ContactTile>
                <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.25 }}>
                  <small style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.65 }}>Office</small>
                  <b className="ff-arch" style={{ fontWeight: 800, fontSize: "1.05rem" }}>{OFFICE}</b>
                </span>
              </div>
            </div>
          </div>
          <div data-reveal className="card" style={{ borderRadius: 20, padding: 36, boxShadow: "0 24px 60px rgba(0,0,0,0.35)", border: "none" }}>
            {!submitted ? (
              // NOTE: front-end only. Wire this to a CRM / email (Follow Up Boss,
              // HubSpot, or a serverless mailer) before launch.
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <h3 className="ff-arch" style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.015em", color: "#1C1613", margin: 0 }}>Book your 10-minute call</h3>
                <div data-m="formgrid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <Field label="Name" required>
                    <input required name="name" placeholder="Your name" className="field" />
                  </Field>
                  <Field label="Phone" required>
                    <input required name="phone" type="tel" placeholder="(512) 555-0100" className="field" />
                  </Field>
                </div>
                <Field label="Email">
                  <input name="email" type="email" placeholder="you@email.com" className="field" />
                </Field>
                <Field label="I'm ready to…">
                  <select name="intent" className="field" defaultValue="Buy a home">
                    <option>Buy a home</option>
                    <option>Sell my home</option>
                    <option>Rent / lease</option>
                    <option>Just exploring Austin</option>
                  </select>
                </Field>
                <Field label="Anything else?" optional>
                  <textarea name="notes" rows={3} placeholder="Budget, neighborhoods, timeline…" className="field" />
                </Field>
                <button type="submit" className="btn btn-red btn-lg" style={{ width: "100%" }}>Book my 10-minute call</button>
                <div style={{ fontSize: "0.8125rem", color: "#948875", textAlign: "center" }}>Tijana will reach out personally. No spam, ever.</div>
              </form>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 14, padding: "32px 8px" }}>
                <span style={{ width: 64, height: 64, borderRadius: "50%", background: "#e7f6ed", display: "grid", placeItems: "center" }}><CheckIcon size={32} /></span>
                <h3 className="ff-arch" style={{ fontSize: "1.4rem", fontWeight: 800, color: "#1C1613", margin: 0 }}>You&apos;re on the calendar 🎉</h3>
                <p style={{ color: "#6B5F52", margin: 0, maxWidth: 340 }}>Tijana will call you within one business day to lock in your 10 minutes. Want to move faster?</p>
                <a href={PHONE_HREF} className="btn btn-dark btn-md">Call her now — {PHONE_DISPLAY}</a>
                <button onClick={() => setSubmitted(false)} style={{ background: "none", border: 0, color: "#6B5F52", fontFamily: "var(--font-manrope)", fontSize: "0.875rem", cursor: "pointer", textDecoration: "underline" }}>Send another request</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer style={{ background: "#171310", color: "rgba(255,255,255,0.7)", padding: "56px 0 88px" }}>
        <div data-m="footgrid" className="container" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: 48 }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 11, marginBottom: 16 }}>
              <Logo size={44} stroke="#FFFFFF" width={6} />
              <span style={{ display: "flex", flexDirection: "column", gap: 3, lineHeight: 1 }}>
                <b style={{ fontFamily: "var(--font-manrope)", fontWeight: 600, fontSize: "1rem", letterSpacing: "0.24em", color: "#fff", whiteSpace: "nowrap" }}>TIJANA JONES</b>
                <span style={{ fontFamily: "var(--font-manrope)", fontWeight: 600, fontSize: "0.58rem", letterSpacing: "0.42em", color: "#D8C08A", whiteSpace: "nowrap" }}>REAL ESTATE</span>
              </span>
            </div>
            <p style={{ fontSize: "0.9375rem", margin: 0, maxWidth: 320, color: "rgba(255,255,255,0.6)" }}>eXp Realty · eXp Luxury · Member of CK Residential Group. Serving greater Austin, Texas.</p>
          </div>
          <div>
            <div className="ff-arch kicker kicker-gold" style={{ marginBottom: 16 }}>Service areas</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: "0.9375rem" }}>
              {SERVICE_AREAS.map((a) => (
                <span key={a}>{a}</span>
              ))}
            </div>
          </div>
          <div>
            <div className="ff-arch kicker kicker-gold" style={{ marginBottom: 16 }}>Contact</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: "0.9375rem" }}>
              <a href={PHONE_HREF} style={{ color: "rgba(255,255,255,0.8)" }}>{PHONE_DISPLAY}</a>
              <a href={`mailto:${EMAIL}`} style={{ color: "rgba(255,255,255,0.8)" }}>{EMAIL}</a>
              <span>9600 Great Hills Trail, Suite 150<br />Austin, TX 78759</span>
              <a href={YOUTUBE_URL} target="_blank" rel="noopener" style={{ color: "rgba(255,255,255,0.8)" }}>▶ Watch Tijana on YouTube</a>
            </div>
          </div>
        </div>
        <div className="container" style={{ marginTop: 36, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.1)", fontSize: "0.8125rem", color: "rgba(255,255,255,0.4)", display: "flex", flexDirection: "column", gap: 10 }}>
          <p style={{ margin: 0 }}>Demonstration website for presentation purposes only. Property listings, statistics, and client reviews shown are illustrative and may not reflect current data. Reviews are republished from Zillow and remain the property of their respective authors. This site is not affiliated with, endorsed by, or sponsored by Zillow®, eXp Realty®, or eXp Luxury — all trademarks are the property of their respective owners.</p>
          <p style={{ margin: 0 }}>© 2026 Tijana Jones · eXp Realty, LLC. All information deemed reliable but not guaranteed. Equal Housing Opportunity.</p>
        </div>
      </footer>

      {/* ============ DEMO NOTICE BADGE ============ */}
      {!showSticky && (
        <div aria-label="Demonstration site" style={{ position: "fixed", left: 14, bottom: 14, zIndex: 80, background: "rgba(23,19,16,0.9)", color: "#F3E3C3", fontFamily: "var(--font-archivo)", fontWeight: 800, fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "8px 14px", borderRadius: 999, boxShadow: "0 8px 22px rgba(0,0,0,0.25)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", pointerEvents: "none" }}>
          Demo · Illustrative content
        </div>
      )}

      {/* ============ STICKY CTA BAR ============ */}
      <div style={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 95, background: "rgba(255,255,255,0.94)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderTop: "1px solid #ECE8DF", boxShadow: "0 -8px 30px rgba(28,22,19,0.12)", transform: showSticky ? "translateY(0)" : "translateY(110%)", transition: `transform 420ms ${EASE}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "12px 24px", display: "flex", alignItems: "center", gap: 20 }}>
          <div data-m="stickycopy" style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
            <b className="ff-arch" style={{ fontWeight: 900, fontSize: "0.98rem", color: "#1C1613" }}>Ready to make a move in Austin?</b>
            <small style={{ fontSize: "0.78rem", color: "#6B5F52" }}>Tijana Jones · 365+ homes sold · 5.0 ★ on Zillow</small>
          </div>
          <div style={{ display: "flex", gap: 12, marginLeft: "auto" }}>
            <a href="#listings" className="btn btn-ghost btn-sm">See listings</a>
            <a href="#contact" className="btn btn-red btn-sm">Book a 10-min call</a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */

function Stat({ value, label, color = "#1C1613" }: { value: string; label: string; color?: string }) {
  return (
    <div>
      <div className="ff-arch" style={{ fontWeight: 900, fontSize: "2.1rem", letterSpacing: "-0.02em", color, fontFeatureSettings: "'tnum'" }}>{value}</div>
      <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#948875" }}>{label}</div>
    </div>
  );
}

function ContactTile({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,0.1)", display: "grid", placeItems: "center", flexShrink: 0 }}>{children}</span>
  );
}

function Field({ label, required, optional, children }: { label: string; required?: boolean; optional?: boolean; children: React.ReactNode }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#3D332A" }}>
        {label} {required && <span style={{ color: "#B49B67" }}>*</span>}
        {optional && <span style={{ color: "#948875", fontWeight: 500 }}>(optional)</span>}
      </span>
      {children}
    </label>
  );
}

function SoldCard({ s }: { s: Sold }) {
  const isSeller = s.role === "Seller";
  return (
    <div data-reveal className="card card-lift" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ position: "relative", height: 172, background: "linear-gradient(135deg, #211B15, #241C15)", display: "grid", placeItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(420px 200px at 80% 12%, rgba(217,164,65,0.28), transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <Logo size={62} stroke="#D8C08A" width={5} />
          <span className="ff-arch" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.28em", textIndent: "0.28em" }}>SOLD</span>
        </div>
        <span className="pill" style={isSeller ? { background: "#C8102E", boxShadow: "0 6px 16px rgba(200,16,46,0.4)" } : { background: "#D8C08A", color: "#1C1613" }}>{isSeller ? "Seller's agent" : "Buyer's agent"}</span>
      </div>
      <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
        <div className="ff-arch" style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#B49B67" }}>{s.sold}</div>
        <div className="ff-arch" style={{ fontSize: "1.15rem", fontWeight: 900, letterSpacing: "-0.01em", color: "#1C1613" }}>{s.address}</div>
        <div style={{ fontSize: "0.9375rem", color: "#6B5F52" }}>{s.city}</div>
        <div style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#3D332A", marginTop: 2 }}>{s.specs}</div>
      </div>
    </div>
  );
}

function ListingCard({ listing, mediaHeight, reveal }: { listing: Listing; mediaHeight: number; reveal?: boolean }) {
  return (
    <div {...(reveal ? { "data-reveal": true } : {})} className="card card-lift" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ position: "relative", height: mediaHeight }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={listing.img} alt={listing.alt} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <span className={`pill ${listing.pillClass}`}>{listing.pill}</span>
      </div>
      <div style={{ padding: "22px 22px 20px", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        <div className="ff-arch" style={{ fontWeight: 900, fontSize: "1.5rem", letterSpacing: "-0.02em", color: "#1C1613", fontFeatureSettings: "'tnum'" }}>
          {listing.price}
          {listing.priceSuffix && <span style={{ fontSize: "1rem", fontWeight: 700, color: "#6B5F52" }}>{listing.priceSuffix}</span>}
        </div>
        <div style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#3D332A" }}>{listing.specs}</div>
        <div style={{ fontSize: "0.9375rem", color: "#6B5F52" }}>{listing.address}</div>
        <a href="#contact" className="btn btn-dark btn-sm" style={{ marginTop: 12 }}>{listing.cta}</a>
      </div>
    </div>
  );
}
