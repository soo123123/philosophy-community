import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../api/authApi";
import Navbar from "../components/Navbar";
import SignupForm from "../components/SignupForm";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        await signupUser({
            email,
            nickname,
            password
        });

        navigate("/login");
    };

    return (
        <>
            <Navbar />
            <main className="auth-page">
                <SignupForm
                    email={email}
                    nickname={nickname}
                    password={password}
                    passwordConfirm={passwordConfirm}
                    onEmailChange={setEmail}
                    onNicknameChange={setNickname}
                    onPasswordChange={setPassword}
                    onPasswordConfirmChange={setPasswordConfirm}
                    onSubmit={handleSubmit}
                />
                <p className="auth-link">
                    이미 계정이 있으신가요? <Link to="/login">로그인</Link>
                </p>
            </main>
        </>
    );
}
