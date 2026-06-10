import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories } from "../api/categoryApi";
import {
    getPost,
    updatePost
} from "../api/postApi";

import PostEditor from "../components/PostEditor";
import Navbar from "../components/Navbar";

export default function PostEditPage() {

    const { postId } = useParams();

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await getCategories();
            setCategories(response.data);
        };

        const fetchPost = async () => {

            try {

                const response = await getPost(postId);

                setCategoryId(response.data.categoryId);
                setTitle(response.data.title);
                setContent(response.data.content);

            } catch (error) {

                console.error(error);

            }
        };

        fetchCategories();
        fetchPost();
    }, [postId]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await updatePost(
                postId,
                {
                    categoryId,
                    title,
                    content
                }
            );

            navigate(`/posts/${postId}`);

        } catch (error) {

            console.error(error);

        }
    };

    return (
        <>
            <Navbar />
            <main className="form-page">
                <h1>게시글 수정</h1>

                <PostEditor
                    categories={categories}
                    categoryId={categoryId}
                    title={title}
                    content={content}
                    onCategoryChange={setCategoryId}
                    onTitleChange={setTitle}
                    onContentChange={setContent}
                    onSubmit={handleSubmit}
                    buttonText="수정"
                />
            </main>
        </>
    );
}
