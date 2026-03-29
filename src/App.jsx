import "./css/App.css";
// components
import RenderImageCard from "./Components/imageCardRender";
import ShowToast from "./Components/toast";
import Navbar from "./Components/navbar";
import SearchBar from "./Components/searchBar";


import PhotoModal from "./modals/photoModal";
import AuthModal from "./modals/AuthModal";
import { useContext } from "react";
import { SearchContext } from "./context/SearchContext";
import { UserContext } from "./context/UserContext";
function App() {
    const { isLoading, setSelectedImage, isModalOpen, setIsModalOpen, images, selectedApi } = useContext(SearchContext)
    const { isAuthModalOpen } = useContext(UserContext)
    return (
        <>
            <Navbar />
            <ShowToast />
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
            </div>

            {/* Photo Modal */}
            {isModalOpen && <PhotoModal />}
            {/* Auth Modal */}
            {isAuthModalOpen && <AuthModal />}
        </>
    );
}

export default App;
