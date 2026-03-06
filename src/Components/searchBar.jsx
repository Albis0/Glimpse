import { SendIcon } from "./SvgIcons"
import InputDropdown from "./InputDropdown";
import { SearchContext } from "../SearchContext";
import { useContext } from "react";

function SearchBar() {

    const { query, setQuery, imageFetcher } = useContext(SearchContext)
    return <div className="searchBarWrapper">
        <div className="searchInputRow">
            <input
                type="text" id="queryInput" placeholder="enter a word" autoComplete="off" value={query}
                onChange={(e) => { setQuery(e.target.value) }}
                onKeyDown={(e) => { if (e.key === "Enter") { imageFetcher() } }}
            />
            <div className="iconWrapper" onClick={() => { imageFetcher() }} >
                <SendIcon color="azure" />
            </div>
        </div>
        <div className="searchOptionsRow">
            <InputDropdown />
        </div>
    </div>;
}

export default SearchBar;
