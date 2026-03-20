import './MyProfile.css';
import {useRef, useState} from "react";
import axios from "axios";
import {useAuth} from "../../../contexts/AuthContext.jsx";
import {IMAGE_CONFIG} from "../../../constants/images.js";


const MyProfile = () => {

    const {user,refreshUser} = useAuth();

    const [previewState,setPreviewState] = useState(user?.profileUrl);
    const [uploadFile, setUploadFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e)=>{
        const file = e.target.files[0];
        if (file) {
            setUploadFile(file);
            setPreviewState(URL.createObjectURL(file));
        }
    }

    const handleDeleteClick = ()=>{
        setUploadFile(null);
        setPreviewState(IMAGE_CONFIG.PROFILE.DEFAULT);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    const handleFinalSave = async ()=>{
        const formData = new FormData();

        if (uploadFile) {
            formData.append("file", uploadFile);
        }
        try {
            const res = await axios.post("/api/user/profile", formData, {
                withCredentials: true,
            });
            if (res.status === 200) {
                await refreshUser();
                alert("프로필이 성공적으로 업데이트되었습니다.");
            }
        }catch (e) {
            console.error("프로필 업데이트 실패:", e);
            const errorMessage = e.response?.data || "서버 오류가 발생했습니다.";
            alert(`수정 실패: ${errorMessage}`);
        }
    }

    return(
        <div className="profile-container">
            <div className="profile-view">
                <img src={previewState} alt="유저프로필" className="profile-view-img" />
                <label htmlFor="fileInput" className="profile-view-overlay">
                    <span>변경</span>
                </label>
            </div>
            {previewState !== IMAGE_CONFIG.PROFILE.DEFAULT && (
                <button onClick={handleDeleteClick} className="profile-delete-btn" title="사진 삭제">
                    <img src="/img/trashcan.png" alt="삭제" />
                </button>
            )}
            <input type="file" id="fileInput" ref={fileInputRef}
                   accept="image/*" className="profile-file-input"
                   onChange={handleFileChange} />

            <button onClick={handleFinalSave} className="btn-save">프로필 저장</button>
        </div>
    )
}
export default MyProfile;