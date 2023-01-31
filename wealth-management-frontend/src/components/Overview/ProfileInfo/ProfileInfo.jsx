import React, { useEffect, useState } from 'react';
import { Card, Image } from "react-bootstrap";
import avatar from "../../../assets/images/avatar.jpg";
import { APP_CONFIG } from '../../../config';

export const ProfileInfo = ({accounts}) => {
    
    const [assets, setAssets] = useState(0);

    useEffect(() => {
        
        let total = accounts
            .map(acc => parseFloat(acc?.Balance.replace("$", "")))
            .reduce((accumulator, bal) => accumulator + bal, 0);
        
        setAssets(total.toFixed(2));
    }, [accounts]);

    return (
        <Card border="light" className="profile-card content-card p-3 mb-4 d-flex flex-row">
            <div className="profile-details d-flex align-items-center">
                <div className="profile-image-section px-4">
                    <Image roundedCircle={true} src={avatar} style={{height: "120px", width: "120px", "objectFit": "cover"}} />
                </div>
                <div className="profile-info-section">
                    <h5>{APP_CONFIG.USER.NAME}<span className="text-muted fs-6"> ({APP_CONFIG.USER.ID})</span> </h5>
                    <span className="text-muted"><i className="fi fi-rr-briefcase"></i>{APP_CONFIG.USER.WORK}</span><br/>
                    <span className="text-muted"><i className="fi fi-rr-marker"></i>{APP_CONFIG.USER.ADDRESS}</span><br/>
                    <span className="text-muted"><i className="bi bi-telephone"></i>{APP_CONFIG.USER.EMAIL}, {APP_CONFIG.USER.MOBILE}</span>
                </div>
            </div>
            <div className="empty"/>
            <div className="wealth-details d-flex">
                <div className="wealth-card wealth-plus">
                    <div className="wealth-icon-container d-flex flex-column">
                        <i className="fi fi-rr-coins d-flex justify-content-center align-items-center"/>
                        <h3 className="wealth-value">$ {assets}</h3>
                        <h6 className="wealth-label">Total Assets</h6>
                    </div>
                </div>
                <div className="wealth-card wealth-minus">
                    <div className="wealth-icon-container d-flex flex-column">
                        <i className="fi fi-rr-handshake d-flex justify-content-center align-items-center"/>
                        <h3 className="wealth-value">$ 3000.00</h3>
                        <h6 className="wealth-label">Total Liabilities</h6>
                    </div>
                </div>
            </div>
        </Card>
    )
}