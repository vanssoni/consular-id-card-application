import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function callApi() {
    const [currentUser, setCurrentUser] = useState();
    const navigate = useNavigate();

    const saveUser = (user) => {
        sessionStorage.setItem('user', JSON.stringify(user));
        setCurrentUser(user);
        toast.success('Logged in successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigate('/', {state:{loggedIn:true}});
    }
    const logout = () => {
        sessionStorage.removeItem('user');
        toast.success('Logged out successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigate('/login');
    }

    const getToken = () => {
        const token = '';
        if( sessionStorage.getItem('user')){
            const user = JSON.parse(sessionStorage.getItem('user'));
            return user?.token ?? null;
        }
    }

    const getUser = () => {
        if( sessionStorage.getItem('user')){
            const user = JSON.parse(sessionStorage.getItem('user'));
            return user;
        }
    }

    const http = axios.create({
        baseURL: 'http://localhost:8000/api'
    });
    
    return {
        setCurrentUser: saveUser,
        http,
        currentUser,
        logout,
        getUser,
        getToken,
    }
}