import axios from "axios";
import { createContext,useContext, useState } from "react";
import { SearchContext } from "./SearchContext";

const UserContext = createContext()

export function UserProvider({ children }) {
    const { showToast } = useContext(SearchContext)


    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") ? true : false)
    const [authMode, setAuthMode] = useState("login")
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
    const [username, setUsername] = useState(localStorage.getItem('username') || "")
    const [email, setEmail] = useState(localStorage.getItem('email') || "")
    const [password, setPassword] = useState("")
    const [activeView, setActiveView] = useState('home')
    const [userPfp, setUserPfp] = useState(localStorage.getItem('userPfp') || null)

    const API_URL = import.meta.env.VITE_API_URL;

    function getAuthHeader() {
        return { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }

    async function handleLogIn() {
        try {
            const response = await axios.post(`${API_URL}/api/auth/login`, { email, password })
            if (response.status != 200) return showToast("something went wrong try again")

            saveUserInfo(response)

            setIsAuthModalOpen(false)
            setIsLoggedIn(true)
            showToast("Log In Complete!")
        } catch (error) {
            console.log(error);
            showToast(error.response?.data?.message || "An Error Occurred")
        }
    }
    async function handleSignUp() {
        try {
            const response = await axios.post(`${API_URL}/api/auth/signup`, { username, email, password })
            if (response.status != 201) return showToast("something went wrong try again")
            setAuthMode("login")
            showToast("Sign Up Complete!")
        } catch (error) {
            console.log(error);
            showToast(error.response?.data?.message || "An Error Occurred")
        }
    }

    function saveUserInfo(response) {
        localStorage.setItem("token", response.data.token)
        localStorage.setItem('username', response.data.user.username)
        localStorage.setItem('email', response.data.user.email)
        if (response.data.user.profilePicture) {
            localStorage.setItem("userPfp", response.data.user.profilePicture)
        }

        setUsername(response.data.user.username)
        setUserPfp(response.data.user.profilePicture)
    }
    function handleLogOut() {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('email')
        localStorage.removeItem('userPfp')
        setIsLoggedIn(false)
        setIsProfileModalOpen(false)
        setIsAuthModalOpen(true)
    }

    async function handlePfpUpload(file) {
        const formData = new FormData()
        formData.append('profilePicture', file)

        const response = await axios.post(`${API_URL}/api/auth/upload-pfp`, formData, { headers: getAuthHeader() })

        const pfpUrl = `${API_URL}${response.data.profilePicture}`
        setUserPfp(pfpUrl)
        localStorage.setItem("userPfp", pfpUrl)
    }
    return (
        <UserContext.Provider
            value={{
                username, setUsername, email, setEmail, password, setPassword, userPfp, setUserPfp,
                authMode, setAuthMode, isLoggedIn, setIsLoggedIn,
                isAuthModalOpen, setIsAuthModalOpen, isProfileModalOpen, setIsProfileModalOpen,
                activeView, setActiveView, handleLogOut, handlePfpUpload,handleLogIn,handleSignUp
            }}>
            {children}</UserContext.Provider>
    )
}


export { UserContext }