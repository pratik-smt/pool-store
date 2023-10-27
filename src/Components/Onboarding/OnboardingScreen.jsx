import React, { useEffect, useState } from 'react';
import bannerImage from '../../images/FrameBanner.png'
import Container from '../Layouts/Container';
import { Oval } from 'react-loader-spinner'
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteOnboardingScreenAPI, onboardingScreenAPI } from '../../API/OnboardingRequest';
import moment from 'moment-timezone';
import Swal from 'sweetalert2';

const HomepageBanner = () => {

    const navigate = useNavigate()
    const user = useSelector((state) => state.authReducer.authData)
    const authToken = useSelector((state) => state.authReducer.token)
    const [spinnerLoading, setSpinnerLoading] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const [onboardingScreenData, setOnboardingScreenData] = useState([])

    const fetchOnboardingScreens = async () => {
        setSpinnerLoading(true)
        const config = {
            headers: { Authorization: `Bearer ${authToken}` }
        }
        await onboardingScreenAPI(config)
            .then((response) => {
                setOnboardingScreenData(response ? response.data ? response.data.data.rows : [] : [])
            }).catch((err) => {
                console.log("🚀 ~ file: Profile.jsx:80 ~ err:", err)
            })
        setSpinnerLoading(false)
    }


    const handleDeleteWhatsNew = async (e, id) => {
        e.preventDefault();

        Swal.fire({
            title: 'Confirm delete?',
            text: "Do you really want to delete this screen?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!'
        }).then(async function (result) {
            if (result.value) {
                setSpinnerLoading(true)

                const config = {
                    headers: { Authorization: `Bearer ${authToken}` }
                };
                await deleteOnboardingScreenAPI(id, config)
                    .then((res) => {
                        Swal.fire('Deleted!', 'Post has been deleted successfully.', 'success');
                        toast.success(res.data.message)
                        fetchOnboardingScreens()
                    }).catch((err) => {
                        console.log("🚀 ~ file: Profile.jsx:80 ~ err:", err)
                        if (err.code == "ERR_NETWORK") {
                            toast.error("Something went wront! please try again later")
                        }
                        else {
                            toast.error(err.response.data.message)
                        }
                    })
                setSpinnerLoading(false)
            }
        })
    }

    useEffect(() => {
        !user && navigate('/login')
        fetchOnboardingScreens()
    }, []);

    return (
        <>
            {user &&
                <Container>
                    <Toaster position="top-right" reverseOrder={false} />
                    {spinnerLoading
                        ? <div className='vh-100 flex justify-center items-center'>
                            <Oval
                                height="100"
                                width="100"
                                color='var(--ps-main)'
                                secondaryColor="var(--ps-main)"
                                ariaLabel='oval-loading'
                                strokeWidth={4}
                                strokeWidthSecondary={4}
                                visible={true}
                            />
                        </div>
                        : <div className="nk-content mt-10">
                            <div className="container">
                                <div className="nk-content-inner">
                                    <div className="nk-content-body">
                                        <div className="nk-block-head nk-block-head-sm mt-3">
                                            <div className="nk-block-between">
                                                <div className="nk-block-head-content">
                                                    <h4 className="nk-block-title page-title">The Pool Store /
                                                        <span>Onboarding Screen</span>
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="nk-block">
                                            <div className="row g-gs">
                                                <div className="col-md-6">
                                                    <div className="circleChartFlex">
                                                        <div className="">
                                                            {/* <span>Banners activity</span> */}
                                                            <h6>Showing all {onboardingScreenData.length} Screens</h6>
                                                        </div>

                                                        <div className="d-flex">
                                                            {/* <a href="" className="thiryday">30 Days</a>
                                                            <div className="drodown">
                                                                <a href="#" className="dropdown-toggle btn btn-outline-light btn-white filterBnt" data-bs-toggle="dropdown" aria-expanded="false">Filter
                                                                    <em className="icon ni ni-filter-alt"></em></a>
                                                                <div className="dropdown-menu dropdown-menu-end">
                                                                    <ul className="link-list-opt no-bdr">
                                                                        <li><a href="#"><span>- Price Low to high</span></a></li>
                                                                        <li><a href="#"><span>- Price High to Low</span></a></li>
                                                                    </ul>
                                                                </div>
                                                            </div> */}
                                                        </div>

                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-control-wrap searchBarTable">
                                                        <div className="form-icon form-icon-right">
                                                            <em className="icon ni ni-search"></em></div>
                                                        <input type="text" className="form-control" id="fv-email" name="fv-email" placeholder='Search Here...' />
                                                    </div>
                                                </div>

                                            </div>{/* .row */}
                                        </div>



                                        <div className="nk-block">
                                            <div className="row g-gs">
                                                <div className="col-md-9">
                                                    {/* <ul className="nav nav-tabs mt-n3 brBtmNone" role="tablist">
                                                        <li className="nav-item" role="presentation"><a className="nav-link active" data-bs-toggle="tab" href="#tabItem1" aria-selected="true" role="tab">Active Banners <span className="tableTabsSpan"> 23</span></a></li>
                                                        <li className="nav-item" role="presentation"><a className="nav-link" data-bs-toggle="tab" href="#tabItem2" aria-selected="false" role="tab" tabindex="-1">Completed <span className="tableTabsSpan"> 14</span></a></li>
                                                        <li className="nav-item" role="presentation"><a className="nav-link" data-bs-toggle="tab" href="#tabItem3" aria-selected="false" role="tab" tabindex="-1">Unfinished <span className="tableTabsSpan"> 35</span></a></li>

                                                    </ul> */}
                                                </div>

                                                <div className="col-md-3">
                                                    <Link to={"/add-onboarding-screen"} className="btn btn-primary lightBlue d-md-inline-flex fRight">Add New Screen</Link>
                                                </div>


                                                <div className="col-md-12">
                                                    <div className="tab-content">
                                                        <div className="tab-pane active show" id="tabItem1" role="tabpanel">
                                                            <div className="row">
                                                                {onboardingScreenData.length > 0 &&
                                                                    onboardingScreenData.map(data => {

                                                                        return <div key={data.id} className="col-lg-3">
                                                                            <div className="card card-bordered rounded-5">
                                                                                <div className="product-thumb m-1">
                                                                                    <img src={data.image_icon} alt="" />
                                                                                </div>
                                                                                <div className="card-inner p-1 mx-2">
                                                                                    <div className="d-flex justify-content-between">
                                                                                        <h6 className="product-title fs-15px m-0">{data.title}</h6>
                                                                                        <div className="drodown">
                                                                                            <a href="#" className="" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                                <em role='button' className="icon ni ni-more-v" />
                                                                                            </a>
                                                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                                                <ul className="link-list-opt no-bdr ">
                                                                                                    <li>
                                                                                                        <a href='#' role='button' className='d-flex justify-content-around align-item-center'>
                                                                                                            <em className="icon ni ni-edit me-2" style={{ fontSize: "1.1rem" }} />
                                                                                                            <span style={{ fontSize: "0.8rem" }}>Edit</span>
                                                                                                        </a>
                                                                                                    </li>
                                                                                                    <li>
                                                                                                        <a onClick={e => handleDeleteWhatsNew(e, data.id)} role='button' className='d-flex justify-content-around align-item-center text-danger'>
                                                                                                            <em className="icon ni ni-trash" style={{ fontSize: "1.2rem" }} />
                                                                                                            <span style={{ fontSize: "0.8rem" }}>Delete</span>
                                                                                                        </a>
                                                                                                    </li>
                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <p className='fs-12px'>{data.description}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    })
                                                                }
                                                            </div>
                                                        </div>


                                                        <div className="tab-pane" id="tabItem2" role="tabpanel">
                                                            <div className="row">
                                                                <div className="col-lg-12">
                                                                    <h1>TAB 2</h1>
                                                                    {onboardingScreenData.length == 0
                                                                        && <div className='mt-5 d-flex justify-content-center align-item-center'>
                                                                            <h6>No Data Available</h6>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>


                                                        <div className="tab-pane" id="tabItem3" role="tabpanel">
                                                            <div className="row">
                                                                <div className="col-lg-12">
                                                                    <h1>TAB 3</h1>
                                                                    {onboardingScreenData.length == 0
                                                                        && <div className='mt-5 d-flex justify-content-center align-item-center'>
                                                                            <h6>No Data Available</h6>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>


                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div >
                    }
                </Container>
            }
        </>
    );
}

export default HomepageBanner;
