import React, { useState } from "react";
import callApi from "../api/callApi";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../components/Navbar";
import { ThreeDots } from  'react-loader-spinner'

function Home() {
    const { getToken, http } = callApi();
    const [dashboardData, setDashboardData] = useState(false);
    const navigate = useNavigate();

    //get data for the dashboard
    const getDashboardData = () => {
        http.get('/dashboard-data', {
            headers: {
                'Authorization': 'Bearer ' + getToken(),
            }
        }).then((res => {
            console.log(res.data);
            setDashboardData(res.data.data);
        })).catch((error) => {

            if (error?.response?.status === 401) {
                navigate('/login');
            }

            if (error?.response?.status) {
                error?.response?.data?.message && toast.error(error?.response?.data?.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                }) ;
            }
        });
    }

    useEffect(() => {
        getDashboardData();
    }, [])

    return (
        <>
            <Navbar />
            <main className="col-md-12" id="main">
                {dashboardData  === false ? 
                <>
                    <ThreeDots 
                        height="120" 
                        width="120" 
                        radius="100"
                        color="#4fa94d" 
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{justifyContent:"center",width:"100%",transform: "translateY(100%)"}}
                        wrapperClassName=""
                        visible={true}
                    />
                </>
                :  
                <>
                    <section className="spacethis">
                        <h3 className="title text-center">Overview</h3>
                        <div className="row mobile-scrollable">
                            <div className="col-md-3">
                                <div className="dash-card">
                                    {/* <i className="fa fa-car"></i> */}
                                    <p>All participants</p>
                                    <h1 className="text-success">{dashboardData?.all_participants_count}</h1>
                                    <button type="button" className="btn btn-theme">View all</button>

                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="dash-card">
                                    {/* <i className="fa fa-check" aria-hidden="true"></i> */}
                                    <p>Participant this week</p>
                                    <h1 className="text-primary">{dashboardData?.participants_this_week_count}</h1>
                                    <button type="button" className="btn btn-theme">View all</button>

                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="dash-card">
                                    {/* <i className="fa fa-history" aria-hidden="true"></i> */}
                                    <p>To be expired</p>
                                    <h1 className="text-warning">{dashboardData?.participants_to_be_expired_count}</h1>
                                    <button type="button" className="btn btn-theme">View all</button>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="dash-card">
                                    {/* <i className="fa fa-shopping-bag" aria-hidden="true"></i> */}
                                    <p>Expired</p>
                                    <h1 className="text-danger">{dashboardData?.participants_expired_count}</h1>
                                    <button type="button" className="btn btn-theme">View all</button>

                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="spacethis">
                        <div className="row">
                            <div className="col-md-6">
                                <h5 className="title">Recent participants</h5>
                                <div className="md-card">
                                    <table className="table table-hover no-border">
                                        <thead>
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">Card number</th>
                                                <th scope="col">Created at</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <img className="table-user" src="image/man.jpg" alt="" /> Pearl Chavez
                                                </td>
                                                <td>100<sub>LTR</sub></td>
                                                <td>Noida</td>
                                            </tr>



                                            <tr>
                                                <td>
                                                    <img className="table-user" src="image/user.jpg" alt="" />
                                                    Pearl Chavez
                                                </td>
                                                <td>100<sub>LTR</sub></td>
                                                <td>Noida</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <img className="table-user" src="image/boy.jpg" alt="" />
                                                    Pearl Chavez
                                                </td>
                                                <td>100<sub>LTR</sub></td>
                                                <td>Noida</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <img className="table-user" src="image/man.jpg" alt="" />
                                                    Pearl Chavez
                                                </td>
                                                <td>100<sub>LTR</sub></td>
                                                <td>Noida</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>

                            </div>

                            <div className="col-md-6">
                                <h5 className="title">Recent verifications</h5>
                                <div className="md-card por">
                                    <table className="table table-hover no-border">

                                        <tbody>
                                            <tr className="read-reviews-btn">
                                                <td>
                                                    <img className="table-user" src="image/man.jpg" alt="" /> Pearl Chavez
                                                </td>

                                                <td><img src="image/starts.png" alt="" /></td>
                                                <td align="right">
                                                    <span className="text-success">Last verified at : 25 June, 2023 at 10:00 PM</span>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <img className="table-user" src="image/boy.jpg" alt="" /> Pearl Chavez
                                                </td>

                                                <td><img src="image/starts.png" alt="" /></td>
                                                <td align="right">
                                                    <span className="text-success">Last verified at : 25 June, 2023 at 10:00 PM</span>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <img className="table-user" src="image/user.jpg" alt="" /> Pearl Chavez
                                                </td>

                                                <td><img src="image/starts.png" alt="" /></td>
                                                <td align="right">
                                                    <span className="text-success">Last verified at : 25 June, 2023 at 10:00 PM</span>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <img className="table-user" src="image/man.jpg" alt="" /> Pearl Chavez
                                                </td>

                                                <td><img src="image/starts.png" alt="" /></td>
                                                <td align="right">
                                                    <span className="text-success">Last verified at : 25 June, 2023 at 10:00 PM</span>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <img className="table-user" src="image/man.jpg" alt="" /> Pearl Chavez
                                                </td>

                                                <td><img src="image/starts.png" alt="" /></td>
                                                <td align="right">
                                                    <span className="text-success">Last verified at : 25 June, 2023 at 10:00 PM</span>

                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>


                                    <div className="read-reviews">
                                        <div className="name">
                                            <h4>Mr. Jhone Doe</h4>
                                            <img src="image/starts.png" alt="" />
                                            <i className="fa fa-times close-reviews"></i>

                                        </div>
                                        <p className="text-muted">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa adipisci dolores dignissimos magnam. Ratione tenetur rem numquam officiis minus aliquid quaerat ipsum tempora ducimus blanditiis officia nobis nesciunt, dignissimos, expedita.
                                        </p>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </section>

                    <section className="spacethis">
                        <div className="row">

                            <div className="col-md-6">
                                <h5 className="title text-warning">Expiring this week <sub>(Upcoming 5)</sub></h5>
                                <div className="md-card">
                                    <table className="table table-hover no-border">
                                        <thead>
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">Card number</th>
                                                <th scope="col">Card issue Date</th>
                                                <th scope="col">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <img className="table-user" src="image/man.jpg" alt="" /> Pearl Chavez
                                                </td>
                                                <td>100<sub>LTR</sub></td>
                                                <td>Noida</td>
                                                <td>
                                                    <button type="button" className="btn btn-sm btn-outline-warning">expiring</button>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <img className="table-user" src="image/user.jpg" alt="" />
                                                    Pearl Chavez
                                                </td>
                                                <td>100<sub>LTR</sub></td>
                                                <td>Noida</td>
                                                <td>
                                                    <button type="button" className="btn btn-sm btn-outline-warning">Expiring</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <img className="table-user" src="image/boy.jpg" alt="" />
                                                    Pearl Chavez
                                                </td>
                                                <td>100<sub>LTR</sub></td>
                                                <td>Noida</td>
                                                <td>
                                                    <button type="button" className="btn btn-sm btn-outline-warning">expiring</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <img className="table-user" src="image/man.jpg" alt="" />
                                                    Pearl Chavez
                                                </td>
                                                <td>100<sub>LTR</sub></td>
                                                <td>Noida</td>
                                                <td>
                                                    <button type="button" className="btn btn-sm btn-outline-warning">expiring</button>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            <div className="col-md-6">
                                <h5 className="title text-danger">Expired<sub>(Recent 5 Expired)</sub></h5>
                                <div className="md-card">
                                    <table className="table table-hover no-border">
                                        <thead>
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">Card number</th>
                                                <th scope="col">Card issue date</th>
                                                <th scope="col">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <img className="table-user" src="image/man.jpg" alt="" /> Pearl Chavez
                                                </td>
                                                <td>100<sub>LTR</sub></td>
                                                <td>Noida</td>
                                                <td>
                                                    <button type="button" className="btn btn-sm btn-outline-danger">expired</button>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <img className="table-user" src="image/user.jpg" alt="" />
                                                    Pearl Chavez
                                                </td>
                                                <td>100<sub>LTR</sub></td>
                                                <td>Noida</td>
                                                <td>
                                                    <button type="button" className="btn btn-sm btn-outline-danger">Expired</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <img className="table-user" src="image/boy.jpg" alt="" />
                                                    Pearl Chavez
                                                </td>
                                                <td>100<sub>LTR</sub></td>
                                                <td>Noida</td>
                                                <td>
                                                    <button type="button" className="btn btn-sm btn-outline-danger">expired</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <img className="table-user" src="image/man.jpg" alt="" />
                                                    Pearl Chavez
                                                </td>
                                                <td>100<sub>LTR</sub></td>
                                                <td>Noida</td>
                                                <td>
                                                    <button type="button" className="btn btn-sm btn-outline-danger">expired</button>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </section>
                </>
                }
            </main>
        </>
    );
}

export default Home;