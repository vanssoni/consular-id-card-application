import React, { useState, useMemo, useEffect } from "react";
import callApi from "../api/callApi";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../components/Navbar";
import {useNavigate, NavLink } from "react-router-dom";
import SingleParticipantRow from "../components/SingleParticipantRow";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { ThreeDots } from 'react-loader-spinner'
import debounce from 'lodash.debounce';
import {  toast } from 'react-toastify';

// import "../css/hide-navbar.css";

import {
    Card,
    CardBody,
    CardHeader,
    Pagination,
    PaginationItem,
    PaginationLink
} from "reactstrap";

function Participant() {
    const perPage = 10;
    const { getToken, http } = callApi();
    const [data, setData] = useState([]);
    const [updateData, setUpdateData] = useState(false);
    const [searchQuery, setSearchQuery] = useState([]);
    const navigate = useNavigate();
    let apiUrl = '/participants?per_page=' + perPage;
    //set the current page
    function handlePageClick(url) {
        setData([]);
        apiUrl = url;
        getParticipants(apiUrl);
    }
    //use debounce to optimize code
    const debouncedResults = useMemo(() => {
        return debounce(searchParticipant, 600);
      }, []);

    function searchParticipant(search) {
        setSearchQuery(search)
        setData([]);
        apiUrl = apiUrl + '&search=' + search;
        getParticipants(apiUrl);

    }

    function getParticipants(apiUrl) {
        http.get(apiUrl, {
            headers: {
                'Authorization': 'Bearer ' + getToken(),
            }
        }).then((res) => {
            setData(res.data.data);
            console.log(res.data.data);
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
    }

    if( updateData ){
        console.log('data updated!');
        getParticipants(apiUrl);
        setUpdateData(false);
    }

    useEffect(() => {
        getParticipants(apiUrl);
        return () => {
            debouncedResults.cancel();
          };
    }, []);
    return (
        <>
            <Navbar />

            <main className="col-md-12" id="main">
                <section className="spacethis">
                    <h3 className="title text-center">All Participants</h3>
                    <div className="row m-3 justify-content-end">
                    </div>
                    <div className="row mt-3 ">
                        <div className="col-md-4 mb-2">

                            <input id="searchQueryInput" type="text" name="searchQueryInput" placeholder="Search" onChange={e => debouncedResults(e.target.value)} className="w-100" />
                            <span id="searchQuerySubmit" name="searchQuerySubmit" className="">
                                <svg style={{
                                    width: 24,
                                    height: 24
                                }} viewBox="0 0 24 24"><path fill="#666666" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                                </svg>
                            </span>
                        </div>
                        <div className="col-md-4">

                        </div>
                        <div className="col-md-4 mb-2">

                            <NavLink to={'/create-participant'} className="btn btn-sm  btn-primary w-100 "><i className="fa fa-plus-circle" aria-hidden="true"></i>    Add Applicant</NavLink>
                        </div>
                    </div>
                    {data.length === 0 ?
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
                            <Card>
                                <CardBody className="">
                                    <div className="table-responsive">

                                        <TableContainer component={Paper}>
                                            <Table aria-label="collapsible table" className="">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell />
                                                        <TableCell>Name</TableCell>
                                                        <TableCell >Card Number</TableCell>
                                                        <TableCell >Card Issue Date</TableCell>
                                                        <TableCell >Card Expiry Date</TableCell>
                                                        <TableCell >Guinea Address</TableCell>
                                                        <TableCell >Guinea Telephone</TableCell>
                                                        <TableCell >Created At</TableCell>
                                                        <TableCell >Action</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {data.data &&
                                                        data.data.map((item, i) => (
                                                            <SingleParticipantRow row={item} stateChanger={setUpdateData}/>
                                                        ))
                                                    }
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </div>
                                    {data.from ? (
                                        <Pagination
                                            aria-label="Page navigation example"
                                            size="sm"
                                            listClassName="paginationSm justify-content-center mt-2"
                                        >
                                            {data.links &&
                                                data.links.map((item, i) => (
                                                    <PaginationItem
                                                        active={item.active}
                                                        disabled={item.url == null || item.active}
                                                        key={i}
                                                    >
                                                        <PaginationLink
                                                            className="mx-1"
                                                            onClick={(e) => handlePageClick(item.url)}
                                                        >
                                                            {item.label.includes("Next") ? (
                                                                <i className="fa fa-forward"></i>
                                                            ) : item.label.includes("Previous") ? (
                                                                <i className="fa fa-backward"></i>
                                                            ) : (
                                                                item.label
                                                            )}
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                ))}
                                        </Pagination>
                                    ) : (
                                        ""
                                    )}
                                </CardBody>
                            </Card>
                        </>
                    }
                </section>
            </main>
        </>
    );
}

export default Participant;