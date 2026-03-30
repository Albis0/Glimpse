import '../css/View.css'
import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { SearchContext } from "../context/SearchContext";
import RenderImageCard from "../Components/imageCardRender"
function FavoritesView() {
    const { favorites } = useContext(FavoritesContext)
    const { setSelectedImage, setIsModalOpen } = useContext(SearchContext)
    return <div className="favoritesViewWrapper">
        {favorites.map((photo) => (
            <RenderImageCard
                key={photo._id}
                imageUrl={photo.imageUrl}
                imageApi={photo.imageApi}
                onClick={() => {
                    setSelectedImage(photo.imageUrl);
                    setIsModalOpen(true);
                }}
            />
        ))}
        {console.log(favorites)}
    </div>;
}

export default FavoritesView;
