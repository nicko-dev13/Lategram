import React from "react";

function Logofull(props) {
    const customStyle  = {
        fontSize: props.fontSize
    };
    return (
        <h1 className="logo-full" style={customStyle}>Lategram</h1>
    )
}

export default Logofull;