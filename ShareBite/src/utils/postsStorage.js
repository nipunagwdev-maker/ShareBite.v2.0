export const STORAGE_KEY = "sharebite-posts";

// Load all food donations
export function loadPosts() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

// Save all food donations
export function savePosts(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

// Add a new food donation
export function addPost(post) {
  const posts = loadPosts();

  const newPost = {
    ...post,
    id: post.id || crypto.randomUUID(),
    status: "Available",
    createdAt: new Date().toISOString(),
  };

  savePosts([newPost, ...posts]);

  return newPost;
}

// Update a food donation
export function updatePost(id, updates) {
  const posts = loadPosts();

  const updatedPosts = posts.map((post) =>
    post.id === id ? { ...post, ...updates } : post,
  );

  savePosts(updatedPosts);
  return updatedPosts;
}

// Delete a food donation
export function deletePost(id) {
  const posts = loadPosts();

  const updatedPosts = posts.filter((post) => post.id !== id);

  savePosts(updatedPosts);
  return updatedPosts;
}
