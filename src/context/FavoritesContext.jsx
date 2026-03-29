import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { SearchContext } from "./SearchContext";

const FavoritesContext = createContext()
export function FavoritesProvider({ children }) {
    const { isLoggedIn } = useContext(UserContext)
    const { showToast } = useContext(SearchContext)
    const API_URL = import.meta.env.VITE_API_URL;
    const [favorites, setFavorites] = useState([])



    function getAuthHeader() {
        return { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }

    function isFavorite(imageUrl) {
        return favorites.some(fav => fav.imageUrl === imageUrl)
    }

    async function fetchFavorites() {
        const response = await axios.get(`${API_URL}/api/favorites`, { headers: getAuthHeader() });
        setFavorites(response.data.favorites)
    }


    async function toggleFavorite(imageUrl, imageApi) {
        // if not logged in
        if (!isLoggedIn) {
            showToast("Log In To Save Favorites!")
            return
        }

        // if already in favorites
        if (isFavorite(imageUrl)) {
            const favId = favorites.find(fav => fav.imageUrl === imageUrl)._id
            await axios.delete(`${API_URL}/api/favorites/${favId}`, { headers: getAuthHeader() })
            setFavorites(prev => prev.filter(fav => fav._id !== favId))
        }
        // if not in favorites
        else {
            await axios.post(`${API_URL}/api/favorites`, { imageUrl, imageApi }, { headers: getAuthHeader() })
            fetchFavorites()
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            fetchFavorites()
        }
        else {
            setFavorites([])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn])
    return (<FavoritesContext.Provider value={
        { favorites, fetchFavorites, toggleFavorite, isFavorite }
    }>{children}</FavoritesContext.Provider>)
}

export { FavoritesContext }