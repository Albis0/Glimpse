import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './css/index.css'
import App from './App.jsx'
import { SearchProvider } from './context/SearchContext.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { FavoritesProvider } from './context/FavoritesContext.jsx'
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <SearchProvider>
                <UserProvider>
                    <FavoritesProvider>
                        <App />
                    </FavoritesProvider >
                </UserProvider>
            </SearchProvider>
        </BrowserRouter>
    </StrictMode>,
)
