function HomeHero() {
  return (
    <section
      id="home"
      className="scroll-mt-17 overflow-hidden pt-10 pb-15 md:pt-18 md:pb-22"
    >
      <div className="mx-auto grid w-[min(1100px,92%)] items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h1 className="text-4xl leading-tight font-bold tracking-tight text-brand-dark sm:text-5xl lg:text-6xl">
            Good food should be eaten, not thrown away.
          </h1>
          <p className="mt-5 max-w-[30em] text-lg text-muted">
            ShareBite connects shops, homes and events that have extra food with
            people and charities who need it. Fast, free and close to you.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#how"
              className="inline-block rounded-full bg-tomato px-6.5 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-tomato-dark"
            >
              See how it works
            </a>
            <a
              href="#team-members"
              className="inline-block rounded-full border-2 border-brand px-6.5 py-3 font-bold text-brand transition hover:-translate-y-0.5 hover:bg-brand hover:text-white"
            >
              Meet our team
            </a>
          </div>
        </div>

        <div
          className="relative flex justify-center p-5"
          aria-hidden="true"
        >
          <div className="relative z-10 w-full max-w-85 animate-float rounded-[20px] border border-line bg-white p-6.5 shadow-2xl shadow-brand/15">
            <div className="flex items-center gap-2 text-sm font-bold text-brand">
              <span className="size-2.5 rounded-full bg-emerald-500" />
              Available now
            </div>
            <h2 className="mt-3.5 text-[1.6rem] leading-tight font-bold text-ink">
              20 fresh buns
            </h2>
            <p className="mt-1 text-muted">City Bakery, Main Street</p>
            <div className="mt-4.5 flex items-center justify-between text-sm text-muted">
              <span>Pick up before 8:00 PM</span>
              <span className="rounded-full bg-amber-100 px-3 py-0.5 font-bold text-amber-800">
                Free
              </span>
            </div>
            <div className="mt-5 rounded-full bg-brand p-3 text-center font-bold text-white">
              Claim this food
            </div>
          </div>
          <div className="absolute -top-2.5 right-0 size-65 rounded-full bg-mango opacity-35" />
          <div className="absolute -bottom-2.5 left-2.5 size-45 rounded-full bg-tomato opacity-18" />
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
