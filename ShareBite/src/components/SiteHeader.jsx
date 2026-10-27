import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const navigationLinks = [
  { label: "Home", to: "/" },
  { label: "Available Food", to: "/food" },
  { label: "Posts", to: "/posts" },
  { label: "Login", to: "/loginpage" },
  { label: "Contact", to: "/contact" },
];

const linkStyle =
  "block rounded-lg px-2 py-3.5 font-medium text-muted transition-colors hover:bg-tint hover:text-brand md:rounded-full md:px-3.5 md:py-2";

const aiButtonStyle =
  "cursor-pointer rounded-full bg-tomato px-5 py-2 text-sm font-bold text-white transition hover:bg-tomato-dark active:scale-95";

// ---- Botpress loader ----
const BOTPRESS_SCRIPTS = [
  "https://cdn.botpress.cloud/webchat/v5.0/inject.js",
  "https://files.bpcontent.cloud/2026/10/22/16/20261022164713-9LA7PMBN.js",
];

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

// Saved outside the component, so the scripts load only ONE time,
// even though SiteHeader is created again on every page.
let botpressPromise = null;

function loadBotpress() {
  if (!botpressPromise) {
    // Load one after the other: inject.js first, then your bot config
    botpressPromise = BOTPRESS_SCRIPTS.reduce(
      (previous, src) => previous.then(() => loadScript(src)),
      Promise.resolve(),
    ).catch((error) => {
      botpressPromise = null; // allow a retry if loading failed
      console.error("Botpress failed to load:", error);
    });
  }
  return botpressPromise;
}

function openChat() {
  // NOTE: confirm this command for Botpress v5.0 (see "Verify" below)
  if (window.botpress?.open) {
    window.botpress.open();
  } else {
    console.warn("Botpress is not ready yet. Try again in a moment.");
  }
}
// -------------------------

function SiteHeader({ foodPage = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 10);

    window.addEventListener("scroll", updateScrollState);
    updateScrollState();

    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    loadBotpress();
  }, []);

  if (foodPage) {
    return (
      <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="text-2xl font-bold tracking-tight text-brand">
            Share<span className="text-tomato">Bite</span>
          </Link>
          <div className="flex items-center gap-2">
            <button type="button" onClick={openChat} className={aiButtonStyle}>
              AI Assistant
            </button>
            <a
              href="#food-list"
              className="rounded-full bg-brand px-5 py-2 text-sm font-bold text-white transition hover:bg-brand-dark active:scale-95"
            >
              Claim your food now
            </a>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      data-scrolled={isScrolled}
      className="sticky top-0 z-50 h-17 border-b border-transparent bg-white/95 backdrop-blur-sm transition data-[scrolled=true]:border-line data-[scrolled=true]:shadow-md"
    >
      <div className="mx-auto flex h-full w-[min(1100px,92%)] items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-tight text-brand">
          Share<span className="text-tomato">Bite</span>
        </Link>

        <button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="group cursor-pointer p-2 md:hidden"
        >
          <span className="my-1.25 block h-0.5 w-6 bg-brand transition group-aria-expanded:translate-y-1.75 group-aria-expanded:rotate-45" />
          <span className="my-1.25 block h-0.5 w-6 bg-brand transition group-aria-expanded:opacity-0" />
          <span className="my-1.25 block h-0.5 w-6 bg-brand transition group-aria-expanded:-translate-y-1.75 group-aria-expanded:-rotate-45" />
        </button>

        <nav
          className={`${isMenuOpen ? "block" : "hidden"} absolute inset-x-0 top-17 border-b border-line bg-white px-[4%] py-2 md:static md:flex md:items-center md:gap-1.5 md:border-0 md:bg-transparent md:p-0`}
        >
          {navigationLinks.map(({ label, to, href }) =>
            to ? (
              <Link
                key={label}
                to={to}
                onClick={() => setIsMenuOpen(false)}
                className={linkStyle}
              >
                {label}
              </Link>
            ) : (
              <a
                key={label}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className={linkStyle}
              >
                {label}
              </a>
            ),
          )}

          <button
            type="button"
            onClick={() => {
              openChat();
              setIsMenuOpen(false);
            }}
            className={`${aiButtonStyle} mt-2 w-full md:ml-2 md:mt-0 md:w-auto`}
          >
            AI Assistant
          </button>
        </nav>
      </div>
    </header>
  );
}

export default SiteHeader;
