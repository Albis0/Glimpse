import { Link } from "react-router-dom";
import { useEffect } from "react";
function NotFoundView() {
    // document titles
    useEffect(() => {
        document.title = "404 — Page Not Found | Glimpse"
    }, [])
    return <div className="NotFoundViewContainer">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <Link to="/">Go To Home Page</Link>
    </div>;
}

export default NotFoundView