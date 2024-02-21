import React, { useState } from "react";
import "./Login.css";
import { useLogin } from "../../Hooks/login";


const Login = () => {
    const [loginForm, setLoginForm] = useState({
        username : '' ,
        password : ''
    });
    const { login } = useLogin()
    const writeHandler = (e)=>{
        setLoginForm({
            ...loginForm ,
            [e.target.name] : e.target.value
        })
    }
    const loginHandler = async (e) => {
        e.preventDefault();
        login([false, false] , {...loginForm});
    };
    return (
        <div className="card-container">
            <div className="card-login">
                <form onSubmit={loginHandler}>
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        required
                        name="username"
                        onChange={writeHandler}
                    />
                    <br />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        placeholder="Password"
                        onChange={writeHandler}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
