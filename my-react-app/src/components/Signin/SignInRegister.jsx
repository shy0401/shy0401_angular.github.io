import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignInRegister.css';
import { validateEmail } from '../../utils/validation';
import { saveToLocalStorage, getFromLocalStorage } from '../../utils/api';

const SignInRegister = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const navigate = useNavigate();

  const toggleCard = () => setIsLoginVisible(!isLoginVisible);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error('이메일 형식이 올바르지 않습니다.');
      return;
    }

    const savedUser = getFromLocalStorage(email);
    if (savedUser && savedUser.password === password) {
      if (rememberMe) {
        localStorage.setItem('rememberMe', email);
      }
      toast.success('로그인 성공!');
      navigate('/');
    } else {
      toast.error('로그인 실패. 이메일 또는 비밀번호를 확인하세요.');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!validateEmail(registerEmail)) {
      toast.error('이메일 형식이 올바르지 않습니다.');
      return;
    }

    if (registerPassword !== confirmPassword) {
      toast.error('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!acceptTerms) {
      toast.error('약관에 동의해야 합니다.');
      return;
    }

    saveToLocalStorage(registerEmail, { email: registerEmail, password: registerPassword });
    toast.success('회원가입 성공! 로그인 페이지로 이동합니다.');
    toggleCard();
  };

  return (
    <div className="signin-container">
      <div className={`card ${isLoginVisible ? '' : 'hidden'}`} id="login">
        <form onSubmit={handleLogin}>
          <h1>로그인</h1>
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
          <div className="input-group checkbox">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label>Remember me</label>
          </div>
          <button type="submit">로그인</button>
        </form>
        <a onClick={toggleCard}>회원가입으로 이동</a>
      </div>

      <div className={`card ${!isLoginVisible ? '' : 'hidden'}`} id="register">
        <form onSubmit={handleRegister}>
          <h1>회원가입</h1>
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
          <div className="input-group checkbox">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
            />
            <label>약관에 동의합니다</label>
          </div>
          <button type="submit">회원가입</button>
        </form>
        <a onClick={toggleCard}>로그인으로 이동</a>
      </div>
    </div>
  );
};

export default SignInRegister;
