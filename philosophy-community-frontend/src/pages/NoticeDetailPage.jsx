import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMyProfile } from "../api/authApi";
import { deleteNotice, fetchNoticeDetail } from "../api/noticeApi";
import Navbar from "../components/Navbar";

export default function NoticeDetailPage() {
    const { noticeId } = useParams();
    const navigate = useNavigate();
    const [noticeDetail, setNoticeDetail] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const loadNotice = async () => {
            const response = await fetchNoticeDetail(noticeId);
            setNoticeDetail(response.data);
        };

        const loadCurrentUser = async () => {
            if (!localStorage.getItem("accessToken")) {
                return;
            }

            const response = await getMyProfile();
            setCurrentUser(response.data);
        };

        loadNotice();
        loadCurrentUser();
    }, [noticeId]);

    const handleDelete = async () => {
        if (!window.confirm("공지사항을 삭제하시겠습니까?")) {
            return;
        }

        await deleteNotice(noticeId);
        navigate("/notices");
    };

    if (!noticeDetail) {
        return <div>로딩중...</div>;
    }

    return (
        <>
            <Navbar currentUser={currentUser} onLogout={() => setCurrentUser(null)} />
            <main className="detail-layout">
                <article className="post-detail">
                    <span className="category-badge">공지</span>
                    <h1>{noticeDetail.title}</h1>
                    <div className="post-meta">
                        <span>{noticeDetail.authorNickname}</span>
                        <span>{noticeDetail.createdAt?.slice(0, 16).replace("T", " ")}</span>
                    </div>

                    {currentUser?.roleName === "ADMIN" && (
                        <div className="detail-actions">
                            <Link to={`/notices/edit/${noticeDetail.noticeId}`}>수정</Link>
                            <button type="button" onClick={handleDelete}>
                                삭제
                            </button>
                        </div>
                    )}

                    <p className="post-content">{noticeDetail.content}</p>
                </article>
            </main>
        </>
    );
}
