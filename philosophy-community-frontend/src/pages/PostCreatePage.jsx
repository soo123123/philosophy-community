import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/postApi";
import { getCategories } from "../api/categoryApi";
import PostEditor from "../components/PostEditor";
import Navbar from "../components/Navbar";

export default function PostCreatePage() {

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await getCategories();
            setCategories(response.data);
            setCategoryId(response.data[0]?.categoryId ?? "");
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await createPost({
                categoryId,
                title,
                content
            });

            navigate("/");

        } catch (error) {

            console.error(error);

        }
    };

    return (
        <>
            <Navbar />
            <main className="form-page">
                <h1>게시글 작성</h1>

                <PostEditor
                    categories={categories}
                    categoryId={categoryId}
                    title={title}
                    content={content}
                    onCategoryChange={setCategoryId}
                    onTitleChange={setTitle}
                    onContentChange={setContent}
                    onSubmit={handleSubmit}
                    buttonText="등록"
                />
            </main>
        </>
    );
}
