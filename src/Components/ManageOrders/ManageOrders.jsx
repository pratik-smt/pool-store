import React, { useEffect } from 'react';
import Container from '../Layouts/Container';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ManageOrders = () => {

    const navigate = useNavigate()
    const user = useSelector((state) => state.authReducer.authData)

    const authToken = useSelector((state) => state.authReducer.token)

    useEffect(() => {
        !user && navigate('/login')
    }, []);

    return (
        <>
            {user &&
                <Container>
                    <h1 className='mt-5'>
                        ManageOrders
                    </h1>
                </Container>
            }
        </>
    );
}

export default ManageOrders;
