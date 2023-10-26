import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {

    const [openSideBar, setOpenSideBar] = useState(false)
    const currentLocation = useLocation().pathname

    return (
        <div className={openSideBar ? "nk-sidebar nk-sidebar-fixed is-light is-compact" : "nk-sidebar nk-sidebar-fixed is-light"}>
            {openSideBar
                ? <div className="nk-sidebar-element nk-sidebar-head p-0 ">
                    <div className="nk-sidebar-brand ">
                        <Link to={"/"} className="logo-link nk-sidebar-logo ">
                            <img className="" src="images/poolstore-logo.png" style={{ width: "75px" }} alt="logo" />
                        </Link>
                    </div>
                    <div className="nk-menu-trigger me-3 ">
                        <a href="#" className="nk-nav-toggle nk-quick-nav-icon d-xl-none" onClick={e => setOpenSideBar(!openSideBar)}><em className="icon ni ni-arrow-left" style={{ fontSize: "1.875rem", marginTop: "0.938rem", marginRight: "0.938rem" }}></em></a>
                        <a className="nk-nav-compact nk-quick-nav-icon d-none d-xl-inline-flex" onClick={e => setOpenSideBar(!openSideBar)}><em className="icon ni ni-menu" style={{ fontSize: "1.875rem", marginTop: "0.938rem", marginRight: "0.938rem" }} /></a>
                    </div>
                </div>
                : <div className="nk-sidebar-element nk-sidebar-head ">
                    <div>
                        <h1 className="d-none">Hello</h1>
                    </div>
                    <div className="nk-sidebar-brand ">
                        <Link to={"/"} className="logo-link nk-sidebar-logo ">
                            <img className="" src="images/poolstore-logo.png" style={{ width: "110px" }} alt="logo" />
                        </Link>
                    </div>
                    <div className="nk-menu-trigger me-n2 ">
                        <a href="#" className="nk-nav-toggle nk-quick-nav-icon d-xl-none" onClick={e => setOpenSideBar(!openSideBar)}><em className="icon ni ni-arrow-left"></em></a>
                        <a className="nk-nav-compact nk-quick-nav-icon d-none d-xl-inline-flex" onClick={e => setOpenSideBar(!openSideBar)}><em className="icon ni ni-menu" /></a>
                    </div>
                </div>
            }
            {/* .nk-sidebar-element */}
            <div className="nk-sidebar-element">
                <div className="nk-sidebar-content">
                    <div className="nk-sidebar-menu" data-simplebar>
                        <ul className="nk-menu">
                            <li className={currentLocation == "/" ? "nk-menu-item active current-page" : "nk-menu-item"}>
                                <Link to={"/"} className="nk-menu-link">
                                    <span className="nk-menu-icon"><em className="icon ni ni-home-fill" /></span>
                                    <span className="nk-menu-text">Home</span>
                                </Link>
                            </li>
                            <li className={currentLocation == "/whats-new" ? "nk-menu-item active current-page" : "nk-menu-item"}>
                                <Link to={"/whats-new"} className="nk-menu-link">
                                    <span className="nk-menu-icon"><em className="icon ni ni-bag-fill" /></span>
                                    <span className="nk-menu-text">What's New</span>
                                </Link>
                            </li>
                            <li className={currentLocation == "/hompage-banner" ? "nk-menu-item active current-page" : "nk-menu-item"}>
                                <Link to={"/hompage-banner"} className="nk-menu-link">
                                    <span className="nk-menu-icon"><em className="icon ni ni-folder-fill" /></span>
                                    <span className="nk-menu-text">Homepage Banner</span>
                                </Link>
                            </li>
                            <li className={currentLocation == "/users" ? "nk-menu-item active current-page" : "nk-menu-item"}>
                                <Link to={"/users"} className="nk-menu-link">
                                    <span className="nk-menu-icon"><em className="icon ni ni-user-group-fill" /></span>
                                    <span className="nk-menu-text">Customer Database</span>
                                </Link>
                            </li>
                            <li className={currentLocation == "/manage-products" ? "nk-menu-item active current-page" : "nk-menu-item"}>
                                <Link to={"/manage-products"} className="nk-menu-link">
                                    <span className="nk-menu-icon"><em className="icon ni ni-book-read" /></span>
                                    <span className="nk-menu-text">Manage Products</span>
                                </Link>
                            </li>
                            <li className={currentLocation == "/manage-orders" ? "nk-menu-item active current-page" : "nk-menu-item"}>
                                <Link to={"/manage-orders"} className="nk-menu-link">
                                    <span className="nk-menu-icon"><em className="icon ni ni-contact-fill" /></span>
                                    <span className="nk-menu-text">Manage Orders</span>
                                </Link>
                            </li>
                            <li className={currentLocation == "/chat" ? "nk-menu-item active current-page" : "nk-menu-item"}>
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
