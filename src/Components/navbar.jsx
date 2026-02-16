import React from "react";

export default function Navbar({ pfp }) {

    return <header>
        <div className="appName">Glimpse</div>
        <div className="apiSelect">
            <div className="navbarAPI navbarUnsplash">Unsplash</div>
            <div className="navbarAPI navbarPexels">Pexels</div>
            <div className="navbarAPI navbarPixabay">Pixabay</div>
        </div>
        <div className="userProfile">
            <img src={pfp ? pfp : `/src/assets/images/defaultUserPfp.jpg`} alt="userPfp" id="userPfp" />
        </div>
    </header>;
}
