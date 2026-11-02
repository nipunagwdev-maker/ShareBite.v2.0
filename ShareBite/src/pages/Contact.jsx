import { useState } from "react";
import SiteFooter from "../components/SiteFooter.jsx";
import SiteHeader from "../components/SiteHeader.jsx";

const contactDetails = [
  {
    label: "Email us",
    value: "flupy.team@gmail.com",
    href: "mailto:flupy.team@gmail.com",
    icon: "✉️",
    description: "Send us your questions or suggestions.",
  },
  {
    label: "Call us",
    value: "+94 76 117 8865",
    href: "tel:+94761178865",
    icon: "📞",
    description: "We're happy to hear from you.",
  },
  {
    label: "Find us",
    value: "Galle, Sri Lanka",
    icon: "📍",
    description: "Connecting communities across Sri Lanka.",
  },
];

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent(form.subject);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    );

    window.location.href = `mailto:flupy.team@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-ink">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-tint px-6 py-20 text-center md:py-28">
          <div className="relative mx-auto max-w-3xl">
            <span className="inline-block rounded-full bg-white px-4 py-2 text-sm font-bold text-tomato shadow-sm">
              We'd love to hear from you
            </span>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-brand-dark sm:text-5xl md:text-6xl">
              Let's start a <span className="text-tomato">conversation.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Have a question, an idea, or want to support our mission? Get in
              touch with the ShareBite team. Every conversation brings us closer
              to reducing food waste.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <div className="grid gap-6 sm:grid-cols-3">
            {contactDetails.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-line bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/10"
              >
                <div className="flex size-14 items-center justify-center rounded-2xl bg-tint text-2xl">
                  {item.icon}
                </div>

                <h3 className="mt-5 text-lg font-bold text-brand-dark">
                  {item.label}
                </h3>

                {item.href ? (
                  <a
                    href={item.href}
                    className="mt-2 block break-words font-bold text-brand transition hover:text-tomato"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-2 font-bold text-brand-dark">{item.value}</p>
                )}

                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="bg-tint px-6 py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
            <div>
              <span className="text-sm font-bold uppercase tracking-widest text-tomato">
                Get in touch
              </span>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-dark sm:text-4xl">
                Send us a message
              </h2>

              <p className="mt-5 max-w-md leading-relaxed text-muted">
                Whether you're looking to donate food, volunteer, partner with
                us, or simply learn more about ShareBite, drop us a message.
              </p>

              <div className="mt-8 rounded-2xl border border-line bg-white p-5">
                <p className="font-bold text-brand-dark">
                  Together, we can make a difference.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  A little food shared can make a big difference in someone's
                  life. Thank you for being part of our mission.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-3xl bg-white p-6 shadow-xl shadow-brand/10 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-brand-dark"
                  >
                    Your name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-brand-dark"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-semibold text-brand-dark"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10"
                />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-brand-dark"
                >
                  Your message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="w-full resize-none rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10"
                />
              </div>

              <button
                type="submit"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-tomato px-6 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-tomato-dark active:scale-95"
              >
                Send message <span>→</span>
              </button>

              <p className="mt-4 text-center text-xs text-muted">
                Your default email application will open to send your message.
              </p>
            </form>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

export default Contact;
