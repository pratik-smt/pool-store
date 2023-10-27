import React from 'react';

const SideScreen = () => {
    return (
        <div className="LoginBoxBlue">
            <div className="brand-logo pb-4 text-center">
                <a href="" className="logo-link">
                    <img className="logo-light logo-img logo-img-lg" src="./images/poolstore-logo.png" alt="logo" />
                    <img className="logo-dark logo-img logo-img-lg" src="./images/poolstore-logo.png" alt="logo-dark" />
                </a>
            </div>
            <div className="loginTextBlueBox">
                <h2>Explore What’s new</h2>
                <h6>Get the latest updates on new products and deals!</h6>
            </div>
            <div className="loginTextBlueBox">
                <h2>Shop Now</h2>
                <h6>Check out the entire store!</h6>
            </div>
            <div className="loginTextBlueBox">
                <h2>Discounts</h2>
                <h6>Get exclusive deals on select products!</h6>
            </div>
            <img className="" src="images/wavebtm-img.png" alt="waveimg" />

        </div>
    );
}

export default SideScreen;
