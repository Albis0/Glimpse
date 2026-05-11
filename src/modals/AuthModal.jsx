import "../css/Modal.css"
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function AuthModal() {
    const { username, setUsername, email, setEmail, password, setPassword,
        authMode, setAuthMode, setIsAuthModalOpen,
        handleLogIn, handleSignUp, handleForgotPassword
    } = useContext(UserContext)

    return <div className="modalContainer" onClick={() => { setIsAuthModalOpen(false) }}>
        <div className="AuthModal" onClick={(e) => { e.stopPropagation() }}>
            <h2 className="modalHeader">{authMode === "signup" ? "Sign Up" : authMode === "forgot" ? "Forgot Password" : "Log In"}</h2>
            <div className="inputContainer">
                {authMode === "signup" && <>
                    <label htmlFor="username" className="inputLabel" >Username</label>
                    <input type="text" id="username" value={username} onChange={(e) => { setUsername(e.target.value) }} tabIndex={1} /> </>}

                <label htmlFor="email" className="inputLabel" >Email</label>
                <input type="email" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} tabIndex={2} />

                {authMode !== "forgot" && <>
                    <label htmlFor="password" className="inputLabel" >Password</label>
                    <input type="password" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} tabIndex={3} /></>
                }
            </div>
            <div className="interactions">
                <button id="AuthModalSubmit"
                    onClick={authMode === "signup" ? handleSignUp : authMode === "forgot" ? handleForgotPassword : handleLogIn} tabIndex={4}>
                    {authMode === "signup" ? "Sign Up" : authMode === "forgot" ? "Send Reset Link" : "Log In"}
                </button>

                <div className="extraButtons">
                    {authMode === "login" && <button id="forgotPassword" onClick={() => { setAuthMode("forgot") }} tabIndex={5}>Forgot Password</button>}
                    <button id="AuthModalChangeButton"
                        onClick={() => { setAuthMode(authMode === 'signup' || authMode === "forgot" ? "login" : 'signup') }}>
                        {authMode === "signup" || authMode === "forgot" ? "Log In" : "Sign up"}
                    </button>
                </div>
            </div>
        </div>
    </div>;
}

export default AuthModal;
