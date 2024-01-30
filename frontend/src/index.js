import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AnimatedBackground from "./components/AnimatedBackground/AnimatedBackground";
// import Login from "./components/Login/Login";
import './index.css';
import DashBoard from "./components/DashBoard/DashBoard";


const root = ReactDOM.createRoot(document.getElementById("root"));

export default function App() {
  return (   
    <>  
      <AnimatedBackground/>
      <BrowserRouter>
        {/* <Login/> */}
        <DashBoard/>
      </BrowserRouter>
  </> 
  );
}

root.render(<App />);