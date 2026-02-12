/* InquiryWritePage.jsx */

import "./InquiryWritePage.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const InquiryWritePage = () => {
    const [completion, setCompletion] = useState(""); // 문의하기
    const [title, setTitle] = useState(""); // 제목 글자수 카운팅
    const [content, setContent] = useState(""); // 내용 글자수 카운팅
    const [titleError, setTitleError] = useState("");
    const [contentError, setContentError] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); //문의하기 홈링크


    // const categories = [
    //     { key: "REPORT", label: "신고" },
    //     { key: "MODIFY", label: "정보 수정" },
    //     { key: "EVENT", label: "이벤트 신청" },
    //     { key: "OTHERS", label: "기타" },
    // ];
    // const [type, setType] = useState(null);

    //글자 수
    const MAX_LENGTH = 30;
    const MAX_CONTENT = 300;

    const handleTitleChange = (e) => {
        if (e.target.value.length <= MAX_LENGTH) {
            setTitle(e.target.value);
        }
    };

    const handleContenChange = (e) => {
        if (e.target.value.length <= MAX_CONTENT) {
            setContent(e.target.value);
        }
    };

    //제목,내용 입력창,문의하기 띄우기
    const handleButtonClick = () => {
        let valid = true;
        // if (!selectedCategory) {
        //     alert("문의 유형을 선택해주세요!");
        //     valid = false;
        // }
        if (title.trim() === "") {
            setTitleError("제목을 입력해주세요!");
            valid = false;
        }
        if (content.trim() === "") {
            setContentError("내용을 입력해주세요!");
            valid = false;
        }
        if (!valid) return;

        const confirmed = window.confirm("문의 작성 완료하시겠습니까?");
        if (confirmed) {
            navigate("/"); // react-router-dom 사용 시 navigate로 이동
        }
    };

    return (
        <div id="InquiryWritePage">
            {/*<div className="Help-inquirywr01">*/}
            {/*    <h2>문의 유형 선택</h2>*/}
            {/*    <div className="Help">*/}
            {/*        {categories.map((category) => (*/}
            {/*            <button*/}
            {/*                key={category.key}*/}
            {/*                className={`categoryGroup ${type === category.key ? "active" : ""}`}*/}
            {/*                onClick={() => setType(category.key)}*/}
            {/*            >*/}
            {/*                {category.label}*/}
            {/*            </button>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="title-inquirywr01">
                <h2>제목</h2>
                <div className="title">
                    <input
                        type="text"
                        placeholder="제목을 입력해주세요"
                        value={title}
                        onChange={handleTitleChange}
                        maxLength={MAX_LENGTH}
                    />
                    <div className="count">
                        {title.length}/{MAX_LENGTH} byte
                    </div>
                    {titleError && <p className="error-message">{titleError}</p>}
                </div>
            </div>
            <div className="content-inquirywr01">
                <h2>내용</h2>
                <div className="content">
                    <input
                        type="text"
                        placeholder="문의 하실 내용을 입력해주세요."
                        value={content}
                        onChange={handleContenChange}
                        maxLength={MAX_CONTENT}
                    />
                    <div className="counter">
                        {content.length}/{MAX_CONTENT} byte
                    </div>
                    {contentError && <p className="error-message">{contentError}</p>}
                </div>
            </div>
            <div className="picture-inquirywr01">
                <h2>사진 추가하기</h2>
                <div className="photo-upload">
                    <input type="file" placeholder="클릭하여 사진 추가하기" />
                </div>
            </div>
            <div className="click-inquirywr01">
                <button className="click-button" onClick={handleButtonClick}>
                    문의하기
                </button>
            </div>
        </div>
    );
};

export default InquiryWritePage;
