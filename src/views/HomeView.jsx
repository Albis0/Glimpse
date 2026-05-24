import { useContext, useEffect, useRef } from "react";
import Masonry from "react-masonry-css";
import { SearchContext } from "../context/SearchContext";
import SearchBar from "../Components/SearchBar";
import RenderImageCard from "../Components/ImageCardRender";
function HomeView() {
    const { isLoading, setSelectedImage, setIsModalOpen, images, selectedApi, setPage, imageFetcher } = useContext(SearchContext)
    const observerTarget = useRef(null);
    const isEmpty = images.length === 0 && !isLoading;

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
                if (entries[0].isIntersecting && !isLoading && images.length > 0) {
                    setPage(p => p + 1)
                    imageFetcher(true)
                }
            },
            { threshold: 1.0 }
        )
        if (observerTarget.current) {
            observer.observe(observerTarget.current)
        }
        return () => observer.disconnect()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageFetcher, setPage])


    return <div className={`homeViewContainer ${isEmpty ? "empty" : ""}`}>
        <div className="searchWrapper">
            <SearchBar />
        </div>
            {isEmpty && <p className="emptyHint">Try Searching Something!</p>}
        <div className="loadingState">
            <div className="isLoadingSpan">{isLoading && <span>Loading ...</span>}</div>
        </div>
        {!isEmpty && <Masonry breakpointCols={breakpointColumns} className="contentWrapper" columnClassName="masonryColumns">
            {images.map((photo, index) => (
                <RenderImageCard
                    key={`${photo.id}-${index}`}
                    imageUrl={photo.url}
                    imageApi={selectedApi}
                    onClick={() => {
                        setSelectedImage(photo.url);
                        setIsModalOpen(true);
                    }}
                />
            ))}
            <div className="observerTarget" ref={observerTarget}></div>
        </Masonry>}
    </div>;
}

export default HomeView;
