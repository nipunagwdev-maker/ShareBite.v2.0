function FoodCard({ title, description }) {
  return (
    <article className="rounded-3xl bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/10">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">{title}</h3>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-800">
          Free
        </span>
      </div>
      <p className="mt-2 text-muted">{description}</p>
      <button
        type="button"
        className="mt-5 rounded-full bg-brand px-5 py-2 font-bold text-white transition hover:bg-brand-dark active:scale-95"
      >
        Claim
      </button>
    </article>
  );
}

export default FoodCard;
