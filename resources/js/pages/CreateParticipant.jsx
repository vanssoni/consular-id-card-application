import React, { useState } from "react";
import callApi from "../api/callApi";
import "../css/create-participant.css"
import Navbar from "../components/Navbar";
import { NavLink } from "react-router-dom";
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from "react-router-dom";
import ParticipantForm from "../components/ParticipantForm";
function CreateParticipant() {
    const [participant, setParticipant] = useState({
        'first_name': '',
        'last_name': '',
        'gender': '',
        'email': '',
        'dob': '',
        'place_of_birth': '',
        'state_of_origin': '',
        'local_government_area': '',
        'town': '',
        'nigeria_address': '',
        'nigeria_telephone': '',
        'profession': '',
        'passport_number': '',
        'name_of_next_of_kin_in_nigeria': '',
        'address_of_next_of_kin_in_nigeria': '',
        'telephone_of_next_of_kin_in_nigeria': '',
        'date_of_arrival_in_guinea': '',
        'guinea_address': '',
        'guinea_telephone': '',
        'name_of_next_of_kin_in_guinea': '',
        'address_of_next_of_kin_in_guinea': '',
        'telephone_of_next_of_kin_in_guinea': '',
        'card_number': '',
        'issue_date': '',
        'card_expiry_date': '',
        'applicant_picture': '',
        'applicant_signature': '',
        'comments': '',
        'generate_qr': 1,
    });
    return (
        <>
            <Navbar />
            <main className="col-md-12" id="main">
                <section className="spacethis">
                    {/* <NavLink to={'/create-participant'} className="btn btn-primary btn-block float-end mb-5"> Add Applicant</NavLink> */}
                    <h3 className="title text-center">Add New Participant</h3>
                    <div className="form-wrap mt-2">
                        <ParticipantForm participant={participant}/>
                    </div>
                </section>
            </main>
        </>
    );
}

export default CreateParticipant;