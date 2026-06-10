import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { createPost } from "../api/postApi";
import { getCategories } from "../api/categoryApi";
import { getMyProfile } from "../api/authApi";

import PostEditor from "../components/PostEditor";
import Navbar from "../components/Navbar";

export default function PostCreatePage() {

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchCategories = async () => {

            try {

                const response = await getCategories();

                setCategories(response.data);
                setCategoryId(
                    response.data[0]?.categoryId ?? ""
                );

            } catch (error) {

                console.error(error);

            }
        };

        const fetchMyInfo = async () => {

            if (!localStorage.getItem("accessToken")) {
                setLoading(false);
                return;
            }

            try {

                const response = await getMyProfile();

                setCurrentUser(response.data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }
        };

        fetchCategories();
        fetchMyInfo();

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

    if (loading) {
        return null;
    }

    return (
        <>
            <Navbar
                currentUser={currentUser}
                onLogout={() => setCurrentUser(null)}
            />

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