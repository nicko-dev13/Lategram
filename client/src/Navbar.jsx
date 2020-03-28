import React from "react";
import Logofull from "./Logofull";
import Userimage from "./Userimage";


function Navbar() {
    return (
        <div>
             <nav className="nav">
                <Logofull fontSize="40px" />
                <input placeholder="Search"></input>
                <Userimage width="50px"/>
             </nav>
        </div>
    );
}

export default Navbar;