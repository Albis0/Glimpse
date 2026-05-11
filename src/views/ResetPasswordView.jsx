import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../context/SearchContext"
import "../css/forgotPassword.css"
function ResetPasswordView() {
    const API_URL = import.meta.env.VITE_API_URL

    const { token } = useParams()
    const navigate = useNavigate()
    const { showToast } = useContext(SearchContext)
    const [password, setPassword] = useState("")

    async function handleReset() {
        if (!password) return showToast("Enter A Password")
        try {
            await axios.post(`${API_URL}/api/auth/reset-password/${token}`, { password })
            showToast("Password Reset Complete Try Log In")
            navigate("/")
        } catch (error) {
            showToast(error.response?.data?.message || "An Error Occured ")
        }
    }

    return <div className="resetPasswordContainer">
        <div className="wrapper">
            <p className="resetPassP">Enter New Password</p>
            <input type="password" id="newPasswordInput" className="newPasswordInput" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="newPasswordButton" id="newPasswordButton" onClick={handleReset}>Reset</button>
        </div>
    </div>;
}

export default ResetPasswordView