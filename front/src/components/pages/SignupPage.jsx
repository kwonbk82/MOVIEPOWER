import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";
import axios from "axios";

const SignupPage = () => {
  const navigate = useNavigate();

  // noti 관련 Ref
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordCheckRef = useRef();
  const nickNameRef = useRef();
  const birthDateRef = useRef();

  // foucus 관련 Ref
  const nameFocusRef = useRef();
  const emailFocusRef = useRef();
  const passwordFocusRef = useRef();
  const passwordCheckFocusRef = useRef();
  const nickNameFocusRef = useRef();
  const birthDateFocusRef = useRef();

  // 회원정보 입력
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickName, setNickName] = useState("");
  const [gender, setGender] = useState("MALE");
  const [birthDate, setBirthDate] = useState("");

  // 비밀번호 비밀번호 확인 타입
  const [passwordType, setPasswordType] = useState("password");
  const [passwordCheckType, setPasswordCheckType] = useState("password");
  const [isPassType, setIsPassType] = useState(false);
  const [isPassCheckType, setIsPassCheckType] = useState(false);

  // 성별 버튼 확인
  const [isCheck, setIsCheck] = useState(true);

  // 확인 버튼 클릭 확인
  const [isEmail, setIsEmail] = useState(false);
  const [isNickName, setIsNickName] = useState(false);


  // 비밀번호 유효성
  const [isPassword, setIsPassword] = useState(true);
  const [isPasswordCheck, setIsPasswordCheck] = useState(true);

  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordCheckMessage, setPasswordCheckMessage] = useState("");

  //이메일 유효성
  const [emailMessage, setEmailMessage] = useState("");

  // 비밀형식 확인
  const [isSignupPass, setIsSignupPass] = useState(false);
  const handleChangeName = (e) => {
    nameRef.current.style.display = "none";
    setName(e.target.value);
  };
  const handleChangeEmail = (e) => {
    emailRef.current.style.display = "none";
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    passwordRef.current.style.display = "none";
    setPassword(e.target.value);
  };

  const handleChangePasswordCheck = (e) => {
    passwordCheckRef.current.style.display = "none";
    setPasswordCheck(e.target.value);
  };
  const handleChangeNickName = (e) => {
    nickNameRef.current.style.display = "none";
    setNickName(e.target.value);
  };

  const handleChangeBirthDate = (e) => {
    birthDateRef.current.style.display = "none";
    setBirthDate(e.target.value);
  };

  const handleClickIsEmail = async() => {
    try {
      const res = await axios.get("/api/user/check/email",{
        params: { email: email }
      })
      if (res.data === true) {
        alert("이미 사용중인 이메일입니다.");
        setIsEmail(false);
      } else {
        alert("사용가능한 이메일입니다.");
        setIsEmail(true);
        emailRef.current.style.display = "none";
      }
    }catch (e) {
      console.error("이메일 중복 확인 실패:", e);
    }
  };

  const handleClickIsNickName = async () => {
    try {
      const res = await axios.get("/api/user/check/nickName",{
        params: { nickName: nickName }
      })
      if (res.data === true) {
        alert("이미 사용중인 닉네임입니다.");
        setIsNickName(false);
      } else {
        alert("사용가능한 닉네임입니다.");
        setIsNickName(true);
      }
    }catch (e) {
      console.error("닉네임 중복 확인 실패:", e);
    }
  };

  const handleClickIsCheck = () => {
    setIsCheck(!isCheck);
    if (!isCheck) {
      setGender("MALE");
    } else {
      setGender("FEMALE");
    }
  };
  //이메일 작성시 유효성 검사
  const emailRegExp =
      /^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-Za-z0-9.]*[A-Za-z]{2,3}$/;

  useEffect(()=>{
    if (!emailRef.current) return; // 연결 전 guard

    if (!email) {
      // 비어있을 때는 안내 숨기기
      emailRef.current.style.display = "none";
      setEmailMessage("");
      return;
    }
    emailRef.current.style.display = "block";
    if (!emailRegExp.test(email)) {
      emailRef.current.style.color = "red";
      setEmailMessage("이메일의 형식이 올바르지 않습니다!");
      setIsEmail(true);
      setIsSignupPass(false);
    } else {
      emailRef.current.style.color = "green";
      setEmailMessage("이메일 중복확인이 필요합니다");
      setIsEmail(true);
      setIsSignupPass(true);
    }
  },[email])

  // 비밀번호 작성시 유효성 검사
  const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

  useEffect(() => {
    if (!passwordRef.current) return; // 연결 전 guard
    if (!passwordCheckRef.current) return;

    // 비밀번호
    if (!password) {
      // 비어있을 때는 안내 숨기기
      passwordRef.current.style.display = "none";
      setPasswordMessage("");
      return;
    }

    passwordRef.current.style.display = "block";
    if (!passwordRegExp.test(password)) {
      passwordRef.current.style.color = "red";
      setPasswordMessage("비밀번호 형식이 올바르지 않습니다.");
      setIsPassword(true);
      setIsSignupPass(false);
    } else {
      passwordRef.current.style.color = "green";
      setPasswordMessage("사용 가능한 비밀번호입니다.");
      setIsPassword(true);
      setIsSignupPass(true);
    }

    // 비밀번호 확인
    if (!passwordCheck) {
      passwordCheckRef.current.style.display = "none";
      setPasswordCheckMessage("");
      return;
    }

    passwordCheckRef.current.style.display = "block";
    if (password !== passwordCheck) {
      passwordCheckRef.current.style.color = "red";
      setPasswordCheckMessage("비밀번호가 일치하지 않습니다.");
      setIsPasswordCheck(true);
    } else {
      passwordCheckRef.current.style.color = "green";
      setPasswordCheckMessage("비밀번호가 일치합니다.");
      setIsPasswordCheck(true);
    }
  }, [password, passwordCheck]);

  const handleClickPassType = () => {
    if ("password" === passwordType) {
      setPasswordType("text");
      setIsPassType(true);
    } else {
      setPasswordType("password");
      setIsPassType(false);
    }
  };
  const handleClickPassCheckType = () => {
    if ("password" === passwordCheckType) {
      setPasswordCheckType("text");
      setIsPassCheckType(true);
    } else {
      setPasswordCheckType("password");
      setIsPassCheckType(false);
    }
  };

  const handleClickSignup = async () => {
    const nameValue = name.trim();
    const emailValue = email.trim();
    const passwordValue = password.trim();
    const passwordCheckValue = passwordCheck.trim();
    const nickNameValue = nickName.trim();
    const birthDateValue = birthDate.trim();

    if (!nameValue) {
      nameRef.current.style.display = "block";
      nameFocusRef.current.focus();
      return;
    } else if (!emailValue) {
      emailRef.current.style.display = "block";
      emailFocusRef.current.focus();
      return;
    } else if (!passwordValue) {
      passwordRef.current.style.color = "red";
      passwordRef.current.style.display = "block";
      passwordFocusRef.current.focus();
      setIsPassword(false);
      return;
    } else if (!passwordCheckValue) {
      passwordCheckRef.current.style.color = "red";
      passwordCheckRef.current.style.display = "block";
      passwordCheckFocusRef.current.focus();
      setIsPasswordCheck(false);
      return;
    } else if (!nickNameValue) {
      nickNameRef.current.style.display = "block";
      nickNameFocusRef.current.focus();
      return;
    } else if (!birthDateValue) {
      birthDateRef.current.style.display = "block";
      birthDateFocusRef.current.focus();
      return;
    }
    if (!isEmail) {
      alert("이메일 중복 확인을 완료해주세요.");
      return;
    }

    // (2) 닉네임 중복 확인 여부
    if (!isNickName) {
      alert("닉네임 중복 확인을 완료해주세요.");
      return;
    }

    // (3) 비밀번호 유효성(정규식) 확인
    if (!isSignupPass) {
      alert("비밀번호 형식을 확인해주세요.");
      return;
    }

    // (4) 비밀번호와 확인용 비밀번호 일치 여부
    if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (isEmail && isNickName && isSignupPass && password === passwordCheck) {
      try {
        await axios.post("/api/user/join",{
          name,
          email,
          password,
          nickName,
          gender,
          birthDate
        });
        alert(`회원가입이 완료되었습니다! 로그인 해주세요!`)
        navigate("/", { state: { showLogin: true } });
      }catch (e){
        alert('회원가입에 실패하셨습니다')
        console.error("회원가입 실패:", e);
      }
  }
    };
  return (
    <div id="SignupPage">
      <div className="signup-page">
        <h1>회원가입</h1>
        <div className="sign-name">
          <p>이름</p>
          <input
            type="text"
            value={name}
            onChange={handleChangeName}
            ref={nameFocusRef}
          />
          <p className="noti" ref={nameRef}>
            이름을 입력해주세요.
          </p>
        </div>
        <div className="sign-email">
          <p>이메일</p>
          <input
            type="text"
            value={email}
            onChange={handleChangeEmail}
            ref={emailFocusRef}
          />
          <button className="check" onClick={handleClickIsEmail}>
            중복 확인
          </button>
          <p className="noti" ref={emailRef}>
            {isEmail ? emailMessage : "이메일을 입력해주세요."}
          </p>
        </div>
        <div className="sign-password">
          <p>비밀번호</p>
          <input
            type={passwordType}
            value={password}
            onChange={handleChangePassword}
            placeholder="숫자+영문자+특수문자 조합으로 8자리 이상 입력"
            ref={passwordFocusRef}
          />
          <button
            className={`eye ${isPassType ? "active" : ""}`}
            onClick={handleClickPassType}
          >
            비밀번호보기
          </button>
          <p className="noti" ref={passwordRef}>
            {isPassword ? passwordMessage : "비밀번호를 입력해주세요."}
          </p>
        </div>
        <div className="sign-passwordCheck">
          <p>비밀번호 확인</p>
          <input
            type={passwordCheckType}
            value={passwordCheck}
            onChange={handleChangePasswordCheck}
            ref={passwordCheckFocusRef}
          />
          <button
            className={`eye ${isPassCheckType ? "active" : ""}`}
            onClick={handleClickPassCheckType}
          >
            비밀번호보기
          </button>
          <p className="noti" ref={passwordCheckRef}>
            {isPasswordCheck
              ? passwordCheckMessage
              : "비밀번호 확인을 해주세요."}
          </p>
        </div>
        <div className="sign-nickname">
          <p>닉네임</p>
          <input
            type="text"
            value={nickName}
            onChange={handleChangeNickName}
            ref={nickNameFocusRef}
          />
          <button className="check" onClick={handleClickIsNickName}>
            중복확인
          </button>
          <p className="noti" ref={nickNameRef}>
            닉네임을 입력해주세요.
          </p>
        </div>
        <div className="sign-gender">
          <p>성별</p>
          <button
            className={`MALE ${isCheck ? "active" : ""}`}
            onClick={handleClickIsCheck}
          >
            남성
          </button>
          <button
            className={`FEMALE ${isCheck ? "" : "active"}`}
            onClick={handleClickIsCheck}
          >
            여성
          </button>
        </div>
        <div className="sign-birthdate">
          <p>생년월일</p>
          <input
            type="date"
            value={birthDate}
            onChange={handleChangeBirthDate}
            ref={birthDateFocusRef}
          />
          <p className="noti" ref={birthDateRef}>
            생년월일을 입력해주세요.
          </p>
        </div>
        <button className="signup" onClick={handleClickSignup}>
          회원가입
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
