import { useState } from "react";
import "./App.css";
import RenderImageCard from "./Components/imageCardRender";
import ShowToast from "./Components/toast";
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

    async function fetchImagesFromPexels() {
        setIsLoading(true);
        const { data } = await axios.get(pexelsApi, { params: { query: query, per_page: 80 }, headers: { Authorization: pexelsApiKey } });
        fetchImagesValidate(data);
        const photos = data.photos.map((photo) => ({ id: photo.id, url: photo.src.large }));
        console.log(photos);
        setImages(photos);
        setIsLoading(false);
    }
    async function fetchImagesFromUnsplash() {
        setIsLoading(true);
        const { data } = await axios.get(`${unsplashAPI}?client_id=${clientID}&query=${query}&per_page=40`);
        fetchImagesValidate(data);
        const photos = data.results.map((photo) => ({ id: photo.id, url: photo.urls.regular }));
        setImages(photos);
        setIsLoading(false);
    }

    function fetchImagesValidate(data) {
        if (data.total === 0) {
            console.log(data.total);
            setToastMessage("404 no photo found");
            setToastSwitch(true);
            setTimeout(() => {
                setToastSwitch(false);
            }, 3000);
            return false;
        }
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
                        onKeyDown={(e) => {
                            e.key === "Enter" && fetchImagesFromUnsplash();
                        }}
                    />
                </div>
                <div className="buttonWrapper">
                    <button onClick={fetchImagesFromUnsplash}>Unsplash</button>
                    <button onClick={fetchImagesFromPexels}>Pexels</button>
                </div>
                <div className="isLoadingSpan">{isLoading && <span>Loading ...</span>}</div>
            </div>
            <div className="contentWrapper">
                {images.map((photo) => (
                    <RenderImageCard key={photo.id} imageUrl={photo.url} />
                ))}
            </div>
        </>
    );
}

export default App;
