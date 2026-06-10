export default function CategoryMenu({
    categories,
    selectedCategoryId,
    onSelectCategory
}) {
    return (
        <aside className="sidebar">
            <div className="sidebar-title">카테고리</div>
            <button
                type="button"
                className={!selectedCategoryId ? "category-item active" : "category-item"}
                onClick={() => onSelectCategory(null)}
            >
                <span>전체</span>
            </button>

            {categories.map((category) => (
                <button
                    type="button"
                    key={category.categoryId}
                    className={
                        selectedCategoryId === category.categoryId
                            ? "category-item active"
                            : "category-item"
                    }
                    onClick={() => onSelectCategory(category.categoryId)}
                >
                    <span>{category.categoryName}</span>
                </button>
            ))}
        </aside>
    );
}
