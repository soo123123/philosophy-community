import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNotice } from "../api/noticeApi";
import Navbar from "../components/Navbar";

export default function NoticeCreatePage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await createNotice({ title, content });
        navigate("/notices");
    };

    return (
        <>
            <Navbar />
            <main className="form-page">
                <h1>공지사항 작성</h1>
                <form className="editor-form" onSubmit={handleSubmit}>
                    <label>
                        제목
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="공지사항 제목을 입력해주세요"
                            required
                        />
                    </label>
                    <label>
                        내용
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="공지사항 내용을 입력해주세요"
                            required
                        />
                    </label>
                    <button type="submit" className="primary-button">
                        등록
                    </button>
                </form>
            </main>
        </>
    );
}
