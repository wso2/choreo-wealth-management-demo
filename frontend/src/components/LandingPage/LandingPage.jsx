import React from 'react';
import { Row, Col } from 'react-bootstrap'
import {AccountListView} from "./AccountList/AccountListView";
import {TransactionListView} from "./TransactionList/TransactionListView"
import {ExpenseView} from "./ExpenseView/ExpenseView";
import { Header } from '../common/Header';
import { SidePanel } from '../common/SidePanel';
import { Footer } from '../common/Footer';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";

export const LandingPage = () => {

  return(
    <div className="main-layout">
      <Header/>
      <div className="child-layout d-flex flex-row">
        <SidePanel selectedTabName="Overview" />
        <div className="content-layout p-4">
            <ProfileInfo/>
            <AccountListView />
            <Row className="row mb-4">
                <Col lg={7}><TransactionListView /></Col>
                <Col lg={5}><ExpenseView/></Col>
            </Row>
            <Footer />
        </div>
      </div>
    </div>
  )
}