import TeamSection from "./TeamSection.jsx";

const steps = [
  {
    title: "Post it",
    description:
      "A bakery, hotel or family adds the extra food, the amount and the pickup time.",
  },
  {
    title: "Claim it",
    description:
      "People and charities nearby see the post and claim what they need.",
  },
  {
    title: "Pick it up",
    description:
      "They collect the food before the time ends. Nothing goes to waste.",
  },
];

function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-17 py-15 md:py-21">
      <div className="mx-auto w-[min(1100px,92%)]">
        <h2 className="text-3xl font-bold tracking-tight text-brand-dark md:text-4xl">
          How it works
        </h2>
        <p className="mt-3 max-w-[36em] text-muted">
          Three simple steps from extra food to a full plate.
        </p>
        <ol className="mt-11 grid gap-7 md:grid-cols-3 md:gap-9">
          {steps.map(({ title, description }, index) => (
            <li key={title}>
              <span className="mb-4 grid size-11 place-items-center rounded-full bg-tomato text-lg font-bold text-white">
                {index + 1}
              </span>
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="mt-2 text-muted">{description}</p>
            </li>
          ))}
        </ol>
      </div>
      <TeamSection />
    </section>
  );
}

export default HowItWorks;
