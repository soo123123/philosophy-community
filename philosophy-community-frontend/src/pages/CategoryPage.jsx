import { useEffect, useState } from "react";
import { getCategories } from "../api/categoryApi";
import Navbar from "../components/Navbar";

export default function CategoryPage() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await getCategories();
            setCategories(response.data);
        };

        fetchCategories();
    }, []);

    return (
        <>
            <Navbar />
            <main className="content-panel standalone-panel">
                <div className="page-heading">
                    <div>
                        <span className="eyebrow">카테고리</span>
                        <h1>카테고리 선택</h1>
                    </div>
                </div>

                <div className="category-grid">
                    {categories.map((category) => (
                        <article className="category-card" key={category.categoryId}>
                            <div className="category-symbol">○</div>
                            <h2>{category.categoryName}</h2>
                            <p>게시글을 등록할 카테고리를 선택해주세요.</p>
                        </article>
                    ))}
                </div>
            </main>
        </>
    );
}
