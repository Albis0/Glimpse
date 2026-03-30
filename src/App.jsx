import "./css/App.css";
import { useContext } from "react";
// components
import ShowToast from "./Components/toast";
import Navbar from "./Components/navbar";
import SideBar from "./Components/Sidebar";

import PhotoModal from "./modals/photoModal";
import AuthModal from "./modals/AuthModal";

import { SearchContext } from "./context/SearchContext";
import { UserContext } from "./context/UserContext";

import HomeView from "./views/HomeView";
import FavoritesView from "./views/FavoritesView";

function App() {
    const { isAuthModalOpen, activeView } = useContext(UserContext)
    const { isModalOpen, } = useContext(SearchContext)
    localStorage.clear()
    return (
        <>
            <Navbar />
            <SideBar />
            <ShowToast />

            <div className="viewWrapper">
                {activeView === 'home' && <HomeView />}
                {activeView === 'favorites' && <FavoritesView />}
            </div>
            {/* Photo Modal */}
            {isModalOpen && <PhotoModal />}
            {/* Auth Modal */}
            {isAuthModalOpen && <AuthModal />}
        </>
    );
}

export default App;
