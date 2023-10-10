import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../css/navbar.css"
import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCoffee } from '@fortawesome/fontawesome-free-solid'
import callApi from "../api/callApi";
fontawesome.library.add(faUser, faCoffee);

function Navbar() {
    const { http,logout, getToken } = callApi();
    const navigate = useNavigate();
    //check for user access token
    const checkForAccessToken = () => {
        http.get('/user', {
            headers: {
                'Authorization': 'Bearer ' + getToken(),
            }
        }).then((res => {
        })).catch((error) => {

            if (error?.response?.status === 401) {
                navigate('/login');
            }
        });
    }
    useEffect(() => {
        checkForAccessToken();
    }, [])
    return (
        <>
            <nav id="navbar" className="container">
                <div className="nav-wrapper">
                    <li>Consular ID Application</li>
                    <ul id="menu">
                        <li>
                            <NavLink to={'/'}>Dashboard</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/participants'}>Participants</NavLink>
                        </li>
                    </ul>
                    <li className=" ml-3 search_area">

                        <input id="searchQueryInput" type="text" name="searchQueryInput" placeholder="Global Search" onChange={e => console.log(e.target.value)}/>
                        <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
                            <svg style={{
                                width: 24,
                                height: 24
                            }} viewBox="0 0 24 24"><path fill="#666666" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                            </svg>
                        </button>
                        <div className="user-dropdown">

                            <FontAwesomeIcon icon="user"  className="mx-2"/>
                            <div className="dropdown-content">
                                <NavLink to={'/profile'}>Profile  <i className="fa fa-user"></i></NavLink>
                                <a  onClick={ logout}>  Logout <i className="fas fa-sign-out-alt"></i></a>
                            </div>
                        </div>
                    </li>
                </div>
            </nav>
        </>
    );
}
export default Navbar;