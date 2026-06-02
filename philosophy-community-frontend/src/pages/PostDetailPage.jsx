import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../api/postApi";

import { Link } from "react-router-dom";

export default function PostDetailPage() {
    const { postId } = useParams();

    const [post, setPost] = useState(null);

    useEffect(() => {
        fetchPost();
    }, []);

    const fetchPost = async () => {
        try {
            const response = await getPost(postId);

            setPost(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    if (!post) {
        return <div>로딩중...</div>;
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <Link to={`/posts/edit/${post.postId}`}>
                수정
            </Link>
        </div>
    );
}