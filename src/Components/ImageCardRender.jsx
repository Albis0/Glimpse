import "../css/ImageCard.css"
import { FavoriteIcon, } from "./SvgIcons"
import { FavoritesContext } from "../context/FavoritesContext";
import { useContext } from "react";
function RenderImageCard({ imageUrl, imageApi, onClick, }) {
    const { isFavorite, toggleFavorite } = useContext(FavoritesContext)
    return (
        <div className="imageWrapper" onClick={onClick}>
            <img src={imageUrl} alt="Image" className="image" />
            <span className="iconSpan" onClick={(e) => { e.stopPropagation() }}>
                <FavoriteIcon size="24" color="azure" filled={isFavorite(imageUrl)} className="favoriteIcon" onClick={() => {
                    toggleFavorite(imageUrl, imageApi)
                }} />
            </span>
        </div>
    );
}

export default RenderImageCard;
