import { useState } from "react";
import "./App.css";
import RenderImageCard from "./Components/imageCardRender";
import ShowToast from "./Components/toast";
import axios from "axios";
function App() {
    const clientID = import.meta.env.VITE_unsplashAccessKey;
    const API = import.meta.env.VITE_unsplashAPI;
    const [images, setImages] = useState([]);
    const [query, setQuery] = useState("");

    const [toastMessage, setToastMessage] = useState("");
    const [toastSwitch, setToastSwitch] = useState(false);
    async function fetchImages() {
        const { data } = await axios.get(`${API}?client_id=${clientID}&query=${query}&per_page=30`);
        fetchImagesValidate(data);
        setImages(data.results);
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
                        onKeyDown={(e)=> {e.key === "Enter" && fetchImages()}}
                    />
                </div>
                <div className="buttonWrapper">
                    <button onClick={fetchImages}>Search</button>
                </div>
            </div>
            <div className="contentWrapper">
                {images.map((photo) => (
                    <RenderImageCard key={photo.id} imageUrl={photo.urls.small} />
                ))}
            </div>
        </>
    );
}

export default App;
