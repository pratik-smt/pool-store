import React, { useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner'
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { loginToAdmin } from '../../Action/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import SideScreen from './SideScreen';

const Login = () => {

    const user = useSelector((state) => state.authReducer.authData)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [toggle, setToggle] = useState(false)
    const [spinnerLoading, setSpinnerLoading] = useState(false)

    const loginForm = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            email: yup.string().email('Please enter a valid email address').required('Email is required'),
            password: yup.string().required('Please enter your password'),
        }),
        onSubmit: async (values) => {
            setSpinnerLoading(true)
            const result = await dispatch(loginToAdmin(values))
            if (result.success) {
                navigate('/')
                setTimeout(() => {
                    toast.success(result.success)
                }, 10)
            }
            else {
                toast.error(result.error)
            }
            setSpinnerLoading(false)

        }
    })

    useEffect(() => {
        user && navigate('/')
    }, []);

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            {!user && <div className="nk-body bg-white npc-default pg-auth">
                <div className="nk-app-root">
                    <div className="loginSection">
                        <div className="container">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-md-6">
                                    <div className="card">
                                        <div className="card-inner card-inner-lg">
                                            <div className="nk-block-head">
                                                <div className="nk-block-head-content">
                                                    <h4 className="nk-block-title">Please login to your dashboard</h4>
                                                </div>
                                            </div>
                                            <form onSubmit={loginForm.handleSubmit}>
                                                <div className="form-group">
                                                    <div className="form-label-group">
                                                        <label className="form-label" htmlFor="default-01">Email Address</label>
                                                    </div>
                                                    <div className="form-control-wrap">
                                                        <input
                                                            type="email"
                                                            name='email'
                                                            {...loginForm.getFieldProps("email")}
                                                            className="form-control form-control-lg"
                                                            id="default-01"
                                                            placeholder="Enter your email address"
                                                        />
                                                        {loginForm.touched.email && loginForm.errors.email ?
                                                            <div className="invalid-feedback" style={{ display: "block" }}>{loginForm.errors.email}</div> : ''}
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <div className="form-label-group">
                                                        <label className="form-label" htmlFor="password">Password</label>
                                                    </div>
                                                    <div className="form-control-wrap">
                                                        <a onClick={() => setToggle(!toggle)} className="form-icon form-icon-right passcode-switch lg" data-target="password">
                                                            <em className={!toggle ? "passcode-icon icon ni icon-show  ni-eye-off" : "passcode-icon icon ni icon-hide  ni-eye"} />
                                                            {/* <em className="passcode-icon icon ni icon-show  ni-eye" /> */}
                                                        </a>
                                                        <input
                                                            type={toggle ? "text" : "password"}
                                                            name="password"
                                                            {...loginForm.getFieldProps("password")}
                                                            className="form-control form-control-lg"
                                                            id="password"
                                                            placeholder="Type your password here"
                                                        />
                                                        {loginForm.touched.password && loginForm.errors.password ?
                                                            <div className="invalid-feedback" style={{ display: "block" }}>{loginForm.errors.password}</div> : ''}
                                                    </div>
                                                    <div className="form-label-group mt-3">

                                                        <div class="custom-control custom-control-sm custom-checkbox">
                                                            {/* <input type="checkbox" class="custom-control-input" id="com-email-1" />
                                                            <label class="custom-control-label" for="com-email-1">Remember me?</label> */}
                                                        </div>
                                                        <Link
                                                            to={'/forget-password'}
                                                            className="link link-primary link-sm greyColor"
                                                            role='button'
                                                        >Forgot Passowrd ?
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="form-group justify-center mt-3">
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
                                                        : <button type="submit" className="btn btn-lg btn-primary btn-block">Login</button>
                                                    }
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-md-6">
                                    <SideScreen />
                                </div>




                            </div>
                        </div>

                    </div>
                    {/* main @e */}
                </div>
            </div>}

        </>
    );
}

export default Login;
