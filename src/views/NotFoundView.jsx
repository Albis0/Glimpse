import { Link } from "react-router-dom";
function NotFoundView() {
    return <div className="NotFoundViewContainer">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <Link to="/">Go To Home Page</Link>
    </div>;
}

export default NotFoundView