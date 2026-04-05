import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import SearchBar from "../Components/SearchBar";
import RenderImageCard from "../Components/ImageCardRender";
function HomeView() {
    const { isLoading, setSelectedImage, setIsModalOpen, images, selectedApi } = useContext(SearchContext)
    return <div className="homeViewContainer">
        <div className="searchWrapper">
            <SearchBar />
        </div>
        <div className="loadingState">
            <div className="isLoadingSpan">{isLoading && <span>Loading ...</span>}</div>
        </div>
        <div className="contentWrapper">
            {images.map((photo) => (
                <RenderImageCard
                    key={photo.id}
                    imageUrl={photo.url}
                    imageApi={selectedApi}
                    onClick={() => {
                        setSelectedImage(photo.url);
                        setIsModalOpen(true);
                    }}
                />
            ))}
        </div></div>;
}

export default HomeView;
