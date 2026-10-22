import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const navigationLinks = [
  { label: "Home", to: "/" },
  { label: "Available Food", to: "/food" },
  { label: "Posts", to: "/posts" },
  { label: "Login", to: "/LoginPage" },
  { label: "Contact", to: "/Contact" },
];

const linkStyle =
  "block rounded-lg px-2 py-3.5 font-medium text-muted transition-colors hover:bg-tint hover:text-brand md:rounded-full md:px-3.5 md:py-2";

function SiteHeader({ foodPage = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 10);

    window.addEventListener("scroll", updateScrollState);
    updateScrollState();

    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  // ShareBite AI button click handler.
  // TODO: Connect this to the backend later.
  // Ideas: open a chat panel, or navigate("/ai") using useNavigate().
  const handleAiClick = () => {
    setIsMenuOpen(false); // close the mobile menu first
    console.log("ShareBite AI clicked - backend not connected yet");
  };

  if (foodPage) {
    return (
      <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="text-2xl font-bold tracking-tight text-brand">
            Share<span className="text-tomato">Bite</span>
          </Link>
          <a
            href="#food-list"
            className="rounded-full bg-brand px-5 py-2 text-sm font-bold text-white transition hover:bg-brand-dark active:scale-95"
          >
            Claim your food now
          </a>
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

        {/* Hamburger button (mobile only) */}
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

        {/* md:items-center keeps all links and the AI button on the same line */}
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

          {/* ===== ShareBite AI button =====
              - Stands out from normal links with a green-to-tomato gradient.
              - md:ml-2 adds a small gap between Contact and this button.
              - On mobile it is full width (w-full); on desktop it fits its text (md:w-auto).
              - The sparkle icon is the usual "AI" symbol.
              - Later: replace handleAiClick with real logic. */}
          <button
            type="button"
            onClick={handleAiClick}
            className="my-2 flex w-full items-center justify-center gap-1.5 rounded-full bg-linear-to-r from-brand to-tomato px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:shadow-md hover:brightness-110 active:scale-95 md:my-0 md:ml-2 md:w-auto"
          >
            {/* Sparkle icon (inline SVG, no extra library needed) */}
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2zm7 11l.9 2.6L22.5 16.5l-2.6.9L19 20l-.9-2.6-2.6-.9 2.6-.9L19 13z" />
            </svg>
            ShareBite AI
          </button>
        </nav>
      </div>
    </header>
  );
}

export default SiteHeader;
