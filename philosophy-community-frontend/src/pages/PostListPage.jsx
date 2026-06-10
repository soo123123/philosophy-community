import { useEffect, useState } from "react";
import { getPosts, getPostsByCategory } from "../api/postApi";
import { getMyProfile } from "../api/authApi";
import PostList from "../components/PostList";

import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import CategoryMenu from "../components/CategoryMenu";
import { getCategories } from "../api/categoryApi";

export default function PostListPage() {

    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(response.data);
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

    useEffect(() => {

        const fetchPosts = async () => {

            try {

                const response = selectedCategoryId
                    ? await getPostsByCategory(selectedCategoryId)
                    : await getPosts();

                setPosts(response.data);

            } catch (error) {

                console.error(error);

            }
        };

        fetchPosts();

    }, [selectedCategoryId]);

    if (loading) {
        return null;
    }

    return (
        <>
            <Navbar
                currentUser={currentUser}
                onLogout={() => setCurrentUser(null)}
            />

            <main className="board-layout">

                <CategoryMenu
                    categories={categories}
                    selectedCategoryId={selectedCategoryId}
                    onSelectCategory={setSelectedCategoryId}
                />

                <section className="content-panel">

                    <div className="page-heading">

                        <div>
                            <span className="eyebrow">게시판</span>

                            <h1>
                                {selectedCategoryId
                                    ? `${categories.find(
                                        c => c.categoryId === selectedCategoryId
                                    )?.categoryName} 게시글`
                                    : "전체 게시글"}
                            </h1>
                        </div>

                        {currentUser && (
                            <Link
                                to="/posts/create"
                                className="primary-link"
                            >
                                글쓰기
                            </Link>
                        )}

                    </div>

                    <PostList posts={posts} />

                </section>

            </main>
        </>
    );
}