import React from "react";
import "./AnimatedBackground.css";

const AnimatedBackground = () => {
    const puplesRange = Array.from({ length: 200 });
    return (
        <div>
            {puplesRange.map((_, index) => (
                <div key={index} className="circle-container">
                    <div className="circle"></div>
                </div>
            ))}
        </div>
    );
};

export default AnimatedBackground;
