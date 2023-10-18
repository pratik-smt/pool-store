import React from 'react';
import { Link } from 'react-router-dom';

const ResetSuccess = () => {
    return (
        <>
            <div classname="nk-body bg-white npc-default pg-auth">

                <div className="nk-app-root">

                    <div className="loginSection bg-white">
                        <div className="container">
                            <div className="row align-items-center justify-content-center">

                                <div className="col-md-6">
                                    <div className="card">
                                        <div className="card-inner card-inner-lg">

                                            <div className="nk-block-head">
                                                <div className="nk-block-head-content">
                                                    <h4 className="nk-block-title text-center">Password changed successfully</h4>
                                                    <div className="nk-block-des text-center text-success">
                                                        <p>You can now login with your new password</p>
                                                    </div>
                                                </div>
                                                <div className="form-note-s2 text-center pt-2">
                                                    <Link to={'/login'}><strong>Return to login</strong></Link>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="LoginBoxBlue">
                                        <div className="brand-logo pb-4 text-center">
                                            <a href="" className="logo-link">
                                                <img className="logo-light logo-img logo-img-lg" src="./images/poolstore-logo.png" alt="logo" />
                                                <img className="logo-dark logo-img logo-img-lg" src="./images/poolstore-logo.png" alt="logo-dark" />
                                            </a>
                                        </div>
                                        <div className="loginTextBlueBox">
                                            <h2>Explore What’s new</h2>
                                            <h6>Get the latest updates on new products and deals!</h6>
                                        </div>
                                        <div className="loginTextBlueBox">
                                            <h2>Enter The Store</h2>
                                            <h6>Check out the entire store!</h6>
                                        </div>
                                        <div className="loginTextBlueBox">
                                            <h2>Discount</h2>
                                            <h6>Get exclusive deals on select products!</h6>
                                        </div>
                                        <img className="" src="./images/wavebtm-img.png" alt="waveimg" />

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    );
}

export default ResetSuccess;
