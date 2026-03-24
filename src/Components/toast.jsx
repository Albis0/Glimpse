import { useContext } from "react";
import "../css/App.css";
import { SearchContext } from "../context/SearchContext";
export default function ShowToast() {
    const { toastMessage, toastSwitch } = useContext(SearchContext)
    return (
        <div className={`toastWrapper ${toastSwitch ? "show" : ""}`}>
            <span className="exclamationMark">!</span>
            <span id="toastMessage">{toastMessage}</span>
        </div>
    );
}
