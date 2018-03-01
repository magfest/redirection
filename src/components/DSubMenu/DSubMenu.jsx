import React, { Component } from "react";
import Helmet from "react-helmet";
import "font-awesome/scss/font-awesome.scss";
import { Menu, Icon } from 'antd';
import config from "../../../data/SiteConfig";
import copy from 'copy-to-clipboard';
import DSubMenuItem from "../DSubMenuItem/DSubMenuItem";
const SubMenu = Menu.SubMenu;

class DSubMenu extends Component{

    makeSubMenuTitle = () => {
      return this.props.category.Name;
    }




    render(){
    const items = this.props.items.map(item => {
      return <DSubMenuItem item={item} key={item.id} />
    });
    return(
    <SubMenu title={this.makeSubMenuTitle()}>
      {items}
    </SubMenu>
    );
    }

}

export default DSubMenu;
