import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {

    const [openSideBar, setOpenSideBar] = useState(false)

    return (
        <div className={openSideBar ? "nk-sidebar nk-sidebar-fixed is-light is-compact" : "nk-sidebar nk-sidebar-fixed is-light"}>
            <div className="nk-sidebar-element nk-sidebar-head ">
                <div className="nk-sidebar-brand ">
                    <Link to={"/"} className="logo-link nk-sidebar-logo ">
                        <img className="" src={require("../../images/poolStoreLogo.avif")} style={{ width: "215px" }} alt="logo" />
                    </Link>
                </div>
                <div className="nk-menu-trigger me-n2 ">
                    <a href="#" className="nk-nav-toggle nk-quick-nav-icon d-xl-none" onClick={e => setOpenSideBar(!openSideBar)}><em className="icon ni ni-arrow-left"></em></a>
                    <a className="nk-nav-compact nk-quick-nav-icon d-none d-xl-inline-flex" onClick={e => setOpenSideBar(!openSideBar)}><em className="icon ni ni-menu" /></a>
                </div>
            </div>{/* .nk-sidebar-element */}
            <div className="nk-sidebar-element">
                <div className="nk-sidebar-content">
                    <div className="nk-sidebar-menu" data-simplebar>
                        <ul className="nk-menu">
                            <li className="nk-menu-item">
                                <Link to={"/"} className="nk-menu-link">
                                    <span className="nk-menu-icon"><em className="icon ni ni-home-fill" /></span>
                                    <span className="nk-menu-text">Home</span>
                                </Link>
                            </li>
                            <li className="nk-menu-item">
                                <Link to={"/whats-new"} className="nk-menu-link">
                                    <span className="nk-menu-icon"><em className="icon ni ni-bag-fill" /></span>
                                    <span className="nk-menu-text">What's New</span>
                                </Link>
                            </li>
                            <li className="nk-menu-item">
                                <Link to={"/hompage-banner"} className="nk-menu-link">
                                    <span className="nk-menu-icon"><em className="icon ni ni-folder-fill" /></span>
                                    <span className="nk-menu-text">Homepage Banner</span>
                                </Link>
                            </li>
                            <li className="nk-menu-item">
                                <Link to={"/users"} className="nk-menu-link">
                                    <span className="nk-menu-icon"><em className="icon ni ni-user-group-fill" /></span>
                                    <span className="nk-menu-text">Customer Database</span>
                                </Link>
                            </li>
                            <li className="nk-menu-item">
                                <Link to={"/manage-products"} className="nk-menu-link">
                                    <span className="nk-menu-icon"><em className="icon ni ni-book-read" /></span>
                                    <span className="nk-menu-text">Manage Products</span>
                                </Link>
                            </li>
                            <li className="nk-menu-item">
                                <Link to={"/manage-orders"} className="nk-menu-link">
                                    <span className="nk-menu-icon"><em className="icon ni ni-contact-fill" /></span>
                                    <span className="nk-menu-text">Manage Orders</span>
                                </Link>
                            </li>
                            <li className="nk-menu-item">
                                <Link to={"/chat"} className="nk-menu-link">
                                    <span className="nk-menu-icon"><em className="icon ni ni-chat-msg-fill" /></span>
                                    <span className="nk-menu-text">Chat</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Sidebar
