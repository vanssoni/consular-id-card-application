import React, { useState, useEffect } from "react";
import callApi from "../api/callApi";
import "../css/create-participant.css"
import Navbar from "../components/Navbar";
import { NavLink, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from "react-router-dom";
import ParticipantForm from "../components/ParticipantForm";
import { ThreeDots } from 'react-loader-spinner'

function EditParticipant() {
    let { id } = useParams();
    let apiUrl = '/participants/' + id;
    console.log(id);
    const { getToken, http } = callApi();
    const [errors, setErrors] = useState();
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const [participant, setParticipant] = useState();
    const handleInput = (e) => {
        e.persist();
        setParticipant({ ...participant, [e.target.name]: e.target.value });
        console.log(participant);
    }
    const getParticipant = async () => {
        await http.get(apiUrl, {
            headers: {
                'Authorization': 'Bearer ' + getToken(),
            }
        }).then((res) => {
            res.data.data.generate_qr = 1; 
            setParticipant(res.data.data);
            
        }).catch((error) => {
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
                });
            }
        });
    }
    useEffect(() => {
        getParticipant();
    }, []);
    return (
        <>
            <Navbar />
            <main className="col-md-12" id="main">
                <section className="spacethis">
                    {!participant ?
                        <>
                            <ThreeDots
                                height="120"
                                width="120"
                                radius="100"
                                color="#4fa94d"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{ justifyContent: "center", width: "100%", transform: "translateY(100%)" }}
                                wrapperClassName=""
                                visible={true}
                            />
                        </>
                        :
                        <>
                            <h3 className="title text-center"> Update Participant</h3>
                            <div className="form-wrap mt-2">
                                <ParticipantForm participant={participant} />
                            </div>
                        </>
                    }
                </section>
            </main>
        </>
    );
}

export default EditParticipant;