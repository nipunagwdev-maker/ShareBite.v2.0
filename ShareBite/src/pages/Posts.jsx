import { useEffect, useState } from "react";
import SiteFooter from "../components/SiteFooter.jsx";
import SiteHeader from "../components/SiteHeader.jsx";
import FoodCard from "../components/FoodCard.jsx";
import { STORAGE_KEY, loadPosts } from "../utils/postsStorage.js";

const inputStyle =
  "w-full rounded-xl border-2 border-line bg-white px-4 py-3 transition focus:border-brand focus:outline-none";

function Posts() {
  const [posts, setPosts] = useState(loadPosts);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Save posts every time they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim()) return;

    const newPost = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
    };

    setPosts((current) => [newPost, ...current]);
    setTitle("");
    setDescription("");
  }

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-ink">
      <SiteHeader />

      <main className="flex-1">
        <section className="mx-auto max-w-2xl px-6 py-14 md:py-20">
          <h1 className="text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
            Share your surplus food
          </h1>
          <p className="mt-4 text-lg text-muted">
            Have extra food? Post it here so someone nearby can pick it up
            before it goes to waste.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-5 rounded-3xl bg-white p-6 shadow-xl shadow-brand/10 ring-1 ring-line sm:p-8"
          >
            <div>
              <label htmlFor="title" className="mb-2 block font-bold">
                What food do you have?
              </label>
              <input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 20 fresh buns"
                maxLength={60}
                className={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="description" className="mb-2 block font-bold">
                Pickup details
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Where and when can people collect it?"
                rows={3}
                maxLength={150}
                className={inputStyle}
              />
              <p className="mt-1 text-right text-sm text-muted">
                {description.length}/150
              </p>
            </div>

            <button
              type="submit"
              disabled={!title.trim()}
              className="w-full rounded-full bg-tomato px-7 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-tomato-dark disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            >
              Post food
            </button>
          </form>
        </section>

        <section className="bg-tint py-16">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-bold tracking-tight text-brand-dark">
              Shared by the community
            </h2>
            <p className="mt-2 text-muted">
              {posts.length === 0
                ? "Nothing here yet."
                : `${posts.length} ${posts.length === 1 ? "post" : "posts"} available.`}
            </p>

            {posts.length === 0 ? (
              <p className="mt-10 rounded-2xl border-2 border-dashed border-line bg-white p-10 text-center text-muted">
                No posts yet. Be the first to share food above!
              </p>
            ) : (
              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <FoodCard
                    key={post.id}
                    title={post.title}
                    description={post.description}
                  />
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
