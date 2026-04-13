import { useContext, useEffect, useRef } from "react";
import { SearchContext } from "../context/SearchContext";
import SearchBar from "../Components/SearchBar";
import RenderImageCard from "../Components/ImageCardRender";
function HomeView() {
    const { isLoading, setSelectedImage, setIsModalOpen, images, selectedApi, setPage, imageFetcher } = useContext(SearchContext)
    const observerTarget = useRef(null);
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
    return <div className="homeViewContainer">
        <div className="searchWrapper">
            <SearchBar />
        </div>
        <div className="loadingState">
            <div className="isLoadingSpan">{isLoading && <span>Loading ...</span>}</div>
        </div>
        <div className="contentWrapper">
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
        </div></div>;
}

export default HomeView;
