import { useEffect, useState } from "react";
import { getPosts } from "../api/postApi";
import PostList from "../components/PostList";

import { Link } from "react-router-dom";

export default function PostListPage() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
            fetchPosts();
        }, []);

    const fetchPosts = async () => {
        try {
            const response = await getPosts();

            setPosts(response.data);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>게시글 목록</h1>

            <Link to="/posts/create">
                글쓰기
            </Link>

            <PostList posts={posts} />
        </div>
    );
}