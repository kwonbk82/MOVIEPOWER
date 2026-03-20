import {useNavigate} from "react-router-dom";
import {useDelete} from "../../../hooks/UseDelete.js";
import {useState} from "react";
import axios from "axios";
import {useAuth} from "../../../contexts/AuthContext.jsx";

const MyPageUserInfo = ({user,logout}) => {
    const [editField, setEditField] = useState(null);
    const [tempValue, setTempValue] = useState("");
   const nav = useNavigate();
   const {refreshUser} = useAuth();
   const {requestDelete} = useDelete();
    const handleEditStart = (field, currentVal) => {
        setEditField(field);
        setTempValue(currentVal);
    };

    const handleUpdate = async (field)=>{
        const fieldNames = {
            name: "이름",
            email: "이메일",
            nickName: "닉네임",
            gender: "성별",
            birthDate: "생일"
        };
        try {
            await axios.patch(`/api/user/update/${user.id}`,{[field]:tempValue});
            await refreshUser();
            alert(`${fieldNames[field]}이(가) 수정되었습니다.`);
            setEditField(null);
            nav(0);
        }catch (e) {
            console.error("유저 정보 수정 실패:", e);
            alert("수정에 실패했습니다.");
        }
    }

    const handleDeleteAccount = (id)=>{
        if(!window.confirm("계정은 삭제하면 복구할 수 없습니다. 계속 진행할까요?")) return;
        requestDelete(`/api/user/delete/${id}`,"계정",()=>{
            logout();
            nav("/");
        });

    }
    return(
        <section>
            <h3 className="content-title">👤 내 정보</h3>
            <div className="info-card">
                <div className="info-row">
                    <div className="info-left">
                        <p><strong>이름 : </strong>
                            {editField === "name" ? (
                                <input
                                    value={tempValue}
                                    onChange={(e) => setTempValue(e.target.value)}
                                />
                            ) : (
                                user.name
                            )}
                        </p>
                    </div>
                    {editField === "name" ? (
                        <button className="edit-btn save-btn" onClick={() => handleUpdate("name")}>완료</button>
                    ) : (
                        <button className="edit-btn" onClick={() => handleEditStart("name", user.name)}>수정</button>
                    )}
                </div>
                <div className="info-row">
                    <div className="info-left">
                        <p><strong>이메일 : </strong>
                            {editField === "email" ? (
                                <input
                                    value={tempValue}
                                    onChange={(e) => setTempValue(e.target.value)}
                                />
                            ) : (
                                user.email
                            )}
                        </p>
                    </div>
                    {editField === "email" ? (
                        <button className="edit-btn save-btn" onClick={() => handleUpdate("email")}>완료</button>
                    ) : (
                        <button className="edit-btn" onClick={() => handleEditStart("email", user.email)}>수정</button>
                    )}
                </div>
                <div className="info-row">
                    <div className="info-left">
                        <p><strong>닉네임 : </strong>
                            {editField === "nickName" ? (
                                <input
                                    value={tempValue}
                                    onChange={(e) => setTempValue(e.target.value)}
                                />
                            ) : (
                                user.nickName
                            )}
                        </p>
                    </div>
                    {editField === "nickName" ? (
                        <button className="edit-btn save-btn" onClick={() => handleUpdate("nickName")}>완료</button>
                    ) : (
                        <button className="edit-btn" onClick={() => handleEditStart("nickName", user.nickName)}>수정</button>
                    )}
                </div>
                <div className="info-row">
                    <div className="info-left">
                        <p><strong>성별 : </strong>
                            {editField === "gender" ? (
                                <select
                                    value={tempValue}
                                    onChange={(e) => setTempValue(e.target.value)}
                                >
                                    <option value="MALE">남성</option>
                                    <option value="FEMALE">여성</option>
                                </select>
                            ) : (
                                user.gender==="MALE" ? "남성" : "여성"
                            )}
                        </p>
                    </div>
                    {editField === "gender" ? (
                        <button className="edit-btn save-btn" onClick={() => handleUpdate("gender")}>완료</button>
                    ) : (
                        <button className="edit-btn" onClick={() => handleEditStart("gender", user.gender)}>수정</button>
                    )}
                </div>
                <div className="info-row">

                    <div className="info-left">
                        <p><strong>생일 : </strong>
                            {editField === "birthDate" ? (
                                <input
                                    type="date"
                                    value={tempValue}
                                    onChange={(e) => setTempValue(e.target.value)}
                                />
                            ) : (
                                user.birthDate
                            )}
                        </p>
                    </div>
                    {editField === "birthDate" ? (
                        <button className="edit-btn save-btn" onClick={() => handleUpdate("birthDate")}>완료</button>
                    ) : (
                        <button className="edit-btn" onClick={() => handleEditStart("birthDate", user.birthDate)}>수정</button>
                    )}
                </div>
                <div className="info-row">
                    <div className="info-left">
                        <p><strong>가입일 : </strong>{user.regTime}</p>
                    </div>
                </div>
                <div className="info-row no-border">
                    <div className="info-left">
                        <span className="icon">👤</span>
                        <span className="info-text">회원탈퇴</span>
                    </div>
                    <button className="edit-btn exit-btn" onClick={() => handleDeleteAccount(user.id)}>탈퇴하기</button>
                </div>
            </div>
        </section>
    )
}
export default MyPageUserInfo;