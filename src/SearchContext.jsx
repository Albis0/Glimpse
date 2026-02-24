import axios from "axios";
import { createContext, useState, useRef } from "react";

const SearchContext = createContext()

export function SearchProvider({ children }) {
    const clientID = import.meta.env.VITE_unsplashAccessKey;
    const unsplashAPI = import.meta.env.VITE_unsplashAPI;
    const pexelsApi = import.meta.env.VITE_pexelsAPI;
    const pexelsApiKey = import.meta.env.VITE_pexelsAPIKey;
    const pixabayApi = import.meta.env.VITE_pixabayAPI;
    const pixabayApiKey = import.meta.env.VITE_pixabayAPIKey;
    const [images, setImages] = useState([]);
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastSwitch, setToastSwitch] = useState(false);
    const toastTimerRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userPfp = null
    const [selectedApi, setSelectedApi] = useState('unsplash')
    const [selectedResolution, setSelectedResolution] = useState('1080P')

    async function imageFetcher(apiName) {
        if (isLoading || isQueryEmpty(query)) return;
        setIsLoading(true)
        try {
            if (apiName === "unsplash") {
                const { data } = await axios.get(unsplashAPI, { params: { client_id: clientID, query: query, per_page: 40 } });
                if (!fetchImagesValidate(data.total)) throw new Error("404 no photo found");
                const photos = data.results.map((photo) => ({ id: photo.id, url: photo.urls.regular }));
                setImages(photos);;
            }

            if (apiName === "pexels") {
                const { data } = await axios.get(pexelsApi, { params: { query: query, per_page: 80 }, headers: { Authorization: pexelsApiKey } });
                if (!fetchImagesValidate(data.total_results)) throw new Error("404 no photo found");
                const photos = data.photos.map((photo) => ({ id: photo.id, url: photo.src.large }));
                setImages(photos);
            }
            if (apiName === 'pixabay') {
                const { data } = await axios.get(pixabayApi, { params: { key: pixabayApiKey, q: query, image_type: "photo", per_page: 100 } })
                if (!fetchImagesValidate(data.total)) throw new Error("404 no photo found");
                const photos = data.hits.map((photo) => ({ id: photo.id, url: photo.webformatURL }));
                setImages(photos);;
            }

        } catch (error) {
            showToast(` ${error.message} `)
            console.log(`error occurred: ${error}`);
        }
        finally { setIsLoading(false) }
    }

    function fetchImagesValidate(data) {
        if (data === 0) return false;

        return true;
    }
    function isQueryEmpty(query) {
        const trimmed = query.trim()
        if (trimmed === "") {
            showToast("query cannot be empty");
            return true;
        }
        if (trimmed.length <= 2) {
            showToast("query should be atleast 3 characters");
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
        <SearchContext.Provider value={{
            imageFetcher, images, setImages,
            query, setQuery, isLoading, toastMessage, toastSwitch,
            selectedImage, setSelectedImage, isModalOpen, setIsModalOpen, selectedApi, setSelectedApi,
            selectedResolution, setSelectedResolution, userPfp
        }}>{children}</SearchContext.Provider>
    )
}

export { SearchContext };
