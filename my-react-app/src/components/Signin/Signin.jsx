import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Signin.module.css";

const Signin = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "", confirmPassword: "" });
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 추가
  const navigate = useNavigate();

  const getUsers = () => JSON.parse(localStorage.getItem("users") || "[]");

  const tryRegister = (username, password) => {
    const users = getUsers();
    if (users.some((user) => user.username === username)) {
      throw new Error("이미 존재하는 사용자입니다.");
    }
    const newUser = { username, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
  };

  const tryLogin = (username, password) => {
    const users = getUsers();
    const user = users.find((u) => u.username === username && u.password === password);
    if (!user) {
      throw new Error("잘못된 사용자명 또는 비밀번호입니다.");
    }
    return user;
  };

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
    setError(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, confirmPassword } = formData;

    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          throw new Error("비밀번호가 일치하지 않습니다.");
        }
        tryRegister(username, password);
        toast.success("회원가입 성공! 이제 로그인하세요.");
        setIsSignUp(false);
      } else {
        const user = tryLogin(username, password);
        localStorage.setItem("TMDb-Key", password);
        sessionStorage.setItem("loggedInApiKey", password);
        sessionStorage.setItem("loggedInUser", username); // 사용자 정보 저장
        setIsLoggedIn(true); // 로그인 상태 업데이트
        toast.success(`${user.username}님, 로그인 성공!`);
        navigate("/profile");
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className={styles.signinSection}>
      <div className={styles.signinContainer}>
        <h6 className={styles.toggleGroup}>
          <span
            className={!isSignUp ? styles.activeToggle : ""}
            onClick={() => setIsSignUp(false)}
          >
            로그인
          </span>
          <span
            className={isSignUp ? styles.activeToggle : ""}
            onClick={() => setIsSignUp(true)}
          >
            회원가입
          </span>
        </h6>
        <div className={styles.signinCardWrap}>
          <div
            className={`${styles.signinCardWrapper} ${
              isSignUp ? styles.flipToBack : ""
            }`}
          >
            <div className={styles.signinCardFront}>
              <form onSubmit={handleSubmit}>
                <h4 className={styles.signinTitle}>로그인</h4>
                {error && <div className={styles.errorMessage}>{error}</div>}
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    name="username"
                    className={styles.inputField}
                    placeholder="사용자명"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <input
                    type="password"
                    name="password"
                    className={styles.inputField}
                    placeholder="비밀번호 (API 키)"
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className={styles.submitButton}>
                  로그인
                </button>
              </form>
            </div>
            <div className={styles.signinCardBack}>
              <form onSubmit={handleSubmit}>
                <h4 className={styles.signinTitle}>회원가입</h4>
                {error && <div className={styles.errorMessage}>{error}</div>}
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    name="username"
                    className={styles.inputField}
                    placeholder="사용자명"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <input
                    type="password"
                    name="password"
                    className={styles.inputField}
                    placeholder="비밀번호"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <input
                    type="password"
                    name="confirmPassword"
                    className={styles.inputField}
                    placeholder="비밀번호 확인"
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className={styles.submitButton}>
                  회원가입
                </button>
              </form>
            </div>
          </div>
        </div>
        {isLoggedIn && <p className={styles.loggedInMessage}>현재 로그인 상태입니다.</p>} {/* 로그인 상태 표시 */}
      </div>
    </div>
  );
};

export default Signin;
