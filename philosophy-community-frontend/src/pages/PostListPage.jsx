import { useEffect, useState } from "react";
import { getPosts } from "../api/postApi";
import { getMyInfo } from "../api/authApi";
import PostList from "../components/PostList";

import { Link, useNavigate } from "react-router-dom";

export default function PostListPage() {

    const [posts, setPosts] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
            fetchPosts();
            fetchMyInfo();
        }, []);

    const fetchPosts = async () => {
        try {
            const response = await getPosts();

            setPosts(response.data);

        } catch (error) {
            console.error(error);
        }
    };

    const fetchMyInfo = async () => {
        try {
            const response = await getMyInfo();

            setCurrentUser(response.data);


        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = () => {

        localStorage.removeItem("accessToken");

        navigate("/login");
    };

    return (
        <div>
            <h1>게시글 목록</h1>

            {
                currentUser && (
                    <>
                        <p>
                            로그인 사용자 : {currentUser}
                        </p>
                        <button onClick={handleLogout}>
                            로그아웃
                        </button>
                    </>
                )
            }

            <Link to="/posts/create">
                글쓰기
            </Link>

            <PostList posts={posts} />
        </div>
    );
}