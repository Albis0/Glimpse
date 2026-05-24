import "./css/App.css";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
// components
import ShowToast from "./Components/Toast";
import Navbar from "./Components/Navbar";
import SideBar from "./Components/SideBar";

import PhotoModal from "./modals/PhotoModal";
import AuthModal from "./modals/AuthModal";
import UserProfileModal from "./modals/UserProfileModal";

import { SearchContext } from "./context/SearchContext";
import { UserContext } from "./context/UserContext";

import HomeView from "./views/HomeView";
import FavoritesView from "./views/FavoritesView";
import ResetPasswordView from "./views/ResetPasswordView"
import NotFoundView from "./views/NotFoundView";

function App() {
    const { isProfileModalOpen, isAuthModalOpen, } = useContext(UserContext)
    const { isModalOpen, } = useContext(SearchContext)
    return (
        <>
            <Navbar />
            <SideBar />
            <ShowToast />

            <div className="viewWrapper">
                <Routes>
                    <Route path="/" element={<HomeView />} />
                    <Route path="/favorites" element={<FavoritesView />} />
                    <Route path="/reset-password/:token" element={<ResetPasswordView />} />
                    <Route path="/*" element={<NotFoundView />} />
                </Routes>
            </div>
            {/* Photo Modal */}
            {isModalOpen && <PhotoModal />}
            {/* Auth Modal */}
            {isAuthModalOpen && <AuthModal />}
            {/* User Profile Modal */}
            {isProfileModalOpen && <UserProfileModal />}
        </>
    );
}

export default App;
