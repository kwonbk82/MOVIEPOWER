
const MyPageWishlist = ({wishlists}) => {
    const data = {

        wishlist: ["듄: 파트2", "오펜하이머", "스파이더맨: 뉴 유니버스"],

    };
    return(
        <section>
            <h3 className="content-title">❤️ 찜 목록</h3>
            <div className="info-card">
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {data.wishlist.map((item, i) => (
                        <li key={i} style={{ padding: '10px 0', borderBottom: '1px solid #333' }}>
                            🎬 {item}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
export default MyPageWishlist;