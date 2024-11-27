import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";

const Profile = () => {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [profileImage, setProfileImage] = useState(""); // 프로필 이미지 상태
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const id = sessionStorage.getItem("loggedInUser");
    const pw = sessionStorage.getItem("loggedInApiKey");

    if (!id || !pw) {
      navigate("/signin");
    } else {
      setUserId(id);
      setUserPassword(pw);

      const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlist(storedWishlist);

      const storedProfileImage = localStorage.getItem("profileImage");
      setProfileImage(storedProfileImage || "https://via.placeholder.com/100");
    }
  }, [navigate]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (inputPassword === userPassword) {
      setIsAuthorized(true);
      setError("");
    } else {
      setError("비밀번호가 올바르지 않습니다.");
    }
  };

  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result;

        // 이미지 리사이즈
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = 100;
          canvas.height = 100;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, 100, 100);

          const resizedImageUrl = canvas.toDataURL("image/png"); // 리사이즈된 이미지 URL 생성
          localStorage.setItem("profileImage", resizedImageUrl); // localStorage에 저장
          setProfileImage(resizedImageUrl); // 상태 업데이트
        };
      };
      reader.readAsDataURL(file);
    }
  };


  if (!isAuthorized) {
    return (
      <div className={styles.profileContainer}>
        <div className={styles.authCard}>
          <h2>프로필 확인</h2>
          <form onSubmit={handlePasswordSubmit} className={styles.authForm}>
            <label htmlFor="password">비밀번호를 입력하세요:</label>
            <input
              type="password"
              id="password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              className={styles.input}
              required
            />
            <button type="submit" className={styles.submitButton}>
              확인
            </button>
          </form>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <div className={styles.profileHeader}>
          <img
            src={profileImage} // 로컬 스토리지에서 가져온 이미지 사용
            alt="프로필"
            className={styles.profilePicture}
          />
          <h3>{userId}</h3>
          <p>Member Since: {new Date().toLocaleDateString()}</p>
          <label htmlFor="profileUpload" className={styles.uploadButton}>
            Upload New Photo
          </label>
          <input
            type="file"
            id="profileUpload"
            className={styles.hiddenFileInput} // 파일 입력을 숨김
            accept="image/*"
            onChange={handleProfileImageUpload}
          />
        </div>
        <div className={styles.profileDetails}>
          <h3>사용자 정보</h3>
          <form>
            <div className={styles.formGroup}>
            <label htmlFor="username">사용자 ID</label>
              <input
                type="text"
                id="username"
                value={userId}
                readOnly
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                value={userPassword}
                readOnly
                className={styles.input}
              />
            </div>
            <button type="button" className={styles.updateButton}>
              정보 수정
            </button>
          </form>
        </div>
      </div>
      <div className={styles.wishlistSection}>
        <h3>위시리스트</h3>
        {wishlist.length > 0 ? (
          <ul className={styles.wishlist}>
            {wishlist.map((movie) => (
              <li key={movie.id} className={styles.movieItem}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className={styles.poster}
                />
                <div>
                  <h4>{movie.title}</h4>
                  <p>평점: {movie.vote_average}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.emptyMessage}>위시리스트가 비어 있습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
