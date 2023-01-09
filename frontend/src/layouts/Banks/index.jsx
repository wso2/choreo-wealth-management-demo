import React from 'react';
import {Header} from "../../components/common/Header";
import {SidePanel} from "../../components/common/SidePanel";
import {Footer} from "../../components/common/Footer";
import { Banks } from '../../components/BankPage';


export const BanksLayout = () => {

    return(
        <div className="main-layout">
            <Header/>
            <div className="child-layout d-flex flex-row">
                <SidePanel selectedTabName="Banks" />
                <div className="content-layout p-4">
                    <Banks/>
                    <Footer />
                </div>
            </div>
        </div>
    )
}