import '../css/View.css'
import { useContext, useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { FavoritesContext } from "../context/FavoritesContext";
import { SearchContext } from "../context/SearchContext";
import RenderImageCard from '../Components/ImageCardRender';
import Masonry from 'react-masonry-css';
function FavoritesView() {
    const [visibleCount, setVisibleCount] = useState(20)
    const observerTarget = useRef(null);

    const { favorites } = useContext(FavoritesContext)
    const { setSelectedImage, setIsModalOpen } = useContext(SearchContext)

    const isEmpty = favorites.length === 0
    // * masonry config
    const breakpointColumns = {
        default: 5,
        1440: 4,
        1024: 3,
        768: 2,
    }

    // * infinite loader
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

    // document titles
    useEffect(()=>{
        document.title= "My Favorites — Glimpse"
    },[])
    return <div className={`homeViewContainer ${isEmpty ? "empty" : ""} `}>
        {isEmpty ? (<p className='emptyHint'>No Favorites Yet!</p>) : (<Masonry breakpointCols={breakpointColumns} className="contentWrapper" columnClassName="masonryColumns">
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
        </Masonry>)}
    </div>
}

export default FavoritesView;
