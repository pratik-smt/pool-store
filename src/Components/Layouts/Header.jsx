import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAdmin } from '../../Action/authAction';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.authReducer.authData)

    useEffect(() => {
        !user && navigate('/login')
    }, []);

    let avatar = user.data.avatar.replaceAll("localhost", "192.168.29.203")

    return (
        <>
            {user && <div className="nk-header nk-header-fixed is-light">
                <div className="container-fluid">
                    <div className="nk-header-wrap">
                        <div className="nk-menu-trigger d-xl-none ms-n1">
                            <a href="#" className="nk-nav-toggle nk-quick-nav-icon" data-target="sidebarMenu"><em className="icon ni ni-menu"></em></a>
                        </div>
                        <div className="nk-header-brand d-xl-none">
                            <a href="html/index.html" className="logo-link">
                                <img className="logo-light logo-img" src="./images/logo.png" srcSet="./images/logo2x.png 2x" alt="logo" />
                                <img className="logo-dark logo-img" src="./images/logo-dark.png" srcSet="./images/logo-dark2x.png 2x" alt="logo-dark" />
                            </a>
                        </div>{/* .nk-header-brand */}
                        <div className="nk-header-search ms-3 ms-xl-0">
                            <em className="icon ni ni-search" />
                            <input type="text" className="form-control border-transparent form-focus-none" placeholder="Search anything" />
                        </div>{/* .nk-header-news */}
                        <div className="nk-header-tools">
                            <ul className="nk-quick-nav">
                                <li className="dropdown user-dropdown">
                                    <a href="#" className="dropdown-toggle me-n1" data-bs-toggle="dropdown">
                                        <div className="user-toggle">
                                            <div className="user-avatar sm">
                                                {user.data.avatar
                                                    ? <img className="" src={avatar} alt="user-avatar" />
                                                    : <em className="icon ni ni-user-alt" />
                                                }
                                            </div>
                                            <div className="user-info d-none d-xl-block">
                                                <div className="user-name dropdown-indicator">{user.data.first_name} {user.data.last_name}</div>
                                                <div className="user-status user-status-verified">{user.data.user_type}</div>
                                            </div>
                                        </div>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-md dropdown-menu-end">
                                        <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                                            <div className="user-card">
                                                <div className="user-avatar">
                                                    {user.data.avatar
                                                        ? <img className="" src={avatar} alt="user-avatar" />
                                                        : <em className="icon ni ni-user-alt" />
                                                    }
                                                </div>
                                                <div className="user-info">
                                                    <span className="lead-text">{user.data.first_name} {user.data.last_name}</span>
                                                    <span className="sub-text">{user.data.email}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dropdown-inner">
                                            <ul className="link-list">
                                                <li><Link to={"/profile"}><em className="icon ni ni-user-alt" /><span>View Profile</span></Link></li>
                                                <li>
                                                    <a
                                                        role='button'
                                                        onClick={() => {
                                                            dispatch(logoutAdmin());
                                                            navigate('/login')
                                                        }}
                                                    >
                                                        <em className="icon ni ni-signout " />
                                                        <span>Sign out</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>{/* .nk-header-wrap */}
                </div>{/* .container-fliud */}
            </div>}
        </>
    );
}

export default Header;
