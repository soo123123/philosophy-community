import { useEffect, useState } from "react";
import { getPost } from "../api/postApi";

import { Link, useNavigate, useParams } from "react-router-dom";
import { deletePost } from "../api/postApi";
import { getMyProfile } from "../api/authApi";
import Navbar from "../components/Navbar";
import CommentSection from "../components/CommentSection";
import ReactionButton from "../components/ReactionButton";

export default function PostDetailPage() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await getPost(postId);

                setPost(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchMyInfo = async () => {
            if (!localStorage.getItem("accessToken")) {
                return;
            }

            const response = await getMyProfile();
            setCurrentUser(response.data);
        };

        fetchPost();
        fetchMyInfo();
    }, [postId]);

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

    const isAuthor = currentUser?.userId === post.userId;

    return (
        <>
            <Navbar
                currentUser={currentUser}
                onLogout={() => setCurrentUser(null)}
            />
            <main className="detail-layout">
                <article className="post-detail">
                    <span className="category-badge">{post.categoryName}</span>
                    <h1>{post.title}</h1>
                    <div className="post-meta">
                        <span>{post.authorNickname}</span>
                        <span>{post.createdAt?.slice(0, 16).replace("T", " ")}</span>
                        <span>조회 {post.viewCount}</span>
                        <span>댓글 {post.commentCount}</span>
                    </div>

                    {isAuthor && (
                        <div className="detail-actions">
                            <Link to={`/posts/edit/${post.postId}`}>수정</Link>
                            <button type="button" onClick={handleDelete}>
                                삭제
                            </button>
                        </div>
                    )}

                    <p className="post-content">{post.content}</p>
                    <ReactionButton postId={post.postId} currentUser={currentUser} />
                    <CommentSection postId={post.postId} currentUser={currentUser} />
                </article>
            </main>
        </>
    );
}
