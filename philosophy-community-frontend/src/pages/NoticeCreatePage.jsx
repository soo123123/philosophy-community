import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { createNotice } from "../api/noticeApi";
import { getMyProfile } from "../api/authApi";

import Navbar from "../components/Navbar";

export default function NoticeCreatePage() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {

        const fetchMyInfo = async () => {

            if (!localStorage.getItem("accessToken")) {
                setLoading(false);
                return;
            }

            try {

                const response = await getMyProfile();

                setCurrentUser(response.data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }
        };

        fetchMyInfo();

    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await createNotice({
                title,
                content
            });

            navigate("/notices");

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

                <h1>공지사항 작성</h1>

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
                        등록
                    </button>

                </form>

            </main>
        </>
    );
}