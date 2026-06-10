import { useEffect, useState } from "react";
import {
    createComment,
    deleteComment,
    getComments,
    updateComment
} from "../api/commentApi";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

export default function CommentSection({ postId, currentUser }) {
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState("");

    useEffect(() => {
        const fetchComments = async () => {
            const response = await getComments(postId);
            setComments(response.data);
        };

        fetchComments();
    }, [postId]);

    const refreshComments = async () => {
        const response = await getComments(postId);
        setComments(response.data);
    };

    const handleCreateComment = async (e) => {
        e.preventDefault();

        if (!commentContent.trim()) {
            return;
        }

        await createComment(postId, { content: commentContent });
        setCommentContent("");
        refreshComments();
    };

    const handleUpdateComment = async (commentId, content) => {
        await updateComment(commentId, { content });
        refreshComments();
    };

    const handleDeleteComment = async (commentId) => {
        if (!window.confirm("댓글을 삭제하시겠습니까?")) {
            return;
        }

        await deleteComment(commentId);
        refreshComments();
    };

    return (
        <section className="comment-section">
            <h2>댓글 {comments.length}</h2>
            <CommentForm
                commentContent={commentContent}
                onContentChange={setCommentContent}
                onSubmit={handleCreateComment}
                disabled={!currentUser}
            />

            <div className="comment-list">
                {comments.map((comment) => (
                    <CommentItem
                        key={comment.commentId}
                        comment={comment}
                        currentUser={currentUser}
                        onUpdate={handleUpdateComment}
                        onDelete={handleDeleteComment}
                    />
                ))}
            </div>
        </section>
    );
}
