import axios from "axios";
import { createContext, useState, useRef, useEffect } from "react";

const SearchContext = createContext()

export function SearchProvider({ children }) {
    const unsplashApi = import.meta.env.VITE_unsplashAPI;
    const clientID = import.meta.env.VITE_unsplashAccessKey;

    const pexelsApi = import.meta.env.VITE_pexelsAPI;
    const pexelsApiKey = import.meta.env.VITE_pexelsAPIKey;

    const pixabayApi = import.meta.env.VITE_pixabayAPI;
    const pixabayApiKey = import.meta.env.VITE_pixabayAPIKey;

    const unsplashRes = [`thumb`, `small`, `regular`, `full`]
    const pexelsRes = [`tiny`, `medium`, `large`, `original`]
    const pixabayRes = [`preview`, `webformat`, `large`, `full`]

    const [selectedApi, setSelectedApi] = useState("unsplash")
    const [selectedResolution, setSelectedResolution] = useState('thumb')
    const [images, setImages] = useState([]);
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastSwitch, setToastSwitch] = useState(false);
    const toastTimerRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userPfp = null

    useEffect(() => {
        if (selectedApi === unsplashApi) setSelectedResolution(unsplashRes[0])
        if (selectedApi === pexelsApi) setSelectedResolution(pexelsRes[0])
        if (selectedApi === pixabayApi) setSelectedResolution(pixabayRes[0])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedApi])

    const apiConfigs = {
        unsplash: {
            getUrl: unsplashApi,
            getPhotoUrl: photo => photo.urls[selectedResolution],
            getHeader: () => ({}),
            getParam: () => ({ client_id: clientID, query: query, per_page: 40 }),
            getTotal: (data) => data.total,
            getMapKey: 'results'
        },
        pexels: {
            getUrl: pexelsApi,
            getPhotoUrl: photo => photo.src[selectedResolution],
            getHeader: () => ({ Authorization: pexelsApiKey }),
            getParam: () => ({ query: query, per_page: 80 }),
            getTotal: (data) => data.total_results,
            getMapKey: 'photos'
        },
        pixabay: {
            getUrl: pixabayApi,
            getPhotoUrl: photo => photo[selectedResolution],
            getHeader: () => ({}),
            getParam: () => ({ key: pixabayApiKey, q: query, image_type: "photo", per_page: 100 }),
            getTotal: (data) => data.total,
            getMapKey: 'hits'
        }
    }


    async function imageFetcher() {
        if (isLoading || isQueryEmpty(query)) return;
        setIsLoading(true)
        try {
            const { data } = await axios.get(apiConfigs[selectedApi].getUrl, { params: apiConfigs[selectedApi].getParam(), headers: apiConfigs[selectedApi].getHeader() });
            if (!fetchImagesValidate(apiConfigs[selectedApi].getTotal(data))) throw new Error("404 no photo found");
            const photos = data[apiConfigs[selectedApi].getMapKey].map((photo) => ({ id: photo.id, url: apiConfigs[selectedApi].getPhotoUrl(photo) }));
            setImages(photos);

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
            query, setQuery, isLoading, toastSwitch,toastMessage,setToastMessage, showToast,
            selectedImage, setSelectedImage, isModalOpen, setIsModalOpen, selectedApi, setSelectedApi,
            selectedResolution, setSelectedResolution, userPfp, unsplashRes, pexelsRes, pixabayRes
        }}>{children}</SearchContext.Provider>
    )
}

export { SearchContext };
