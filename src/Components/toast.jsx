import "../App.css";

export default function ShowToast({ toastMessage, toastSwitch }) {
    return (
        <div className={`toastWrapper ${toastSwitch ? "show" : ""}`}>
            <span className="exclamationMark">!</span>
            <span id="toastMessage">{toastMessage}</span>
        </div>
    );
}
