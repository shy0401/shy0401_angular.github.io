import React from "react";
import styles from "./Banner.module.css"; // CSS Modules 사용

const Banner = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>영화, 시리즈 등을 무제한으로</h1>
        <p className={styles.subtitle}>
          4,900원으로 시작하세요. 멤버십은 언제든지 해지 가능합니다.
        </p>
        <form className={styles.form}>
          <h3 className={styles.formTitle}>
            시청할 준비가 되셨나요? 멤버십을 등록하거나 재시작하려면 이메일 주소를 입력하세요.
          </h3>
          <div className={styles.inputContainer}>
            <input
              type="email"
              placeholder="이메일 주소"
              className={styles.input}
              required
            />
            <button type="submit" className={styles.button}>
              시작하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Banner;
