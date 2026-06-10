import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchNoticeDetail, updateNotice } from "../api/noticeApi";
import Navbar from "../components/Navbar";

export default function NoticeEditPage() {
    const { noticeId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        const loadNotice = async () => {
            const response = await fetchNoticeDetail(noticeId);
            setTitle(response.data.title);
            setContent(response.data.content);
        };

        loadNotice();
    }, [noticeId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await updateNotice(noticeId, { title, content });
        navigate(`/notices/${noticeId}`);
    };

    return (
        <>
            <Navbar />
            <main className="form-page">
                <h1>공지사항 수정</h1>
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
                        수정 완료
                    </button>
                </form>
            </main>
        </>
    );
}
