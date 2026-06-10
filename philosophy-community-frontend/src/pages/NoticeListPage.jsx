import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyProfile } from "../api/authApi";
import { fetchNotices } from "../api/noticeApi";
import Navbar from "../components/Navbar";
import NoticeBoard from "../components/NoticeBoard";

export default function NoticeListPage() {
    const [notices, setNotices] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadNotices = async () => {
            const response = await fetchNotices();
            setNotices(response.data);
        };

        const loadCurrentUser = async () => {
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

        loadNotices();
        loadCurrentUser();
    }, []);

    if (loading) {
        return null;
    }

    return (
        <>
            <Navbar
                currentUser={currentUser}
                onLogout={() => setCurrentUser(null)}
            />

            <main className="content-panel standalone-panel">
                <div className="page-heading">
                    <div>
                        <span className="eyebrow">공지사항</span>
                        <h1>공지사항</h1>
                    </div>

                    {currentUser?.roleName === "ADMIN" && (
                        <Link
                            to="/notices/create"
                            className="primary-link"
                        >
                            공지사항 등록
                        </Link>
                    )}
                </div>

                <NoticeBoard notices={notices} />
            </main>
        </>
    );
}