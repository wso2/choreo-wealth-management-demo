import React from 'react';
import Nav from 'react-bootstrap/Nav';

const isActiveTab = (currentTabName, selectedTabName) => {
    return currentTabName === selectedTabName ? "active" : " ";
}

export const SidePanel = ({selectedTabName}) => {
    return (
        <aside className="side-panel-layout">
            <div className="side-panel d-flex flex-column flex-shrink-0">
                <Nav className="side-nav nav-pills flex-column mb-auto">
                    <Nav.Item className="mb-1">
                        <Nav.Link href="/dashboard" className={isActiveTab("Overview", selectedTabName)}
                                  aria-current="page">
                            <i className="fi fi-rr-dashboard"></i>
                            <span>Overview</span>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="mb-1">
                        <Nav.Link href="/banks" className={isActiveTab("Banks", selectedTabName)}>
                            <i className="fi fi-rr-bank"></i>
                            <span>Banks</span>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="mb-1">
                        <Nav.Link href="#">
                            <i className="fi fi-rr-badge-percent"></i>
                            <span>Offers</span>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="mb-1">
                        <Nav.Link href="#">
                            <i className="fi fi-rr-chat-arrow-grow"></i>
                            <span>Investments</span>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="mb-1">
                        <Nav.Link href="#">
                            <i className="fi fi-rr-settings"></i>
                            <span>Settings</span>
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        </aside>
    )
}