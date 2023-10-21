import React, { useEffect, useRef, useState } from 'react';
import { Oval } from 'react-loader-spinner'
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import * as yup from 'yup'
import Container from '../Layouts/Container';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { avatarUpdate, updateAdminProfile } from '../../Action/authAction';
import { updatePasswordAPI } from '../../API/authRequest';

const Profile = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const avatarRef = useRef(null)
    const user = useSelector((state) => state.authReducer.authData)
    const authLoading = useSelector((state) => state.authReducer.authLoading)
    const authToken = useSelector((state) => state.authReducer.token)
    const [updateProfileModal, setUpdateProfileModal] = useState(false)
    const [spinnerLoading, setSpinnerLoading] = useState(false)
    const [newAvatar, setNewAvatar] = useState("")

    useEffect(() => {
        !user && navigate('/login')
    }, []);

    const handleUserAvatar = (e) => {
        if (e.target.files.length) {
            const file = e.target.files[0];
            setNewAvatar(file);
            updateAvatarForm.setValues({ image: file })
        }
    }

    const updateProfileForm = useFormik({
        initialValues: {
            first_name: user.data.first_name,
            last_name: user.data.last_name,
            phone: user.data.phone,
            email: user.data.email,
            date_of_birth: user.data.date_of_birth,
            street_housenumber: user.data.street_housenumber,
            apartment: user.data.apartment,
            post_code: user.data.post_code,
            country_of_residence: user.data.country_of_residence,
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            first_name: yup.string().required('First Name is required'),
            last_name: yup.string().required('Last Name is required'),
            phone: yup.string().required('phone Number is required'),
            email: yup.string().email('Please enter a valid email address').required('Email is required'),
        }),
        onSubmit: async (values) => {
            setSpinnerLoading(true)
            const config = {
                headers: { Authorization: `Bearer ${authToken}` }
            };
            const result = await dispatch(updateAdminProfile(values, config))
            if (result.success) {
                setUpdateProfileModal(false)
                toast.success(result.success)
            }
            else {
                toast.error(result.error)
            }
            setSpinnerLoading(false)
        }
    })

    const changePasswordForm = useFormik({
        initialValues: {
            old_password: "",
            new_password: "",
            confirm_password: "",
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            old_password: yup.string().required('Old Password is required'),
            new_password: yup.string().required('New Password is required'),
            confirm_password: yup.string().oneOf([yup.ref('new_password'), null], "Confirm password didn't match").required('Confirm password is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            setSpinnerLoading(true)
            const config = {
                headers: { Authorization: `Bearer ${authToken}` }
            };
            await updatePasswordAPI(values, config)
                .then((res) => {
                    resetForm({ values: "" })
                    toast.success(res.data.message)
                }).catch((err) => {
                    console.log("🚀 ~ file: Profile.jsx:80 ~ awaitupdatePasswordAPI ~ err:", err)
                    if (err.code == "ERR_NETWORK") {
                        toast.error("Something went wront! please try again later")
                    }
                    else {
                        toast.error(err.response.data.message)
                    }
                })
            setSpinnerLoading(false)
        }
    })

    const updateAvatarForm = useFormik({
        initialValues: {
            image: ""
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            image: yup.string().required('Avatar is required')
        }),
        onSubmit: async (values, { resetForm }) => {
            setSpinnerLoading(true)

            const formData = new FormData();
            formData.append('image', newAvatar)

            const config = {
                headers: { Authorization: `Bearer ${authToken}` }
            };

            const result = await dispatch(avatarUpdate(formData, config))
            if (result.success) {
                resetForm()
                avatarRef.current.value = ''
                toast.success(result.success)
            }
            else {
                toast.error(result.error)
            }

            setSpinnerLoading(false)
        }
    })


    return (
        <>
            {user &&
                <Container>
                    <Toaster position="top-right" reverseOrder={false} />
                    {authLoading
                        ? <div className='vh-100 flex justify-center items-center'>
                            <Oval
                                height="100"
                                width="100"
                                color='var(--ps-main)'
                                secondaryColor="var(--ps-main)"
                                ariaLabel='oval-loading'
                                strokeWidth={4}
                                strokeWidthSecondary={4}
                                visible={true}
                            />
                        </div>
                        : <div className="nk-content ">
                            <div className="container-fluid mt-5">
                                <div className="nk-content-inner">
                                    <div className="nk-content-body">
                                        <div className="nk-block">
                                            <div className="card">
                                                <div className="card-aside-wrap">
                                                    <div className="card-inner card-inner-lg">
                                                        <div className="nk-block-head nk-block-head-lg">
                                                            <div className="nk-block-between">
                                                                <div className="nk-block-head-content">
                                                                    <h4 className="nk-block-title">Personal Information</h4>
                                                                </div>
                                                                <div className="nk-block-head-content align-self-start d-lg-none">
                                                                    <a href="#" className="toggle btn btn-icon btn-trigger mt-n1" data-target="userAside"><em className="icon ni ni-menu-alt-r" /></a>
                                                                </div>
                                                            </div>
                                                        </div>{/* .nk-block-head */}
                                                        <div className="nk-block">
                                                            <div className="nk-data data-list">
                                                                <div className="data-head">
                                                                    <h6 className="overline-title">Basics</h6>
                                                                </div>
                                                                <div className="data-item" data-bs-toggle="modal" data-bs-target="#profile-edit">
                                                                    <div className="data-col">
                                                                        <span className="data-label">First Name</span>
                                                                        <span className="data-value">{user.data.first_name}</span>
                                                                    </div>
                                                                    <div className="data-col data-col-end"><span className="data-more"><em className="icon ni ni-forward-ios" /></span></div>
                                                                </div>{/* data-item */}
                                                                <div className="data-item" data-bs-toggle="modal" data-bs-target="#profile-edit">
                                                                    <div className="data-col">
                                                                        <span className="data-label">Last Name</span>
                                                                        <span className="data-value">{user.data.last_name}</span>
                                                                    </div>
                                                                    <div className="data-col data-col-end"><span className="data-more"><em className="icon ni ni-forward-ios" /></span></div>
                                                                </div>{/* data-item */}
                                                                <div className="data-item">
                                                                    <div className="data-col">
                                                                        <span className="data-label">Email</span>
                                                                        <span className="data-value">{user.data.email}</span>
                                                                    </div>
                                                                    <div className="data-col data-col-end"><span className="data-more"><em className="icon ni ni-forward-ios" /></span></div>
                                                                </div>{/* data-item */}
                                                                <div className="data-item" data-bs-toggle="modal" data-bs-target="#profile-edit">
                                                                    <div className="data-col">
                                                                        <span className="data-label">Phone Number</span>
                                                                        <span className="data-value">{user.data.phone}</span>
                                                                    </div>
                                                                    <div className="data-col data-col-end"><span className="data-more"><em className="icon ni ni-forward-ios" /></span></div>
                                                                </div>{/* data-item */}
                                                                <div className="data-item" data-bs-toggle="modal" data-bs-target="#profile-edit">
                                                                    <div className="data-col">
                                                                        <span className="data-label">Date of Birth</span>
                                                                        <span className="data-value text-soft">{user.data.date_of_birth}</span>
                                                                    </div>
                                                                    <div className="data-col data-col-end"><span className="data-more disable"><em className="icon ni ni-lock-alt" /></span></div>
                                                                </div>{/* data-item */}
                                                                <div className="data-item" data-bs-toggle="modal" data-bs-target="#profile-edit" data-tab-target="#address">
                                                                    <div className="data-col">
                                                                        <span className="data-label">Address</span>
                                                                        <span className="data-value">{user.data.street_housenumber} {user.data.apartment},<br />{user.data.post_code}, {user.data.country_of_residence}</span>
                                                                    </div>
                                                                    <div className="data-col data-col-end"><span className="data-more"><em className="icon ni ni-forward-ios" /></span></div>
                                                                </div>{/* data-item */}
                                                            </div>{/* data-list */}

                                                        </div>
                                                    </div>
                                                    <div className="card-aside card-aside-left user-aside toggle-slide toggle-slide-left toggle-break-lg" data-toggle-body="true" data-content="userAside" data-toggle-screen="lg" data-toggle-overlay="true">
                                                        <div className="card-inner-group" data-simplebar>
                                                            <div className="card-inner">
                                                                <div className="user-card">
                                                                    <div className="user-avatar bg-primary">
                                                                        {user.data.avatar
                                                                            ? <img className="" src={user.data.avatar} alt="user-avatar" />
                                                                            : <em className="icon ni ni-user-alt" />
                                                                        }
                                                                    </div>
                                                                    <div className="user-info">
                                                                        <span className="lead-text">{user.data.first_name} {user.data.last_name}</span>
                                                                        <span className="sub-text">{user.data.email}</span>
                                                                    </div>
                                                                    <div className="user-action">
                                                                        <div className="dropdown">
                                                                            <a className="btn btn-icon btn-trigger me-n2" data-bs-toggle="dropdown" href="#"><em className="icon ni ni-more-v" /></a>
                                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                                <ul className="link-list-opt no-bdr">
                                                                                    <li><a role="button" data-bs-toggle="modal" data-bs-target="#update-avatar"><em className="icon ni ni-camera-fill" /><span>Change Photo</span></a></li>
                                                                                    <li><a role="button" onClick={e => setUpdateProfileModal(true)} data-bs-target="#profile-edit" data-tab-target="#address"><em className="icon ni ni-edit-fill" /><span >Update Profile</span></a></li>
                                                                                    <li><a role="button" data-bs-toggle="modal" data-bs-target="#change-password" data-tab-target="#old_password"><em className="icon ni ni-lock-fill" /><span >Change Password</span></a></li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>{/* .user-card */}
                                                            </div>{/* .card-inner */}
                                                            <div className="card-inner p-0">
                                                                <ul className="link-list-menu">
                                                                    <li><Link className="active" to={'/profile'}><em className="icon ni ni-user-fill-c" /><span>Personal Infomation</span></Link></li>
                                                                    <li><Link to={'/profile'}><em className="icon ni ni-bell-fill" /><span>Notifications</span></Link></li>
                                                                    <li><Link to={'/profile'}><em className="icon ni ni-activity-round-fill" /><span>Account Activity</span></Link></li>
                                                                    <li><Link to={'/profile'}><em className="icon ni ni-lock-alt-fill" /><span>Security Settings</span></Link></li>
                                                                </ul>
                                                            </div>{/* .card-inner */}
                                                        </div>{/* .card-inner-group */}
                                                    </div>{/* card-aside */}
                                                </div>{/* .card-aside-wrap */}
                                            </div>{/* .card */}
                                        </div>{/* .nk-block */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {/* @@ Profile Edit Modal @s */}
                    <div className={updateProfileModal ? "modal fade show" : "modal fade"} style={{ display: updateProfileModal ? "block" : "none" }} role="dialog" id="profile-edit">
                        <div className="modal-dialog modal-dialog-centered modal p-0" role="document">
                            <div className="modal-content">
                                <a href="#" className="close" onClick={e => setUpdateProfileModal(false)} ><em className="icon ni ni-cross-sm" /></a>
                                <div className="modal-body modal-body-lg">
                                    <h5 className="title">Update Profile</h5>
                                    <ul className="nav-tabs mt-3"></ul>
                                    <div className="tab-content">
                                        <div className="tab-pane active" id="personal">
                                            <form onSubmit={updateProfileForm.handleSubmit}>
                                                <div className="row gy-4">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-label" htmlFor="full-name">First Name</label>
                                                            <input
                                                                type="text"
                                                                name='first_name'
                                                                {...updateProfileForm.getFieldProps("first_name")}
                                                                className="form-control form-control-lg"
                                                                id="full-name"
                                                                placeholder="Enter Full name"
                                                            />
                                                            {updateProfileForm.touched.first_name && updateProfileForm.errors.first_name
                                                                ?
                                                                <div className="invalid-feedback" style={{ display: "block" }}>{updateProfileForm.errors.first_name}</div>
                                                                : ''
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-label" htmlFor="display-name">Last Name</label>
                                                            <input
                                                                type="text"
                                                                name='last_name'
                                                                {...updateProfileForm.getFieldProps("last_name")}
                                                                className="form-control form-control-lg"
                                                                id="display-name"
                                                                placeholder="Enter display name"
                                                            />
                                                            {updateProfileForm.touched.last_name && updateProfileForm.errors.last_name
                                                                ?
                                                                <div className="invalid-feedback" style={{ display: "block" }}>{updateProfileForm.errors.last_name}</div>
                                                                : ''
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-label" htmlFor="birth-day">Email Address</label>
                                                            <input
                                                                type="text"
                                                                name='email'
                                                                {...updateProfileForm.getFieldProps("email")}
                                                                className="form-control form-control-lg date-picker"
                                                                id="birth-day"
                                                                placeholder="Enter your birth date"
                                                            />
                                                            {updateProfileForm.touched.email && updateProfileForm.errors.email
                                                                ?
                                                                <div className="invalid-feedback" style={{ display: "block" }}>{updateProfileForm.errors.email}</div>
                                                                : ''
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-label" htmlFor="phone-no">Phone Number</label>
                                                            <input
                                                                type="text"
                                                                name='phone'
                                                                {...updateProfileForm.getFieldProps("phone")}
                                                                className="form-control form-control-lg"
                                                                id="phone-no"
                                                                placeholder="Phone Number"
                                                            />
                                                            {updateProfileForm.touched.phone && updateProfileForm.errors.phone
                                                                ?
                                                                <div className="invalid-feedback" style={{ display: "block" }}>{updateProfileForm.errors.phone}</div>
                                                                : ''
                                                            }
                                                        </div>
                                                    </div><div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-label" htmlFor="address-l1">House Number</label>
                                                            <input
                                                                type="text"
                                                                name='street_housenumber'
                                                                {...updateProfileForm.getFieldProps("street_housenumber")}
                                                                className="form-control form-control-lg"
                                                                id="address-l1"
                                                                placeholder="House Number"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-label" htmlFor="address-l2">Apartment</label>
                                                            <input
                                                                type="text"
                                                                name='apartment'
                                                                {...updateProfileForm.getFieldProps("apartment")}
                                                                className="form-control form-control-lg"
                                                                id="address-l2"
                                                                placeholder="Apartment"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-label" htmlFor="address-st">Postal Code</label>
                                                            <input
                                                                type="text"
                                                                name='post_code'
                                                                {...updateProfileForm.getFieldProps("post_code")}
                                                                className="form-control form-control-lg"
                                                                id="address-st"
                                                                placeholder="Postal Code"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-label" htmlFor="address-county">Country</label>
                                                            <input
                                                                type="text"
                                                                name='country_of_residence'
                                                                {...updateProfileForm.getFieldProps("country_of_residence")}
                                                                className="form-control form-control-lg"
                                                                id="address-st"
                                                                placeholder="Country"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        {spinnerLoading
                                                            ? <div className='ms-5 justify-start'>
                                                                <Oval
                                                                    height="40"
                                                                    width="40"
                                                                    color='var(--ps-main)'
                                                                    secondaryColor="var(--ps-main)"
                                                                    ariaLabel='oval-loading'
                                                                    strokeWidth={4}
                                                                    strokeWidthSecondary={4}
                                                                    visible={spinnerLoading}
                                                                />
                                                            </div>
                                                            : <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                                                                <li>
                                                                    <button type='submit' className="btn btn-lg btn-primary">Update Profile</button>
                                                                </li>
                                                                <li>
                                                                    <a role='button' onClick={e => setUpdateProfileModal(false)} className="link link-primary">Cancel</a>
                                                                </li>
                                                            </ul>
                                                        }
                                                    </div>
                                                </div>
                                            </form>
                                        </div>{/* .tab-pane */}
                                    </div>{/* .tab-content */}
                                </div>{/* .modal-body */}
                            </div>{/* .modal-content */}
                        </div>{/* .modal-dialog */}
                    </div>{/* .modal */}
                    {/* @@ Change Password Modal @s */}
                    <div className="modal fade" role="dialog" id="change-password">
                        <div className="modal-dialog modal-dialog-centered modal-xs p-0" role="document">
                            <div className="modal-content">
                                <a href="#" className="close" data-bs-dismiss="modal"><em className="icon ni ni-cross-sm" /></a>
                                <div className="modal-body modal-body-lg">
                                    <h5 className="title">Change Password</h5>
                                    <ul className="nav-tabs mt-3"></ul>
                                    <div className="tab-content">
                                        <div className="tab-pane active" id="personal">
                                            <form onSubmit={changePasswordForm.handleSubmit}>
                                                <div className="row gy-4">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label className="form-label" htmlFor="old_password">Old Password</label>
                                                            <input
                                                                type="text"
                                                                name='old_password'
                                                                {...changePasswordForm.getFieldProps("old_password")}
                                                                className="form-control form-control-lg"
                                                                id="old_password"
                                                                placeholder="Enter Old Password"
                                                            />
                                                            {changePasswordForm.touched.old_password && changePasswordForm.errors.old_password
                                                                ?
                                                                <div className="invalid-feedback" style={{ display: "block" }}>{changePasswordForm.errors.old_password}</div>
                                                                : ''
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label className="form-label" htmlFor="new_password">New Password</label>
                                                            <input
                                                                type="text"
                                                                name='new_password'
                                                                {...changePasswordForm.getFieldProps("new_password")}
                                                                className="form-control form-control-lg"
                                                                id="new_password"
                                                                placeholder="Enter New Password"
                                                            />
                                                            {changePasswordForm.touched.new_password && changePasswordForm.errors.new_password
                                                                ?
                                                                <div className="invalid-feedback" style={{ display: "block" }}>{changePasswordForm.errors.new_password}</div>
                                                                : ''
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label className="form-label" htmlFor="confirm_password">Confirm Password</label>
                                                            <input
                                                                type="text"
                                                                name='confirm_password'
                                                                {...changePasswordForm.getFieldProps("confirm_password")}
                                                                className="form-control form-control-lg"
                                                                id="confirm_password"
                                                                placeholder="Enter Confirm Password"
                                                            />
                                                            {changePasswordForm.touched.confirm_password && changePasswordForm.errors.confirm_password
                                                                ?
                                                                <div className="invalid-feedback" style={{ display: "block" }}>{changePasswordForm.errors.confirm_password}</div>
                                                                : ''
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        {spinnerLoading
                                                            ? <div className='ms-5 justify-start'>
                                                                <Oval
                                                                    height="40"
                                                                    width="40"
                                                                    color='var(--ps-main)'
                                                                    secondaryColor="var(--ps-main)"
                                                                    ariaLabel='oval-loading'
                                                                    strokeWidth={4}
                                                                    strokeWidthSecondary={4}
                                                                    visible={spinnerLoading}
                                                                />
                                                            </div>
                                                            : <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                                                                <li>
                                                                    <button type='submit' className="btn btn-lg btn-primary">Change Password</button>
                                                                </li>
                                                                <li>
                                                                    <a href="#" data-bs-dismiss="modal" className="link link-primary">Cancel</a>
                                                                </li>
                                                            </ul>
                                                        }
                                                    </div>
                                                </div>
                                            </form>
                                        </div>{/* .tab-pane */}
                                    </div>{/* .tab-content */}
                                </div>{/* .modal-body */}
                            </div>{/* .modal-content */}
                        </div>{/* .modal-dialog */}
                    </div>{/* .modal */}
                    {/* @@ Avatar Update Modal @s */}
                    <div className="modal fade" role="dialog" id="update-avatar">
                        <div className="modal-dialog modal-dialog-centered modal-xs p-0" role="document">
                            <div className="modal-content">
                                <a href="#" className="close" data-bs-dismiss="modal"><em className="icon ni ni-cross-sm" /></a>
                                <div className="modal-body modal-body-lg">
                                    <h5 className="title">Update Avatar</h5>
                                    <ul className="nav-tabs mt-3"></ul>
                                    <div className="tab-content">
                                        <div className="tab-pane active" id="personal">
                                            <form onSubmit={updateAvatarForm.handleSubmit}>
                                                <div className="row gy-4">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label className="form-label" htmlFor="image">Old Password</label>
                                                            <input
                                                                type="file"
                                                                accept=".jpg, .png"
                                                                name='image'
                                                                className="form-control form-control-lg"
                                                                id="image"
                                                                ref={avatarRef}
                                                                onChange={e => handleUserAvatar(e)}
                                                            />
                                                            {updateAvatarForm.touched.image && updateAvatarForm.errors.image
                                                                ?
                                                                <div className="invalid-feedback" style={{ display: "block" }}>{updateAvatarForm.errors.image}</div>
                                                                : ''
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        {spinnerLoading
                                                            ? <div className='ms-5 justify-start'>
                                                                <Oval
                                                                    height="40"
                                                                    width="40"
                                                                    color='var(--ps-main)'
                                                                    secondaryColor="var(--ps-main)"
                                                                    ariaLabel='oval-loading'
                                                                    strokeWidth={4}
                                                                    strokeWidthSecondary={4}
                                                                    visible={spinnerLoading}
                                                                />
                                                            </div>
                                                            : <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                                                                <li>
                                                                    <button type='submit' data-bs-dismiss="modal" className="btn btn-lg btn-primary">Save Change</button>
                                                                </li>
                                                                <li>
                                                                    <a href="#" data-bs-dismiss="modal" className="link link-primary">Cancel</a>
                                                                </li>
                                                            </ul>
                                                        }
                                                    </div>
                                                </div>
                                            </form>
                                        </div>{/* .tab-pane */}
                                    </div>{/* .tab-content */}
                                </div>{/* .modal-body */}
                            </div>{/* .modal-content */}
                        </div>{/* .modal-dialog */}
                    </div>{/* .modal */}

                    {/* Background screen when modal is Open */}
                    {updateProfileModal && <div onClick={e => setUpdateProfileModal(false)} className="toggle-overlay"></div>}
                </Container>
            }
        </>
    );
}

export default Profile;
