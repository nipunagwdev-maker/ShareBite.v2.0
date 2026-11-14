// =====================================================
// SiteHeader.jsx
// The top navigation bar shown on every page.
// It has: logo, page links, AI Assistant button,
// and (only when logged in) the round account button.
// =====================================================

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../lib/useAuth.js"; // tells us who is logged in
import { supabase } from "../lib/supabaseClient.js"; // used for logging out

// ---------- 1. NAVIGATION LINKS ----------
// Each item becomes one link in the navbar.
// The "Login" link is hidden automatically when a user is logged in.
const navigationLinks = [
  { label: "Home", to: "/" },
  { label: "Available Food", to: "/food" },
  { label: "Posts", to: "/posts" },
  { label: "Login", to: "/loginpage" },
  { label: "Contact", to: "/contact" },
];

// ---------- 2. SHARED STYLES ----------
// Style for normal text links in the navbar
const linkStyle =
  "block rounded-lg px-2 py-3.5 font-medium text-muted transition-colors hover:bg-tint hover:text-brand md:rounded-full md:px-3.5 md:py-2";

// Style for the red "AI Assistant" button
const aiButtonStyle =
  "cursor-pointer rounded-full bg-tomato px-5 py-2 text-sm font-bold text-white transition hover:bg-tomato-dark active:scale-95";

// ---------- 3. BOTPRESS CHATBOT LOADER ----------
// These are the two scripts the chatbot needs.
// The first one must load before the second one.
const BOTPRESS_SCRIPTS = [
  "https://cdn.botpress.cloud/webchat/v5.0/inject.js",
  "https://files.bpcontent.cloud/2026/10/22/16/20261022164713-9LA7PMBN.js",
];

// Adds one <script> tag to the page and waits until it finishes loading
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

// Loads both chatbot scripts, one after the other
function loadBotpress() {
  if (!botpressPromise) {
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

// Opens the chat window (runs when "AI Assistant" is clicked)
function openChat() {
  // NOTE: confirm this command for Botpress v5.0
  if (window.botpress?.open) {
    window.botpress.open();
  } else {
    console.warn("Botpress is not ready yet. Try again in a moment.");
  }
}

// ---------- 4. ACCOUNT BUTTON (only shown when logged in) ----------

// Makes initials from the user's name. "Nipuna Madhuranga" -> "NM"
// If there is no name, it uses the email instead.
function getInitials(user) {
  const name = user.user_metadata?.full_name || user.email || "?";
  return name
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

// The round button on the right side of the header.
// Click it to open a small menu with name, email and Log out.
function AccountBadge({ user, onLogout }) {
  // "open" remembers if the small menu is showing or hidden
  const [open, setOpen] = useState(false);

  // Google profile photo (only exists if the user signed in with Google)
  const photo = user.user_metadata?.avatar_url;
  const fullName = user.user_metadata?.full_name;

  return (
    <div className="relative mt-2 flex justify-end md:mt-0 md:ml-2">
      {/* The round button: shows the photo, or the initials */}
      <button
        type="button"
        aria-label="Account menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex size-9 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-brand text-sm font-bold text-white transition hover:bg-brand-dark active:scale-95"
      >
        {photo ? (
          <img src={photo} alt="" className="size-full object-cover" />
        ) : (
          getInitials(user)
        )}
      </button>

      {/* The small dropdown menu (only when open is true) */}
      {open && (
        <div className="absolute top-full right-0 z-50 mt-2 w-60 rounded-xl border border-line bg-white p-3 shadow-lg">
          {fullName && (
            <p className="truncate text-sm font-bold text-brand-dark">
              {fullName}
            </p>
          )}
          <p className="truncate text-xs text-muted">{user.email}</p>

          <button
            type="button"
            onClick={onLogout}
            className="mt-3 w-full cursor-pointer rounded-full border-2 border-line py-2 text-sm font-bold text-brand transition hover:border-brand"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

// ---------- 5. THE HEADER COMPONENT ----------
// foodPage = true  -> simple header used on the /food page
// foodPage = false -> the full navigation header (all other pages)
function SiteHeader({ foodPage = false }) {
  // Is the mobile menu (hamburger) open?
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Has the page been scrolled down? (adds a shadow under the header)
  const [isScrolled, setIsScrolled] = useState(false);

  // The logged-in user. It is null when nobody is logged in.
  // IMPORTANT: hooks like this must stay above the "if (foodPage)" line.
  const { user } = useAuth();

  // Logs the user out and closes the mobile menu
  async function handleLogout() {
    await supabase.auth.signOut();
    setIsMenuOpen(false);
  }

  // Watches page scrolling to turn the header shadow on and off
  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 10);

    window.addEventListener("scroll", updateScrollState);
    updateScrollState();

    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  // Loads the chatbot scripts once when the header first appears
  useEffect(() => {
    loadBotpress();
  }, []);

  // ----- 5a. SIMPLE HEADER (used on the /food page) -----
  if (foodPage) {
    return (
      <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          {/* Logo */}
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

  // ----- 5b. FULL HEADER (all other pages) -----
  return (
    <header
      data-scrolled={isScrolled}
      className="sticky top-0 z-50 h-17 border-b border-transparent bg-white/95 backdrop-blur-sm transition data-[scrolled=true]:border-line data-[scrolled=true]:shadow-md"
    >
      <div className="mx-auto flex h-full w-[min(1100px,92%)] items-center justify-between">
        {/* Logo (left side) */}
        <Link to="/" className="text-2xl font-bold tracking-tight text-brand">
          Share<span className="text-tomato">Bite</span>
        </Link>

        {/* Hamburger button (only visible on mobile) */}
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

        {/* Navigation area: links + AI button + account button */}
        <nav
          className={`${isMenuOpen ? "block" : "hidden"} absolute inset-x-0 top-17 border-b border-line bg-white px-[4%] py-2 md:static md:flex md:items-center md:gap-1.5 md:border-0 md:bg-transparent md:p-0`}
        >
          {/* Page links. The "Login" link is removed when logged in. */}
          {navigationLinks
            .filter((link) => !(user && link.to === "/loginpage"))
            .map(({ label, to, href }) =>
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

          {/* Red AI Assistant button */}
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

          {/* Round account button: far right, only when logged in */}
          {user && <AccountBadge user={user} onLogout={handleLogout} />}
        </nav>
      </div>
    </header>
  );
}

export default SiteHeader;
