import { useEffect, useState } from "react";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadPosts() {
    try {
      const response = await fetch("/posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <main style={styles.page}>
      <h1>Posts</h1>
      <p style={styles.muted}>Trex Wallet community posts</p>

      <button style={styles.refresh} onClick={loadPosts}>
        Refresh
      </button>

      {loading && <p>Loading...</p>}

      {!loading && posts.length === 0 && (
        <div style={styles.empty}>
          <h2>No posts yet</h2>
          <p>Create the first post from the Admin page.</p>
        </div>
      )}

      {posts.map((post) => (
        <article style={styles.post} key={post.id}>
          <h3>{post.name}</h3>

          <p style={styles.description}>{post.description}</p>

          {post.image && (
            <img
              src={post.image}
              alt=""
              style={styles.media}
            />
          )}

          {post.video && (
            <video
              src={post.video}
              controls
              style={styles.media}
            />
          )}

          <small style={styles.muted}>
            {new Date(post.created_at).toLocaleString()}
          </small>
        </article>
      ))}
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#000",
    color: "#fff",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box"
  },
  muted: { color: "#888" },
  refresh: {
    background: "#fff",
    color: "#000",
    border: "none",
    borderRadius: 10,
    padding: "10px 16px",
    fontWeight: "bold",
    marginBottom: 20
  },
  empty: {
    background: "#111",
    border: "1px solid #242424",
    borderRadius: 16,
    padding: 25,
    textAlign: "center"
  },
  post: {
    background: "#111",
    border: "1px solid #252525",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16
  },
  description: {
    whiteSpace: "pre-wrap",
    lineHeight: 1.5
  },
  media: {
    width: "100%",
    maxHeight: 500,
    objectFit: "contain",
    borderRadius: 12,
    background: "#000",
    margin: "10px 0 14px"
  }
};
