import SiteFooter from "../components/SiteFooter.jsx";
import SiteHeader from "../components/SiteHeader.jsx";

const contactDetails = [
  {
    label: "Email",
    value: "flupy.team@gmial.com", // EDIT: your real email
    href: "mailto:flupy.team@gmail.com", // EDIT: same email again
  },
  {
    label: "Phone",
    value: "+94 76 117  8865", // EDIT: how the number is shown
    href: "tel:+94761178865", // EDIT: same number, no spaces
  },
  {
    label: "Location",
    value: "Galle, Sri Lanka", // EDIT: your city or area
  },
];

function Contact() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-ink">
      <SiteHeader />

      <main className="flex-1">
        <section className="mx-auto max-w-2xl px-6 pt-14 text-center md:pt-20">
          <h1 className="text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
            Contact us
          </h1>
          <p className="mt-4 text-lg text-muted">
            Have a question or want to help? We would love to hear from you.
          </p>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {contactDetails.map(({ label, value, href }) => (
              <div
                key={label}
                className="rounded-3xl bg-white p-6 shadow-xl shadow-brand/10 ring-1 ring-line"
              >
                <p className="text-sm font-bold tracking-wide text-tomato uppercase">
                  {label}
                </p>
                {href ? (
                  <a
                    href={href}
                    className="mt-2 block break-words text-lg font-bold text-brand-dark transition hover:text-brand"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="mt-2 text-lg font-bold text-brand-dark">
                    {value}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

export default Contact;
