import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import { CommentIcon } from "../../../icons/icon";
import { CommentReactions } from "./CommentReactions";

export interface Comment {
  id: number;
  content: string;
  name: string;
  parentId: number | null;
  createdAt: string;
  replies: Comment[];
}

interface Props {
  comments: Comment[];
  blogId: number;
  userId?: number;
  addCommentLocally: (newComment: Comment) => void;
}

const CommentTree: React.FC<Props> = ({
  comments,
  blogId,
  userId,
  addCommentLocally,
}) => {
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  const toggleReplyForm = (commentId: number) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
  };

  const handleSubmitComment = async (
    content: string,
    name: string,
    parentId?: number,
  ) => {
    const res = await fetch(`/api/blog/${blogId}/comments/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, name, parentId }),
    });

    const newComment: Comment = await res.json();
    addCommentLocally(newComment);
    setReplyingTo(null);
  };

  return (
    <div className="space-y-5 overflow-x-auto">
      <div className="border-t text-right text-sm text-gray-400 dark:text-gray-500" />
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-gray-50 dark:bg-slate-800 p-4 rounded-2xl shadow-xl shadow-slate-600/20 border border-gray-200 dark:border-gray-700 min-w-75 sm:min-w-full"
        >
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-sm text-gray-600 dark:text-gray-300">
              {comment.name}
            </h4>
            <span className="text-xs text-gray-700 dark:text-gray-400">
              {new Date(comment.createdAt).toLocaleString("es-ES", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
          </div>

          {/* Contenido del comentario */}
          <p className="text-gray-700 dark:text-gray-300 mb-2 wrap-break-word">
            {comment.content}
          </p>
          <div className="flex justify-between items-center">
            <button
              onClick={() => toggleReplyForm(comment.id)}
              className="
              flex items-center gap-1 mb-2 text-violet-600 dark:text-(--color-secondary)/80 font-medium text-sm
              px-2 py-1 rounded-md
              dark:hover:bg-(--color-secondary)/40 hover:bg-violet-400/30 transition-colors duration-300
              focus:outline-none focus:ring-1 cursor-pointer
            "
            >
              <CommentIcon />
              Responder
            </button>
            <CommentReactions
              commentId={comment.id}
              userId={userId}
            />
          </div>

          {replyingTo === comment.id && (
            <div className="mt-6 ml-6">
              <CommentForm
                blogId={blogId}
                parentId={comment.id}
                onSubmit={handleSubmitComment}
              />
            </div>
          )}

          {comment.replies.length > 0 && (
            <div className="ml-4 border-l border-gray-300 dark:border-gray-600 pl-4 space-y-4 overflow-x-auto">
              {/* Se envuelve el árbol de replies con overflow-x-auto */}
              <CommentTree
                comments={comment.replies}
                blogId={blogId}
                addCommentLocally={addCommentLocally}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentTree;
