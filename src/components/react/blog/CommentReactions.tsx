import { useState, useEffect } from "react";
import { reactionIcons } from "../common/ReactionIcons";
import type { ReactionType } from "./type";

interface CommentReactionsProps {
  commentId: number;
  userId?: number;
}

interface Reaction {
  type: ReactionType;
  count: number;
}

// Traer reacciones desde backend
async function fetchReactions(commentId: number): Promise<Reaction[]> {
  const res = await fetch(`/api/blog/reactions/${commentId}/comment-count`);
  if (!res.ok) throw new Error("Error fetching reactions");
  return res.json();
}

// Enviar reacción al backend
async function postReaction(commentId: number, type: ReactionType, userId?: number) {
  const res = await fetch(`/api/blog/reactions/${commentId}/comment-reaction`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, userId }),
  });
  if (!res.ok) throw new Error("Error creating reaction");
  return res.json();
}

export const CommentReactions = ({ commentId, userId }: CommentReactionsProps) => {
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [userReaction, setUserReaction] = useState<ReactionType | null>(null);
  const [loading, setLoading] = useState(false);

  // Traer conteos al montar
  useEffect(() => {
    const fetchData = async () => {
      try {
        const counts = await fetchReactions(commentId);
        setReactions(counts);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [commentId]);

  const handleReaction = async (type: ReactionType) => {
    if (loading) return;
    if (userReaction === type) return;
    
    setUserReaction(type);
    setLoading(true);

    try {
      await postReaction(commentId, type, userId);
      const updated = await fetchReactions(commentId);
      setReactions(updated);
    } catch (err) {
      console.error(err);
      setUserReaction(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4">
      {(["LIKE", "DISLIKE", "LOVE", "WOW"] as ReactionType[]).map(type => {
        const count = reactions.find(r => r.type === type)?.count || 0;
        const disabled = loading || userReaction === type;
        return (
          <button
            key={type}
            onClick={() => handleReaction(type)}
            disabled={disabled}
            className={`
              flex items-center gap-1 px-3 py-1 rounded-lg shadow-sm
              transition-all duration-200
              ${disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-110 hover:shadow-md"}
              bg-white dark:bg-gray-700/50 text-gray-800 dark:text-gray-100 cursor-pointer
            `}
          >
            <span dangerouslySetInnerHTML={{ __html: reactionIcons[type] }} />
            <span className="font-medium text-violet-400/70 text-sm">{count}</span>
          </button>
        );
      })}
    </div>
  );
};
