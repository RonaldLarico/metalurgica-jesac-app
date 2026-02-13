import React, { useEffect, useState } from "react";
import CommentTree from "./CommentTree";
import CommentForm from "./CommentForm";

interface Comment {
  id: number;
  content: string;
  name: string;
  parentId: number | null;
  createdAt: string;
  replies: Comment[];
}

interface Props {
  blogId: number;
  userId?: number;
}

const CommentsSection: React.FC<Props> = ({ blogId, userId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  // Traer todos los comentarios desde la API
  const fetchComments = async () => {
    setLoading(true);
    const res = await fetch(`/api/blog/${blogId}/comments/list`);
    const data: Comment[] = await res.json();
    setComments(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  // Función para agregar comentario o respuesta en pantalla
  const addCommentLocally = (newComment: Comment) => {
    if (newComment.parentId === null) {
      setComments((prev) => [{ ...newComment, replies: [] }, ...prev]);
    } else {
      const addReply = (nodes: Comment[]): Comment[] =>
        nodes.map((node) => {
          if (node.id === newComment.parentId) {
            return {
              ...node,
              replies: [{ ...newComment, replies: [] }, ...node.replies],
            };
          } else if (node.replies.length > 0) {
            return { ...node, replies: addReply(node.replies) };
          } else {
            return node;
          }
        });

      setComments((prev) => addReply(prev));
    }
  };

  // Esta función será pasada a CommentForm para publicar comentarios/respuestas
  const handleNewComment = async (content: string, name: string, parentId?: number) => {
    const res = await fetch(`/api/blog/${blogId}/comments/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content,  name, parentId }),
    });
    const newComment: Comment = await res.json();
    addCommentLocally(newComment);
  };

  const countAllComments = (comments: Comment[]): number => {
  return comments.reduce((total, comment) => {
    return total + 1 + countAllComments(comment.replies);
  }, 0);
};

  return (
    <section className="overflow-y-auto">
      <h2 className="text-3xl font-bold mb-4 text-(--color-primary) dark:text-(--color-secondary)">
        Comentarios ({countAllComments(comments)})
      </h2>

      {/* Formulario raíz */}
      <CommentForm blogId={blogId} parentId={undefined} onSubmit={handleNewComment} />

      {loading ? (
        <p className="mt-6 text-gray-500">Cargando comentarios...</p>
      ) : (
        <div className="mt-5 space-y-6">
          <CommentTree comments={comments} blogId={blogId} userId={userId} addCommentLocally={addCommentLocally} />
        </div>
      )}
      <div className="mt-8 border-t text-right text-sm text-(--color-primary) dark:text-(--color-secondary)"/>
    </section>
  );
};

export default CommentsSection;
