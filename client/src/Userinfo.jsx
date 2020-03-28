import React from "react";
import Userimage from "./Userimage";
import PostsComponent from "./PostsComponent";

function Userinfo() {
    return (
        <div className="user-info">
            <div className="info-header">
                <Userimage width="200px"/>
                <div className="info">
                    <p>UserNAME</p>
                    <span> <b>99</b> posts  </span>
                    <span>  <b>420</b> followers  </span>
                    <span>  <b>69</b> following  </span>
                    <p>Also known as pako and cko and mako and kako and taco</p>
                </div>
            </div>
            <hr />
            <PostsComponent />
        </div>
    );
}

export default Userinfo;