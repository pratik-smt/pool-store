import React from 'react';
import { Link } from 'react-router-dom';
import SideScreen from './SideScreen';

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
                                    <SideScreen />
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
