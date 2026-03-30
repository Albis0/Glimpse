import "../css/SideBar.css"
import { useContext } from "react";
import { HomeIcon, FavoriteIcon } from "./SvgIcons";
import { UserContext } from "../context/UserContext";
function SideBar() {
    const { activeView, setActiveView } = useContext(UserContext)
    return <div className="sideBarWrapper">
        <div className="sideBarIcons">
            <HomeIcon className="HomeIcon" onClick={() => { setActiveView("home") }} filled={activeView === "home" && true} color="azure" />
            <FavoriteIcon className="FavoritesIcon" onClick={() => { setActiveView("favorites") }} filled={activeView === "favorites" && true} color="azure" />
        </div>
    </div>;
}

export default SideBar;
