import foodCoverImage from "../assets/available-food-page-cover-image.jpg";
import FoodCard from "../components/FoodCard.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import SiteHeader from "../components/SiteHeader.jsx";

const availableFood = [
  {
    title: "Fresh Buns",
    description: "20 buns from City Bakery. Pick up before 8:00 PM.",
  },
  {
    title: "Fresh Vegetables",
    description: "Surplus carrots and cabbage from the local market.",
  },
  {
    title: "Packed Meals",
    description: "10 rice and curry packs left over from an event.",
  },
];

function AvailableFoodPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-ink">
      <SiteHeader foodPage />
      <main className="flex-1">
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-14 md:grid-cols-2 md:py-24">
          <div>
            <h1 className="text-4xl leading-tight font-bold tracking-tight text-brand-dark sm:text-5xl lg:text-6xl">
              Fresh food, ready to share.
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted">
              Browse surplus food in your community. Reduce waste, save money
              and share the goodness.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#food-list"
                className="rounded-full bg-tomato px-7 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-tomato-dark"
              >
                See available food
              </a>
              <a
                href="/#how"
                className="rounded-full border-2 border-line px-7 py-3 font-bold text-brand transition hover:border-brand"
              >
                How it works
              </a>
            </div>
          </div>

          <div className="relative">
            <img
              src={foodCoverImage}
              alt="Fresh surplus food ready to share"
              className="aspect-4/5 w-full rounded-3xl object-cover shadow-2xl shadow-brand/10 md:aspect-square"
            />
            <div className="absolute -bottom-5 left-5 rounded-2xl bg-white px-5 py-4 shadow-xl shadow-brand/15">
              <div className="flex items-center gap-2 text-sm font-bold text-brand">
                <span className="size-2.5 rounded-full bg-emerald-500" />
                Available now
              </div>
              <p className="mt-1 font-bold">20 fresh buns</p>
              <p className="text-sm text-muted">Pick up before 8:00 PM</p>
            </div>
          </div>
        </section>

        <section id="food-list" className="scroll-mt-16 bg-tint py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-bold tracking-tight text-brand-dark">
              Available now
            </h2>
            <p className="mt-2 text-muted">
              Pick what you need and collect it on time.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {availableFood.map((food) => (
                <FoodCard key={food.title} {...food} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter foodPage />
    </div>
  );
}

export default AvailableFoodPage;
