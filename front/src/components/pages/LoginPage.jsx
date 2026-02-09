import {useState} from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext.jsx";
import "./LoginPage.css";

const LoginPage = ({ isModal, modalClose}) => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordType, setPasswordType] = useState("password");
  const [isPassType, setIsPassType] = useState(false);

  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  const handleClickPassType = () => {
    if ("password" === passwordType) {
      setPasswordType("text");
      setIsPassType(true);
    } else {
      setPasswordType("password");
      setIsPassType(false);
    }
  };

  const handleClickLogin = async (e)=>{
    e.preventDefault();

    const result = await login();
      if(result.success){
        alert(`로그인되었습니다`)
        setEmail("")
        setPassword("")
        modalClose();
        navigate("/");
      }else {
        alert(result.message)
      }

  }

  const handleClickGoSignUp = () => {
    modalClose();
    navigate("/signup");
  };

  return (
    // isModalActive가 true일 때 "active" 클래스를 추가합니다.
    <div id="LoginPage" className={isModal ? "active" : ""}>
      <div className="loginPage">
        {/* 닫기 버튼에는 부모에게서 받은 modalClose 함수를 연결합니다. */}
        <button className="close" onClick={modalClose}>
          &times;
        </button>
        <h1>로그인</h1>
        <form className="login-form">
          <input
            type="text"
            placeholder="이메일"
            value={email}
            onChange={handleChangeEmail}
          />
          <input
            type={passwordType}
            placeholder="비밀번호"
            value={password}
            onChange={handleChangePassword}
          />
          <button
            className={`eye ${isPassType ? "active" : ""}`}
            type="button"
            onClick={handleClickPassType}
          >
            비밀번호 보기
          </button>
          <div className="login-form-find">
            <button type="button" className="find">
              비밀번호 찾기
            </button>
          </div>
          <div className="sign-btn">
            <button className="login" onClick={handleClickLogin}>로그인</button>
            <p className="sign-or">또는</p>
            <button className="signup" onClick={handleClickGoSignUp}>
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
