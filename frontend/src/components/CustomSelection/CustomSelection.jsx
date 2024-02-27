import React, { useEffect, useState } from "react";
import "./CustomSelection.css";

const CustomSelection = (props) => {
    const { options, defaultIndex, child, setSelection } = props;
    const [selectedValue, setSelectedValue] = useState(
        defaultIndex
            ? options[defaultIndex]?.name
                ? options[defaultIndex].name
                : options[defaultIndex].username
            : ""
    );
    const handleSelectionChange = (e) => {
        setSelectedValue(e.target.value);
    };
    useEffect(() => {
        if (setSelection){
            setSelection(selectedValue);
            console.log(selectedValue);
        }
    }, [selectedValue]);
    return (
        <div className="custom-selection">
            {child}
            <select
                value={selectedValue}
                onChange={(e) => {
                    handleSelectionChange(e);
                }}
            >
                <option key={Math.random()} value={''}>
                </option>
                {options
                    ? options.map((option) => {
                          if (option?.name) {
                              return (
                                  <option
                                      key={Math.random()}
                                      value={option.name}
                                  >
                                      {option.name}
                                  </option>
                              );
                          } else {
                              return (
                                  <option
                                      key={Math.random()}
                                      value={option.username}
                                  >
                                      {option.username}
                                  </option>
                              );
                          }
                      })
                    : null}
            </select>
        </div>
    );
};

export default CustomSelection;
