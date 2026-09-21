import { useState } from "react";

export default function Admin() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState(null);
  const [posting, setPosting] = useState(false);

  async function createPost() {
    if (!name.trim() || !description.trim()) {
      alert("Name aur description bharna zaroori hai.");
      return;
    }

    const form = new FormData();
    form.append("name", name);
    form.append("description", description);

    if (media) {
      form.append("media", media);
    }

    setPosting(true);

    try {
      const response = await fetch("/posts", {
        method: "POST",
        body: form
      });

      if (!response.ok) {
        throw new Error("Post failed");
      }

      setName("");
      setDescription("");
      setMedia(null);
      setOpen(false);

      alert("Post published successfully!");
    } catch (error) {
      alert("Post upload failed.");
      console.error(error);
    } finally {
      setPosting(false);
    }
  }

  return (
    <main style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1>Admin</h1>
          <p style={styles.muted}>Create a new post</p>
        </div>

        <button
          style={styles.plus}
          onClick={() => setOpen(true)}
        >
          +
        </button>
      </div>

      {!open && (
        <div style={styles.empty}>
          <h2>Create Post</h2>
          <p style={styles.muted}>
            Press + to open the post form.
          </p>
        </div>
      )}

      {open && (
        <div style={styles.form}>
          <div style={styles.formHeader}>
            <h2>New Post</h2>

            <button
              style={styles.close}
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>

          <input
            style={styles.input}
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            style={styles.textarea}
            placeholder="Description / text / links"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label style={styles.upload}>
            📷 Upload Photo / Video
            <input
              type="file"
              accept="image/*,video/*"
              hidden
              onChange={(e) => setMedia(e.target.files?.[0] || null)}
            />
          </label>

          {media && (
            <p style={styles.file}>
              Selected: {media.name}
            </p>
          )}

          <button
            style={styles.postButton}
            onClick={createPost}
            disabled={posting}
          >
            {posting ? "Posting..." : "Post"}
          </button>
        </div>
      )}
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#000",
    color: "#fff",
    padding: 20,
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  muted: { color: "#888" },
  plus: {
    width: 52,
    height: 52,
    borderRadius: "50%",
    border: "none",
    background: "#fff",
    color: "#000",
    fontSize: 32,
    cursor: "pointer"
  },
  empty: {
    marginTop: 30,
    background: "#111",
    border: "1px solid #252525",
    borderRadius: 16,
    padding: 25,
    textAlign: "center"
  },
  form: {
    marginTop: 25,
    background: "#111",
    border: "1px solid #252525",
    borderRadius: 16,
    padding: 18
  },
  formHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  close: {
    background: "transparent",
    color: "#fff",
    border: "none",
    fontSize: 30,
    cursor: "pointer"
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: 15,
    marginTop: 14,
    background: "#080808",
    color: "#fff",
    border: "1px solid #333",
    borderRadius: 12,
    outline: "none"
  },
  textarea: {
    width: "100%",
    boxSizing: "border-box",
    minHeight: 180,
    padding: 15,
    marginTop: 12,
    background: "#080808",
    color: "#fff",
    border: "1px solid #333",
    borderRadius: 12,
    resize: "vertical",
    outline: "none"
  },
  upload: {
    display: "block",
    textAlign: "center",
    padding: 15,
    marginTop: 12,
    background: "#181818",
    border: "1px solid #333",
    borderRadius: 12,
    cursor: "pointer"
  },
  file: {
    color: "#aaa",
    fontSize: 13
  },
  postButton: {
    width: "100%",
    padding: 15,
    marginTop: 14,
    border: "none",
    borderRadius: 12,
    background: "#fff",
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
    cursor: "pointer"
  }
};
