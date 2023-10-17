import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

const Container = ({ children }) => {
    return (
        <div className='nk-body bg-lighter npc-default has-sidebar'>
            <div className="nk-app-root">
                {/* main @s */}
                <div className="nk-main ">
                    {/* sidebar @s */}
                    <Sidebar />
                    {/* sidebar @e */}
                    {/* wrap @s */}
                    <div className="nk-wrap ">
                        {/* main header @s */}
                        <Header />
                        {/* main header @e */}
                        {/* content @s */}
                        {children}
                        {/* content @e */}
                        {/* footer @s */}
                        <Footer />
                        {/* footer @e */}
                    </div>
                    {/* wrap @e */}
                </div>
                {/* main @e */}
            </div>
        </div>
    );
}

export default Container;
