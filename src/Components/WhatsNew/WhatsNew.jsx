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
                        : <div className="nk-content mt-5 ">
                            <div className="container-fluid">
                                <div className="nk-content-inner">
                                    <div className="nk-content-body">
                                        <div className="nk-block-head nk-block-head-sm">
                                            <div className="nk-block-between">
                                                <div className="nk-block-head-content">
                                                    <h3 className="nk-block-title page-title">Products</h3>
                                                </div>{/* .nk-block-head-content */}
                                                <div className="nk-block-head-content">
                                                    <div className="toggle-wrap nk-block-tools-toggle">
                                                        <a href="#" className="btn btn-icon btn-trigger toggle-expand me-n1" data-target="pageMenu"><em className="icon ni ni-more-v" /></a>
                                                        <div className="toggle-expand-content" data-content="pageMenu">
                                                            <ul className="nk-block-tools g-3">
                                                                <li className="nk-block-tools-opt">
                                                                    <a onClick={e => setAddWhatsNewModal(true)} data-target="addProduct" className="toggle btn btn-icon btn-primary d-md-none active"><em className="icon ni ni-plus" /></a>
                                                                    <a onClick={e => setAddWhatsNewModal(true)} data-target="addProduct" className="btn btn-primary"><em className="icon ni ni-plus" /><span>Add What's New</span></a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="nk-block">
                                            <div className="card">
                                                <div className="card-inner-group">
                                                    <div className="card-inner p-0">
                                                        <div className="nk-tb-list">
                                                            {/* Table Heads */}
                                                            <div className="nk-tb-item nk-tb-head">
                                                                <div className="nk-tb-col tb-col-sm"><span>Date</span></div>
                                                                <div className="nk-tb-col w-40"><span>Post</span></div>
                                                                <div className="nk-tb-col"><span>Reach</span></div>
                                                                <div className="nk-tb-col"><span>Likes</span></div>
                                                                <div className="nk-tb-col"><span>Shares</span></div>
                                                                <div className="nk-tb-col"><span>Comments</span></div>
                                                                <div className="nk-tb-col"><span>Action</span></div>
                                                            </div>
                                                            {/* Table Items */}
                                                            {whatsNewData.length > 0
                                                                && whatsNewData.map((data) => {
                                                                    return <div key={data.id} className="nk-tb-item">
                                                                        <div className="nk-tb-col">
                                                                            <span className="tb-sub">{moment(data.created_at).format("DD-MM-YYYY")}</span>
                                                                        </div>
                                                                        <div className="nk-tb-col tb-col-sm w-40">
                                                                            <div className="tb-product">
                                                                                <img src={data.image_icon.replaceAll("localhost", "192.168.29.203")} alt="" className="thumb" />
                                                                                <div className='d-flex flex-column'>
                                                                                    <span className="title">{data.title}{data.is_default && <span style={{ lineHeight: "1.1rem", fontSize: "10px", position: "relative", bottom: "12px", right: "2px" }} className="badge rounded-pill bg-success">Default</span>}</span>
                                                                                    <span className="tb-lead">{data.sub_title}</span>
                                                                                    <span className="tb-lead">
                                                                                        <span dangerouslySetInnerHTML={{ __html: data.description }} />
                                                                                        {/* {data.description} */}
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="nk-tb-col">
                                                                            <span className="tb-sub">{data.reach ? data.reach : 0}</span>
                                                                        </div>
                                                                        <div className="nk-tb-col">
                                                                            <span className="tb-sub">{data.like ? data.like : 0}</span>
                                                                        </div>
                                                                        <div className="nk-tb-col">
                                                                            <span className="tb-sub">{data.share ? data.share : 0}</span>
                                                                        </div>
                                                                        <div className="nk-tb-col tb-col-md">
                                                                            <span className="tb-sub">{data.comment ? data.comment : 0}</span>
                                                                        </div>
                                                                        <div className="nk-tb-col nk-tb-col-tools">
                                                                            <ul className="nk-tb-actions justify-content-between gx-1 my-n1">
                                                                                <li className="me-n1">
                                                                                    <div className="dropdown">
                                                                                        <a href="#" className="dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown"><em className="icon ni ni-more-h" /></a>
                                                                                        <div className="dropdown-menu dropdown-menu-end">
                                                                                            <ul className="link-list-opt no-bdr">
                                                                                                <li>
                                                                                                    <a
                                                                                                        role='button'
                                                                                                        onClick={e => {
                                                                                                            setPostImage(data.image_icon.replaceAll("localhost", "192.168.29.203"))
                                                                                                            editWhatsNewForm.setFieldValue("post_id", data.id);
                                                                                                            editWhatsNewForm.setFieldValue("title", data.title);
                                                                                                            editWhatsNewForm.setFieldValue("description", data.description);
                                                                                                            editWhatsNewForm.setFieldValue("is_default", data.is_default);
                                                                                                            editWhatsNewForm.setFieldValue("image", data.image_icon);
                                                                                                            setEditWhatsNewModal(true)
                                                                                                        }}
                                                                                                    >
                                                                                                        <em className="icon ni ni-edit" />
                                                                                                        <span>Edit Post</span>
                                                                                                    </a>
                                                                                                </li>

                                                                                                <li><a role='button' onClick={e => handleDeleteWhatsNew(e, data.id)} className='text-danger'><em className="icon ni ni-trash" /><span>Delete Post</span></a></li>
                                                                                                {/* <li><a role='button' onClick={e => handleDeleteWhatsNew(data.id)} className='text-danger'><em className="icon ni ni-trash" /><span>Delete Post</span></a></li> */}
                                                                                            </ul>
                                                                                        </div>
                                                                                    </div>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {whatsNewData.length == 0
                                            && <div className='mt-5 d-flex justify-content-center align-item-center'>
                                                <h6>No Data Available</h6>
                                            </div>
                                        }
                                        {/* Add What's New Modal */}
                                        <div className={addWhatsNewModal ? "modal fade show d-block " : "modal fade"} id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Add What's New Post</h1>
                                                        <button type="button" onClick={e => setAddWhatsNewModal(false)} className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                                    </div>
                                                    <div className="modal-body">

                                                        <div className="nk-block">
                                                            <form onSubmit={addWhatsNewForm.handleSubmit}>
                                                                <div className="row g-3">
                                                                    <div className="col-12">
                                                                        <div className="form-group">
                                                                            <label className="form-label" htmlFor="product-title">Post Title</label>
                                                                            <div className="form-control-wrap">
                                                                                <input
                                                                                    type="text"
                                                                                    name='title'
                                                                                    {...addWhatsNewForm.getFieldProps("title")}
                                                                                    className="form-control"
                                                                                    id="title"
                                                                                />
                                                                                {addWhatsNewForm.touched.title && addWhatsNewForm.errors.title
                                                                                    ?
                                                                                    <div className="invalid-feedback" style={{ display: "block" }}>{addWhatsNewForm.errors.title}</div>
                                                                                    : ''
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-12">
                                                                        <div className="form-group">
                                                                            <label className="form-label" htmlFor="product-description">Post Description</label>
                                                                            <CKEditor
                                                                                editor={ClassicEditor}
                                                                                data={addWhatsNewForm.values.description}
                                                                                onChange={(event, editor) => {
                                                                                    const data = editor.getData()
                                                                                    addWhatsNewForm.setFieldValue("description", data)
                                                                                }}
                                                                            />
                                                                            {addWhatsNewForm.touched.description && addWhatsNewForm.errors.description
                                                                                ?
                                                                                <div className="invalid-feedback" style={{ display: "block" }}>{addWhatsNewForm.errors.description}</div>
                                                                                : ''
                                                                            }
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-md-12">
                                                                        <div className="form-group">
                                                                            <label className="form-label" htmlFor="regular-price">Post Type</label>
                                                                            <div className="input-group">
                                                                                <select
                                                                                    name="is_default"
                                                                                    {...addWhatsNewForm.getFieldProps("is_default")}
                                                                                    className="form-control mb-0"
                                                                                >
                                                                                    <option>-- Select Post Visibility --</option>
                                                                                    <option value='true'>Default</option>
                                                                                    <option value='false'>Time Limited</option>
                                                                                </select>
                                                                                {addWhatsNewForm.touched.is_default && addWhatsNewForm.errors.is_default
                                                                                    ?
                                                                                    <div className="invalid-feedback" style={{ display: "block" }}>{addWhatsNewForm.errors.is_default}</div>
                                                                                    : ''
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <div className="form-group ">
                                                                            <label className="form-label" htmlFor="product-image">Post Image</label>
                                                                            {postImage
                                                                                ? <div className='d-flex'>
                                                                                    <img style={{ width: "200px" }} src={postImage} alt="" />
                                                                                    <span
                                                                                        className='preview-icon-wrap'
                                                                                        style={{ position: "relative", right: "10px", bottom: "10px", cursor: "pointer" }}
                                                                                        ref={imageRef}
                                                                                        onClick={e => { setPostImage(""); addWhatsNewForm.setFieldValue("image", "") }}
                                                                                    >
                                                                                        <em className="icon ni ni-cross-circle-fill" style={{ width: "100px" }}></em>
                                                                                    </span>
                                                                                </div>
                                                                                : <div style={{ border: "2px solid", borderStyle: "dotted", borderRadius: "10px", height: "100px", cursor: "pointer" }} className="d-flex flex-column justify-content-center align-items-center p-2" {...getRootProps()}>
                                                                                    <input
                                                                                        type="file"
                                                                                        accept=".jpg, .png"
                                                                                        name='image'
                                                                                        className="form-control form-control-lg"
                                                                                        id="image"
                                                                                        {...getInputProps()}
                                                                                    />
                                                                                    <span className='preview-icon-wrap'>
                                                                                        <em className="icon ni ni-upload-cloud"></em>
                                                                                    </span>
                                                                                    <p>Drag and drop post image here or click to browse.</p>
                                                                                </div>}
                                                                            {addWhatsNewForm.touched.image && addWhatsNewForm.errors.image
                                                                                ?
                                                                                <div className="invalid-feedback" style={{ display: "block" }}>{addWhatsNewForm.errors.image}</div>
                                                                                : ''
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        {btnLoading
                                                                            ?
                                                                            <div className="mt-2 mx-4">
                                                                                <Oval
                                                                                    height="40"
                                                                                    width="40"
                                                                                    color='var(--ps-main)'
                                                                                    secondaryColor="var(--ps-main)"
                                                                                    ariaLabel='oval-loading'
                                                                                    strokeWidth={4}
                                                                                    strokeWidthSecondary={4}
                                                                                    visible={true}
                                                                                />
                                                                            </div>
                                                                            :
                                                                            <div className="mt-2">
                                                                                <button type="submit" className="btn btn-primary"><em className="icon ni ni-plus" /><span>Add Post</span></button>
                                                                                <a onClick={e => setAddWhatsNewModal(false)} role='button' className="mx-2 link link-primary">Cancel</a>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                        {/* </div></div></div></div><div className="simplebar-placeholder" style={{ width: 'auto', height: 700 }} /></div> */}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Edit WhatsNew Post Modal */}
                                        <div className={editWhatsNewModal ? "modal fade show d-block " : "modal fade"} id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit What's New Post</h1>
                                                        <button type="button" onClick={e => { setEditWhatsNewModal(false); setPostImage("") }} className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                                    </div>
                                                    <div className="modal-body">

                                                        <div className="nk-block">
                                                            <form onSubmit={editWhatsNewForm.handleSubmit}>
                                                                <div className="row g-3">
                                                                    <div className="col-12">
                                                                        <div className="form-group">
                                                                            <label className="form-label" htmlFor="product-title">Post Title</label>
                                                                            <div className="form-control-wrap">
                                                                                <input
                                                                                    type="text"
                                                                                    name='title'
                                                                                    {...editWhatsNewForm.getFieldProps("title")}
                                                                                    className="form-control"
                                                                                    id="title"
                                                                                />
                                                                                {editWhatsNewForm.touched.title && editWhatsNewForm.errors.title
                                                                                    ?
                                                                                    <div className="invalid-feedback" style={{ display: "block" }}>{editWhatsNewForm.errors.title}</div>
                                                                                    : ''
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-12">
                                                                        <div className="form-group">
                                                                            <label className="form-label" htmlFor="product-description">Post Description</label>
                                                                            <CKEditor
                                                                                editor={ClassicEditor}
                                                                                data={editWhatsNewForm.values.description}
                                                                                onChange={(event, editor) => {
                                                                                    const data = editor.getData()
                                                                                    editWhatsNewForm.setFieldValue("description", data)
                                                                                }}
                                                                            />
                                                                            {editWhatsNewForm.touched.description && editWhatsNewForm.errors.description
                                                                                ?
                                                                                <div className="invalid-feedback" style={{ display: "block" }}>{editWhatsNewForm.errors.description}</div>
                                                                                : ''
                                                                            }
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-md-12">
                                                                        <div className="form-group">
                                                                            <label className="form-label" htmlFor="regular-price">Post Type</label>
                                                                            <div className="input-group">
                                                                                <select
                                                                                    name="is_default"
                                                                                    {...editWhatsNewForm.getFieldProps("is_default")}
                                                                                    className="form-control mb-0"
                                                                                >
                                                                                    <option>-- Select Post Visibility --</option>
                                                                                    <option value='true'>Default</option>
                                                                                    <option value='false'>Time Limited</option>
                                                                                </select>
                                                                                {editWhatsNewForm.touched.is_default && editWhatsNewForm.errors.is_default
                                                                                    ?
                                                                                    <div className="invalid-feedback" style={{ display: "block" }}>{editWhatsNewForm.errors.is_default}</div>
                                                                                    : ''
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <div className="form-group ">
                                                                            <label className="form-label" htmlFor="product-image">Post Image</label>
                                                                            {postImage
                                                                                ? <div className='d-flex'>
                                                                                    {typeof editWhatsNewForm.values.image !== "object"
                                                                                        ? <img style={{ width: "200px" }} src={postImage} alt="" />
                                                                                        : <img style={{ width: "200px" }} src={URL.createObjectURL(postImage)} alt="" />
                                                                                    }
                                                                                    <span
                                                                                        className='preview-icon-wrap'
                                                                                        style={{ position: "relative", right: "10px", bottom: "10px", cursor: "pointer" }}
                                                                                        ref={imageRef}
                                                                                        onClick={e => { setPostImage(""); editWhatsNewForm.setFieldValue("image", "") }}
                                                                                    >
                                                                                        <em className="icon ni ni-cross-circle-fill" style={{ width: "100px" }}></em>
                                                                                    </span>
                                                                                </div>
                                                                                : <div style={{ border: "2px solid", borderStyle: "dotted", borderRadius: "10px", height: "100px", cursor: "pointer" }} className="d-flex flex-column justify-content-center align-items-center p-2" {...getRootProps()}>
                                                                                    <input
                                                                                        type="file"
                                                                                        accept=".jpg, .png"
                                                                                        name='image'
                                                                                        className="form-control form-control-lg"
                                                                                        id="image"
                                                                                        {...getInputProps()}
                                                                                    />
                                                                                    <span className='preview-icon-wrap'>
                                                                                        <em className="icon ni ni-upload-cloud"></em>
                                                                                    </span>
                                                                                    <p>Drag and drop post image here or click to browse.</p>
                                                                                </div>}
                                                                            {editWhatsNewForm.touched.image && editWhatsNewForm.errors.image
                                                                                ?
                                                                                <div className="invalid-feedback" style={{ display: "block" }}>{editWhatsNewForm.errors.image}</div>
                                                                                : ''
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        {btnLoading
                                                                            ?
                                                                            <div className="mt-2 mx-4">
                                                                                <Oval
                                                                                    height="40"
                                                                                    width="40"
                                                                                    color='var(--ps-main)'
                                                                                    secondaryColor="var(--ps-main)"
                                                                                    ariaLabel='oval-loading'
                                                                                    strokeWidth={4}
                                                                                    strokeWidthSecondary={4}
                                                                                    visible={true}
                                                                                />
                                                                            </div>
                                                                            :
                                                                            <div className="mt-2">
                                                                                <button type="submit" className="btn btn-primary"><em className="icon ni ni-plus" /><span>Add Post</span></button>
                                                                                <a onClick={e => { setEditWhatsNewModal(false); setPostImage("") }} role='button' className="mx-2 link link-primary">Cancel</a>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                        {/* </div></div></div></div><div className="simplebar-placeholder" style={{ width: 'auto', height: 700 }} /></div> */}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Background screen when modal is Open */}
                                        {(editWhatsNewModal || addWhatsNewModal) && <div className="toggle-overlay"></div>}
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
