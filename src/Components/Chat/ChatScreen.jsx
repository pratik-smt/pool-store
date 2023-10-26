import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Container from '../Layouts/Container';

const ChatScreen = () => {

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
                        Chat Screen
                    </h1>
                </Container>
            }
        </>
    );
}

export default ChatScreen;
