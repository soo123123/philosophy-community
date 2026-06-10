import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchNoticeDetail, updateNotice } from "../api/noticeApi";
import { getMyProfile } from "../api/authApi";
import Navbar from "../components/Navbar";

export default function NoticeEditPage() {

    const { noticeId } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadNotice = async () => {

            try {

                const response =
                    await fetchNoticeDetail(noticeId);

                setTitle(response.data.title);
                setContent(response.data.content);

            } catch (error) {

                console.error(error);

            }
        };

        const loadCurrentUser = async () => {

            if (!localStorage.getItem("accessToken")) {
                setLoading(false);
                return;
            }

            try {

                const response =
                    await getMyProfile();

                setCurrentUser(response.data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }
        };

        loadNotice();
        loadCurrentUser();

    }, [noticeId]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await updateNotice(
                noticeId,
                {
                    title,
                    content
                }
            );

            navigate(`/notices/${noticeId}`);

        } catch (error) {

            console.error(error);

        }
    };

    if (loading) {
        return null;
    }

    return (
        <>
            <Navbar
                currentUser={currentUser}
                onLogout={() => setCurrentUser(null)}
            />

            <main className="form-page">

                <h1>공지사항 수정</h1>

                <form
                    className="editor-form"
                    onSubmit={handleSubmit}
                >

                    <label>
                        제목
                        <input
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            placeholder="공지사항 제목을 입력해주세요"
                            required
                        />
                    </label>

                    <label>
                        내용
                        <textarea
                            value={content}
                            onChange={(e) =>
                                setContent(e.target.value)
                            }
                            placeholder="공지사항 내용을 입력해주세요"
                            required
                        />
                    </label>

                    <button
                        type="submit"
                        className="primary-button"
                    >
                        수정 완료
                    </button>

                </form>

            </main>
        </>
    );
}