import { useEffect, useState } from "react";
import { getPost } from "../api/postApi";

import { Link, useNavigate, useParams } from "react-router-dom";
import { deletePost } from "../api/postApi";

export default function PostDetailPage() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();


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

    const handleDelete = async () => {

        const isConfirmed = window.confirm(
            "정말 삭제하시겠습니까?"
        );

        if (!isConfirmed) {
            return;
        }

        try {

            await deletePost(post.postId);

            navigate("/");

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

            <div>
                <Link to={`/posts/edit/${post.postId}`}>
                    수정
                </Link>
            </div>

            <div>
                <button onClick={handleDelete}>
                    삭제
                </button>
            </div>
        </div>
    );
}