import "../css/SideBar.css"
import { HomeIcon, FavoriteIcon } from "./SvgIcons";
import { useNavigate, useLocation } from "react-router-dom";
function SideBar() {

    const navigate = useNavigate()
    const location = useLocation()
    return <div className="sideBarWrapper">
        <div className="sideBarIcons">
            <div className="sideBarHome">
                <HomeIcon className="HomeIcon" onClick={() => { navigate("/") }} filled={location.pathname === "/" && true} color="azure" />
                <span>Home</span>
            </div>
            <div className="sideBarFavorites">
                <FavoriteIcon className="FavoritesIcon" onClick={() => { navigate("/favorites") }} filled={location.pathname === "/favorites" && true} color="azure" />
                <span>Favorites</span>
            </div>
        </div>
    </div>;
}

export default SideBar;
