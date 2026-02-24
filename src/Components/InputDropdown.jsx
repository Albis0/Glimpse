import { useContext, useState } from "react";
import { SearchContext } from "../SearchContext";

function InputDropdown() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const {selectedResolution , setSelectedResolution} = useContext(SearchContext)
    function changeResulation(newResulation){
        setSelectedResolution(newResulation)
        setIsDropdownOpen(false)
    }
    return <div>
        <div className="resulationSelect" onClick={() => { setIsDropdownOpen(!isDropdownOpen) }}>{selectedResolution}</div>
        {isDropdownOpen && <div className="optionWrapper">
            <div className="resulationOption res1080P" onClick={()=>{changeResulation("1080P")}}>1080P</div>
            <div className="resulationOption res2K" onClick={()=>{changeResulation("2K")}}>2K</div>
            <div className="resulationOption res4K" onClick={()=>{changeResulation("4K")}}>4K</div>
            <div className="resulationOption resOriginal" onClick={()=>{changeResulation("Original")}}>Original</div>
        </div>}
    </div>;
}

export default InputDropdown;
