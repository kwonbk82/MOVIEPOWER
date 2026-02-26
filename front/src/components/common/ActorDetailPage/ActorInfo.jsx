// ActorInfo.jsx

import "./ActorInfo.css";
import axios from "axios";
const ActorInfo = ({ actor, tDept,isLoding,likeBtn,setLikeBtn}) => {


    const handleClickActorLike = async ()=>{
        try{
            const res = await axios.post("/api/wishlist/toggle",{
                targetId :  actor.id,
                targetType: "PERSON"
            });

            if (res.data){
                setLikeBtn(true);
            }else {

                setLikeBtn(false);
            }

        }catch (e) {
            console.error('찜 기능 동작 중 에러 :', e);
            if (e.response?.status === 401) {
                alert("로그인이 필요한 서비스입니다.");
            } else {
                alert("요청을 처리할 수 없습니다.");
            }
        }
    }

  return (
    <div id="ActorInfo">
      <div className="actorProfile">
        <img
          src={
            actor.profile_path
              ? `http://image.tmdb.org/t/p/w185/${actor.profile_path}`
              : "/img/img_loading.png"
          }
          alt={actor.name}
        />
        <div className="actorInfo">
          <div className="actor-name-job">
              <button onClick = {handleClickActorLike} disabled={!isLoding} className={`good-btn ${likeBtn ? 'active' : ''}`}>보고싶어요</button>
              <p className="actorName">{actor.name}</p>
            <p className="job">{tDept(actor.known_for_department)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActorInfo;
