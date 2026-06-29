import "../css/navbar.css"
import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { UserContext } from "../context/UserContext";

export default function Navbar() {
    const { selectedApi, setSelectedApi } = useContext(SearchContext)
    const { userPfp, isLoggedIn, setIsAuthModalOpen, setAuthMode, setIsProfileModalOpen } = useContext(UserContext)

    return <header>
        <a href="/" className="appName" aria-label="Glimpse Home">Glimpse</a>
        <div className="apiSelect">
            <div onClick={() => { setSelectedApi('unsplash') }}
                className={`navbarAPI ${selectedApi === 'unsplash' ? 'active ' : ''} navbarUnsplash`}>Unsplash</div>
            <div onClick={() => { setSelectedApi('pexels') }}
                className={`navbarAPI ${selectedApi === 'pexels' ? 'active ' : ''} navbarPexels `}>Pexels</div>
            <div onClick={() => { setSelectedApi('pixabay') }}
                className={`navbarAPI ${selectedApi === 'pixabay' ? 'active ' : ''} navbarPixabay`}>Pixabay</div>
        </div>
        <div className="userProfile">
            {isLoggedIn ?
                <img src={userPfp ? userPfp : `/src/assets/images/defaultUserPfp.jpg`} alt="userPfp" id="userPfp" onClick={() => { setIsProfileModalOpen(true) }} />
                : <div className="navbarButtonWrapper">
                    <button className="navbarButton" onClick={() => { setIsAuthModalOpen(true); setAuthMode('signup') }}>Sign Up</button>
                    <button className="navbarButton" onClick={() => { setIsAuthModalOpen(true); setAuthMode("login") }}>Log In</button>
                </div>
            }
        </div>
    </header>;
}
