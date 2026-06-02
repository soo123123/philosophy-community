import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getPost,
    updatePost
} from "../api/postApi";

import PostEditor from "../components/PostEditor";

export default function PostEditPage() {

    const { postId } = useParams();

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        fetchPost();
    }, []);

    const fetchPost = async () => {

        try {

            const response = await getPost(postId);

            setTitle(response.data.title);
            setContent(response.data.content);

        } catch (error) {

            console.error(error);

        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await updatePost(
                postId,
                {
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
        <div>
            <h1>게시글 수정</h1>

            <PostEditor
                title={title}
                content={content}
                onTitleChange={setTitle}
                onContentChange={setContent}
                onSubmit={handleSubmit}
                buttonText="수정"
            />
        </div>
    );
}