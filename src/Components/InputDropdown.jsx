import { useContext, useState } from "react";
import { SearchContext } from "../SearchContext";

function InputDropdown() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const { selectedResolution, setSelectedResolution, unsplashRes, pexelsRes, pixabayRes, selectedApi } = useContext(SearchContext)


    let currentList = []
    if (selectedApi === `unsplash`) currentList = unsplashRes
    if (selectedApi === `pexels`) currentList = pexelsRes
    if (selectedApi === `pixabay`) currentList = pixabayRes


    function changeResulation(newResulation) {
        setSelectedResolution(newResulation)
        setIsDropdownOpen(false)
    }
    return <div>
        <div className="resulationSelect" onClick={() => { setIsDropdownOpen(!isDropdownOpen) }}>{selectedResolution}</div>
        {isDropdownOpen && <div className="optionWrapper">
            {currentList.map((res, index) => (
                <div key={index} className="resolutionOption" onClick={() => {
                    changeResulation(res)
                    setIsDropdownOpen(false)
                }}>{res}</div>
            ))}
        </div>}
    </div>;
}

export default InputDropdown;
