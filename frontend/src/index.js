import React from "react";
import ReactDOM from "react-dom/client";
import AnimatedBackground from "./components/AnimatedBackground/AnimatedBackground";
import './index.css';
import Pages from "./Pages/Pages";
import AuthContextProvider , {PermissionContextProvider} from "./Hooks";

const root = ReactDOM.createRoot(document.getElementById("root"));

export default function App() {
  return (   
    <React.StrictMode>  
      <AnimatedBackground/>
      <AuthContextProvider> 
        <PermissionContextProvider>
          <Pages/>
        </PermissionContextProvider>
      </AuthContextProvider>
  </React.StrictMode> 
  );
}

root.render(<App />);