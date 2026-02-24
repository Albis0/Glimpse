import { useContext } from "react";
import { SearchContext } from "../SearchContext";

export default function Navbar() {
    const { userPfp, selectedApi, setSelectedApi } = useContext(SearchContext)
    return <header>
        <div className="appName">Glimpse</div>
        <div className="apiSelect">
            <div onClick={() => { setSelectedApi('unsplash') }}
                className={`navbarAPI ${selectedApi === 'unsplash' ? 'active ' : ''} navbarUnsplash`}>Unsplash</div>
            <div onClick={() => { setSelectedApi('pexels') }}
                className={`navbarAPI ${selectedApi === 'pexels' ? 'active ' : ''} navbarPexels `}>Pexels</div>
            <div onClick={() => { setSelectedApi('pixabay') }}
                className={`navbarAPI ${selectedApi === 'pixabay' ? 'active ' : ''} navbarPixabay`}>Pixabay</div>
        </div>
        <div className="userProfile">
            <img src={userPfp ? userPfp : `/src/assets/images/defaultUserPfp.jpg`} alt="userPfp" id="userPfp" />
        </div>
    </header>;
}
