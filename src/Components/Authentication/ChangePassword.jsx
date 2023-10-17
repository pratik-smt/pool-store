import React, { useState } from 'react';
import { Oval } from 'react-loader-spinner'
import { useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import webLogo from '../../images/poolStoreLogo.avif'
import * as yup from 'yup'
import { changePasswordAPI } from '../../API/authRequest';

const ChangePassword = () => {

    const navigate = useNavigate()
    const { state } = useLocation()
    const [spinnerLoading, setSpinnerLoading] = useState(false)

    const resetPassForm = useFormik({
        initialValues: {
            password: "",
            confirm_password: "",
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            password: yup.string().required('Password is required'),
            confirm_password: yup.string().oneOf([yup.ref('password'), null], "Confirm password didn't match").required('Confirm password is required'),
        }),
        onSubmit: async (values) => {
            setSpinnerLoading(true)
            const config = {
                headers: { Authorization: `Bearer ${state.token}` }
            };

            await changePasswordAPI(values, config)
                .then(() => {
                    setTimeout(() => {
                        navigate('/reset-success')
                    }, 10);
                }).catch((err) => {
                    console.log("🚀 ~ file: ChangePassword.jsx:36 ~ .then ~ err:", err)
                    toast.error("Something went wrong! please try again later")
                })
            setSpinnerLoading(false)
        }
    })

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <div className="nk-body bg-white npc-default pg-auth">
                <div className="nk-app-root">
                    {/* main @s */}
                    <div className="nk-main ">
                        {/* wrap @s */}
                        <div className="nk-wrap nk-wrap-nosidebar">
                            {/* content @s */}
                            <div className="nk-content ">
                                <div className="nk-block nk-block-middle nk-auth-body  wide-xs">
                                    <div className="brand-logo text-center">
                                        <img className="" src={webLogo} alt="logo" />
                                    </div>
                                    <div className="card">
                                        <div className="card-inner card-inner-lg">
                                            <div className="nk-block-head">
                                                <div className="nk-block-head-content">
                                                    <h5 className="nk-block-title">Change password</h5>
                                                    <div className="nk-block-des">
                                                        <p>Enter your new password & confirm password to proceed further.</p>
                                                    </div>

                                                </div>
                                            </div>
                                            <form onSubmit={resetPassForm.handleSubmit}>
                                                <div className="form-group">
                                                    <div className="form-label-group">
                                                        <label className="form-label" htmlFor="default-01">New Password</label>
                                                    </div>
                                                    <div className="form-control-wrap"><input
                                                        type="text"
                                                        name='password'
                                                        {...resetPassForm.getFieldProps("password")}
                                                        className="form-control form-control-lg"
                                                        id="default-01"
                                                        placeholder="Enter new password"
                                                    />
                                                        {resetPassForm.touched.password && resetPassForm.errors.password ?
                                                            <div className="invalid-feedback" style={{ display: "block" }}>{resetPassForm.errors.password}</div> : ''}
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="form-label-group">
                                                        <label className="form-label" htmlFor="default-01">Confirm Password</label>
                                                    </div>
                                                    <div className="form-control-wrap"><input
                                                        type="text"
                                                        name='confirm_password'
                                                        {...resetPassForm.getFieldProps("confirm_password")}
                                                        className="form-control form-control-lg"
                                                        id="default-01"
                                                        placeholder="Enter confirm password"
                                                    />
                                                        {resetPassForm.touched.confirm_password && resetPassForm.errors.confirm_password ?
                                                            <div className="invalid-feedback" style={{ display: "block" }}>{resetPassForm.errors.confirm_password}</div> : ''}
                                                    </div>
                                                </div>
                                                <div className="form-group justify-center">
                                                    {spinnerLoading
                                                        ? <Oval
                                                            height="40"
                                                            width="40"
                                                            color='var(--ps-main)'
                                                            secondaryColor="var(--ps-main)"
                                                            ariaLabel='oval-loading'
                                                            strokeWidth={4}
                                                            strokeWidthSecondary={4}
                                                            visible={spinnerLoading}
                                                        />
                                                        : <button type="submit" className="btn btn-lg btn-primary btn-block">Save Changes</button>
                                                    }
                                                </div>
                                            </form>
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

export default ChangePassword;
