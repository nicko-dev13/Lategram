import React from "react";
import Userimage from "./Userimage";

function Userinfo() {
    return (
        <div className="user-info">
            <Userimage />
            <div className="info">
                <h1>UserNAME</h1>
                <h2>Followers Posts Following</h2>
            </div>
        </div>
    );
}

export default Userinfo;