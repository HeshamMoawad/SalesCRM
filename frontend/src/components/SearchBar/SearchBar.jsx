import React from "react";
import "./SearchBar.css";

const SearchBar = () => {
    return (
        <>
            <div className="search-bar">
                <input
                    className="search-input"
                    type="text"
                    placeholder='  phone or name or date "dd/mm/yyyy"'
                />

                <button className="search-btn">search</button>
            </div>
        </>
    );
};

export default SearchBar;
