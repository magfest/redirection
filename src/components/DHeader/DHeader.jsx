import React, { Component } from "react";
import Helmet from "react-helmet";
import { Layout } from 'antd';
const { Header } = Layout;
import config from "../../../data/SiteConfig";
import copy from 'copy-to-clipboard';
import "./DHeader.scss";

class DHeader extends Component{


    render(){
    return(
    <Header className="header" style={{ position: 'fixed', width: '100%' }}>
    Redirection
    </Header>
    );
    }

}

export default DHeader;
