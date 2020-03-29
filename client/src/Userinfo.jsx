import React from "react";
import Userimage from "./Userimage";
import PostsComponent from "./PostsComponent";

function Userinfo() {
    return (
        <div className="user-info">
            <div className="info-header">
                <Userimage width="15vw"/>
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
            <div className="view-post">
                <div className="view-post-container">
                    <div className="image">
                        <img src={require("./Cod.jpg")} />
                    </div>
                    <div className="author">
                        <Userimage width="50px" />
                        <span> UserNAME </span>
                    </div>
                    <div className="comments">
                        <span> <b>99</b> posts  </span>
                        <span>  <b>420</b> followers  </span>
                        <span>  <b>69</b> following  </span>
                        <p>Also known as pako and cko and mako and kako and taco</p>
                    </div>
                    <div className="author">
                        <Userimage width="50px" />
                        <span> UserNAME </span>
                    </div>
                    <div className="author">
                        <Userimage width="50px" />
                        <span> UserNAME </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Userinfo;