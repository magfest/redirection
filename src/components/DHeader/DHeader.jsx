import React, { Component } from "react";
import Helmet from "react-helmet";
import { Layout } from 'antd';
import {Button } from 'react-md';
const { Header } = Layout;
import config from "../../../data/SiteConfig";
import copy from 'copy-to-clipboard';
import "./DHeader.scss";

class DHeader extends Component{


    render(){
    return(
    <Header className="header">
    <Button icon className="icon" iconClassName="fa fa-bars" onClick={this.props.popSider}></Button>
    Redirection
    </Header>
    );
    }

}

export default DHeader;
