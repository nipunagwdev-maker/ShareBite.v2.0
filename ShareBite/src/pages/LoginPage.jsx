import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import { supabase } from "../lib/supabaseClient.js";

const inputStyle =
  "w-full rounded-xl border-2 border-line bg-white px-4 py-3 transition focus:border-brand focus:outline-none";

const roleOptions = [
  {
    value: "user",
    title: "I want food",
    text: "Browse and request food near you.",
  },
  {
    value: "restaurant",
    title: "I have food to share",
    text: "Post surplus food and manage your posts.",
  },
];

function LoginPage() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login"); // "login" or "signup"
  const [role, setRole] = useState("user");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const isSignup = mode === "signup";

  function switchMode(newMode) {
    setMode(newMode);
    setErrorMessage("");
    setInfoMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    setInfoMessage("");
    setLoading(true);

    if (isSignup) {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { full_name: fullName.trim(), phone: phone.trim(), role },
        },
      });

      if (error) {
        setErrorMessage(error.message);
      } else if (!data.session) {
        // Happens when "Confirm email" is turned on in Supabase
        setInfoMessage(
          "Account created. Check your email to confirm it, then log in.",
        );
      } else {
        navigate("/food");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        navigate("/food");
      }
    }

    setLoading(false);
  }

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-ink">
      <SiteHeader />
      <main className="flex flex-1 items-center bg-tint px-6 py-16">
        <div className="mx-auto w-full max-w-md">
          <h1 className="text-center text-4xl font-bold tracking-tight text-brand-dark">
            {isSignup ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-3 text-center text-muted">
            {isSignup
              ? "Join ShareBite to share and claim food."
              : "Log in to share and claim food."}
          </p>

          {/* Log in / Sign up toggle */}
          <div className="mt-8 grid grid-cols-2 rounded-full bg-white p-1 ring-1 ring-line">
            <button
              type="button"
              onClick={() => switchMode("login")}
              className={`rounded-full py-2 font-bold transition ${
                !isSignup ? "bg-brand text-white" : "text-brand"
              }`}
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => switchMode("signup")}
              className={`rounded-full py-2 font-bold transition ${
                isSignup ? "bg-brand text-white" : "text-brand"
              }`}
            >
              Sign up
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-5 rounded-3xl bg-white p-6 shadow-xl shadow-brand/10 ring-1 ring-line sm:p-8"
          >
            {/* Role buttons: only when signing up */}
            {isSignup && (
              <div>
                <p className="mb-2 font-bold">I am joining as</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {roleOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={role === option.value}
                      onClick={() => setRole(option.value)}
                      className={`rounded-xl border-2 p-4 text-left transition ${
                        role === option.value
                          ? "border-brand bg-tint"
                          : "border-line hover:border-brand"
                      }`}
                    >
                      <span className="block font-bold text-brand-dark">
                        {option.title}
                      </span>
                      <span className="mt-1 block text-sm text-muted">
                        {option.text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isSignup && (
              <>
                <div>
                  <label htmlFor="fullName" className="mb-2 block font-bold">
                    {role === "restaurant"
                      ? "Restaurant / your name"
                      : "Full name"}
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="mb-2 block font-bold">
                    Phone (optional)
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputStyle}
                  />
                </div>
              </>
            )}

            <div>
              <label htmlFor="email" className="mb-2 block font-bold">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="youremail@yahoo.com"
                className={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block font-bold">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={
                  isSignup
                    ? "At least 6 characters"
                    : "Enter your password here"
                }
                className={inputStyle}
              />
            </div>

            {errorMessage && (
              <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
                {errorMessage}
              </p>
            )}
            {infoMessage && (
              <p className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">
                {infoMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={
                loading ||
                !email.trim() ||
                !password ||
                (isSignup && !fullName.trim())
              }
              className="w-full rounded-full bg-tomato px-7 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-tomato-dark disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {loading
                ? "Please wait..."
                : isSignup
                  ? "Create account"
                  : "Log in"}
            </button>
          </form>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

export default LoginPage;
