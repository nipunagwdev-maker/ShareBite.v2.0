import { useState } from "react";
import SiteFooter from "../components/SiteFooter.jsx";
import SiteHeader from "../components/SiteHeader.jsx";
import FoodCard from "../components/FoodCard.jsx";
import {
  loadPosts,
  addPost,
  deletePost,
  updatePost,
} from "../utils/postsStorage.js";

const inputStyle =
  "w-full rounded-xl border-2 border-line bg-white px-4 py-3 transition focus:border-brand focus:outline-none";

const initialForm = {
  title: "",
  description: "",
  image: "",
  category: "Cooked Meals",
  quantity: "",
  unit: "meal packets",
  preparedAt: "",
  expiresAt: "",
  location: "",
  storage: "Room temperature",
  allergens: "",
};

function Posts() {
  const [posts, setPosts] = useState(loadPosts);
  const [form, setForm] = useState(initialForm);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !form.title.trim() ||
      !form.quantity ||
      Number(form.quantity) <= 0 ||
      !form.preparedAt ||
      !form.expiresAt ||
      !form.location.trim()
    ) {
      alert("Please complete all required fields.");
      return;
    }

    if (new Date(form.expiresAt) <= new Date(form.preparedAt)) {
      alert("Expiry time must be after preparation time.");
      return;
    }

    const newPost = addPost({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      location: form.location.trim(),
      quantity: Number(form.quantity),
      allergens: form.allergens
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    });

    setPosts((current) => [newPost, ...current]);
    setForm(initialForm);

    alert("Your food donation has been posted successfully!");
  }

  function handleClaim(id) {
    const selectedFood = posts.find((post) => post.id === id);

    if (!selectedFood || selectedFood.status !== "Available") return;

    alert(
      `You selected ${selectedFood.title}! Claim functionality coming soon.`,
    );
  }

  function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this food donation?",
    );

    if (!confirmed) return;

    deletePost(id);
    setPosts((current) => current.filter((post) => post.id !== id));
  }

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-ink">
      <SiteHeader />

      <main className="flex-1">
        {/* Donation Form */}
        <section className="mx-auto max-w-3xl px-6 py-14 md:py-20">
          <h1 className="text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
            Share your surplus food
          </h1>

          <p className="mt-4 text-lg text-muted">
            Have extra food? Share it with someone nearby instead of letting it
            go to waste.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-6 rounded-3xl bg-white p-6 shadow-xl shadow-brand/10 ring-1 ring-line sm:p-8"
          >
            {/* Food Name */}
            <div>
              <label htmlFor="title" className="mb-2 block font-bold">
                Food name *
              </label>
              <input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Fresh Rice & Curry"
                maxLength={60}
                required
                className={inputStyle}
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="mb-2 block font-bold">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the food..."
                rows={3}
                maxLength={300}
                className={inputStyle}
              />
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="image" className="mb-2 block font-bold">
                Food image URL
              </label>
              <input
                id="image"
                name="image"
                type="url"
                value={form.image}
                onChange={handleChange}
                placeholder="https://example.com/food.jpg"
                className={inputStyle}
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="mb-2 block font-bold">
                Food category *
              </label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                className={inputStyle}
              >
                <option>Cooked Meals</option>
                <option>Bakery & Bread</option>
                <option>Fruits</option>
                <option>Vegetables</option>
                <option>Dairy Products</option>
                <option>Packaged Food</option>
                <option>Other</option>
              </select>
            </div>

            {/* Quantity and Unit */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="quantity" className="mb-2 block font-bold">
                  Quantity *
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  value={form.quantity}
                  onChange={handleChange}
                  placeholder="e.g. 15"
                  required
                  className={inputStyle}
                />
              </div>

              <div>
                <label htmlFor="unit" className="mb-2 block font-bold">
                  Unit *
                </label>
                <select
                  id="unit"
                  name="unit"
                  value={form.unit}
                  onChange={handleChange}
                  className={inputStyle}
                >
                  <option>meal packets</option>
                  <option>pieces</option>
                  <option>kg</option>
                  <option>litres</option>
                  <option>boxes</option>
                  <option>packets</option>
                </select>
              </div>
            </div>

            {/* Preparation and Expiry */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="preparedAt" className="mb-2 block font-bold">
                  Prepared at *
                </label>
                <input
                  id="preparedAt"
                  name="preparedAt"
                  type="datetime-local"
                  value={form.preparedAt}
                  onChange={handleChange}
                  required
                  className={inputStyle}
                />
              </div>

              <div>
                <label htmlFor="expiresAt" className="mb-2 block font-bold">
                  Expiry / Best before *
                </label>
                <input
                  id="expiresAt"
                  name="expiresAt"
                  type="datetime-local"
                  value={form.expiresAt}
                  onChange={handleChange}
                  min={form.preparedAt || undefined}
                  required
                  className={inputStyle}
                />
              </div>
            </div>

            {/* Pickup Location */}
            <div>
              <label htmlFor="location" className="mb-2 block font-bold">
                Pickup location *
              </label>
              <input
                id="location"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Kuliyapitiya, Wayamba University"
                required
                className={inputStyle}
              />
            </div>

            {/* Storage */}
            <div>
              <label htmlFor="storage" className="mb-2 block font-bold">
                Storage conditions *
              </label>
              <select
                id="storage"
                name="storage"
                value={form.storage}
                onChange={handleChange}
                className={inputStyle}
              >
                <option>Room temperature</option>
                <option>Keep refrigerated</option>
                <option>Keep frozen</option>
                <option>Store in a cool, dry place</option>
              </select>
            </div>

            {/* Allergens */}
            <div>
              <label htmlFor="allergens" className="mb-2 block font-bold">
                Allergens
              </label>
              <input
                id="allergens"
                name="allergens"
                value={form.allergens}
                onChange={handleChange}
                placeholder="e.g. Peanuts, Dairy, Eggs (comma separated)"
                className={inputStyle}
              />
              <p className="mt-1 text-sm text-muted">
                Mention known allergens. If unknown, don't assume the food is
                allergen-free.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-full bg-tomato px-7 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-tomato-dark"
            >
              Share Food
            </button>
          </form>
        </section>

        {/* Community Donations */}
        <section className="bg-tint py-16">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-bold tracking-tight text-brand-dark">
              Shared by the community
            </h2>

            <p className="mt-2 text-muted">
              {posts.length} {posts.length === 1 ? "donation" : "donations"}{" "}
              posted.
            </p>

            {posts.length === 0 ? (
              <p className="mt-10 rounded-2xl border-2 border-dashed border-line bg-white p-10 text-center text-muted">
                No donations yet. Be the first to share food!
              </p>
            ) : (
              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <div key={post.id}>
                    <FoodCard food={post} onClaim={handleClaim} />

                    <button
                      type="button"
                      onClick={() => handleDelete(post.id)}
                      className="mt-2 w-full rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      Delete Donation
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

export default Posts;
