import React from 'react';

const Footer = () => {
    return (
        <>
            <div className="nk-footer">
                <div className="container-fluid">
                    <div className="nk-footer-wrap">
                        <div className="nk-footer-copyright"> © 2023 DashLite. Template by <a href="https://softnio.com" target="_blank">Softnio</a>
                        </div>
                        <div className="nk-footer-links">
                            <ul className="nav nav-sm">
                                <li className="nav-item dropup">
                                    <a href="#" className="dropdown-toggle dropdown-indicator has-indicator nav-link text-base" data-bs-toggle="dropdown" data-offset="0,10"><span>English</span></a>
                                    <div className="dropdown-menu dropdown-menu-sm dropdown-menu-end">
                                        <ul className="language-list">
                                            <li>
                                                <a href="#" className="language-item">
                                                    <span className="language-name">English</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="language-item">
                                                    <span className="language-name">Español</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="language-item">
                                                    <span className="language-name">Français</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="language-item">
                                                    <span className="language-name">Türkçe</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <a data-bs-toggle="modal" href="#region" className="nav-link"><em className="icon ni ni-globe" /><span className="ms-1">Select Region</span></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* select region modal */}
            <div className="modal fade" tabIndex={-1} role="dialog" id="region">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <a href="#" className="close" data-bs-dismiss="modal"><em className="icon ni ni-cross-sm" /></a>
                        <div className="modal-body modal-body-md">
                            <h5 className="title mb-4">Select Your Country</h5>
                            <div className="nk-country-region">
                                <ul className="country-list text-center gy-2">
                                    <li>
                                        <a href="#" className="country-item">
                                            <img src="./images/flags/arg.png" alt="" className="country-flag" />
                                            <span className="country-name">Argentina</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="country-item">
                                            <img src="./images/flags/aus.png" alt="" className="country-flag" />
                                            <span className="country-name">Australia</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="country-item">
                                            <img src="./images/flags/bangladesh.png" alt="" className="country-flag" />
                                            <span className="country-name">Bangladesh</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="country-item">
                                            <img src="./images/flags/canada.png" alt="" className="country-flag" />
                                            <span className="country-name">Canada <small>(English)</small></span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="country-item">
                                            <img src="./images/flags/china.png" alt="" className="country-flag" />
                                            <span className="country-name">Centrafricaine</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="country-item">
                                            <img src="./images/flags/china.png" alt="" className="country-flag" />
                                            <span className="country-name">China</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="country-item">
                                            <img src="./images/flags/french.png" alt="" className="country-flag" />
                                            <span className="country-name">France</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="country-item">
                                            <img src="./images/flags/germany.png" alt="" className="country-flag" />
                                            <span className="country-name">Germany</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="country-item">
                                            <img src="./images/flags/iran.png" alt="" className="country-flag" />
                                            <span className="country-name">Iran</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="country-item">
                                            <img src="./images/flags/italy.png" alt="" className="country-flag" />
                                            <span className="country-name">Italy</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="country-item">
                                            <img src="./images/flags/mexico.png" alt="" className="country-flag" />
                                            <span className="country-name">México</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="country-item">
                                            <img src="./images/flags/philipine.png" alt="" className="country-flag" />
                                            <span className="country-name">Philippines</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="country-item">
                                            <img src="./images/flags/portugal.png" alt="" className="country-flag" />
                                            <span className="country-name">Portugal</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="country-item">
                                            <img src="./images/flags/s-africa.png" alt="" className="country-flag" />
                                            <span className="country-name">South Africa</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="country-item">
                                            <img src="./images/flags/spanish.png" alt="" className="country-flag" />
                                            <span className="country-name">Spain</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="country-item">
                                            <img src="./images/flags/switzerland.png" alt="" className="country-flag" />
                                            <span className="country-name">Switzerland</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="country-item">
                                            <img src="./images/flags/uk.png" alt="" className="country-flag" />
                                            <span className="country-name">United Kingdom</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="country-item">
                                            <img src="./images/flags/english.png" alt="" className="country-flag" />
                                            <span className="country-name">United State</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>{/* .modal-content */}
                </div>{/* .modla-dialog */}
            </div>{/* .modal */}

        </>
    );
}

export default Footer;
