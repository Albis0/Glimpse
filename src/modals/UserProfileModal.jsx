import "../css/Modal.css"
import { useContext, useRef } from "react";
import { UserContext } from "../context/UserContext"
function UserProfileModal() {
    const { handlePfpUpload, handleLogOut, setIsProfileModalOpen, userPfp, username, email } = useContext(UserContext)

    const fileInputRef = useRef(null)


    return <div className="modalContainer" onClick={() => { setIsProfileModalOpen(false) }}>
        <div className="UserProfileContainer" onClick={(e) => { e.stopPropagation() }}>
            <div className="UserProfileWrapper">
                <div className="userPfpContainer">
                    <div className="userPfpWrapper">
                        <img src={userPfp} alt="User Pfp" className="userPfp" onClick={() => { fileInputRef.current.click() }} />
                    </div>
                    <span onClick={() => { fileInputRef.current.click() }}>Change Picture</span>
                </div>
                <div className="userInfo">
                    <h3 className="username">{username}</h3>
                    <p className="email">{email}</p>
                </div>
            </div>
            <div className="logOutWrapper">
                <button className="logOutBtn" onClick={() => { handleLogOut() }}>Log Out</button>
            </div>
            <input type="file" ref={fileInputRef} accept="image/*" hidden onChange={(e) => { handlePfpUpload(e.target.files?.[0]) }} />

        </div>
    </div>;
}

export default UserProfileModal;
