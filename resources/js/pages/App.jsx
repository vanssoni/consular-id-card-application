import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter} from "react-router-dom";
import AppRoutes from "../components/Router";
import Header from "../components/Header";
import { ToastContainer } from 'react-toastify';

// import Login from "./Login";
import "../css/custom.css";

function App() {
    
    return (
        <>
            <ToastContainer />
            <div className="container">
                <BrowserRouter>
                    <Header />
                    <AppRoutes />
                </BrowserRouter>
            </div>
        </>
    );
}

if (document.getElementById('app')) {
    createRoot(document.getElementById('app')).render(<App />)
}