function SiteFooter({ foodPage = false }) {
  if (foodPage) {
    return (
      <footer className="bg-brand-dark py-6 text-center text-white/75">
        &copy; ShareBite. Share extra, waste less.
      </footer>
    );
  }

  return (
    <footer className="bg-brand-dark py-7 text-white/75">
      <div className="mx-auto flex w-[min(1100px,92%)] flex-wrap items-center justify-between gap-2.5 text-[0.95rem]">
        <span className="text-xl font-bold tracking-tight text-white">
          Share<span className="text-tomato">Bite</span>
        </span>
        <p className="text-center">Developed by Nipuna_Dev</p>
        <p>&copy; {new Date().getFullYear()} ShareBite. Share extra, waste less.</p>
      </div>
    </footer>
  );
}

export default SiteFooter;
