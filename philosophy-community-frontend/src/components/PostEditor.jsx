export default function PostEditor({
    title,
    content,
    onTitleChange,
    onContentChange,
    onSubmit,
    buttonText
}) {

    return (
        <form onSubmit={onSubmit}>

            <div>
                <input
                    type="text"
                    placeholder="제목"
                    value={title}
                    onChange={(e) =>
                        onTitleChange(e.target.value)
                    }
                />
            </div>

            <div>
                <textarea
                    placeholder="내용"
                    value={content}
                    onChange={(e) =>
                        onContentChange(e.target.value)
                    }
                />
            </div>

            <button type="submit">
                {buttonText}
            </button>

        </form>
    );
}