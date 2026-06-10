import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import LoginForm from "../components/LoginForm";
import Navbar from "../components/Navbar";

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUser({
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
        <>
            <Navbar />
            <main className="auth-page">
                <LoginForm
                    email={email}
                    password={password}
                    onEmailChange={setEmail}
                    onPasswordChange={setPassword}
                    onSubmit={handleSubmit}
                />
                <p className="auth-link">
                    계정이 없으신가요? <Link to="/signup">회원가입</Link>
                </p>
            </main>
        </>
    );
}

export default LoginPage;
