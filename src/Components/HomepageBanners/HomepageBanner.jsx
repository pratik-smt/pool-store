import React, { useEffect, useState } from 'react';
import bannerImage from '../../images/FrameBanner.png'
import Container from '../Layouts/Container';
import { Oval } from 'react-loader-spinner'
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { bannersAPI } from '../../API/homePageBannerRequest';
import moment from 'moment-timezone';

const HomepageBanner = () => {

    const navigate = useNavigate()
    const user = useSelector((state) => state.authReducer.authData)
    const authToken = useSelector((state) => state.authReducer.token)
    const [spinnerLoading, setSpinnerLoading] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const [bannerData, setBannerData] = useState([])

    const fetchBannersData = async () => {
        setSpinnerLoading(true)
        const config = {
            headers: { Authorization: `Bearer ${authToken}` }
        }
        await bannersAPI(config)
            .then((response) => {
                setBannerData(response ? response.data ? response.data.data.rows : [] : [])
            }).catch((err) => {
                console.log("🚀 ~ file: Profile.jsx:80 ~ err:", err)
            })
        setSpinnerLoading(false)
    }

    useEffect(() => {
        !user && navigate('/login')
        fetchBannersData()
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
                        : <div className="nk-content mt-5 ">
                            <div className="container">
                                <div className="nk-content-inner">
                                    <div className="nk-content-body">
                                        <div className="nk-block-head nk-block-head-sm">
                                            <div className="nk-block-between">
                                                <div className="nk-block-head-content">
                                                    <h3 className="nk-block-title page-title">Products</h3>
                                                </div>{/* .nk-block-head-content */}
                                                <div className="nk-block-head-content">
                                                    <div className="toggle-wrap nk-block-tools-toggle">
                                                        <a href="#" className="btn btn-icon btn-trigger toggle-expand me-n1" data-target="pageMenu"><em className="icon ni ni-more-v" /></a>
                                                        <div className="toggle-expand-content" data-content="pageMenu">
                                                            <ul className="nk-block-tools g-3">
                                                                <li>
                                                                    <div className="form-control-wrap">
                                                                        <div className="form-icon form-icon-right">
                                                                            <em className="icon ni ni-search" />
                                                                        </div>
                                                                        <input type="text" className="form-control" id="default-04" placeholder="Quick search by id" />
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="drodown">
                                                                        <a href="#" className="dropdown-toggle dropdown-indicator btn btn-outline-light btn-white" data-bs-toggle="dropdown">Status</a>
                                                                        <div className="dropdown-menu dropdown-menu-end">
                                                                            <ul className="link-list-opt no-bdr">
                                                                                <li><a href="#"><span>New Items</span></a></li>
                                                                                <li><a href="#"><span>Featured</span></a></li>
                                                                                <li><a href="#"><span>Out of Stock</span></a></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li className="nk-block-tools-opt">
                                                                    <a href="#" data-target="addProduct" className="toggle btn btn-icon btn-primary d-md-none"><em className="icon ni ni-plus" /></a>
                                                                    <a href="#" data-target="addProduct" className="toggle btn btn-primary d-none d-md-inline-flex"><em className="icon ni ni-plus" /><span>Add Product</span></a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>{/* .nk-block-head-content */}
                                            </div>{/* .nk-block-between */}
                                        </div>{/* .nk-block-head */}
                                        <div className="nk-block">
                                            <div className="d-flex flex-wrap ">
                                                {/* <div className="col-xxl-3 col-lg-4 col-sm-6"> */}
                                                {bannerData.length > 0 &&
                                                    bannerData.map(data => {

                                                        return <div key={data.id} className="m-1" style={{ width: "23%" }}>
                                                            <div className="card card-bordered rounded-5">
                                                                <div className="product-thumb m-1">
                                                                    <img src={bannerImage} alt="" />
                                                                </div>
                                                                <div className="card-inner p-1 mx-2">
                                                                    <p className='product-tag m-0 mb-1 fs-12px'>Created by - Pratik Banger</p>
                                                                    <h6 className="product-title fs-15px m-0">{data.title}</h6>
                                                                    <small className="fs-12px">{moment(data.start_date).format("DD MMM")} - {moment(data.end_date).format("DD-MMM")}</small>
                                                                    <p className='fs-12px mt-2'>{data.description}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    })
                                                }
                                            </div>
                                        </div>

                                        {bannerData.length == 0
                                            && <div className='mt-5 d-flex justify-content-center align-item-center'>
                                                <h6>No Data Available</h6>
                                            </div>
                                        }

                                        {/* Modal */}
                                        <div className="nk-add-product toggle-slide toggle-slide-right" data-content="addProduct" data-toggle-screen="any" data-toggle-overlay="true" data-toggle-body="true" data-simplebar>
                                            <div className="nk-block-head">
                                                <div className="nk-block-head-content">
                                                    <h5 className="nk-block-title">New Product</h5>
                                                    <div className="nk-block-des">
                                                        <p>Add information and add new product.</p>
                                                    </div>
                                                </div>
                                            </div>{/* .nk-block-head */}
                                            <div className="nk-block">
                                                <div className="row g-3">
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label className="form-label" htmlFor="product-title">Product Title</label>
                                                            <div className="form-control-wrap">
                                                                <input type="text" className="form-control" id="product-title" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-label" htmlFor="regular-price">Regular Price</label>
                                                            <div className="form-control-wrap">
                                                                <input type="number" className="form-control" id="regular-price" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-label" htmlFor="sale-price">Sale Price</label>
                                                            <div className="form-control-wrap">
                                                                <input type="number" className="form-control" id="sale-price" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-label" htmlFor="stock">Stock</label>
                                                            <div className="form-control-wrap">
                                                                <input type="text" className="form-control" id="stock" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-label" htmlFor="SKU">SKU</label>
                                                            <div className="form-control-wrap">
                                                                <input type="text" className="form-control" id="SKU" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label className="form-label" htmlFor="category">Category</label>
                                                            <div className="form-control-wrap">
                                                                <input type="text" className="form-control" id="category" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label className="form-label" htmlFor="tags">Tags</label>
                                                            <div className="form-control-wrap">
                                                                <input type="text" className="form-control" id="tags" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="upload-zone small bg-lighter my-2">
                                                            <div className="dz-message">
                                                                <span className="dz-message-text">Drag and drop file</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <button className="btn btn-primary"><em className="icon ni ni-plus" /><span>Add New</span></button>
                                                    </div>
                                                </div>
                                            </div>{/* .nk-block */}
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
