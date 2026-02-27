
import { Link } from "react-router-dom";
import "./PersonItem.css";

const PersonItem = ({person}) => {
    return(
        <div id="PersonItem">
            <Link to={`/actordetail/${person.id}`}>
                <img className="img" src={person.profile_path ?`https://image.tmdb.org/t/p/w500${person.profile_path}` :"/img/img_loading.png"} alt={person.title}/>
                <p className="name">{person.name}</p>
            </Link>
        </div>
    )
}
export default PersonItem;
