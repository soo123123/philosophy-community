export default function SignupForm({
    email,
    nickname,
    password,
    passwordConfirm,
    onEmailChange,
    onNicknameChange,
    onPasswordChange,
    onPasswordConfirmChange,
    onSubmit
}) {
    return (
        <form className="auth-card" onSubmit={onSubmit}>
            <div className="auth-heading">
                <h1>회원가입</h1>
                <p>철학 커뮤니티에 오신 것을 환영합니다.</p>
            </div>

            <label>
                이메일
                <input
                    type="email"
                    placeholder="이메일을 입력해주세요"
                    value={email}
                    onChange={(e) => onEmailChange(e.target.value)}
                    required
                />
            </label>

            <label>
                닉네임
                <input
                    type="text"
                    placeholder="닉네임을 입력해주세요"
                    value={nickname}
                    onChange={(e) => onNicknameChange(e.target.value)}
                    required
                />
            </label>

            <label>
                비밀번호
                <input
                    type="password"
                    placeholder="비밀번호를 입력해주세요"
                    value={password}
                    onChange={(e) => onPasswordChange(e.target.value)}
                    required
                />
            </label>

            <label>
                비밀번호 확인
                <input
                    type="password"
                    placeholder="비밀번호를 다시 입력해주세요"
                    value={passwordConfirm}
                    onChange={(e) => onPasswordConfirmChange(e.target.value)}
                    required
                />
            </label>

            <button type="submit" className="primary-button">
                회원가입
            </button>
        </form>
    );
}
