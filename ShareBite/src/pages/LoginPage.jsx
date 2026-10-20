import { useState } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";

const inputStyle =
  "w-full rounded-xl border-2 border-line bg-white px-4 py-3 transition focus:border-brand focus:outline-none";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    // Demo only: real login needs a backend (for example Firebase Auth)
    console.log("Login attempt:", email);
  }

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-ink">
      <SiteHeader />
      <main className="flex flex-1 items-center bg-tint px-6 py-16">
        <div className="mx-auto w-full max-w-md">
          <h1 className="text-center text-4xl font-bold tracking-tight text-brand-dark">
            Welcome back
          </h1>
          <p className="mt-3 text-center text-muted">
            Log in to share and claim food.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5 rounded-3xl bg-white p-6 shadow-xl shadow-brand/10 ring-1 ring-line sm:p-8"
          >
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
                placeholder="Enter your password  here"
                className={inputStyle}
              />
            </div>

              <button
              type="submit"
              disabled={!email.trim() || !password}
              className="w-full rounded-full bg-tomato px-7 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-tomato-dark disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            >
              Log in
            </button>
          </form>

          <p className="mt-6 text-center text-muted">
            New here?{" "}
            <Link to="/posts" className="font-bold text-brand">
              Start by sharing food
            </Link>
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

export default LoginPage;
