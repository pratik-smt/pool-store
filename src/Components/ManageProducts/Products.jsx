import React, { useEffect, useState } from 'react';
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

const Products = () => {

    const navigate = useNavigate()
    const user = useSelector((state) => state.authReducer.authData)
    const authToken = useSelector((state) => state.authReducer.token)
    const [spinnerLoading, setSpinnerLoading] = useState(false)

    useEffect(() => {
        !user && navigate('/login')
    }, []);

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
                            <h1>Hello World</h1>
                            <h1>Hello World</h1>
                            <h1>Hello World</h1>
                            <h1>Hello World</h1>
                            <h1>Hello World</h1>
                        </div>
                    }
                </Container>
            }
        </>
    );
}

export default Products;
