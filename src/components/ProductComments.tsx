import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Star, Trash2, Pencil, Check, X } from "lucide-react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { z } from "zod";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface Comment {
  id: string;
  productId: string;
  userId: string;
  username: string;
  photoURL: string | null;
  rating: number;
  text: string;
  createdAt: Timestamp | null;
  updatedAt?: Timestamp | null;
}

const commentSchema = z.object({
  rating: z.number().int().min(1).max(5),
  text: z
    .string()
    .trim()
    .min(2, "Comment is too short")
    .max(250, "Comment must be under 250 characters"),
});

function formatDate(ts: Timestamp | null) {
  if (!ts) return "";
  try {
    return ts.toDate().toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

function StarPicker({
  value,
  onChange,
  readOnly,
  size = 5,
}: {
  value: number;
  onChange?: (v: number) => void;
  readOnly?: boolean;
  size?: number;
}) {
  const [hover, setHover] = useState(0);
  const display = hover || value;
  const sizeCls = size === 4 ? "h-4 w-4" : "h-5 w-5";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={readOnly}
          onMouseEnter={() => !readOnly && setHover(n)}
          onMouseLeave={() => !readOnly && setHover(0)}
          onClick={() => onChange?.(n)}
          className={`${readOnly ? "cursor-default" : "cursor-pointer transition-bounce hover:scale-110"}`}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
        >
          <Star
            className={`${sizeCls} ${
              n <= display ? "fill-current text-gradient" : "text-muted-foreground/40"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export function ProductComments({ productId }: { productId: string }) {
  const { user, profile } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRating, setEditRating] = useState(5);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "products", productId, "comments"),
      orderBy("createdAt", "desc"),
    );
    const unsub = onSnapshot(
      q,
      (snap) => {
        setComments(
          snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Comment, "id">) })),
        );
        setLoading(false);
      },
      (err) => {
        console.error("Failed to load comments:", err);
        toast.error("Could not load comments");
        setLoading(false);
      },
    );
    return () => unsub();
  }, [productId]);

  const { average, count } = useMemo(() => {
    if (!comments.length) return { average: 0, count: 0 };
    const sum = comments.reduce((acc, c) => acc + (c.rating || 0), 0);
    return { average: sum / comments.length, count: comments.length };
  }, [comments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const parsed = commentSchema.safeParse({ rating, text });
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    setSubmitting(true);
    try {
      await addDoc(collection(db, "products", productId, "comments"), {
        productId,
        userId: user.uid,
        username: profile?.username || user.displayName || user.email?.split("@")[0] || "Anonymous",
        photoURL: profile?.photoURL || user.photoURL || null,
        rating: parsed.data.rating,
        text: parsed.data.text,
        createdAt: serverTimestamp(),
      });
      setText("");
      setRating(5);
      toast.success("Comment posted");
    } catch (err) {
      console.error("Failed to post comment:", err);
      toast.error("Could not post comment. Check that you're signed in.");
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (c: Comment) => {
    setEditingId(c.id);
    setEditRating(c.rating);
    setEditText(c.text);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const saveEdit = async (id: string) => {
    const parsed = commentSchema.safeParse({ rating: editRating, text: editText });
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    try {
      await updateDoc(doc(db, "products", productId, "comments", id), {
        rating: parsed.data.rating,
        text: parsed.data.text,
        updatedAt: serverTimestamp(),
      });
      cancelEdit();
      toast.success("Comment updated");
    } catch (err) {
      console.error(err);
      toast.error("Could not update comment");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this comment?")) return;
    try {
      await deleteDoc(doc(db, "products", productId, "comments", id));
      toast.success("Comment deleted");
    } catch (err) {
      console.error(err);
      toast.error("Could not delete comment");
    }
  };

  return (
    <section className="mt-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold md:text-3xl">Reviews & comments</h2>
          {count > 0 && (
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <StarPicker value={Math.round(average)} readOnly size={4} />
              <span className="font-semibold text-foreground">{average.toFixed(1)}</span>
              <span>· {count} review{count > 1 ? "s" : ""}</span>
            </div>
          )}
        </div>
      </div>

      {/* Composer */}
      <div className="mt-6 rounded-2xl border border-border bg-card p-6">
        {user ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                Your rating
              </div>
              <StarPicker value={rating} onChange={setRating} />
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, 250))}
              placeholder="Share your thoughts about this product…"
              rows={3}
              maxLength={250}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm transition-smooth focus:border-primary focus:outline-none"
            />
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">{text.length}/250</span>
              <button
                type="submit"
                disabled={submitting || text.trim().length < 2}
                className="inline-flex items-center justify-center rounded-full bg-gradient-brand px-6 py-2.5 text-xs font-semibold text-primary-foreground transition-bounce hover:scale-[1.02] glow-brand disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
              >
                {submitting ? "Posting…" : "Post comment"}
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Sign in to leave a rating and comment.
            </p>
            <Link
              to="/auth"
              className="inline-flex items-center justify-center rounded-full bg-gradient-brand px-5 py-2 text-xs font-semibold text-primary-foreground transition-bounce hover:scale-[1.02] glow-brand"
            >
              Sign in
            </Link>
          </div>
        )}
      </div>

      {/* List */}
      <div className="mt-6 space-y-4">
        {loading ? (
          <div className="text-sm text-muted-foreground">Loading comments…</div>
        ) : comments.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            No comments yet. Be the first to share your thoughts.
          </div>
        ) : (
          comments.map((c) => {
            const isOwner = user?.uid === c.userId;
            const isEditing = editingId === c.id;
            return (
              <div key={c.id} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-secondary">
                    {c.photoURL ? (
                      <img src={c.photoURL} alt={c.username} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs font-bold text-muted-foreground">
                        {c.username.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <div className="text-sm font-semibold">{c.username}</div>
                        <div className="text-[11px] text-muted-foreground">
                          {formatDate(c.createdAt)}
                          {c.updatedAt ? " · edited" : ""}
                        </div>
                      </div>
                      {isEditing ? (
                        <StarPicker value={editRating} onChange={setEditRating} size={4} />
                      ) : (
                        <StarPicker value={c.rating} readOnly size={4} />
                      )}
                    </div>
                    {isEditing ? (
                      <div className="mt-3 space-y-2">
                        <textarea
                          value={editText}
                          onChange={(e) => setEditText(e.target.value.slice(0, 250))}
                          rows={3}
                          maxLength={250}
                          className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm transition-smooth focus:border-primary focus:outline-none"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={cancelEdit}
                            className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-semibold transition-smooth hover:border-primary/40"
                          >
                            <X className="h-3 w-3" /> Cancel
                          </button>
                          <button
                            onClick={() => saveEdit(c.id)}
                            className="inline-flex items-center gap-1 rounded-full bg-gradient-brand px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-bounce hover:scale-[1.02]"
                          >
                            <Check className="h-3 w-3" /> Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">
                        {c.text}
                      </p>
                    )}
                    {isOwner && !isEditing && (
                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => startEdit(c)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground transition-smooth hover:text-foreground"
                        >
                          <Pencil className="h-3 w-3" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground transition-smooth hover:text-destructive"
                        >
                          <Trash2 className="h-3 w-3" /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
