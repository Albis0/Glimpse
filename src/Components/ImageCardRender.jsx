import "../css/ImageCard.css"
import { FavoriteIcon, } from "./SvgIcons"
import { FavoritesContext } from "../context/FavoritesContext";
import { useContext, useState } from "react";
function RenderImageCard({ imageUrl, imageApi, onClick, imageAlt }) {
    const { isFavorite, toggleFavorite } = useContext(FavoritesContext)
    const [isLoaded, setIsloaded] = useState(false);
    return (
        <div className="imageWrapper" onClick={onClick}>
            {!isLoaded && <div className="skeletonImage" />}
            <img
                src={imageUrl} alt={imageAlt || `Free stock photo from ${imageApi}`} className="image" loading="lazy"
                onLoad={() => { setIsloaded(true) }}
                style={!isLoaded ? { opacity: 0, position: `absolute` } : {}}
            />
            <span className="iconSpan" onClick={(e) => { e.stopPropagation() }}>
                <FavoriteIcon size="24" color="azure" filled={isFavorite(imageUrl)} className="favoriteIcon" onClick={() => {
                    toggleFavorite(imageUrl, imageApi)
                }} />
            </span>
        </div>
    );
}

export default RenderImageCard;
