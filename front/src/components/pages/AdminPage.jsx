import './AdminPage.css';
import React, { useState } from "react";

const AdminPage = () => {
    const [selectedMenu, setSelectedMenu] = useState("movie");

    // 예시 데이터 (여러 개 추가)
    const [movies, setMovies] = useState([ // 영화 관리 관련.
        { id: 1, title: "극장판 귀멸의 칼날: 무한성편", date: "2025-09-02" },
        { id: 2, title: "F1 더 무비", date: "2025-6-26" },
        { id: 3, title: "슈퍼맨", date: "2025-07-10" },
        { id: 4, title: "미션 임파서블: 파이널 레코닝", date: "2025-06-17" },
        { id: 5, title: "나는 네가 지난 여름에 한 일을 알고있다.", date: "2025-06-17" },
    ]);
    const [actors, setActors] = useState([ // 회원 관리 관련.
        { id: 1, name: "브래드 피트", birth: "1963-12-18" },
        { id: 2, name: "니콜라스 홀트", birth: "1989-12-07" }
    ]);
    const [members, setMembers] = useState([ // 이메일 관리 관련.
        { id: 1, username: "testUser", email: "test@gmail.com(mailto:test@gmail.com)" },
        { id: 2, username: "helloUser", email: "hello@naver.com(mailto:hello@naver.com)" }
    ]);
    const [inquiries, setInquiries] = useState([ // 문의 관리 관련.
        { id: 1, title: "영화 포스터 문의", writer: "도라에몽" },
        { id: 2, title: "로그인 오류", writer: "짱구" }
    ]);
    const [reviews, setReviews] = useState([ // 리뷰 관리 관련.
        { id: "극장판 귀멸의 칼날", content: "정말 재밌었어요!", writer: "영화팬1" },
        { id: "영화1", content: "별로였어요.", writer: "비평가99" }
    ]);

    // 수정 상태
    const [editItem, setEditItem] = useState(null);

    // 수정 시작
    const handleEdit = (type, item) => {
        setEditItem({ type, ...item });
    };

    // 저장
    const handleSave = () => {
        const { type, id } = editItem;

        if (type === "movie") { // 영화 관리 저장 처리
            setMovies(movies.map(m => m.id === id ? editItem : m));
        } else if (type === "actor") { // 이메일 관리 저장 처리
            setActors(actors.map(a => a.id === id ? editItem : a));
        } else if (type === "member") { // 이메일 관리 저장 처리
            setMembers(members.map(m => m.id === id ? editItem : m));
        } else if (type === "inquiry") { // 문의 관리 저장 처리
            setInquiries(inquiries.map(i => i.id === id ? editItem : i));
        } else if (type === "review") { // 리뷰 관리 저장 처리
            setReviews(reviews.map(r => r.id === id ? editItem : r));
        }

        setEditItem(null);

    };

    // 삭제
    const handleDelete = (type, id) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;

        if (type === "movie") setMovies(movies.filter(m => m.id !== id));
        if (type === "actor") setActors(actors.filter(a => a.id !== id));
        if (type === "member") setMembers(members.filter(m => m.id !== id));
        if (type === "inquiry") setInquiries(inquiries.filter(i => i.id !== id));
        if (type === "review") setReviews(reviews.filter(r => r.id !== id));

    };

    // 선택
    const handleSelect = (type, id) => {
        alert(`${type} ID:${id} 선택됨`);
    };

    // 입력 핸들러
    const handleChange = (field, value) => {
        setEditItem({ ...editItem, [field]: value });
    };

    return (
        <div id="AdminPage">
            <h2>관리자</h2>

            {/* 메뉴 버튼 */}
            <div className="container">
                <div onClick={() => setSelectedMenu("movie")}>영화 관리</div>
                <div onClick={() => setSelectedMenu("actor")}>배우 관리</div>
                <div onClick={() => setSelectedMenu("member")}>회원 관리</div>
                <div onClick={() => setSelectedMenu("inquiry")}>문의 관리</div>
                <div onClick={() => setSelectedMenu("review")}>리뷰 관리</div>
            </div>

            {/* 영화 관리 */}
            {selectedMenu === "movie" && (
                <div>
                    <h2>영화 관리</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>영화 제목</th>
                                <th>등록일</th>
                                <th>수정</th>
                                <th>삭제</th>
                                <th>선택</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movies.map(movie => (
                                <tr key={movie.id}>
                                    <td>{movie.id}</td>
                                    <td>
                                        {editItem?.type === "movie" && editItem?.id === movie.id ? (
                                            <input
                                                value={editItem.title}
                                                onChange={(e) => handleChange("title", e.target.value)}
                                            />
                                        ) : (
                                            movie.title
                                        )}
                                    </td>
                                    <td>
                                        {editItem?.type === "movie" && editItem?.id === movie.id ? (
                                            <input
                                                type="date"
                                                value={editItem.date}
                                                onChange={(e) => handleChange("date", e.target.value)}
                                            />
                                        ) : (
                                            movie.date
                                        )}
                                    </td>
                                    <td>
                                        {editItem?.type === "movie" && editItem?.id === movie.id ? (
                                            <button onClick={handleSave}>저장</button>
                                        ) : (
                                            <button onClick={() => handleEdit("movie", movie)}>수정</button>
                                        )}
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete("movie", movie.id)}>삭제</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleSelect("movie", movie.id)}>선택</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* 배우 관리 */}
            {selectedMenu === "actor" && (
                <div>
                    <h2>배우 관리</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>이름</th>
                                <th>생년월일</th>
                                <th>수정</th>
                                <th>삭제</th>
                                <th>선택</th>
                            </tr>
                        </thead>
                        <tbody>
                            {actors.map(actor => (
                                <tr key={actor.id}>
                                    <td>{actor.id}</td>
                                    <td>
                                        {editItem?.type === "actor" && editItem?.id === actor.id ? (
                                            <input
                                                value={editItem.name}
                                                onChange={(e) => handleChange("name", e.target.value)}
                                            />
                                        ) : (
                                            actor.name
                                        )}
                                    </td>
                                    <td>
                                        {editItem?.type === "actor" && editItem?.id === actor.id ? (
                                            <input
                                                type="date"
                                                value={editItem.birth}
                                                onChange={(e) => handleChange("birth", e.target.value)}
                                            />
                                        ) : (
                                            actor.birth
                                        )}
                                    </td>
                                    <td>
                                        {editItem?.type === "actor" && editItem?.id === actor.id ? (
                                            <button onClick={handleSave}>저장</button>
                                        ) : (
                                            <button onClick={() => handleEdit("actor", actor)}>수정</button>
                                        )}
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete("actor", actor.id)}>삭제</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleSelect("actor", actor.id)}>선택</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* 회원 관리 */}
            {selectedMenu === "member" && (
                <div>
                    <h2>회원 관리</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>아이디</th>
                                <th>이메일</th>
                                <th>수정</th>
                                <th>삭제</th>
                                <th>선택</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map(member => (
                                <tr key={member.id}>
                                    <td>{member.id}</td>
                                    <td>
                                        {editItem?.type === "member" && editItem?.id === member.id ? (
                                            <input
                                                value={editItem.username}
                                                onChange={(e) => handleChange("username", e.target.value)}
                                            />
                                        ) : (
                                            member.username
                                        )}
                                    </td>
                                    <td>
                                        {editItem?.type === "member" && editItem?.id === member.id ? (
                                            <input
                                                value={editItem.email}
                                                onChange={(e) => handleChange("email", e.target.value)}
                                            />
                                        ) : (
                                            member.email
                                        )}
                                    </td>
                                    <td>
                                        {editItem?.type === "member" && editItem?.id === member.id ? (
                                            <button onClick={handleSave}>저장</button>
                                        ) : (
                                            <button onClick={() => handleEdit("member", member)}>수정</button>
                                        )}
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete("member", member.id)}>삭제</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleSelect("member", member.id)}>선택</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* 문의 관리 */}
            {selectedMenu === "inquiry" && (
                <div>
                    <h2>문의 관리</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th>작성자</th>
                                <th>수정</th>
                                <th>삭제</th>
                                <th>선택</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inquiries.map(inquiry => (
                                <tr key={inquiry.id}>
                                    <td>{inquiry.id}</td>
                                    <td>
                                        {editItem?.type === "inquiry" && editItem?.id === inquiry.id ? (
                                            <input
                                                value={editItem.title}
                                                onChange={(e) => handleChange("title", e.target.value)}
                                            />
                                        ) : (
                                            inquiry.title
                                        )}
                                    </td>
                                    <td>
                                        {editItem?.type === "inquiry" && editItem?.id === inquiry.id ? (
                                            <input
                                                value={editItem.writer}
                                                onChange={(e) => handleChange("writer", e.target.value)}
                                            />
                                        ) : (
                                            inquiry.writer
                                        )}
                                    </td>
                                    <td>
                                        {editItem?.type === "inquiry" && editItem?.id === inquiry.id ? (
                                            <button onClick={handleSave}>저장</button>
                                        ) : (
                                            <button onClick={() => handleEdit("inquiry", inquiry)}>수정</button>
                                        )}
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete("inquiry", inquiry.id)}>삭제</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleSelect("inquiry", inquiry.id)}>선택</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {/* ✅ 리뷰 관리 */}
            {selectedMenu === "review" && (
                <div>
                    <h2>리뷰 관리</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>영화 제목</th>
                                <th>내용</th>
                                <th>작성자</th>
                                <th>수정</th>
                                <th>삭제</th>
                                <th>선택</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map(review => (
                                <tr key={review.id}>
                                    <td>{review.id}</td>
                                    <td>
                                        {editItem?.type === "review" && editItem?.id === review.id ? (
                                            <input
                                                value={editItem.content}
                                                onChange={(e) => handleChange("content", e.target.value)}
                                            />
                                        ) : (
                                            review.content
                                        )}
                                    </td>
                                    <td>
                                        {editItem?.type === "review" && editItem?.id === review.id ? (
                                            <input
                                                value={editItem.writer}
                                                onChange={(e) => handleChange("writer", e.target.value)}
                                            />
                                        ) : (
                                            review.writer
                                        )}
                                    </td>
                                    <td>
                                        {editItem?.type === "review" && editItem?.id === review.id ? (
                                            <button onClick={handleSave}>저장</button>
                                        ) : (
                                            <button onClick={() => handleEdit("review", review)}>수정</button>
                                        )}
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete("review", review.id)}>삭제</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleSelect("review", review.id)}>선택</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>

    );
};

export default AdminPage;