const teamMembers = [
  { initials: "AS", role: "Team Lead", name: "Anuja Silva", color: "bg-brand" },
  {
    initials: "NM",
    role: "Front-End",
    name: "Nipuna Madhuranga",
    color: "bg-tomato",
  },
  {
    initials: "TP",
    role: "Data Base",
    name: "Thushaniga Paramanathan",
    color: "bg-mango text-brand-dark",
  },
];

function TeamSection() {
  return (
    <section
      id="team-members"
      className="scroll-mt-17 mx-auto mt-16 w-[min(1100px,92%)] rounded-3xl border border-line bg-tint px-5 py-10 sm:px-8 md:py-14"
    >
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-sm font-bold tracking-wide text-brand shadow-sm">
          OUR TEAM · GROUP 06
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-dark md:text-4xl">
          The People Behind ShareBite
        </h2>
        <p className="mt-3 text-muted">
          Working together to make food sharing simple and reduce food waste.
        </p>
      </div>

      <ol className="mx-auto mt-9 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map(({ initials, role, name, color }) => (
          <li
            key={name}
            className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <span
              className={`grid size-14 shrink-0 place-items-center rounded-2xl text-lg font-bold text-white ${color}`}
            >
              {initials}
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted">
                {role}
              </p>
              <h3 className="mt-1 text-lg font-bold text-brand-dark">{name}</h3>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default TeamSection;
