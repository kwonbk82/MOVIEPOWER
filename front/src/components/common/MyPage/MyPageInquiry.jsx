
const MyPageInquiry = ({inquiries,onDelete}) => {
    return(
        <section>
            <h3 className="content-title">❓ 내 문의 현황</h3>
            {inquiries.map(q => (
                <div key={q.id} className="info-card inquiry-item" >
                    <span>{q.title} <small>({q.regTime})</small></span>
                    <span>{q.content}</span>
                    <div className="manage-inquiry">
                  <span className={`status-badge ${q.process === 1 ? 'status-done' : 'status-wait'}`}>
                  {q.process === 1 ? "처리됨" : "미처리"}
                  </span>
                        <button className="btn-delete" onClick={() => onDelete(q.id)}>삭제</button>
                    </div>
                </div>
            ))}
        </section>
    )
}
export default MyPageInquiry;