import React, { useState } from 'react';
import { Oval } from 'react-loader-spinner'
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { forgetPasswordAPI, verifyOtpAPI } from '../../API/authRequest';
import { Link, useNavigate } from 'react-router-dom';

const ForgetPassword = () => {

    const navigate = useNavigate()
    const [showOTP, setShowOTP] = useState(false)
    const [spinnerLoading, setSpinnerLoading] = useState(false)

    let emailSchema = yup.object({
        email: yup.string().email('Please enter a valid email address').required('Email is required'),
    })
    let otpSchema = yup.object({
        otp: yup.string().min(6, 'OTP Should be 6 digit long').required('OTP is required'),
    })

    const resetPassForm = useFormik({
        initialValues: {
            email: "",
            otp: "",
        },
        enableReinitialize: true,
        validationSchema: showOTP ? otpSchema : emailSchema,
        onSubmit: async (values) => {
            setSpinnerLoading(true)
            if (!showOTP) {
                await forgetPasswordAPI(values)
                    .then((res) => {
                        toast.success(res.data.message)
                        setShowOTP(true)
                    }).catch((err) => {
                        console.log("🚀 ~ file: ForgetPassword.jsx:37 ~ .then ~ err:", err)
                        if (err.code == "ERR_NETWORK") {
                            toast.error("Something went wront! please try again later")
                        }
                        else {
                            toast.error(err.response.data.message)
                        }
                    })
            }
            else {
                await verifyOtpAPI(values)
                    .then((res) => {
                        toast.success(res.data.message)
                        setTimeout(() => {
                            navigate('/change-password', { state: { token: res.data.data.token } })
                        }, 10);
                    }).catch((err) => {
                        if (err.response.status == 400) {
                            toast.error(err.response.data.message)
                        }
                        else {
                            toast.error("Something went wrong! please try again later")
                        }
                    })
            }
            setSpinnerLoading(false)
        }
    })

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <div className="nk-body bg-white npc-default pg-auth">
                <div className="nk-app-root">

                    <div className="loginSection">
                        <div className="container">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-md-6">
                                    <div className="card">
                                        <div className="card-inner card-inner-lg">
                                            <div className="nk-block-head">
                                                <div className="nk-block-head-content">
                                                    <h5 className="nk-block-title">Reset password</h5>
                                                    <div className="nk-block-des">
                                                        {showOTP
                                                            ? <p>Please enter 6 digit OTP send on your registered email address to reset your password.</p>
                                                            : <p>If you forgot your password, well, then we’ll email you OTP to reset your password.</p>
                                                        }
                                                    </div>

                                                </div>
                                            </div>
                                            <form onSubmit={resetPassForm.handleSubmit}>
                                                <div className="form-group">
                                                    <div className="form-label-group">
                                                        {showOTP
                                                            ? <label className="form-label" htmlFor="default-01">One Time Password</label>
                                                            : <label className="form-label" htmlFor="default-01">Email</label>
                                                        }
                                                    </div>
                                                    <div className="form-control-wrap">
                                                        {showOTP
                                                            ?
                                                            <>
                                                                <input
                                                                    type="number"
                                                                    name='otp'
                                                                    {...resetPassForm.getFieldProps("otp")}
                                                                    className="form-control form-control-lg"
                                                                    id="default-01"
                                                                    placeholder="Enter 6 digit OTP"
                                                                />
                                                                {resetPassForm.touched.otp && resetPassForm.errors.otp ?
                                                                    <div className="invalid-feedback" style={{ display: "block" }}>{resetPassForm.errors.otp}</div> : ''}
                                                            </>
                                                            :
                                                            <>
                                                                <input
                                                                    type="email"
                                                                    name='email'
                                                                    {...resetPassForm.getFieldProps("email")}
                                                                    className="form-control form-control-lg"
                                                                    id="default-01"
                                                                    placeholder="Enter your email address"
                                                                />
                                                                {resetPassForm.touched.email && resetPassForm.errors.email ?
                                                                    <div className="invalid-feedback" style={{ display: "block" }}>{resetPassForm.errors.email}</div> : ''}
                                                            </>
                                                        }
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
                                                        :
                                                        <>
                                                            {showOTP
                                                                ? <button type="submit" className="btn btn-lg btn-primary btn-block">Submit OTP</button>
                                                                : <button type="submit" className="btn btn-lg btn-primary btn-block">Send OTP</button>
                                                            }
                                                        </>
                                                    }
                                                </div>
                                            </form>
                                            <div className="form-note-s2 text-center pt-4">
                                                {!spinnerLoading && <Link to={'/login'}><strong>Return to login</strong></Link>}
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

export default ForgetPassword;
