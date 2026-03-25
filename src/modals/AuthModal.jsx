import "../css/Modal.css"
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { SearchContext } from "../context/SearchContext";

import axios from "axios";
const APIURL = import.meta.env.VITE_API_URL
function AuthModal() {
    const { username, setUsername, email, setEmail, password, setPassword, authMode, setAuthMode, setIsAuthModalOpen, setIsLoggedIn } = useContext(UserContext)
    const { showToast } = useContext(SearchContext)
    async function handleLogIn() {
        try {
            const response = await axios.post(`${APIURL}/api/auth/login`, { email, password })
            if (response.status != 200) return showToast("something went wrong try again")

            saveUserInfoToLocalstorage(response)

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
            const response = await axios.post(`${APIURL}/api/auth/signup`, { username, email, password })
            if (response.status != 201) return showToast("something went wrong try again")
            setAuthMode("login")
            showToast("Sign Up Complete!")
        } catch (error) {
            console.log(error);
            showToast(error.response?.data?.message || "An Error Occurred")
        }
    }

    function saveUserInfoToLocalstorage(response) {
        localStorage.setItem("token", response.data.token)
        localStorage.setItem('username', response.data.user.username)
        localStorage.setItem('email', response.data.user.email)
    }
    return <div className="modalContainer" onClick={() => { setIsAuthModalOpen(false) }}>
        <div className="AuthModal" onClick={(e) => { e.stopPropagation() }}>
            <h2 className="modalHeader">{authMode === "signup" ? "Sign Up" : "Log In"}</h2>
            <div className="inputContainer">
                {authMode === "signup" && <>
                    <label htmlFor="username" className="inputLabel" >Username</label>
                    <input type="text" id="username" value={username} onChange={(e) => { setUsername(e.target.value) }} tabIndex={1} /> </>}

                <label htmlFor="email" className="inputLabel" >Email</label>
                <input type="email" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} tabIndex={2} />
                <label htmlFor="password" className="inputLabel" >Password</label>
                <input type="password" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} tabIndex={3} />
            </div>
            <div className="interactions">
                <button id="AuthModalSubmit" onClick={authMode === "signup" ? handleSignUp : handleLogIn} tabIndex={4}>{authMode === "signup" ? "Sign Up" : "Log In"}</button>

                <div className="extraButtons">
                    <button id="forgotPassword" tabIndex={5}>Forgot Password</button>
                    <button id="AuthModalChangeButton" onClick={() => { setAuthMode(authMode === 'signup' ? "login" : 'signup') }}>{authMode === "signup" ? "Log In" : "Sign up"}</button>
                </div>
            </div>
        </div>
    </div>;
}

export default AuthModal;
