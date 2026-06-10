import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyProfile } from "../api/authApi";
import { fetchNotices } from "../api/noticeApi";
import Navbar from "../components/Navbar";
import NoticeBoard from "../components/NoticeBoard";

export default function NoticeListPage() {
    const [notices, setNotices] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const loadNotices = async () => {
            const response = await fetchNotices();
            setNotices(response.data);
        };

        const loadCurrentUser = async () => {
            if (!localStorage.getItem("accessToken")) {
                return;
            }

            const response = await getMyProfile();
            setCurrentUser(response.data);
        };

        loadNotices();
        loadCurrentUser();
    }, []);

    return (
        <>
            <Navbar currentUser={currentUser} onLogout={() => setCurrentUser(null)} />
            <main className="content-panel standalone-panel">
                <div className="page-heading">
                    <div>
                        <span className="eyebrow">공지사항</span>
                        <h1>공지사항</h1>
                    </div>
                    {currentUser?.roleName === "ADMIN" && (
                        <Link to="/notices/create" className="primary-link">
                            공지사항 등록
                        </Link>
                    )}
                </div>
                <NoticeBoard notices={notices} />
            </main>
        </>
    );
}
