import { createContext, useState } from "react";

const UserContext = createContext()

export function UserProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") ? true : false)
    const [authMode, setAuthMode] = useState("login")
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [activeView, setActiveView] = useState('home')



    return (
        <UserContext.Provider
            value={{
                username, setUsername, email, setEmail, password, setPassword,
                authMode, setAuthMode, isLoggedIn, setIsLoggedIn, isAuthModalOpen, setIsAuthModalOpen,
                activeView, setActiveView
            }}>
            {children}</UserContext.Provider>
    )
}


export { UserContext }