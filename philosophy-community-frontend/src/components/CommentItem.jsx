import { useState } from "react";

export default function CommentItem({
    comment,
    currentUser,
    onUpdate,
    onDelete
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(comment.content);
    const isAuthor = currentUser?.userId === comment.userId;

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(comment.commentId, content);
        setIsEditing(false);
    };

    return (
        <article className="comment-item">
            <div className="comment-meta">
                <strong>{comment.authorNickname}</strong>
                <span>{comment.createdAt?.slice(0, 16).replace("T", " ")}</span>
            </div>

            {isEditing ? (
                <form className="inline-form" onSubmit={handleSubmit}>
                    <input
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                    <button type="submit" className="primary-button small-button">
                        저장
                    </button>
                </form>
            ) : (
                <p>{comment.content}</p>
            )}

            {isAuthor && !isEditing && (
                <div className="row-actions">
                    <button type="button" onClick={() => setIsEditing(true)}>
                        수정
                    </button>
                    <button type="button" onClick={() => onDelete(comment.commentId)}>
                        삭제
                    </button>
                </div>
            )}
        </article>
    );
}
