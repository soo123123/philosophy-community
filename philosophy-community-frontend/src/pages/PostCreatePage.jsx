import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/postApi";
import PostEditor from "../components/PostEditor";

export default function PostCreatePage() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await createPost({
                title,
                content
            });

            navigate("/");

        } catch (error) {

            console.error(error);

        }
    };

    return (
        <div>
            <h1>게시글 작성</h1>

            <PostEditor
                title={title}
                content={content}
                onTitleChange={setTitle}
                onContentChange={setContent}
                onSubmit={handleSubmit}
                buttonText="등록"
            />
        </div>
    );
}