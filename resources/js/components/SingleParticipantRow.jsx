import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import { NavLink,useNavigate } from "react-router-dom";

import TableRow from "@material-ui/core/TableRow";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SweetAlert from 'react-bootstrap-sweetalert';
import callApi from "../api/callApi";

import { faCaretUp, faCaretDown, faPencilAlt, faTrash, faPrint, faEnvelope } from '@fortawesome/fontawesome-free-solid'
fontawesome.library.add(faCaretUp, faCaretDown,faPencilAlt, faTrash, faPrint, faEnvelope);

import { toast } from 'react-toastify';
function SingleParticipantRow(props) {
    const [open, setOpen] = useState(false);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const { getToken, http } = callApi();
    const navigate = useNavigate();

    const handleDelete = (id) => {
        // Implement your delete logic here
        http.delete('participants/'+id, {
            headers: {
                'Authorization': 'Bearer ' + getToken(),
            }
        }).then((res) => {
            if (!res.data.success ) {
                setErrors(res.data.errors);
                res?.data?.message && toast.error(res?.data?.message, {
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
            
        }).catch((error) => {
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
                });
            }
        });
        setShowDeleteAlert(false); // Close the confirmation modal
        props.stateChanger(true);
    };
    return (
        <>
            <TableRow className=''>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <FontAwesomeIcon icon="caret-up" /> : <FontAwesomeIcon icon="caret-down" />}
                    </IconButton>
                </TableCell>
                <TableCell><a href={props?.row?.applicant_picture} target="_blank"><img className="table-user" src={props?.row?.applicant_picture} alt="" /></a>{props?.row?.first_name + ' ' + props?.row?.last_name}</TableCell>
                <TableCell>{props?.row?.card_number}</TableCell>
                <TableCell>{props?.row?.issue_date_formatted}</TableCell>
                <TableCell>{props?.row?.card_expiry_date_formatted}</TableCell>
                <TableCell>{props?.row?.guinea_address}</TableCell>
                <TableCell>{props?.row?.guinea_telephone}</TableCell>
                <TableCell>{props?.row?.created_at}</TableCell>
                <TableCell className="d-flex">
                    <FontAwesomeIcon icon="fa-print" className="btn  btn-outline-info btn-sm mx-1 my-1"  title="Print"/> 
                    <FontAwesomeIcon icon="fa-envelope" className="btn  btn-outline-warning btn-sm mx-1 my-1" title="Send card via mail"/> 
                    <NavLink to={`/edit-participant/${props?.row?.id}`}><FontAwesomeIcon icon="fa-pencil-alt" className="btn  btn-outline-success btn-sm mx-1 my-1" title="Edit"/></NavLink>
                    

                    <FontAwesomeIcon icon="fa-trash" className="btn  btn-outline-danger btn-sm mx-1 my-1" title="Bye Bye" onClick={ () =>  setShowDeleteAlert(true) }/>
                    {showDeleteAlert && 

                        <SweetAlert
                        warning
                        showCancel
                        confirmBtnText="Yes, delete it!"
                        confirmBtnBsStyle="danger"
                        title="Are you sure?"
                        onConfirm={ () => handleDelete(props?.row?.id)}
                        onCancel={() => setShowDeleteAlert(false)}
                        focusCancelBtn
                        >
                        You will not be able to recover this data!
                        </SweetAlert>
                    }
                    </TableCell>
            </TableRow>
            <TableRow >
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Details
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Qr Code</TableCell>
                                        <TableCell>Signature</TableCell>
                                        <TableCell align="right">Email</TableCell>
                                        <TableCell align="right">Passport Number</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                <TableRow>
                                        <TableCell><a href={props?.row?.qr_code} target="_blank"><img className=" img-thumbnail w-50" src={props?.row?.qr_code} alt="" /> </a></TableCell>
                                        <TableCell><a href={props?.row?.applicant_signature} target="_blank"><img className="img-thumbnail" src={props?.row?.applicant_signature} alt="" style={{width:200}} /></a></TableCell>
                                        <TableCell align="right">{props?.row?.email}</TableCell>
                                        <TableCell align="right">{props?.row?.passport_number}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            {/* <tr>
                <th>{props?.row?.first_name + ' ' + props?.row?.last_name}</th>
                <th>{props?.row?.card_number}</th>
                <th>{props?.row?.issue_date}</th>
                <th>{props?.row?.card_expiry_date}</th>
                <th>{props?.row?.guinea_address}</th>
                <th>{props?.row?.guinea_telephone}</th>
                <th>{props?.row?.created_at}</th>
                <th>Actions</th>
            </tr> */}
        </>
    );
}
export default SingleParticipantRow;