import React from 'react';
import AppLogo from '../../assets/images/smallLogo.svg'
import { ProfileNav } from './ProfileNav';

export const Header = () => {

    return (
        <header className="header-layout d-flex justify-content-between">
            <div className="header-logo">
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                    <img src={AppLogo} alt="app logo" className="bi pe-none me-2" height="36px"/>
                    <span className="header-title">Contoso Wealth Management</span>
                </a>
            </div>
            <div className="header-profile">
                <ProfileNav/>
            </div>
        </header>
    )
}