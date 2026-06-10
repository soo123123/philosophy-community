import { Link, NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/authApi";

export default function Navbar({ currentUser, onLogout }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        onLogout?.();
        navigate("/login");
    };

    return (
        <header className="navbar">
            <Link to="/" className="brand">
                <span className="brand-icon">◇</span>
                철학 커뮤니티
            </Link>

            <nav className="nav-links">
{/*                 <Link to="/">홈</Link> */}
                <NavLink to="/">게시판</NavLink>
                <NavLink to="/notices">공지사항</NavLink>
{/*                 <NavLink to="/categories">카테고리</NavLink> */}
            </nav>

            <div className="nav-actions">
                {currentUser ? (
                    <>
                        <span className="user-name">{currentUser.nickname}</span>
                        <button type="button" className="ghost-button" onClick={handleLogout}>
                            로그아웃
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="ghost-link">로그인</Link>
                        <Link to="/signup" className="primary-link">회원가입</Link>
                    </>
                )}
            </div>
        </header>
    );
}
