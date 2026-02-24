import { useContext } from "react";
import "../App.css";
import { SearchContext } from "../SearchContext";
export default function ShowToast() {
    const { toastMessage, toastSwitch } = useContext(SearchContext)
    return (
        <div className={`toastWrapper ${toastSwitch ? "show" : ""}`}>
            <span className="exclamationMark">!</span>
            <span id="toastMessage">{toastMessage}</span>
        </div>
    );
}
