import React, { useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner'
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { loginToAdmin } from '../../Action/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

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
                    {/* main @s */}
                    <div className="nk-main ">
                        {/* wrap @s */}
                        <div className="nk-wrap nk-wrap-nosidebar">
                            {/* content @s */}
                            <div className="nk-content ">
                                <div className="nk-block nk-block-middle nk-auth-body  wide-xs">
                                    <div className="brand-logo pb-4 text-center">
                                        <a href="/" className="logo-link">
                                            <img className="logo-light logo-img logo-img-lg" src="./images/logo.png" srcSet="./images/logo2x.png 2x" alt="logo" />
                                            <img className="logo-dark logo-img logo-img-lg" src="./images/logo-dark.png" srcSet="./images/logo-dark2x.png 2x" alt="logo-dark" />
                                        </a>
                                    </div>
                                    <div className="card">
                                        <div className="card-inner card-inner-lg">
                                            <div className="nk-block-head">
                                                <div className="nk-block-head-content">
                                                    <h4 className="nk-block-title">Sign-In</h4>
                                                    <div className="nk-block-des">
                                                        <p>Access admin panel using your email and passcode.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <form onSubmit={loginForm.handleSubmit}>
                                                <div className="form-group">
                                                    <div className="form-label-group">
                                                        <label className="form-label" htmlFor="default-01">Email</label>
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
                                                        <label className="form-label" htmlFor="password">Passcode</label>
                                                        <Link
                                                            to={'/forget-password'}
                                                            className="link link-primary link-sm"
                                                            role='button'
                                                        >Forgot Code?
                                                        </Link>
                                                    </div>
                                                    <div className="form-control-wrap">
                                                        <a onClick={() => setToggle(!toggle)} className="form-icon form-icon-right passcode-switch lg" data-target="password">
                                                            <em className={!toggle ? "passcode-icon icon ni icon-show  ni-eye-off" : "passcode-icon icon ni icon-hide  ni-eye"} />
                                                        </a>
                                                        <input
                                                            type={toggle ? "text" : "password"}
                                                            name="password"
                                                            {...loginForm.getFieldProps("password")}
                                                            className="form-control form-control-lg"
                                                            id="password"
                                                            placeholder="Enter your passcode"
                                                        />
                                                        {loginForm.touched.password && loginForm.errors.password ?
                                                            <div className="invalid-feedback" style={{ display: "block" }}>{loginForm.errors.password}</div> : ''}
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
                                                        : <button type="submit" className="btn btn-lg btn-primary btn-block">Sign in</button>
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
            </div>}

        </>
    );
}

export default Login;
