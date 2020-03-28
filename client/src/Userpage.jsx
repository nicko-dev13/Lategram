import React from "react";
import Navbar from "./Navbar";
import Userinfo from "./Userinfo";

function Userpage() {
    return (
        <div className="user-page">
            <Navbar />
            <Userinfo/>
        </div>
    );
}

export default Userpage;