import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/postApi";

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

            <form onSubmit={handleSubmit}>

                <div>
                    <input
                        type="text"
                        placeholder="제목"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <textarea
                        placeholder="내용"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                <button type="submit">
                    등록
                </button>

            </form>
        </div>
    );
}