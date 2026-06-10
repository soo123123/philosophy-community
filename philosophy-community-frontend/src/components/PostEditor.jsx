export default function PostEditor({
    categories,
    categoryId,
    title,
    content,
    onCategoryChange,
    onTitleChange,
    onContentChange,
    onSubmit,
    buttonText
}) {

    return (
        <form className="editor-form" onSubmit={onSubmit}>

            <label>
                카테고리
                <select
                    value={categoryId}
                    onChange={(e) => onCategoryChange(Number(e.target.value))}
                    required
                >
                    <option value="">카테고리를 선택해주세요</option>
                    {categories.map((category) => (
                        <option
                            key={category.categoryId}
                            value={category.categoryId}
                        >
                            {category.categoryName}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                제목
                <input
                    type="text"
                    placeholder="제목"
                    value={title}
                    onChange={(e) =>
                        onTitleChange(e.target.value)
                    }
                    required
                />
            </label>

            <label>
                내용
                <textarea
                    placeholder="내용"
                    value={content}
                    onChange={(e) =>
                        onContentChange(e.target.value)
                    }
                    required
                />
            </label>

            <button type="submit" className="primary-button">
                {buttonText}
            </button>

        </form>
    );
}
