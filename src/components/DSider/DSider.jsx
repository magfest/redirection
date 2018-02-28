import React, { Component } from "react";
import Helmet from "react-helmet";
import "font-awesome/scss/font-awesome.scss";
import { Layout } from 'antd';
const { Sider } = Layout;
import config from "../../../data/SiteConfig";
import copy from 'copy-to-clipboard';

class DSider extends Component{


    render(){
    return(
    <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>

    </Sider>
    );
    }

}

export default DSider;
