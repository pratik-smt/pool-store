import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Oval } from 'react-loader-spinner'
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
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
                    {spinnerLoading
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
                        :
                        <div className="nk-content">
                            <div className="container-fluid">
                                <div className="nk-content-inner">
                                    <div className="nk-content-body">
                                        <div className="nk-block-head nk-block-head-sm">
                                            <div className="nk-block-between">
                                                <div className="nk-block-head-content">
                                                    <h4 className="nk-block-title page-title">The Pool Store /
                                                        <span>What’s New</span>
                                                    </h4>
                                                </div>{/* .nk-block-head-content */}
                                            </div>{/* .nk-block-between */}
                                        </div>{/* .nk-block-head */}


                                        <div className="nk-block">
                                            <div className="row g-gs">
                                                <div className="col-md-6">
                                                    <div className="circleChartFlex">
                                                        <div className="">
                                                            <span>Posts activity</span>
                                                            <h6>Showing 10 rows</h6>
                                                        </div>

                                                        <div className="d-flex">
                                                            <a href="" className="thiryday">30 Days</a>
                                                            <div className="drodown">
                                                                <a href="#" className="dropdown-toggle btn btn-outline-light btn-white filterBnt" data-bs-toggle="dropdown" aria-expanded="false">Filter
                                                                    <em className="icon ni ni-filter-alt"></em></a>
                                                                <div className="dropdown-menu dropdown-menu-end">
                                                                    <ul className="link-list-opt no-bdr">
                                                                        <li><a href="#"><span>- Price Low to high</span></a></li>
                                                                        <li><a href="#"><span>- Price High to Low</span></a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-control-wrap searchBarTable">
                                                        <div className="form-icon form-icon-right">
                                                            <em className="icon ni ni-search"></em></div>
                                                        <input type="text" className="form-control" id="fv-email" name="fv-email" placeholder='Search Here...' />
                                                    </div>
                                                </div>

                                            </div>{/* .row */}
                                        </div>



                                        <div className="nk-block">
                                            <div className="row g-gs">
                                                <div className="col-md-10">
                                                    <ul className="nav nav-tabs mt-n3 brBtmNone" role="tablist">
                                                        <li className="nav-item" role="presentation"><a className="nav-link active" data-bs-toggle="tab" href="#tabItem1" aria-selected="true" role="tab">Active Posts <span className="tableTabsSpan"> 23</span></a></li>
                                                        <li className="nav-item" role="presentation"><a className="nav-link" data-bs-toggle="tab" href="#tabItem2" aria-selected="false" role="tab" tabIndex="-1">Posts Expired <span className="tableTabsSpan"> 14</span></a></li>
                                                        <li className="nav-item" role="presentation"><a className="nav-link" data-bs-toggle="tab" href="#tabItem3" aria-selected="false" role="tab" tabIndex="-1">Unfinished <span className="tableTabsSpan"> 35</span></a></li>

                                                    </ul>
                                                </div>
                                                <div className="col-md-2"><Link to={"/add-new-post"} className="btn btn-primary lightBlue d-md-inline-flex fRight">Add New Post</Link></div>

                                                <div className="col-md-12">
                                                    <div className="tab-content">
                                                        <div className="tab-pane active show" id="tabItem1" role="tabpanel">
                                                            <div className="card card-preview">
                                                                <table className="table table-orders mt-3">
                                                                    <thead className="tb-odr-head dashboardTableHead">
                                                                        <tr className="tb-odr-item">
                                                                            <th className="tb-odr-info">
                                                                                <span className="tb-odr-id">Date</span></th>

                                                                            <th className="tb-odr-info">
                                                                                <span className="tb-odr-date">Post</span></th>

                                                                            <th className="tb-odr-amount"><span className="tb-odr-total">Likes </span></th>

                                                                            <th className="tb-odr-amount"><span className="tb-odr-status">Views</span></th>

                                                                            <th className="tb-odr-amount"><span className="tb-odr-status">Shares</span></th>

                                                                            <th className="tb-odr-amount"><span className="tb-odr-status">Comments</span></th>

                                                                            <th className="tb-odr-amount"><span className="tb-odr-status">Actions</span></th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody className="tb-odr-body whatSnewTable">
                                                                        {whatsNewData.length > 0 &&
                                                                            whatsNewData.map(data => {
                                                                                return <tr key={data.id} className="tb-odr-item">
                                                                                    <td className="tb-odr-info">{moment(data.created_at).format("YYYY-MM-DD")}</td>
                                                                                    <td className="tb-odr-info tableImageUser">
                                                                                        <div className="user-card">
                                                                                            <div className="user-avatar user-avatar-sm bg-warning">
                                                                                                <img src={data.image_icon} alt="Post image" />
                                                                                            </div>
                                                                                            <div className="user-name">
                                                                                                <span className="tb-lead text-gray">{data.title}</span>
                                                                                                <p><small className='text-gray'>{data.description}</small></p>
                                                                                            </div>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td className="tb-odr-info">{data?.like > 0 ? data.like : 0}</td>
                                                                                    <td className="tb-odr-info">{data?.like > 0 ? data.like : 0}</td>
                                                                                    <td className="tb-odr-info">{data?.share > 0 ? data.share : 0}</td>
                                                                                    <td className="tb-odr-info">{data?.comment > 0 ? data.comment : 0}</td>
                                                                                    <td className="tb-odr-info">
                                                                                        <a className="text-soft btn btn-icon">
                                                                                            <em className="icon ni ni-eye"></em>
                                                                                        </a>
                                                                                        <a className="text-soft btn btn-icon">
                                                                                            <em className="icon ni ni-edit"></em>
                                                                                        </a>
                                                                                        <a className="text-soft btn btn-icon">
                                                                                            <em className="icon ni ni-trash-empty"></em>
                                                                                        </a>
                                                                                    </td>
                                                                                </tr>
                                                                            })
                                                                        }
                                                                    </tbody>
                                                                </table>

                                                            </div>
                                                            {whatsNewData.length == 0 &&
                                                                <div className='d-flex justify-content-center align-item-center mt-5'>
                                                                    <span>No Data Available</span>
                                                                </div>
                                                            }
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>




                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </Container>
            }
        </>
    );
}

export default WhatsNew;
