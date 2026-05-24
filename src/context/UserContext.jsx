import axios from "axios";
import { createContext, useContext, useMemo, useState, useCallback } from "react";
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
    const [userPfp, setUserPfp] = useState(localStorage.getItem('userPfp') || null)

    const API_URL = import.meta.env.VITE_API_URL;

    const getAuthHeader = useCallback(() => {
        return { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }, [])

    const saveUserInfo = useCallback((response) => {
        localStorage.setItem("token", response.data.token)
        localStorage.setItem('username', response.data.user.username)
        localStorage.setItem('email', response.data.user.email)
        if (response.data.user.profilePicture) {
            localStorage.setItem("userPfp", response.data.user.profilePicture)
        }

        setUsername(response.data.user.username)
        setUserPfp(response.data.user.profilePicture)
    }, [])

    const handleLogIn = useCallback(async () => {
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
    }, [email, password, API_URL, saveUserInfo, showToast])

    const handleSignUp = useCallback(async () => {
        try {
            const response = await axios.post(`${API_URL}/api/auth/signup`, { username, email, password })
            if (response.status != 201) return showToast("something went wrong try again")
            setAuthMode("login")
            showToast("Sign Up Complete!")
        } catch (error) {
            console.log(error);
            showToast(error.response?.data?.message || "An Error Occurred")
        }
    }, [username, email, password, API_URL, showToast])



    const handleLogOut = useCallback(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('email')
        localStorage.removeItem('userPfp')
        setIsLoggedIn(false)
        setIsProfileModalOpen(false)
        setIsAuthModalOpen(true)
    }, [])

    const handlePfpUpload = useCallback(async (file) => {
        if (!file) return;
        const formData = new FormData()
        formData.append('profilePicture', file)

        const response = await axios.post(`${API_URL}/api/auth/upload-pfp`, formData, { headers: getAuthHeader() })

        const pfpUrl = response.data.profilePicture
        setUserPfp(pfpUrl)
        localStorage.setItem("userPfp", pfpUrl)
    }, [API_URL, getAuthHeader])

    const handleForgotPassword = useCallback(async () => {
        if (email === "") {
            showToast("Enter your Email")
            return
        }
        try {
            await axios.post(`${API_URL}/api/auth/forgot-password`, { email })

            showToast("Reset link sent to your email ")
        } catch (error) {
            showToast(error.response?.data?.message)
        }
    }, [email, API_URL, showToast])

    const value = useMemo(() => ({
        username, setUsername, email, setEmail, password, setPassword, userPfp, setUserPfp,
        authMode, setAuthMode, isLoggedIn, setIsLoggedIn,
        isAuthModalOpen, setIsAuthModalOpen, isProfileModalOpen, setIsProfileModalOpen,
        handleLogOut, handlePfpUpload, handleLogIn, handleSignUp, handleForgotPassword, getAuthHeader
    }), [username, email, password, userPfp, authMode, isLoggedIn, isProfileModalOpen, isAuthModalOpen, handleLogOut, handleLogIn, handlePfpUpload, handleSignUp, handleForgotPassword, getAuthHeader])
    return (
        <UserContext.Provider
            value={
                value
            }>
            {children}</UserContext.Provider>
    )
}


export { UserContext }