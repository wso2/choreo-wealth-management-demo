import React from 'react';
import {Header} from "../../components/common/Header";
import {SidePanel} from "../../components/common/SidePanel";
import {Overview} from "../../components/Overview/Overview";
import {Footer} from "../../components/common/Footer";


export const Dashboard = () => {

    return(
        <div className="main-layout">
            <Header/>
            <div className="child-layout d-flex flex-row">
                <SidePanel selectedTabName="Overview" />
                <div className="content-layout p-4">
                    <Overview/>
                    <Footer />
                </div>
            </div>
        </div>
    )
}