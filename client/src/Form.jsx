import React from "react";

function Form() {
    return (
        <div className="form-container">
            <form>
                <h1>Lategram</h1>
                <h4>Sign up to see photos and videos from your friends.</h4>
                <hr />
                <input type="email" placeholder="Enter Email" />
                <input type="text" placeholder="First Name" />
                <input type="text" placeholder="Last Name" />
                <input type="password" placeholder="Password" />
                <button type="submit" >Sign Up</button>
                <h5>By signing up, you agree to our Terms , Data Policy and Cookies Policy .</h5>
            </form>
        </div>
    );
}

export default Form;