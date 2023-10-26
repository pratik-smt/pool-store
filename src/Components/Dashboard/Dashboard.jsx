import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Container from '../Layouts/Container';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const navigate = useNavigate()
    const user = useSelector((state) => state.authReducer.authData)

    useEffect(() => {
        !user && navigate('/login')
    }, []);

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            {user &&
                <Container>
                    <div className="nk-content ">
                        <div className="container-fluid">
                            <div className="nk-content-inner">
                                <div className="nk-content-body">
                                    <div className="nk-block-head nk-block-head-sm">
                                        <div className="nk-block-between">
                                            <div className="nk-block-head-content">
                                                <h4 className="nk-block-title page-title">Home / <span>The Pool Store</span></h4>
                                            </div>{/* .nk-block-head-content */}
                                        </div>{/* .nk-block-between */}
                                    </div>{/* .nk-block-head */}
                                    <div className="nk-block">
                                        <div className="row g-gs">
                                            <div className="col-md-7">
                                                <div className="row g-gs">

                                                    <div className="col-xxl-3 col-sm-4">
                                                        <div className="card chartOne">
                                                            <div className="nk-ecwg nk-ecwg6">
                                                                <div className="card-inner">
                                                                    <div className="card-title-group">
                                                                        <div className="card-title">
                                                                            <h6 className="title">Customers</h6>
                                                                        </div>
                                                                    </div>
                                                                    <div className="data">
                                                                        <div className="data-group">
                                                                            <div className="amount">3,781</div>
                                                                            <div className="nk-ecwg6-ck">
                                                                                <span className="change up text-grey">+5.27% <em className="icon ni ni-trend-up"></em></span>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xxl-3 col-sm-4">
                                                        <div className="card chartOneWhite">
                                                            <div className="nk-ecwg nk-ecwg6">
                                                                <div className="card-inner">
                                                                    <div className="card-title-group">
                                                                        <div className="card-title">
                                                                            <h6 className="title">Orders</h6>
                                                                        </div>
                                                                    </div>
                                                                    <div className="data">
                                                                        <div className="data-group">
                                                                            <div className="amount">3,219</div>
                                                                            <div className="nk-ecwg6-ck">
                                                                                <span className="change up fontsize text-grey">+1.78% <em className="icon ni ni-trend-up"></em></span>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xxl-3 col-sm-4">
                                                        <div className="card chartOneWhite">
                                                            <div className="nk-ecwg nk-ecwg6">
                                                                <div className="card-inner">
                                                                    <div className="card-title-group">
                                                                        <div className="card-title">
                                                                            <h6 className="title">Orders</h6>
                                                                        </div>
                                                                    </div>
                                                                    <div className="data">
                                                                        <div className="data-group">
                                                                            <div className="amount">3,219</div>
                                                                            <div className="nk-ecwg6-ck">
                                                                                <span className="change up fontsize text-grey">+1.78% <em className="icon ni ni-trend-up"></em></span>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xxl-3 col-sm-4">
                                                        <div className="card chartOneWhite">
                                                            <div className="nk-ecwg nk-ecwg6">
                                                                <div className="card-inner">
                                                                    <div className="card-title-group">
                                                                        <div className="card-title">
                                                                            <h6 className="title">Revenue</h6>
                                                                        </div>
                                                                    </div>
                                                                    <div className="data">
                                                                        <div className="data-group">
                                                                            <div className="amount">$695</div>
                                                                            <div className="nk-ecwg6-ck">
                                                                                <span className="change up fontsize text-grey">-0.56% <em className="icon ni ni-trend-down"></em></span>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xxl-3 col-sm-4">
                                                        <div className="card chartOnegrey">
                                                            <div className="nk-ecwg nk-ecwg6">
                                                                <div className="card-inner">
                                                                    <div className="card-title-group">
                                                                        <div className="card-title">
                                                                            <h6 className="title">Growth</h6>
                                                                        </div>
                                                                    </div>
                                                                    <div className="data">
                                                                        <div className="data-group">
                                                                            <div className="amount">30.1%</div>
                                                                            <div className="nk-ecwg6-ck">
                                                                                <span className="change up fontsize text-grey">+1.48% <em className="icon ni ni-trend-up"></em></span>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xxl-3 col-sm-4">
                                                        <div className="card chartOnegrey">
                                                            <div className="nk-ecwg nk-ecwg6">
                                                                <div className="card-inner">
                                                                    <div className="card-title-group">
                                                                        <div className="card-title">
                                                                            <h6 className="title">Growth</h6>
                                                                        </div>
                                                                    </div>
                                                                    <div className="data">
                                                                        <div className="data-group">
                                                                            <div className="amount">30.1%</div>
                                                                            <div className="nk-ecwg6-ck">
                                                                                <span className="change up fontsize text-grey">+1.48% <em className="icon ni ni-trend-up"></em></span>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <div className="card chartOneWhite">
                                                    <div className="card-inner">
                                                        <h6>Total Leads</h6>
                                                        {/* Chart Design */}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>{/* .row */}
                                    </div>{/* .nk-block */}




                                    <div className="nk-block">
                                        <div className="row g-gs">
                                            <div className="col-md-7">
                                                <div className="card revenueBoxColor">
                                                    <div className="card-inner">
                                                        <div className="card-title-group mt-n1 mb-3">
                                                            <div className="revenurTitlerow">
                                                                <h5 className="rLine">Revenue</h5>
                                                                <span className="currentWeek"><em className="icon ni ni-dot"></em> Current Week $58,211</span>
                                                                <span className="previousWeek"> <em className="icon ni ni-dot"></em>Previous Week $68,768</span>
                                                            </div>
                                                            <div className="card-tools me-n1">
                                                                <div className="dropdown">
                                                                    <a href="#" className="dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown" aria-expanded="false">
                                                                        <em className="icon ni ni-more-h"></em></a>
                                                                    <div className="dropdown-menu dropdown-menu-sm dropdown-menu-end">
                                                                        <ul className="link-list-opt no-bdr">
                                                                            <li><a href="#" className="active"><span>15 Days</span></a></li>
                                                                            <li><a href="#"><span>30 Days</span></a></li>
                                                                            <li><a href="#"><span>3 Months</span></a></li></ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* Chart Start here Design */}


                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <div className="row g-gs">
                                                    <div className="col-md-12">
                                                        <div className="card chartOneWhite">
                                                            <div className="card-inner">
                                                                <h6>Revenue by Location</h6>
                                                                <div className="project-progress">
                                                                    <div className="project-progress-details">
                                                                        <div className="project-progress-task"><span>New York</span></div>
                                                                        <div className="project-progress-percent">72K</div>
                                                                    </div>
                                                                    <div className="progress progress-pill progress-md bg-light progress-md-Revnue"><div className="progress-bar fillRevnue" data-progress="93.5"></div>
                                                                    </div>
                                                                </div>
                                                                <div className="project-progress">
                                                                    <div className="project-progress-details">
                                                                        <div className="project-progress-task"><span>San Francisco</span></div>
                                                                        <div className="project-progress-percent">39K</div>
                                                                    </div>
                                                                    <div className="progress progress-pill progress-md bg-light progress-md-Revnue"><div className="progress-bar fillRevnue" data-progress="93.5"></div>
                                                                    </div>
                                                                </div>
                                                                <div className="project-progress">
                                                                    <div className="project-progress-details">
                                                                        <div className="project-progress-task"><span>Sydney
                                                                        </span></div>
                                                                        <div className="project-progress-percent">25K</div>
                                                                    </div>
                                                                    <div className="progress progress-pill progress-md bg-light progress-md-Revnue"><div className="progress-bar fillRevnue" data-progress="93.5"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="card chartOneWhite">
                                                            <div className="card-inner circleChartFlex">
                                                                <div className="revenuChartLocation">
                                                                    <h6>Revenue by Location</h6>
                                                                    <ul className="nk-ecwg4-legends pt-0">
                                                                        <li><div className="title"><span className="dot dot-lg sq" data-bg="#9cabff"></span><span>Direct Search</span></div><div className="amount amount-xs">$300.56</div></li>
                                                                        <li><div className="title"><span className="dot dot-lg sq" data-bg="#ffa9ce"></span><span>Affilliate</span></div><div className="amount amount-xs">$135.18</div></li>
                                                                        <li><div className="title"><span className="dot dot-lg sq" data-bg="#b8acff"></span><span>E-mail</span></div><div className="amount amount-xs">$48.96</div></li>
                                                                    </ul>
                                                                </div>
                                                                <div className="circleChartSmall">
                                                                    <img className="" src="./images/circlechart.png" alt="user-avatar" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>{/* .row */}
                                    </div>{/* .nk-block */}




                                    <div className="nk-block">
                                        <div className="row g-gs">
                                            <div className="col-md-6">
                                                <div className="circleChartFlex">
                                                    <div className="">
                                                        <span>Ecommerce activity</span>
                                                        <h6>Top selling products</h6>
                                                    </div>

                                                    <div className="drodown">
                                                        <a href="#" className="dropdown-toggle btn btn-outline-light btn-white" data-bs-toggle="dropdown" aria-expanded="false">Filter
                                                            <em className="icon ni ni-filter-alt"></em></a>
                                                        <div className="dropdown-menu dropdown-menu-end">
                                                            <ul className="link-list-opt no-bdr">
                                                                <li><a href="#"><span>- Price Low to high</span></a></li>
                                                                <li><a href="#"><span>- Price High to Low</span></a></li>
                                                            </ul>
                                                        </div>
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

                                        <div className="row g-gs">
                                            <div className="col-md-12">
                                                <div className="card card-preview">
                                                    <table className="table table-orders mt-3">
                                                        <thead className="tb-odr-head dashboardTableHead">
                                                            <tr className="tb-odr-item">
                                                                <th className="tb-odr-info"><span className="tb-odr-id">Product name</span></th>

                                                                <th className="tb-odr-info"><span className="tb-odr-date d-none d-md-inline-block">Price</span></th>

                                                                <th className="tb-odr-amount"><span className="tb-odr-total">Quantity</span></th>

                                                                <th className="tb-odr-amount"><span className="tb-odr-status d-md-inline-block">Amount</span></th>

                                                                <th className="tb-odr-action">&nbsp;</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="tb-odr-body">
                                                            <tr className="tb-odr-item">
                                                                <td className="tb-odr-info">Chlorine & Shock</td>
                                                                <td className="tb-odr-amount">$150.00</td>
                                                                <td className="tb-odr-amount"> 125</td>
                                                                <td className="tb-odr-amount">$150.00</td>
                                                                <td className="tb-odr-action">
                                                                    <div className="dropdown">
                                                                        <a className="text-soft dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown" data-offset="-8,0" aria-expanded="false"><em className="icon ni ni-more-v"></em></a>
                                                                        <div className="dropdown-menu dropdown-menu-end dropdown-menu-xs">
                                                                            <ul className="link-list-plain">
                                                                                <li><a href="#" className="text-primary">Edit</a></li>
                                                                                <li><a href="#" className="text-primary">View</a></li>
                                                                                <li><a href="#" className="text-danger">Remove</a></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr className="tb-odr-item">
                                                                <td className="tb-odr-info">Chlorine & Shock</td>
                                                                <td className="tb-odr-amount">$150.00</td>
                                                                <td className="tb-odr-amount"> 125</td>
                                                                <td className="tb-odr-amount">$150.00</td>
                                                                <td className="tb-odr-action">
                                                                    <div className="dropdown">
                                                                        <a className="text-soft dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown" data-offset="-8,0" aria-expanded="false"><em className="icon ni ni-more-v"></em></a>
                                                                        <div className="dropdown-menu dropdown-menu-end dropdown-menu-xs">
                                                                            <ul className="link-list-plain">
                                                                                <li><a href="#" className="text-primary">Edit</a></li>
                                                                                <li><a href="#" className="text-primary">View</a></li>
                                                                                <li><a href="#" className="text-danger">Remove</a></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr className="tb-odr-item">
                                                                <td className="tb-odr-info">Chlorine & Shock</td>
                                                                <td className="tb-odr-amount">$150.00</td>
                                                                <td className="tb-odr-amount"> 125</td>
                                                                <td className="tb-odr-amount">$150.00</td>
                                                                <td className="tb-odr-action">
                                                                    <div className="dropdown">
                                                                        <a className="text-soft dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown" data-offset="-8,0" aria-expanded="false"><em className="icon ni ni-more-v"></em></a>
                                                                        <div className="dropdown-menu dropdown-menu-end dropdown-menu-xs">
                                                                            <ul className="link-list-plain">
                                                                                <li><a href="#" className="text-primary">Edit</a></li>
                                                                                <li><a href="#" className="text-primary">View</a></li>
                                                                                <li><a href="#" className="text-danger">Remove</a></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>




                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>{/* .row */}



                                    </div>{/* .nk-block */}





                                </div>
                            </div>
                        </div>
                    </div>
                </Container>}
        </>
    );
}

export default Dashboard;
