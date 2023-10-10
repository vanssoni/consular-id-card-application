import React, { useState, useEffect } from "react";
import callApi from "../api/callApi";
import "../css/create-participant.css"
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
function ParticipantForm(props) {
    const [participant, setParticipant] = useState(props.participant);
    // return false;
    const { getToken, http } = callApi();
    const [errors, setErrors] = useState();
    const navigate = useNavigate();

    const [applicantPicture, setApplicantPicture] = useState('');
    const [applicantSignature, setApplicantSignature] = useState('');
    const handleInput = (e) => {
        e.persist();

        if(e.target.name === 'generate_qr' && !e.target.checked){
            e.target.value = 0
        }
        setParticipant({ ...participant, [e.target.name]: e.target.value });
        console.log(participant);
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        e.persist();
        setParticipant({ ...participant, [e.target.name]: file });

        var reader = new FileReader();
        reader.onload = function(event) {
            if(e.target.name === 'applicant_picture'){
                setApplicantPicture(event.target.result);
            }else{
                setApplicantSignature(event.target.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
        console.log(participant);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const url = participant?.id ? '/participants/'+participant?.id+'?_method=PUT': '/participants';
        http.post(url, participant, {
            headers: {
                'Authorization': 'Bearer ' + getToken(),
                'Content-Type': 'multipart/form-data', // Set the content type to 'multipart/form-data'

            }
        }).then((res => {

            if (!res.data.success && res.data?.errors) {
                setErrors(res.data.errors);
                return false;
            }

            res?.data?.message && toast.success(res?.data?.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate('/participants');

        })).catch((error) => {

            if (error?.response?.status === 401) {
                navigate('/login');
            }
            if (error?.response?.status === 422) {
                if (error?.response?.data?.errors) {
                    setErrors(error.response.data.errors);
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
                    return false;
                }
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
                });
            }
        });
    }

    useEffect(() => {
        setParticipant(props.participant);
        setApplicantPicture ( participant?.applicant_picture);
        setApplicantSignature ( participant?.applicant_signature);
        console.log(props);
    },[]);
    return (
        <>
            <form id="survey-form">
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label id="name-label" htmlFor="first_name">First Name</label>
                            <input type="text" name="first_name" id="first_name" placeholder="Enter first name" className={`form-control ${errors?.first_name ? 'is-invalid' : ''}`} required value={participant?.first_name} onChange={(e) => handleInput(e)} />
                        </div>
                        {errors?.first_name &&
                            <div className="invalid-feedback text-start">
                                {errors.first_name[0]}
                            </div>
                        }
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label id="name-label" htmlFor="last_name">Last Name</label>
                            <input type="text" name="last_name" id="last_name" placeholder="Enter last name" className={`form-control ${errors?.last_name ? 'is-invalid' : ''}`} required value={participant?.last_name} onChange={(e) => handleInput(e)} />
                            {errors?.last_name &&
                                <div className="invalid-feedback text-start">
                                    {errors.last_name[0]}
                                </div>
                            }
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Gender</label>
                            <select id="dropdown" name="gender" className={`form-control ${errors?.gender ? 'is-invalid' : ''}`} required defaultValue={participant?.gender} onChange={(e) => handleInput(e)}>
                                <option disabled value>Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="others">Others</option>
                                <option value="prefer_no">Prefer not to say</option>
                            </select>
                            {errors?.gender &&
                                <div className="invalid-feedback text-start">
                                    {errors.gender[0]}
                                </div>
                            }
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="form-group">
                            <label id="email-label" htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" placeholder="Enter email" className={`form-control ${errors?.email ? 'is-invalid' : ''}`} required value={participant?.email} onChange={(e) => handleInput(e)} />
                            {errors?.email &&
                                <div className="invalid-feedback text-start">
                                    {errors.email[0]}
                                </div>
                            }
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label id="dob-label" htmlFor="dob">Date of birth</label>
                            <input type="date" name="dob" id="dob" placeholder="" className={`form-control ${errors?.dob ? 'is-invalid' : ''}`} required value={participant?.dob} onChange={(e) => handleInput(e)} />
                            {errors?.dob &&
                                <div className="invalid-feedback text-start">
                                    {errors.dob[0]}
                                </div>
                            }
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="form-group">
                            <label id="pob-label" htmlFor="pob">Place of birth</label>
                            <input type="text" name="place_of_birth" id="pob" placeholder="Place of birth" className={`form-control ${errors?.place_of_birth ? 'is-invalid' : ''}`} required value={participant?.place_of_birth} onChange={(e) => handleInput(e)} />
                            {errors?.place_of_birth &&
                                <div className="invalid-feedback text-start">
                                    {errors.place_of_birth[0]}
                                </div>
                            }
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <div className="form-group">
                            <label htmlFor="birthPlace">State of Origin</label>
                            <input type="text" className={`form-control ${errors?.state_of_origin ? 'is-invalid' : ''}`} id="" name="state_of_origin" placeholder="Enter State of Origin" required value={participant?.state_of_origin} onChange={(e) => handleInput(e)} />
                            {errors?.state_of_origin &&
                                <div className="invalid-feedback text-start">
                                    {errors.state_of_origin[0]}
                                </div>
                            }
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <div className="form-group">
                            <label htmlFor="birthPlace">Local Government Area</label>
                            <input type="text" className={`form-control ${errors?.local_government_area ? 'is-invalid' : ''}`} id="local_government_area" name="local_government_area" placeholder="Enter Local Government Area" required value={participant?.local_government_area} onChange={(e) => handleInput(e)} />
                            {errors?.local_government_area &&
                                <div className="invalid-feedback text-start">
                                    {errors.local_government_area[0]}
                                </div>
                            }
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <div className="form-group">
                            <label htmlFor="birthPlace">Town</label>
                            <input type="text" className={`form-control ${errors?.town ? 'is-invalid' : ''}`} id="town" name="town" placeholder="Enter Town" required value={participant?.town} onChange={(e) => handleInput(e)} />
                            {errors?.town &&
                                <div className="invalid-feedback text-start">
                                    {errors.town[0]}
                                </div>
                            }
                        </div>
                    </div>

                    <div className="col-lg-4 col-sm-6">
                        <div className="form-group">
                            <label htmlFor="nigeria_address">Nigeria Address</label>
                            <input type="text" className={`form-control ${errors?.nigeria_address ? 'is-invalid' : ''}`} id="nigeria_address" name="nigeria_address" placeholder="Enter Nigeria Address" required value={participant?.nigeria_address} onChange={(e) => handleInput(e)} />
                            {errors?.nigeria_address &&
                                <div className="invalid-feedback text-start">
                                    {errors.nigeria_address[0]}
                                </div>
                            }
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <div className="form-group">
                            <label htmlFor="nigeria_telephone">Nigeria Telephone</label>
                            <input type="text" className={`form-control ${errors?.nigeria_telephone ? 'is-invalid' : ''}`} id="nigeria_telephone" name="nigeria_telephone" placeholder="Enter phone number" required value={participant?.nigeria_telephone} onChange={(e) => handleInput(e)} />
                            {errors?.nigeria_telephone &&
                                <div className="invalid-feedback text-start">
                                    {errors.nigeria_telephone[0]}
                                </div>
                            }
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <div className="form-group">
                            <label htmlFor="profession">Profession</label>
                            <input type="text" className={`form-control ${errors?.profession ? 'is-invalid' : ''}`} id="profession" name="profession" placeholder="Enter profession" required value={participant?.profession} onChange={(e) => handleInput(e)} />
                            {errors?.profession &&
                                <div className="invalid-feedback text-start">
                                    {errors.profession[0]}
                                </div>
                            }
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <div className="form-group">
                            <label htmlFor="passport_number">Passport Number</label>
                            <input type="text" className={`form-control ${errors?.passport_number ? 'is-invalid' : ''}`} id="passport_number" name="passport_number" placeholder="Enter passport number" required value={participant?.passport_number} onChange={(e) => handleInput(e)} />
                            {errors?.passport_number &&
                                <div className="invalid-feedback text-start">
                                    {errors.passport_number[0]}
                                </div>
                            }
                        </div>
                    </div>

                    <div className="col-lg-4 col-sm-6">
                        <div className="form-group">
                            <label htmlFor="name_of_next_of_kin_in_nigeria">Name of Next of Kin in Nigeria</label>
                            <input type="text" className={`form-control ${errors?.name_of_next_of_kin_in_nigeria ? 'is-invalid' : ''}`} id="name_of_next_of_kin_in_nigeria" name="name_of_next_of_kin_in_nigeria" placeholder="Enter Name of Next of Kin in Nigeria" required value={participant?.name_of_next_of_kin_in_nigeria} onChange={(e) => handleInput(e)} />
                            {errors?.name_of_next_of_kin_in_nigeria &&
                                <div className="invalid-feedback text-start">
                                    {errors.name_of_next_of_kin_in_nigeria[0]}
                                </div>
                            }
                        </div>


                    </div>

                    <div className="col-lg-4 col-sm-6">
                        <div className="form-group">
                            <label htmlFor="address_of_next_of_kin_in_nigeria">Address of Next of Kin in Nigeria</label>
                            <input type="text" className={`form-control ${errors?.address_of_next_of_kin_in_nigeria ? 'is-invalid' : ''}`} id="address_of_next_of_kin_in_nigeria" name="address_of_next_of_kin_in_nigeria" placeholder="Enter Address of Next of Kin in Nigeria" required value={participant?.address_of_next_of_kin_in_nigeria} onChange={(e) => handleInput(e)} />
                            {errors?.address_of_next_of_kin_in_nigeria &&
                                <div className="invalid-feedback text-start">
                                    {errors.address_of_next_of_kin_in_nigeria[0]}
                                </div>
                            }
                        </div>
                    </div>

                    <div className="col-lg-4 col-sm-6">
                        <div className="form-group">
                            <label htmlFor="telephone_of_next_of_kin_in_nigeria">Telephone of Next of Kin in Nigeria</label>
                            <input type="text" className={`form-control ${errors?.telephone_of_next_of_kin_in_nigeria ? 'is-invalid' : ''}`} id="telephone_of_next_of_kin_in_nigeria" name="telephone_of_next_of_kin_in_nigeria" placeholder="Enter Telephone of Next of Kin in Nigeria" required value={participant?.telephone_of_next_of_kin_in_nigeria} onChange={(e) => handleInput(e)} />
                            {errors?.telephone_of_next_of_kin_in_nigeria &&
                                <div className="invalid-feedback text-start">
                                    {errors.telephone_of_next_of_kin_in_nigeria[0]}
                                </div>
                            }
                        </div>
                    </div>

                    <div className="col-lg-4 col-sm-6">
                        <div className="form-group">
                            <label htmlFor="date_of_arrival_in_guinea">Date of Arrival in Guinea</label>
                            <input type="date" className={`form-control ${errors?.date_of_arrival_in_guinea ? 'is-invalid' : ''}`} id="date_of_arrival_in_guinea" name="date_of_arrival_in_guinea" placeholder="Enter Date of Arrival in Guinea" required value={participant?.date_of_arrival_in_guinea} onChange={(e) => handleInput(e)} />
                            {errors?.date_of_arrival_in_guinea &&
                                <div className="invalid-feedback text-start">
                                    {errors.date_of_arrival_in_guinea[0]}
                                </div>
                            }
                        </div>
                    </div>

                    {/* <div className="col-lg-4 col-sm-6" hidden>
                                    <div className="form-group">
                                        <label htmlFor="other_tel_nigeria">Other Nigeria Telephone</label>
                                        <input type="text" className={`form-control ${errors?.first_name ? 'is-invalid' : ''}`} id="other_tel_nigeria" name="othertelnigeria" placeholder="Enter phone number" value=" " />
                                    </div>
                                </div> */}
                    <div className="col-lg-4 col-sm-6">
                        <div className="form-group">
                            <label htmlFor="guinea_address">Guinea Address</label>
                            <input type="text" className={`form-control ${errors?.guinea_address ? 'is-invalid' : ''}`} id="guinea_address" name="guinea_address" placeholder="Enter address" required value={participant?.guinea_address} onChange={(e) => handleInput(e)} />
                            {errors?.guinea_address &&
                                <div className="invalid-feedback text-start">
                                    {errors.guinea_address[0]}
                                </div>
                            }
                        </div>
                    </div>

                    <div className="col-lg-4 col-sm-6">
                        <div className="form-group">
                            <label htmlFor="guinea_telephone">Guinea Telephone</label>
                            <input type="text" className={`form-control ${errors?.guinea_telephone ? 'is-invalid' : ''}`} id="guinea_telephone" name="guinea_telephone" placeholder="Enter telephone number" required value={participant?.guinea_telephone} onChange={(e) => handleInput(e)} />
                            {errors?.guinea_telephone &&
                                <div className="invalid-feedback text-start">
                                    {errors.guinea_telephone[0]}
                                </div>
                            }
                        </div>
                    </div>

                    <div className="col-lg-4 col-sm-6">
                        <div className="form-group">
                            <label htmlFor="name_of_next_of_kin_in_guinea">Name of Next of Kin in Guinea</label>
                            <input type="text" className={`form-control ${errors?.name_of_next_of_kin_in_guinea ? 'is-invalid' : ''}`} id="name_of_next_of_kin_in_guinea" name="name_of_next_of_kin_in_guinea" placeholder="Enter Name of Next of Kin in Guinea" required value={participant?.name_of_next_of_kin_in_guinea} onChange={(e) => handleInput(e)} />
                            {errors?.name_of_next_of_kin_in_guinea &&
                                <div className="invalid-feedback text-start">
                                    {errors.name_of_next_of_kin_in_guinea[0]}
                                </div>
                            }
                        </div>
                    </div>

                    <div className="col-lg-4 col-sm-6">
                        <div className="form-group">
                            <label htmlFor="address_of_next_of_kin_in_guinea">Address of Next of Kin in Guinea</label>
                            <input type="text" className={`form-control ${errors?.address_of_next_of_kin_in_guinea ? 'is-invalid' : ''}`} id="address_of_next_of_kin_in_guinea" name="address_of_next_of_kin_in_guinea" placeholder="Enter Address of Next of Kin in Guinea" required value={participant?.address_of_next_of_kin_in_guinea} onChange={(e) => handleInput(e)} />
                            {errors?.address_of_next_of_kin_in_guinea &&
                                <div className="invalid-feedback text-start">
                                    {errors.address_of_next_of_kin_in_guinea[0]}
                                </div>
                            }
                        </div>
                    </div>

                    <div className="col-lg-4 col-sm-6">
                        <div className="form-group">
                            <label htmlFor="telephone_of_next_of_kin_in_guinea">Telephone of Next of Kin in Guinea</label>
                            <input type="text" className={`form-control ${errors?.telephone_of_next_of_kin_in_guinea ? 'is-invalid' : ''}`} id="telephone_of_next_of_kin_in_guinea" name="telephone_of_next_of_kin_in_guinea" placeholder="Enter Telephone of Next of Kin in Guinea" required value={participant?.telephone_of_next_of_kin_in_guinea} onChange={(e) => handleInput(e)} />
                            {errors?.telephone_of_next_of_kin_in_guinea &&
                                <div className="invalid-feedback text-start">
                                    {errors.telephone_of_next_of_kin_in_guinea[0]}
                                </div>
                            }
                        </div>
                    </div>


                    <div className="col-lg-4 col-sm-6">
                        <div className="form-group">
                            <label htmlFor="cardNcard_numberumber">Card Number</label>
                            <input type="text" className={`form-control ${errors?.card_number ? 'is-invalid' : ''}`} id="card_number" name="card_number" placeholder="Enter card number" required value={participant?.card_number} onChange={(e) => handleInput(e)} />
                            {errors?.card_number &&
                                <div className="invalid-feedback text-start">
                                    {errors.card_number[0]}
                                </div>
                            }
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <div className="form-group">
                            <label htmlFor="issue_date">Issue Date</label>
                            <input type="date" className={`form-control ${errors?.issue_date ? 'is-invalid' : ''}`} id="issue_date" name="issue_date" placeholder="Enter isuue date" required value={participant?.issue_date} onChange={(e) => handleInput(e)} />
                            {errors?.issue_date &&
                                <div className="invalid-feedback text-start">
                                    {errors.issue_date[0]}
                                </div>
                            }
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <div className="form-group">
                            <label htmlFor="card_expiry_date">Card Expiry Date</label>
                            <input type="date" className={`form-control ${errors?.card_expiry_date ? 'is-invalid' : ''}`} id="card_expiry_date" name="card_expiry_date" placeholder="Enter expiry date" required value={participant?.card_expiry_date} onChange={(e) => handleInput(e)} />
                            {errors?.card_expiry_date &&
                                <div className="invalid-feedback text-start">
                                    {errors.card_expiry_date[0]}
                                </div>
                            }
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <label>Applicant Picture</label>
                        <div className="input-group ">
                            <div className="custom-file">
                                <input type="file" className={`custom-file-input form-control ${errors?.applicant_picture ? 'is-invalid' : ''}`} id="applicant_picture" name="applicant_picture" accept="image/*" onChange={(e) => handleFileChange(e)} required />
                                {/* <label className="custom-file-label" htmlFor="applicant_picture">Choose Applicant Picture</label> */}
                                {errors?.applicant_picture &&
                                    <div className="invalid-feedback text-start">
                                        {errors.applicant_picture[0]}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <label>Applicant Signature</label>
                        <div className="input-group ">
                            <div className="custom-file">
                                <input type="file" className={`custom-file-input form-control ${errors?.applicant_signature ? 'is-invalid' : ''}`} id="applicant_signature" name="applicant_signature" accept="image/*" onChange={(e) => handleFileChange(e)} required />
                                {/* <label className="custom-file-label" htmlFor="applicant_signature">Add Applicant Signature</label> */}
                                {errors?.applicant_signature &&
                                    <div className="invalid-feedback text-start">
                                        {errors.applicant_signature[0]}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-sm-6">
                        <div className="form-group">
                            <label htmlFor="comments">Comments</label>
                            <textarea type="date" className={`form-control ${errors?.comments ? 'is-invalid' : ''}`} id="comments" name="comments" placeholder="Enter comments" onChange={(e) => handleInput(e)} value={participant?.comments} >  </textarea>
                            {errors?.comments &&
                                <div className="invalid-feedback text-start">
                                    {errors.comments[0]}
                                </div>
                            }
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6 text-center">
                        <div className="form-group mt-4">
                            <img id="applicant_pic" src={applicantPicture ? applicantPicture : '/images/no_image.png'} width="250px" />
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6 text-center">
                        <div className="form-group mt-4">
                            <img id="applicant_sig" src={applicantSignature? applicantSignature: '/images/no_image.png'}  width="250px" />
                        </div>
                    </div>

                </div>

                <div className="row">
                    <div className="col-lg-4 col-sm-6 ">

                        <div className="form-check checkbox-xl">
                            <input className="form-check-input" type="checkbox" id="checkbox-3" onChange={(e) => handleInput(e)} name="generate_qr" value='1'  defaultChecked={1}/>
                            <label className="form-check-label" htmlFor="checkbox-3">Generate QR Code</label>
                            {errors?.generate_qr &&
                                <div className="invalid-feedback text-start">
                                    {errors.generate_qr[0]}
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-4">
                        <button onClick={(e) => handleSubmit(e)} className="btn btn-primary btn-block">{participant?.id ? 'Update' : 'Add '} Applicant</button>
                    </div>
                </div>
            </form >
        </>
    );
}
export default ParticipantForm;