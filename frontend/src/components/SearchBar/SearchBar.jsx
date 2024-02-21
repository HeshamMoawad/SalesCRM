import React, { useRef, useState } from "react";
import "./SearchBar.css";
import AddLogo from "../../assets/icons/add.png";
const SearchBar = ({ addPath, headerName , setSearch}) => {
    const inputRef = useRef(null);
    return (
        <>
            <div className="section-name">
                <h1>{headerName}</h1>
            </div>
            <div className="search-bar">
                <div className="search">
                    <input
                        className="search-input"
                        type="text"
                        placeholder='  phone or name or date "dd/mm/yyyy"'
                        ref={inputRef}
                    />
                    <button className="search-btn" onClick={()=>{setSearch(inputRef.current.value)}}>Search</button>
                </div>
                {addPath ? (
                    <a href={addPath} className="search-add">
                        <button className="add-btn">
                            <img src={AddLogo} alt="..." />
                        </button>
                    </a>
                ) : null}
            </div>
        </>
    );
};

export default SearchBar;
