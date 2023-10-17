import React, { useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner'
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Container from '../Layouts/Container';
import moment from 'moment-timezone';
import { productListAPI } from '../../API/manageProducts';

const Products = () => {

    const navigate = useNavigate()
    const user = useSelector((state) => state.authReducer.authData)
    const authToken = useSelector((state) => state.authReducer.token)
    const [spinnerLoading, setSpinnerLoading] = useState(false)
    const [productData, setProductData] = useState([])

    const fetchProductData = async () => {
        setSpinnerLoading(true)
        const config = {
            headers: { Authorization: `Bearer ${authToken}` }
        }
        await productListAPI(config)
            .then((response) => {
                console.log("🚀 ~ file: Products.jsx:25 ~ .then ~ response:", response)
                setProductData(response ? response.data ? response.data.data.products : [] : [])
            }).catch((err) => {
                console.log("🚀 ~ file: Profile.jsx:80 ~ err:", err)
            })
        setSpinnerLoading(false)
    }

    useEffect(() => {
        !user && navigate('/login')
        fetchProductData()
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
                            <div className="container-fluid">
                                <div className="nk-content-inner">
                                    <div className="nk-content-body">
                                        <div className="nk-block-head nk-block-head-sm">
                                            <div className="nk-block-between">
                                                <div className="nk-block-head-content">
                                                    <h3 className="nk-block-title page-title">Orders</h3>
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
                                                                                <li><a href="#"><span>On Hold</span></a></li>
                                                                                <li><a href="#"><span>Delivered</span></a></li>
                                                                                <li><a href="#"><span>Rejected</span></a></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li className="nk-block-tools-opt">
                                                                    <a href="#" className="btn btn-icon btn-primary d-md-none"><em className="icon ni ni-plus" /></a>
                                                                    <a href="#" className="btn btn-primary d-none d-md-inline-flex"><em className="icon ni ni-plus" /><span>Add Order</span></a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>{/* .nk-block-head-content */}
                                            </div>{/* .nk-block-between */}
                                        </div>{/* .nk-block-head */}
                                        <div className="nk-block">
                                            <div className="nk-tb-list is-separate is-medium mb-3">
                                                {/* Table Header */}
                                                <div className="nk-tb-item nk-tb-head">
                                                    <div className="nk-tb-col nk-tb-col-check">
                                                        <div className="custom-control custom-control-sm custom-checkbox notext">
                                                            <input type="checkbox" className="custom-control-input" id="oid" />
                                                            <label className="custom-control-label" htmlFor="oid" />
                                                        </div>
                                                    </div>
                                                    <div className="nk-tb-col"><span>Order</span></div>
                                                    <div className="nk-tb-col tb-col-md"><span>Date</span></div>
                                                    <div className="nk-tb-col"><span className="d-none d-sm-block">Status</span></div>
                                                    <div className="nk-tb-col tb-col-sm"><span>Customer</span></div>
                                                    <div className="nk-tb-col tb-col-md"><span>Purchased</span></div>
                                                    <div className="nk-tb-col"><span>Total</span></div>
                                                    <div className="nk-tb-col nk-tb-col-tools">
                                                        <ul className="nk-tb-actions gx-1 my-n1">
                                                            <li>
                                                                <div className="drodown">
                                                                    <a href="#" className="dropdown-toggle btn btn-icon btn-trigger me-n1" data-bs-toggle="dropdown"><em className="icon ni ni-more-h" /></a>
                                                                    <div className="dropdown-menu dropdown-menu-end">
                                                                        <ul className="link-list-opt no-bdr">
                                                                            <li><a href="#"><em className="icon ni ni-edit" /><span>Update Status</span></a></li>
                                                                            <li><a href="#"><em className="icon ni ni-truck" /><span>Mark as Delivered</span></a></li>
                                                                            <li><a href="#"><em className="icon ni ni-money" /><span>Mark as Paid</span></a></li>
                                                                            <li><a href="#"><em className="icon ni ni-report-profit" /><span>Send Invoice</span></a></li>
                                                                            <li><a href="#"><em className="icon ni ni-trash" /><span>Remove Orders</span></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                {/* Product one */}
                                                <div className="nk-tb-item">
                                                    <div className="nk-tb-col nk-tb-col-check">
                                                        <div className="custom-control custom-control-sm custom-checkbox notext">
                                                            <input type="checkbox" className="custom-control-input" id="oid01" />
                                                            <label className="custom-control-label" htmlFor="oid01" />
                                                        </div>
                                                    </div>
                                                    <div className="nk-tb-col">
                                                        <span className="tb-lead"><a href="#">#95954</a></span>
                                                    </div>
                                                    <div className="nk-tb-col tb-col-md">
                                                        <span className="tb-sub">Jun 4, 2020</span>
                                                    </div>
                                                    <div className="nk-tb-col">
                                                        <span className="dot bg-warning d-sm-none" />
                                                        <span className="badge badge-sm badge-dot has-bg bg-warning d-none d-sm-inline-flex">On Hold</span>
                                                    </div>
                                                    <div className="nk-tb-col tb-col-sm">
                                                        <span className="tb-sub">Arnold Armstrong</span>
                                                    </div>
                                                    <div className="nk-tb-col tb-col-md">
                                                        <span className="tb-sub text-primary">3 Items</span>
                                                    </div>
                                                    <div className="nk-tb-col">
                                                        <span className="tb-lead">$ 249.75</span>
                                                    </div>
                                                    <div className="nk-tb-col nk-tb-col-tools">
                                                        <ul className="nk-tb-actions gx-1">
                                                            <li className="nk-tb-action-hidden"><a href="#" className="btn btn-icon btn-trigger btn-tooltip" title="Mark as Delivered">
                                                                <em className="icon ni ni-truck" /></a></li>
                                                            <li className="nk-tb-action-hidden"><a href="#" className="btn btn-icon btn-trigger btn-tooltip" title="View Order">
                                                                <em className="icon ni ni-eye" /></a></li>
                                                            <li>
                                                                <div className="drodown me-n1">
                                                                    <a href="#" className="dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown"><em className="icon ni ni-more-h" /></a>
                                                                    <div className="dropdown-menu dropdown-menu-end">
                                                                        <ul className="link-list-opt no-bdr">
                                                                            <li><a href="#"><em className="icon ni ni-eye" /><span>Order Details</span></a></li>
                                                                            <li><a href="#"><em className="icon ni ni-truck" /><span>Mark as Delivered</span></a></li>
                                                                            <li><a href="#"><em className="icon ni ni-money" /><span>Mark as Paid</span></a></li>
                                                                            <li><a href="#"><em className="icon ni ni-report-profit" /><span>Send Invoice</span></a></li>
                                                                            <li><a href="#"><em className="icon ni ni-trash" /><span>Remove Order</span></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                {/* Product one */}
                                                {productData.length > 0 &&
                                                    productData.map(data => {
                                                        <div className="nk-tb-item">
                                                            <div className="nk-tb-col nk-tb-col-check">
                                                                <div className="custom-control custom-control-sm custom-checkbox notext">
                                                                    <input type="checkbox" className="custom-control-input" id="oid02" />
                                                                    <label className="custom-control-label" htmlFor="oid02" />
                                                                </div>
                                                            </div>
                                                            <div className="nk-tb-col">
                                                                <span className="tb-lead"><a href="#">#{data.id}</a></span>
                                                            </div>
                                                            <div className="nk-tb-col tb-col-md">
                                                                <span className="tb-sub">Jun 3, 2020</span>
                                                            </div>
                                                            <div className="nk-tb-col">
                                                                <span className="dot bg-success d-sm-none" />
                                                                <span className="badge badge-sm badge-dot has-bg bg-success d-none d-sm-inline-flex">Delivered</span>
                                                            </div>
                                                            <div className="nk-tb-col tb-col-sm">
                                                                <span className="tb-sub">Jean Douglas</span>
                                                            </div>
                                                            <div className="nk-tb-col tb-col-md">
                                                                <span className="tb-sub text-primary">Pink Fitness Tracker</span>
                                                            </div>
                                                            <div className="nk-tb-col">
                                                                <span className="tb-lead">$ 99.49</span>
                                                            </div>
                                                            <div className="nk-tb-col nk-tb-col-tools">
                                                                <ul className="nk-tb-actions gx-1">
                                                                    <li className="nk-tb-action-hidden"><a href="#" className="btn btn-icon btn-trigger btn-tooltip" title="Mark as Delivered">
                                                                        <em className="icon ni ni-truck" /></a></li>
                                                                    <li className="nk-tb-action-hidden"><a href="#" className="btn btn-icon btn-trigger btn-tooltip" title="View Order">
                                                                        <em className="icon ni ni-eye" /></a></li>
                                                                    <li>
                                                                    </li><li>
                                                                        <div className="drodown me-n1">
                                                                            <a href="#" className="dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown"><em className="icon ni ni-more-h" /></a>
                                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                                <ul className="link-list-opt no-bdr">
                                                                                    <li><a href="#"><em className="icon ni ni-eye" /><span>Order Details</span></a></li>
                                                                                    <li><a href="#"><em className="icon ni ni-truck" /><span>Mark as Delivered</span></a></li>
                                                                                    <li><a href="#"><em className="icon ni ni-money" /><span>Mark as Paid</span></a></li>
                                                                                    <li><a href="#"><em className="icon ni ni-report-profit" /><span>Send Invoice</span></a></li>
                                                                                    <li><a href="#"><em className="icon ni ni-trash" /><span>Remove Order</span></a></li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    })
                                                }
                                            </div>

                                            {/* Paginaion */}
                                            <div className="card">
                                                <div className="card-inner">
                                                    <div className="nk-block-between-md g-3">
                                                        <div className="g">
                                                            <ul className="pagination justify-content-center justify-content-md-start">
                                                                <li className="page-item"><a className="page-link" href="#"><em className="icon ni ni-chevrons-left" /></a></li>
                                                                <li className="page-item"><a className="page-link" href="#">1</a></li>
                                                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                                                <li className="page-item"><span className="page-link"><em className="icon ni ni-more-h" /></span></li>
                                                                <li className="page-item"><a className="page-link" href="#">6</a></li>
                                                                <li className="page-item"><a className="page-link" href="#">7</a></li>
                                                                <li className="page-item"><a className="page-link" href="#"><em className="icon ni ni-chevrons-right" /></a></li>
                                                            </ul>{/* .pagination */}
                                                        </div>
                                                        <div className="g">
                                                            <div className="pagination-goto d-flex justify-content-center justify-content-md-start gx-3">
                                                                <div>Page</div>
                                                                <div>
                                                                    <select className="form-select js-select2" data-search="on" data-dropdown="xs center">
                                                                        <option value="page-1">1</option>
                                                                        <option value="page-2">2</option>
                                                                        <option value="page-4">4</option>
                                                                        <option value="page-5">5</option>
                                                                        <option value="page-6">6</option>
                                                                        <option value="page-7">7</option>
                                                                        <option value="page-8">8</option>
                                                                        <option value="page-9">9</option>
                                                                        <option value="page-10">10</option>
                                                                        <option value="page-11">11</option>
                                                                        <option value="page-12">12</option>
                                                                        <option value="page-13">13</option>
                                                                        <option value="page-14">14</option>
                                                                        <option value="page-15">15</option>
                                                                        <option value="page-16">16</option>
                                                                        <option value="page-17">17</option>
                                                                        <option value="page-18">18</option>
                                                                        <option value="page-19">19</option>
                                                                        <option value="page-20">20</option>
                                                                    </select>
                                                                </div>
                                                                <div>OF 102</div>
                                                            </div>
                                                        </div>{/* .pagination-goto */}
                                                    </div>{/* .nk-block-between */}
                                                </div>
                                            </div>

                                        </div>{/* .nk-block */}
                                    </div>
                                </div>
                            </div>

                        </div>
                    }
                </Container>
            }
        </>
    );
}

export default Products;
