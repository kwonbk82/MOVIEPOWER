import './Footer.css';

const Footer = () => {
  return (
    <div id="Footer">
      <footer>
        <div className="footer-content">
          <div className="logo">
            <span className="logo1">MOVIE</span>
            <span className="logo2">RANGER</span>
          </div>
          <div className="left-right">
            <div className="left">
              <div className="introduction">
                <h3>About Us</h3>
                <p>
                  최근 넷플릭스, 왓챠 등 OTT 서비스가 대중화되면서 개인이 볼 수
                  있는 영화와 영상 콘텐츠의 양이 폭발적으로 늘어났습니다.
                  <br />
                  하지만 너무 많은 콘텐츠로 인해 사용자는 오히려 어떤 영화를
                  봐야 할지 결정하기 어려운 '선택의 피로'를 느끼고 있습니다.
                  <br />
                  기존 추천 시스템은 상업적 목적에 치우쳐 있거나, 비슷한 장르의
                  영화만 반복적으로 추천하는 한계를 가지고 있습니다.
                  <br />
                  이에 사용자의 깊은 취향을 이해하고, 숨겨진 명작을 발굴하여
                  새로운 영화적 경험을 제공하는 영화 추천 사이트를 기획하게
                  되었습니다.
                </p>
              </div>
              <div className="sns">
                <h3>Follow Us</h3>
                <div className="social-links">
                  <a
                    className="face"
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                  <a
                    className="twi"
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </a>
                  <a
                    className="ins"
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>
            <div className="right">
              <div className="contact">
                <h3>Contact</h3>
                <ul>
                  <li>
                    <h4>e-mail</h4>
                    <p>00000@gmil.com</p>
                  </li>
                  <li>
                    <h4>call</h4>
                    <p>000-0000-0000</p>
                  </li>
                </ul>
              </div>
              <div className="team-members">
                <h3>Team</h3>
                <p>이지현 박세혁 이지안 백승원 권병규</p>
              </div>
              <div className="footer-bottom">
                <p>&copy; 2025 Movie Ranger Site. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
