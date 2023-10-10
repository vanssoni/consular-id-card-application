import callApi from "../api/callApi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Header from "../components/Header";
import "../css/login-page.css";
function Login() {
    const { http, setCurrentUser , getToken } = callApi();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errors, setErrors] = useState();

    const navigate = useNavigate();

    //check if user is logged in then redirect
    // const checkIfUserIsLoggedIn = () => {
    //     if(getToken()){
    //         navigate('/');
    //     }
    // }
    //submit the login form
    const submitForm = (e) => {
        e.preventDefault();
        http.post('/login', { email, password }).then((res => {
            if (!res.data.success && res.data?.errors) {
                setErrors(res.data.errors);
                return false;
            }
            setCurrentUser(res.data.user);
        })).catch((error) => { 
            if (error?.response?.data?.errors) {
                setErrors(error.response.data.errors);
                return false;
            } 
        });
    }

    // useEffect(()=>{
    //     checkIfUserIsLoggedIn();
    // }, [])
    return (
        <>
            <div className='row'>

                <div className="form-container text-center col-md-6" id="login-form">

                    <h1>Login</h1>
                    <form name="login-form">
                        <label htmlFor="email">Email</label>
                        <input type="email" className={`form-control ${errors?.email ? 'is-invalid' : ''}`} id="email" name="email" onChange={e => setEmail(e.target.value)} />
                        {errors?.email &&
                            <div className="invalid-feedback text-start">
                                {errors.email[0]}
                            </div>
                        }
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" className={`form-control ${errors?.password ? 'is-invalid' : ''}`} name="password" onChange={e => setPassword(e.target.value)} />
                        {errors?.password &&
                            <div className="invalid-feedback text-start">
                                {errors.password[0]}
                            </div>
                        }
                        <button className="btn" onClick={e => submitForm(e)}>Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Login;