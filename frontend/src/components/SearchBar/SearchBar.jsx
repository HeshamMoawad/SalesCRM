import React from "react";
import "./SearchBar.css";
import AddLogo from "../../assets/icons/add.png";
const SearchBar = ({addPath}) => {
    
    return (
        <>
            <div className="search-bar">
                <div className="search">
                    <input
                        className="search-input"
                        type="text"
                        placeholder='  phone or name or date "dd/mm/yyyy"'
                    />
                    <button className="search-btn">search</button>

                </div>

                <a href={addPath} className="search-add">
                    <button className="add-btn">
                        <img src={AddLogo} alt="..."/>
                    </button>
                </a>
            </div>
        </>
    );
};

export default SearchBar;
