import { useState } from "react";
import foodCoverImage from "../assets/available-food-page-cover-image.jpg";
import FoodCard from "../components/FoodCard.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import SiteHeader from "../components/SiteHeader.jsx";
import { loadPosts } from "../utils/postsStorage.js";

// Sample donations for demonstration
const sampleFood = [
  {
    id: "sample-1",
    title: "Fresh Rice & Curry",
    description: "Freshly prepared rice with vegetable curry and dhal.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800",
    category: "Cooked Meals",
    quantity: 15,
    unit: "meal packets",
    preparedAt: "Today, 11:30 AM",
    expiresAt: "Today, 5:00 PM",
    location: "Kuliyapitiya Town",
    storage: "Keep refrigerated",
    allergens: ["Dairy"],
    status: "Available",
  },
  {
    id: "sample-2",
    title: "Fresh Bakery Buns",
    description: "Freshly baked soft buns. Perfect for breakfast or snacks.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800",
    category: "Bakery & Bread",
    quantity: 25,
    unit: "pieces",
    preparedAt: "Today, 8:00 AM",
    expiresAt: "Tomorrow, 8:00 AM",
    location: "Kurunegala Town",
    storage: "Room temperature",
    allergens: ["Wheat", "Gluten"],
    status: "Available",
  },
  {
    id: "sample-3",
    title: "Fresh Bananas",
    description: "Fresh ripe bananas available from a local fruit shop.",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800",
    category: "Fruits",
    quantity: 5,
    unit: "kg",
    preparedAt: "Today, 9:00 AM",
    expiresAt: "Tomorrow, 9:00 AM",
    location: "Kuliyapitiya Market",
    storage: "Room temperature",
    allergens: [],
    status: "Available",
  },
  {
    id: "sample-4",
    title: "Fresh Vegetable Pack",
    description: "A selection of fresh carrots, tomatoes and green vegetables.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800",
    category: "Vegetables",
    quantity: 10,
    unit: "packets",
    preparedAt: "Today, 7:00 AM",
    expiresAt: "Tomorrow, 7:00 AM",
    location: "Narammala Town",
    storage: "Keep refrigerated",
    allergens: [],
    status: "Available",
  },
  {
    id: "sample-5",
    title: "Fresh Milk Bottles",
    description: "Unopened fresh milk bottles available for collection.",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800",
    category: "Dairy Products",
    quantity: 8,
    unit: "pieces",
    preparedAt: "Today, 6:00 AM",
    expiresAt: "Tomorrow, 6:00 AM",
    location: "Pannala Town",
    storage: "Keep refrigerated",
    allergens: ["Milk"],
    status: "Available",
  },
  {
    id: "sample-6",
    title: "Fresh Vegetable Rice",
    description: "Homemade vegetable fried rice packed and ready to share.",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800",
    category: "Cooked Meals",
    quantity: 12,
    unit: "meal packets",
    preparedAt: "Today, 12:00 PM",
    expiresAt: "Today, 6:00 PM",
    location: "Wayamba University",
    storage: "Keep refrigerated",
    allergens: ["Soy"],
    status: "Available",
  },
];

function AvailableFoodPage() {
  const [posts] = useState(loadPosts);

  // Keep community donations separate from sample donations
  const allFood = [...posts, ...sampleFood];

  // Only show available food
  const availableFood = allFood.filter(
    (food) => (food.status || "Available") === "Available",
  );

  // Latest available donation
  const latest = availableFood[0];

  // Handle food claim
  const handleClaim = (id) => {
    const selectedFood = availableFood.find((food) => food.id === id);

    if (!selectedFood) return;

    if (String(id).startsWith("sample-")) {
      alert(
        "This is a demonstration donation. Real claiming is not available yet.",
      );
      return;
    }

    alert(
      `You selected ${selectedFood.title}! Claim functionality coming soon.`,
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-ink">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
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

          {/* Hero Image */}
          <div className="relative">
            <img
              src={foodCoverImage}
              alt="Fresh surplus food ready to share"
              className="aspect-4/5 w-full rounded-3xl object-cover shadow-2xl shadow-brand/10 md:aspect-square"
            />

            {latest && (
              <div className="absolute -bottom-5 left-5 max-w-[80%] rounded-2xl bg-white px-5 py-4 shadow-xl shadow-brand/15">
                <div className="flex items-center gap-2 text-sm font-bold text-brand">
                  <span className="size-2.5 rounded-full bg-emerald-500" />
                  Available now
                </div>

                <p className="mt-1 truncate font-bold">{latest.title}</p>

                <p className="line-clamp-2 text-sm text-muted">
                  {latest.description}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Available Food Section */}
        <section id="food-list" className="scroll-mt-16 bg-tint py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-brand-dark">
                  Available Food
                </h2>

                <p className="mt-2 text-muted">
                  {availableFood.length} items ready to collect. Pick what you
                  need and collect it on time.
                </p>
              </div>
            </div>

            {/* Demo Notice */}
            <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
              <strong>Demo mode:</strong> Some food listings are sample
              donations created to demonstrate ShareBite. They are not real
              offers and cannot be claimed.
            </div>

            {/* Food Cards */}
            {availableFood.length > 0 ? (
              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {availableFood.map((food) => (
                  <FoodCard key={food.id} food={food} onClaim={handleClaim} />
                ))}
              </div>
            ) : (
              <div className="mt-10 rounded-3xl bg-white px-6 py-16 text-center shadow-sm">
                <div className="text-5xl">🍱</div>

                <h3 className="mt-5 text-xl font-bold text-brand-dark">
                  No food available right now
                </h3>

                <p className="mx-auto mt-2 max-w-md text-muted">
                  There are currently no food donations available. Check back
                  soon or share some surplus food with your community.
                </p>

                <a
                  href="/"
                  className="mt-6 inline-block rounded-full bg-brand px-6 py-3 font-bold text-white transition hover:bg-brand-dark"
                >
                  Back to Home
                </a>
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter foodPage />
    </div>
  );
}

export default AvailableFoodPage;
