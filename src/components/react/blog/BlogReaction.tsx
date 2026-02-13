import { useState, useEffect } from "react";
import type { ReactionType } from "./type";
import { reactionIcons } from "../common/ReactionIcons";

interface BlogReactionsProps {
  blogId: number;
  userId?: number;
}

interface Reaction {
  type: ReactionType;
  count: number;
}

export const BlogReactions = ({
  blogId,
  userId,
}: BlogReactionsProps) => {
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [userReaction, setUserReaction] = useState<ReactionType | null>(null);
  const [loading, setLoading] = useState(false);

  // Traer conteos
  const fetchReactions = async () => {
    try {
      const res = await fetch(`/api/blog/${blogId}/blog-reactions/reactions`);
      if (!res.ok) throw new Error("Error fetching reactions");

      const data: Reaction[] = await res.json();
      setReactions(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReactions();
  }, [blogId]);

  // Enviar reacción
  const handleReaction = async (type: ReactionType) => {
    if (loading) return;
    if (userReaction === type) return;

    setUserReaction(type);
    setLoading(true);

    try {
      const res = await fetch(`/api/blog/${blogId}/blog-reaction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          ...(userId ? { userId } : {}),
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Backend error:", errorText);
        throw new Error("Error al reaccionar");
      }

      await fetchReactions();
    } catch (err) {
      console.error(err);
      setUserReaction(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4">
      {(["LIKE", "DISLIKE", "LOVE", "WOW"] as ReactionType[]).map((type) => {
        const count = reactions.find((r) => r.type === type)?.count || 0;
        const disabled = loading || userReaction === type;

        return (
          <button
            key={type}
            onClick={() => handleReaction(type)}
            disabled={disabled}
            className={`
              flex items-center gap-1 px-3 py-1 rounded-lg shadow-sm
              transition-all duration-200
              ${
                disabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-105 hover:shadow-md"
              }
              bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 cursor-pointer
            `}
          >
            <span
              className="w-5 h-5"
              dangerouslySetInnerHTML={{ __html: reactionIcons[type] }}
            />
            <span className="font-medium">{count}</span>
          </button>
        );
      })}
    </div>
  );
};
