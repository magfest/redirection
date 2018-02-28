import React, { Component } from "react";
import Helmet from "react-helmet";
import "font-awesome/scss/font-awesome.scss";
import { Menu, Icon } from 'antd';
import config from "../../../data/SiteConfig";
import copy from 'copy-to-clipboard';

class DSubMenuItem extends Component{

    render(){
    return(
    <Menu.Item key={this.props.item.id}>
      { this.props.item.Name}
    </Menu.Item>
    );
    }

}

export default DSubMenuItem;
