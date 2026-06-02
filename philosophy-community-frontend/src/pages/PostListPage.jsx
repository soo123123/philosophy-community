import { useEffect, useState } from "react";
import { getPosts } from "../api/postApi";

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

            {posts.map((post) => (
                <div key={post.postId}>
                    <h3>{post.title}</h3>
                </div>
            ))}
        </div>
    );
}