export default function CommentForm({
    commentContent,
    onContentChange,
    onSubmit,
    disabled
}) {
    return (
        <form className="comment-form" onSubmit={onSubmit}>
            <textarea
                placeholder={disabled ? "로그인 후 댓글을 작성할 수 있습니다." : "댓글을 입력해주세요."}
                value={commentContent}
                onChange={(e) => onContentChange(e.target.value)}
                disabled={disabled}
            />
            <button type="submit" className="primary-button" disabled={disabled}>
                등록
            </button>
        </form>
    );
}
