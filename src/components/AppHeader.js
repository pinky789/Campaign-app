import React from "react";
import bluestacks_logo from '../images/bluestacks_logo.png';
import '../css/AppHeader.scss';

function AppHeader(){
    return(
        <div className='app-header'>
            <div className='header container'>
                <div className='logo-container'>
                    <img src={bluestacks_logo} alt='bluestacks_logo' />
                </div>
                <div className='text-container'>
                    <span className='bluestacks'>BlueStacks</span>
                    <span className='playbigger'>Play Bigger</span>
                </div>
            </div>
        </div>
    )
}

export default AppHeader;
