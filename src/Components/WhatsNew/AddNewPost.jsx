import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Oval } from 'react-loader-spinner'
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Container from '../Layouts/Container';
import { addWhatsNewPostAPI, deleteWhatsNewPostAPI, editWhatsNewPostAPI, whatsNewAPI } from '../../API/whatsNewRequest';
import moment from 'moment-timezone';
import { useDropzone } from 'react-dropzone';

const WhatsNew = () => {

    const navigate = useNavigate()
    const imageRef = useRef(null)
    const user = useSelector((state) => state.authReducer.authData)

    const authToken = useSelector((state) => state.authReducer.token)

    const [spinnerLoading, setSpinnerLoading] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const [addWhatsNewModal, setAddWhatsNewModal] = useState(false)
    const [editWhatsNewModal, setEditWhatsNewModal] = useState(false)
    const [whatsNewData, setWhatsNewData] = useState([])
    const [postImage, setPostImage] = useState("")

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            setPostImage(acceptedFiles[0])
            addWhatsNewForm.setFieldValue("image", acceptedFiles[0])
            editWhatsNewForm.setFieldValue("image", acceptedFiles[0])
        },
    });

    let fetchWhatsNewData = async () => {
        setSpinnerLoading(true)
        const config = {
            headers: { Authorization: `Bearer ${authToken}` }
        }
        await whatsNewAPI(config)
            .then((response) => {
                setWhatsNewData(response ? response.data ? response.data.data.rows : [] : [])
            }).catch((err) => {
                console.log("🚀 ~ file: Profile.jsx:80 ~ err:", err)
            })
        setSpinnerLoading(false)
    }

    useEffect(() => {
        !user && navigate('/login')
        fetchWhatsNewData()
    }, []);

    const addWhatsNewForm = useFormik({
        initialValues: {
            title: "",
            description: "",
            image: "",
            is_default: "",
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            title: yup.string().required('Post title is required'),
            description: yup.string().required('Post description is required'),
            image: yup.string().required('Post image is required'),
            is_default: yup.string().required('Post type is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            setBtnLoading(true)

            const formData = new FormData();
            formData.append("title", addWhatsNewForm.getFieldProps('title').value)
            formData.append("description", addWhatsNewForm.getFieldProps('description').value)
            formData.append("is_default", addWhatsNewForm.getFieldProps('is_default').value)
            formData.append("image", postImage);

            const config = {
                headers: { Authorization: `Bearer ${authToken}` }
            }
            await addWhatsNewPostAPI(formData, config)
                .then((res) => {
                    imageRef.current.value = ''
                    resetForm({ values: "" })
                    setPostImage("")

                    toast.success(res.data.message)
                    setAddWhatsNewModal(false)

                    fetchWhatsNewData()

                }).catch((err) => {
                    console.log("🚀 ~ file: Profile.jsx:80 ~ err:", err)
                    if (err.code == "ERR_NETWORK") {
                        toast.error("Something went wront! please try again later")
                    }
                    else {
                        toast.error(err.response.data.message)
                    }
                })
            setBtnLoading(false)
        }
    })

    const editWhatsNewForm = useFormik({
        initialValues: {
            post_id: "",
            title: "",
            description: "",
            image: "",
            is_default: "",
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            title: yup.string().required('Post title is required'),
            description: yup.string().required('Post description is required'),
            image: yup.string().required('Post image is required'),
            is_default: yup.string().required('Post type is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            setBtnLoading(true)

            const formData = new FormData();
            formData.append("title", editWhatsNewForm.getFieldProps('title').value)
            formData.append("description", editWhatsNewForm.getFieldProps('description').value)
            formData.append("is_default", editWhatsNewForm.getFieldProps('is_default').value)
            formData.append("image", postImage);

            const config = {
                headers: { Authorization: `Bearer ${authToken}` }
            };
            await editWhatsNewPostAPI(values.post_id, formData, config)
                .then((res) => {
                    imageRef.current.value = ''
                    resetForm({ values: "" })
                    setPostImage("")
                    setPostImage("")

                    toast.success(res.data.message)
                    setEditWhatsNewModal(false)

                    fetchWhatsNewData()

                }).catch((err) => {
                    console.log("🚀 ~ file: Profile.jsx:80 ~ err:", err)
                    if (err.code == "ERR_NETWORK") {
                        toast.error("Something went wront! please try again later")
                    }
                    else {
                        toast.error(err.response.data.message)
                    }
                })
            setBtnLoading(false)
        }
    })

    const handleDeleteWhatsNew = async (e, id) => {

        e.preventDefault();
        Swal.fire({
            title: 'Confirm delete?',
            text: "Do you really want to delete this post?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!'
        }).then(async function (result) {
            if (result.value) {
                setSpinnerLoading(true)

                const config = {
                    headers: { Authorization: `Bearer ${authToken}` }
                };
                await deleteWhatsNewPostAPI(id, config)
                    .then((res) => {
                        Swal.fire('Deleted!', 'Post has been deleted successfully.', 'success');
                        toast.success(res.data.message)
                        fetchWhatsNewData()
                    }).catch((err) => {
                        console.log("🚀 ~ file: Profile.jsx:80 ~ err:", err)
                        if (err.code == "ERR_NETWORK") {
                            toast.error("Something went wront! please try again later")
                        }
                        else {
                            toast.error(err.response.data.message)
                        }
                    })
                setSpinnerLoading(false)
            }
        });


    }

    return (
        <>
            {user &&
                <Container>
                    <Toaster position="top-right" reverseOrder={false} />
                    {/* {spinnerLoading
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
                        </div>*/}
                    :
                    <div className="nk-content">
                        <div className="container-fluid">
                            <div className="nk-content-inner">
                                <div className="nk-content-body">
                                    <div className="nk-block-head nk-block-head-sm">
                                        <div className="nk-block-between">
                                            <div className="nk-block-head-content">
                                                <h4 className="nk-block-title page-title">The Pool Store /
                                                    <span>What’s New / </span>
                                                    <span> Add New Post</span>
                                                </h4>
                                            </div>{/* .nk-block-head-content */}
                                        </div>{/* .nk-block-between */}
                                    </div>{/* .nk-block-head */}
                                    <div className="nk-block-head nk-block-head-sm">
                                        <div className="nk-block-between">
                                            <div className="nk-block-head-content">
                                                <h3 className="nk-block-title page-title text-grey">Add New Post</h3>
                                            </div>
                                            <div className="nk-block-head-content">
                                                <div className="toggle-wrap nk-block-tools-toggle">
                                                    <ul className="nk-block-tools g-3">
                                                        <li>
                                                            <div className="drodown">
                                                                <a href="#" className="dropdown-toggle dropdown-indicator btn btn-outline-light slectDraftBnt" data-bs-toggle="dropdown">Save as Draft</a>
                                                                <div className="dropdown-menu dropdown-menu-end">
                                                                    <ul className="link-list-opt no-bdr">
                                                                        <li><a href="#"><span>On Hold</span></a></li>
                                                                        <li><a href="#"><span>Delevired</span></a></li>
                                                                        <li><a href="#"><span>Rejected</span></a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="nk-block-tools-opt">
                                                            <a href="#" className="btn btn-primary lightBlue d-md-inline-flex">Save & Publish</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="row g-gs">
                                        <div className="col-md-5">

                                            <div className="row g-gs">
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <div className="form-control-wrap whatNewInput">
                                                            <input type="text" className="form-control form-control-lg" placeholder="Title" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="form-control-wrap whatNewInput">
                                                            <CKEditor
                                                                editor={ClassicEditor}
                                                                data=""
                                                                onReady={editor => {
                                                                    // You can store the "editor" and use when it is needed.
                                                                    // console.log('Editor is ready to use!', editor);
                                                                }}
                                                                onChange={(event, editor) => {
                                                                    const data = editor.getData();
                                                                    // console.log({ event, editor, data });
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-control-wrap whatNewInput">
                                                        <div className="form-icon form-icon-right"><em className="icon ni ni-calendar-alt" style={{ fontSize: "1.875rem", marginTop: "1rem", marginRight: "1rem" }}></em></div>
                                                        <input type="text" className="form-control form-control-xl form-control-outlined date-picker" id="outlined-date-picker" /></div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-control-wrap has-timepicker whatNewInput">
                                                        <div className="form-icon form-icon-right"><em className="icon ni ni-clock" style={{ fontSize: "1.875rem", marginTop: "1rem", marginRight: "1rem" }}></em></div>
                                                        <input type="text" className="form-control form-control-xl form-control-outlined time-picker" id="outlined-time-picker" /></div>
                                                </div>

                                                <div className="col-md-12">
                                                    <div className="discountExpireBox mb-3">
                                                        <span>Discount</span>
                                                        <div className="custom-control custom-switch">
                                                            <input type="checkbox" className="custom-control-input" id="customSwitch1" />
                                                            <label className="custom-control-label" htmlFor="customSwitch1">Add Discount </label>
                                                        </div>
                                                    </div>
                                                    <div className="discountExpireBox">
                                                        <span>Expiry Date</span>
                                                        <div className="custom-control custom-switch">
                                                            <input type="checkbox" className="custom-control-input" id="customSwitch2" />
                                                            <label className="custom-control-label" htmlFor="customSwitch2">Add Expiry Date </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>



                                        <div className="col-md-5">
                                            <div className="upload-zone dropzone dz-clickable mb-3">
                                                <img className="imgUploadIcon" src="./images/Image.png" alt="user-avatar" />
                                                <button className="btn uploadTxt"><em className="icon ni ni-upload"></em> Upload Image</button>
                                                <div className="dz-message" data-dz-message="">
                                                    <span className="dz-message-or">Upload a cover image for your product.</span>
                                                    <span className="dz-message-text">File Format jpeg, png Recommened Size 600x600 (1:1)</span>
                                                </div>
                                            </div>

                                            <div className="row g-gs">
                                                <div className="col-md-12"><h6>Additional Images</h6></div>
                                                <div className="col-md-6 mt-1">
                                                    <div className="upload-zone dropzone dz-clickable smallBoxUpload">
                                                        <img className="imgUploadIcon" src="./images/Image.png" alt="user-avatar" />
                                                        <button className="btn uploadTxt-small"><em className="icon ni ni-upload"></em> Upload Image</button>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>



                                    </div>










                                </div>
                            </div>
                        </div>
                    </div>

                </Container>
            }
        </>
    );
}

export default WhatsNew;
