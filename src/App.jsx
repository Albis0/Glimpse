import { useRef, useState } from "react";
import "./App.css";
import RenderImageCard from "./Components/imageCardRender";
import ShowToast from "./Components/toast";
import PhotoModal from "./Components/photoModal";
import axios from "axios";
function App() {
    const clientID = import.meta.env.VITE_unsplashAccessKey;
    const unsplashAPI = import.meta.env.VITE_unsplashAPI;
    const pexelsApi = import.meta.env.VITE_pexelsAPI;
    const pexelsApiKey = import.meta.env.VITE_pexelsAPIKey;
    const [images, setImages] = useState([]);
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastSwitch, setToastSwitch] = useState(false);
    const toastTimerRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    async function imageFetcher(apiName) {
        if (isLoading || isQueryEmpty(query)) return;
        setIsLoading(true)
        try {
            if (apiName === "unsplash") {
                const { data } = await axios.get(unsplashAPI, { params: { client_id: clientID, query: query, per_page: 40 } });
                if (!fetchImagesValidate(data.total)) throw new Error("404 no photo found");
                const photos = data.results.map((photo) => ({ id: photo.id, url: photo.urls.regular }));
                return setImages(photos);;
            }

            if (apiName === "pexels") {
                const { data } = await axios.get(pexelsApi, { params: { query: query, per_page: 80 }, headers: { Authorization: pexelsApiKey } });
                if (!fetchImagesValidate(data.total_results)) throw new Error("404 no photo found");
                const photos = data.photos.map((photo) => ({ id: photo.id, url: photo.src.large }));
                return setImages(photos);
            }

        } catch (error) {
            showToast(`${error}`)
            console.log(`error occurred: ${error}`);
        }
        finally { setIsLoading(false) }
    }

    function fetchImagesValidate(data) {
        if (data === 0) return false;

        return true;
    }
    function isQueryEmpty(query) {
        if (query.trim() === "") {
            showToast("query cannot be empty");
            return true;
        }
        return false;
    }
    function showToast(toastMessage) {
        setToastMessage(toastMessage);
        setToastSwitch(true);
        clearTimeout(toastTimerRef.current);
        toastTimerRef.current = setTimeout(() => {
            setToastSwitch(false);
        }, 3000);
    }
    return (
        <>
            <ShowToast toastMessage={toastMessage} toastSwitch={toastSwitch} />
            <div className="searchWrapper">
                <div className="searchBarWrapper">
                    <input
                        type="text"
                        id="SearchBar"
                        placeholder="enter a word"
                        autoComplete="off"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                        }}
                    />
                </div>
                <div className="buttonWrapper">
                    <button onClick={() => imageFetcher("unsplash")} disabled={isLoading}>
                        Unsplash
                    </button>
                    <button onClick={() => imageFetcher("pexels")} disabled={isLoading}>
                        Pexels
                    </button>
                </div>
                <div className="isLoadingSpan">{isLoading && <span>Loading ...</span>}</div>
            </div>
            <div className="contentWrapper">
                {images.map((photo) => (
                    <RenderImageCard
                        key={photo.id}
                        imageUrl={photo.url}
                        onClick={() => {
                            setSelectedImage(photo.url);
                            setIsModalOpen(true);
                        }}
                    />
                ))}
            </div>
            {isModalOpen && (
                <PhotoModal
                    image={selectedImage}
                    onClose={() => {
                        setIsModalOpen(false);
                    }}
                />
            )}
        </>
    );
}

export default App;
