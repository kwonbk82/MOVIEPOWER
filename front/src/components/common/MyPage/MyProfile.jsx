import './MyProfile.css';
import {useState} from "react";

const MyProfile = () => {
    const [previewState,setPreviewState] = useState();
    const [isCustomPreview,setIsCustomPreview] = useState();

    const handleFileChange = ()=>{

    }

    const handleDeleteClick = ()=>{

    }

    const handleFinalSave = ()=>{

    }

    return(
        <div className="profile-container">
            <div className="profile-view">
                <img src={previewState} alt="유저프로필" className="profile-view__img" />
                <label htmlFor="fileInput" className="profile-view__overlay">
                    <span>변경</span>
                </label>
            </div>

            <input type="file" id="fileInput" accept="image/*" className="profile-file-input" onChange={handleFileChange} />

            <div className="profile-actions">
                {!isCustomPreview ? (
                    <label htmlFor="fileInput" className="btn-action add">사진 추가</label>
                ) : (
                    <button onClick={handleDeleteClick} className="btn-action delete">삭제</button>
                )}
            </div>

            <button onClick={handleFinalSave} className="btn-save">변경사항 저장</button>
        </div>
    )
}
export default MyProfile;