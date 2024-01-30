import React from "react";
import "./Login.css";

const Login = () => {
    return (
        <div className="card-container">
        <div className="card-login">
            <form onSubmit={(e)=>{ e.preventDefault();console.log("login")}} >
                {/* <label className="username" htmlFor="username">Username</label>
                <br/> */}
                <input type="text" id="username" placeholder="Username" name="username" required="" />
                <br/>
                {/* <label className="password" htmlFor="password">Password</label>
                <br/> */}
                <input
                    type="password"
                    id="password"
                    name="password"
                    required=""
                    placeholder="Password"
                />
                <button type="submit">Login</button>
            </form>
        </div>
        </div>
    );
};

export default Login;
