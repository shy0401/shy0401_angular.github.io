import React, { useState } from 'react';
import './SignIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoginVisible, setIsLoginVisible] = useState(true);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('로그인 요청:', { email, password });
    // 여기에 백엔드 로그인 API 호출 추가
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (registerPassword !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    console.log('회원가입 요청:', { registerEmail, registerPassword });
    // 여기에 백엔드 회원가입 API 호출 추가
  };

  return (
    <div className="signin-container">
      {isLoginVisible ? (
        <div className="card">
          <h1>로그인</h1>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">로그인</button>
          </form>
          <a onClick={() => setIsLoginVisible(false)}>회원가입으로 이동</a>
        </div>
      ) : (
        <div className="card">
          <h1>회원가입</h1>
          <form onSubmit={handleRegister}>
            <div className="input-group">
              <label>이메일</label>
              <input
                type="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>비밀번호</label>
              <input
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>비밀번호 확인</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">회원가입</button>
          </form>
          <a onClick={() => setIsLoginVisible(true)}>로그인으로 이동</a>
        </div>
      )}
    </div>
  );
};

export default SignIn;
