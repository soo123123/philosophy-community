import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await login({
                email,
                password
            });

            localStorage.setItem(
                "accessToken",
                response.data.accessToken
            );

            navigate("/");

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">
                로그인
            </button>
        </form>
    );
}

export default LoginPage;