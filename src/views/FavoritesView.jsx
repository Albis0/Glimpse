import '../css/View.css'
import { useContext, useState, useEffect, useRef } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { SearchContext } from "../context/SearchContext";
import RenderImageCard from '../Components/ImageCardRender';
function FavoritesView() {
    const [visibleCount, setVisibleCount] = useState(20)

    const observerTarget = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setVisibleCount(c => c + 20)
                }
            },
            { threshold: 1.0 }
        )
        if (observerTarget.current) {
            observer.observe(observerTarget.current)
        }
        return () => observer.disconnect()
    }, [])
    const { favorites } = useContext(FavoritesContext)
    const { setSelectedImage, setIsModalOpen } = useContext(SearchContext)
    return <div className="favoritesViewWrapper">
            {favorites.slice(0, visibleCount).map((photo) => (
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
            <div className="observerTarget" ref={observerTarget}></div>
        </div>
}

export default FavoritesView;
