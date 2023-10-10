import React, { useState } from "react";
import callApi from "../api/callApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../css/create-participant.css"
import Navbar from "../components/Navbar";

function Profile() {
    const { getToken, http,logout, getUser } = callApi();
    return (
        <>
            <Navbar />
            <main className="col-md-12 " id="main">
                <section className="spacethis">
                    <ToastContainer />
                    <h3 className="title text-center">My Profile</h3>
                    <div className="form-wrap mt-2 ">
                        <form id="survey-form">
                            <div className="row justify-content-center">
                                <div className="col-md-8">
                                    <div className="form-group">
                                        <label id="name-label" for="first_name">Name</label>
                                        <input type="text" name="name" id="first_name" placeholder="Enter name" className="form-control"  value={getUser()?.name}/>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="form-group">
                                        <label id="email-label" for="email">Email</label>
                                        <input type="email" name="email" id="email" placeholder="Enter email" className="form-control"   value={getUser()?.email}/>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="form-group">
                                        <label id="password-label" for="password">Password</label>
                                        <input type="password" name="password" id="password" placeholder="Enter password" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="form-group">
                                        <label id="c_password-label" for="c_password">Confirm password</label>
                                        <input type="password" name="c_password" id="c_password" placeholder="Confirm password" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <label>Profile Picture</label>
                                    <div className="input-group mb-3">
                                        <div className="custom-file">
                                            <input type="file" className="custom-file-input form-control" id="inputGroupFile03" name="inputGroupFile03" accept="image/*" onchange="readURL(this,'applicant_pic')" required />
                                            <label className="custom-file-label" for="inputGroupFile03">Choose Profile Picture</label>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="row mt-3 justify-content-center">
                                <div className="col-md-8">
                                    <button type="submit" id="submit" className="btn btn-primary btn-block">Update Profile</button>
                                </div>
                            </div>
                        </form >
                    </div>
                </section>
            </main>
        </>
    );
}

export default Profile;