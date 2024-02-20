import React , {useState} from "react";
import "./CustomSelection.css";

const CustomSelection = (props) => {
    const { options , defaultIndex } = props;
    const [selectedValue, setSelectedValue] = useState(defaultIndex ? options[defaultIndex].name : "");

    const handleSelectionChange = (e) => {
        setSelectedValue(e.target.value);
    };
    
    return (
        <div className="custom-selection">
            <select value={selectedValue} onChange={(e)=>{handleSelectionChange(e)}}>
                {options
                    ? options.map((option) => {
                          return <option key={Math.random()} value={option.name}>{option.name}</option>;
                      })
                    : null}
            </select>
        </div>
    );
};

export default CustomSelection;
