import React from 'react';
import webLogo from '../../images/poolStoreLogo.avif'
import { Link } from 'react-router-dom';

const ResetSuccess = () => {
    return (
        <>
            <div classname="nk-body bg-white npc-default pg-auth">
                <div className="nk-app-root">
                    {/* main @s */}
                    <div className="nk-main ">
                        {/* wrap @s */}
                        <div className="nk-wrap nk-wrap-nosidebar">
                            {/* content @s */}
                            <div className="nk-content ">
                                <div className="nk-block nk-block-middle nk-auth-body">
                                    <div className="brand-logo pb-4 text-center">
                                        <img className="" src={webLogo} alt="logo" />
                                    </div>
                                    <div className="nk-block-head">
                                        <div className="nk-block-head-content">
                                            <h4 className="nk-block-title">Password changed successfully</h4>
                                            <div className="nk-block-des text-success">
                                                <p>You can now login with your new password</p>
                                            </div>
                                        </div>
                                        <div className="form-note-s2 text-center pt-2">
                                            <Link to={'/login'}><strong>Return to login</strong></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* wrap @e */}
                        </div>
                        {/* content @e */}
                    </div>
                    {/* main @e */}
                </div>
            </div>

        </>
    );
}

export default ResetSuccess;
