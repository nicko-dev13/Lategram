import React from "react";

function Userimage(props) {
    return (
        <div className="user-image">
            <img src={require('./chacmage.png')} alt="userimage" />
        </div>
    );
}

export default Userimage;