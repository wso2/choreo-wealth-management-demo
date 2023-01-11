import React from 'react';
import { Card, Image } from "react-bootstrap";
import avatar from "../../../assets/images/avatar.jpg";

export const ProfileInfo = () => {
    return (
        <Card border="light" className="profile-card content-card p-3 mb-4 d-flex flex-row">
            <div className="profile-details d-flex align-items-center">
                <div className="profile-image-section px-4">
                    <Image roundedCircle={true} src={avatar} style={{height: "120px", width: "120px", "objectFit": "cover"}} />
                </div>
                <div className="profile-info-section">
                    <h5> Alex Lim<span className="text-muted fs-6"> (alex_lim)</span> </h5>
                    <span className="text-muted"><i className="fi fi-rr-briefcase"></i>Software Engineer</span><br/>
                    <span className="text-muted"><i className="fi fi-rr-marker"></i>Bay Area, San Francisco, CA</span><br/>
                    <span className="text-muted"><i className="bi bi-telephone"></i>alex_lim@email.com,(+239) 816-9029</span>
                </div>
            </div>
            <div className="empty"/>
            <div className="wealth-details d-flex">
                <div className="wealth-card wealth-plus">
                    <div className="wealth-icon-container d-flex flex-column">
                        <i className="fi fi-rr-coins d-flex justify-content-center align-items-center"/>
                        <h3 className="wealth-value">$ 30,000.00</h3>
                        <h6 className="wealth-label">Total Assets</h6>
                    </div>
                </div>
                <div className="wealth-card wealth-minus">
                    <div className="wealth-icon-container d-flex flex-column">
                        <i className="fi fi-rr-handshake d-flex justify-content-center align-items-center"/>
                        <h3 className="wealth-value">$ 10,000.00</h3>
                        <h6 className="wealth-label">Total Liabilities</h6>
                    </div>
                </div>
            </div>
        </Card>
    )
}