import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import request, { ADD_NEW, SUCCESS_STATUS_CODES } from "../../utils/requests";
import { useAuth  , usePermission , saveLogin , savePermission} from "../../Hooks";
import "./Login.css";


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { auth, setAuth } = useAuth();
    const {permission , setPermission} = usePermission();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth) {
            navigate("/dashboard");
        }
    }, [auth]);

    const login = async (show = [false, true]) => {
        const response = await request(
            "/login",
            ADD_NEW,
            show,
            {},
            { username, password }
        );
        console.log(response, "response");
        if (response !== undefined && SUCCESS_STATUS_CODES.includes(response.status)) {
            localStorage.setItem("Authorization", response.data.Authorization);
            setPermission({
                role: response.data.role,
                isAuthenticated:true ,
            })
            savePermission({
                role: response.data.role,
                isAuthenticated:true ,
            })
            console.log(permission , "permission---login")
            setAuth(response.data);
            saveLogin(response.data)

        }
    };

    useEffect(()=>{
        login([false, false]);
    } , []);
    
    const loginHandler = async (e) => {
        e.preventDefault();
        login();
    };

    return (
        <div className="card-container">
            <div className="card-login">
                <form onSubmit={loginHandler}>
                    {/* <label className="username" htmlFor="username">Username</label>
                <br/> */}
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        required
                        name="username"
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                    <br />
                    {/* <label className="password" htmlFor="password">Password</label>
                <br/> */}
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        placeholder="Password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
