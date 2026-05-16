import axios from "axios";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "./UserContext";
import { SearchContext } from "./SearchContext";

const FavoritesContext = createContext()
export function FavoritesProvider({ children }) {
    const { isLoggedIn, getAuthHeader } = useContext(UserContext)
    const { showToast } = useContext(SearchContext)
    const API_URL = import.meta.env.VITE_API_URL;
    const [favorites, setFavorites] = useState([])
    const [favoriteUrls, setFavoriteUrls] = useState(new Set())

    useEffect(() => {
        setFavoriteUrls(new Set(favorites.map(fav => fav.imageUrl)))
    }, [favorites])


    const isFavorite = useCallback((imageUrl) => {
        return favoriteUrls.has(imageUrl)
    }, [favoriteUrls])

    const fetchFavorites = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/api/favorites`, { headers: getAuthHeader() });
            setFavorites(response.data.favorites)
        } catch (error) {
            console.log(`fetchFavorites Error : ${error}`);
        }
    }, [API_URL, getAuthHeader])


    const toggleFavorite = useCallback(async (imageUrl, imageApi) => {
        try {
            // if not logged in
            if (!isLoggedIn) {
                showToast("Log In To Save Favorites!")
                return;
            }

            // if already in favorites
            if (isFavorite(imageUrl)) {
                const favId = favorites.find(fav => fav.imageUrl === imageUrl)._id
                await axios.delete(`${API_URL}/api/favorites/${favId}`, { headers: getAuthHeader() })
                setFavorites(prev => prev.filter(fav => fav._id !== favId))
            }
            // if not in favorites
            else {
                const { data } = await axios.post(`${API_URL}/api/favorites`, { imageUrl, imageApi }, { headers: getAuthHeader() })
                setFavorites(prev => [...prev, data.favorite])
            }
        } catch (error) {
            console.log(`toggleFavorite Error : ${error}`);
        }
    }, [API_URL, favorites, isFavorite, isLoggedIn, showToast, getAuthHeader])

    useEffect(() => {
        if (isLoggedIn) {
            fetchFavorites()
        }
        else {
            setFavorites([])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn])

    const value = useMemo(() => ({ favorites, fetchFavorites, toggleFavorite, isFavorite }),
        [favorites, fetchFavorites, toggleFavorite, isFavorite])
    return (<FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>)
}

export { FavoritesContext }