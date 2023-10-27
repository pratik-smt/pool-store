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
import { addScreenAPI } from '../../API/OnboardingRequest';


const AddOnbordingScreen = () => {

    const navigate = useNavigate()
    const imageRef = useRef(null)
    const user = useSelector((state) => state.authReducer.authData)
    const authToken = useSelector((state) => state.authReducer.token)

    const [spinnerLoading, setSpinnerLoading] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const [screenImage, setScreenImage] = useState("")

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: (acceptedFiles) => {
            setScreenImage(acceptedFiles[0])
            addNewScreenForm.setFieldValue("image", acceptedFiles[0])
        },
    });

    const addNewScreenForm = useFormik({
        initialValues: {
            title: "",
            description: "",
            image: "",
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            title: yup.string().required('Title is required'),
            description: yup.string().required('Description is required'),
            image: yup.string().required('Image is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            setBtnLoading(true)

            const formData = new FormData();
            formData.append("title", addNewScreenForm.getFieldProps('title').value)
            formData.append("description", addNewScreenForm.getFieldProps('description').value)
            formData.append("image", screenImage);

            const config = {
                headers: { Authorization: `Bearer ${authToken}` }
            }
            await addScreenAPI(formData, config)
                .then((res) => {
                    console.log("🚀 ~ file: AddOnbordingScreen.jsx:61 ~ .then ~ res:", res.data.message)
                    // resetForm({ values: "" })
                    // setScreenImage("")
                    // imageRef.current.value = ''
                    navigate('/onboarding-screen')
                    setTimeout(() => {
                        toast.success(res.data.message)
                    }, 100);

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

    useEffect(() => {
        !user && navigate('/login')
    }, []);

    return (
        <>
            {user &&
                <Container>
                    <Toaster position="top-right" reverseOrder={false} />
                    <div className="nk-content mt-5">
                        <div className="container-fluid mt-4">
                            <div className="nk-content-inner">
                                <div className="nk-content-body">
                                    <div className="nk-block-head nk-block-head-sm">
                                        <div className="nk-block-between">
                                            <div className="nk-block-head-content">
                                                <h4 className="nk-block-title page-title">The Pool Store /
                                                    <span> Add Onboarding Screen</span>
                                                </h4>
                                            </div>{/* .nk-block-head-content */}
                                        </div>{/* .nk-block-between */}
                                    </div>{/* .nk-block-head */}

                                    {/* <div className="nk-block-head nk-block-head-sm">
                                        <div className="nk-block-between">
                                            <div className="nk-block-head-content">
                                                <h3 className="nk-block-title page-title text-grey">Add New Screen</h3>
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
                                    </div> */}


                                    <div className="row g-gs mt-3">
                                        <div className="col-md-5">

                                            <div className="row g-gs">
                                                <form className="row" onSubmit={addNewScreenForm.handleSubmit}>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <div className="form-control-wrap whatNewInput">
                                                                <label className="form-label">Title</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control form-control-lg"
                                                                    placeholder="Title"
                                                                    {...addNewScreenForm.getFieldProps("title")}
                                                                />
                                                                {addNewScreenForm.touched.title && addNewScreenForm.errors.title
                                                                    ? <div className="invalid-feedback" style={{ display: "block" }}>
                                                                        {addNewScreenForm.errors.title}
                                                                    </div>
                                                                    : ''
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="form-control-wrap whatNewInput">
                                                                <label className="form-label">Sub Title</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control form-control-lg"
                                                                    placeholder="Sub title"
                                                                    {...addNewScreenForm.getFieldProps("description")}
                                                                />
                                                                {addNewScreenForm.touched.description && addNewScreenForm.errors.description
                                                                    ? <div className="invalid-feedback" style={{ display: "block" }}>
                                                                        {addNewScreenForm.errors.description}
                                                                    </div>
                                                                    : ''
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="form-label">Screen Image</label>{screenImage
                                                                ?
                                                                <div>
                                                                    <img src={URL.createObjectURL(screenImage)} alt="Screen Image" style={{ width: "250px" }} />
                                                                    <em
                                                                        role="button"
                                                                        className="far fa-solid fa-2x fa-rectangle-xmark"
                                                                        style={{ position: "absolute" }}
                                                                        onClick={e => {
                                                                            setScreenImage("")
                                                                            addNewScreenForm.setFieldValue("image", "")
                                                                        }}
                                                                    />
                                                                </div>
                                                                : <div className=""  {...getRootProps()}>
                                                                    <input {...getInputProps()} />
                                                                    {isDragActive
                                                                        ?
                                                                        <div className='d-flex justify-content-center align-items-center border border-3 border-dashed rounded-3' style={{ width: "350px", height: "150px", backgroundColor: "whitesmoke" }}>
                                                                            <h6>Drop the image here...</h6>
                                                                        </div>
                                                                        : <div className='d-flex justify-content-center align-items-center border border-3 border-dashed rounded-3 flex-column p-2'>
                                                                            <img className="imgUploadIcon" src="./images/Image.png" alt="user-avatar" />
                                                                            <div className="btn uploadTxt">
                                                                                <em className="icon ni ni-upload" /> Upload Image
                                                                            </div>
                                                                            <div className="dz-message" data-dz-message="">
                                                                                <span className="dz-message-or">Select or drag & drop onboarding screen image here.</span><br />
                                                                                <span className="dz-message-text">File Format jpeg, png Accepted Size 1000x1000</span>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    {addNewScreenForm.touched.image && addNewScreenForm.errors.image
                                                                        ? <div className="invalid-feedback" style={{ display: "block" }}>
                                                                            {addNewScreenForm.errors.image}
                                                                        </div>
                                                                        : ''
                                                                    }
                                                                </div>
                                                            }
                                                        </div>
                                                        {btnLoading
                                                            ? <div className='flex justify-center items-center'>
                                                                <Oval
                                                                    height="30"
                                                                    width="30"
                                                                    color='var(--ps-main)'
                                                                    secondaryColor="var(--ps-main)"
                                                                    ariaLabel='oval-loading'
                                                                    strokeWidth={4}
                                                                    strokeWidthSecondary={4}
                                                                    visible={true}
                                                                />
                                                            </div>
                                                            : <button type="submit px-5" className="btn btn-primary d-inline w-100">Submit</button>
                                                        }
                                                    </div>

                                                </form>
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

export default AddOnbordingScreen;
