import React, { useEffect, useState } from "react";
import "./CustomSelection.css";

const CustomSelection = ({ options, defaultIndex, child, setSelection, initvalue , isDisabled=false  }) => {
    // const { options, defaultIndex, child, setSelection, initvalue , isDisabled  } = props;
    const [selectedValue, setSelectedValue] = useState(
        initvalue
            ? initvalue
            : defaultIndex
            ? options[defaultIndex]?.name
                ? options[defaultIndex].name
                : options[defaultIndex].username
            : ""
    );
    const handleSelectionChange = (e) => {
        setSelectedValue(e.target.value);
    };
    useEffect(() => {
        if (setSelection) {
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
                disabled={isDisabled}
            >
                <option key={Math.random()} value={""}></option>
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
