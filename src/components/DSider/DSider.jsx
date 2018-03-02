import React, { Component } from "react";
import Helmet from "react-helmet";
import "font-awesome/scss/font-awesome.scss";
import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;
import config from "../../../data/SiteConfig";
import copy from 'copy-to-clipboard';
import DSubMenuItem from "../DSubMenuItem/DSubMenuItem";
const SubMenu = Menu.SubMenu;

class DSider extends Component{

    makeAllComponents = () => {
      var all_components = [];
      var approved_homeless_items = [];
      this.props.categories.edges.forEach(edge => {
      const node = this.makeComponentListing(edge.node);
      if(node != null){
        all_components.push(node);
        }
      });
      this.props.items.edges.forEach(edge => {
        if(edge.node.Category == null){
          approved_homeless_items.push(edge.node);
        }
      })
      {approved_homeless_items.map(item => {
      all_components.push(this.makeListing(item));
      })}
      return all_components;
    }

    makeComponentListing = (category) => {
      var approved_items = [];
      this.props.items.edges.forEach(edge => {
      if(edge.node.Category){
        if(edge.node.Category.indexOf(category.id) >= 0){
          approved_items.push(edge.node);
        }
      }
      });
      if(approved_items.length > 0){
        return (
        <SubMenu title={category.Name} key={category.id}>
          {approved_items.map(item => {
          return this.makeListing(item);
          })}
        </SubMenu>)
      }
      return null;
    }

    makeListing(item){
      return <Menu.Item item={item} key={item.id}>{item.Name}</Menu.Item>;
    }

    makeDescription = (item) => {
    console.log(item);
      return (<div>{item.URL}<br />{item.Description}</div>);
    }

    menuSelect = (item, key, selectedKeys) => {
      const newItem = item.item.props.item;
      this.props.modal(newItem.Name, newItem.URL, window.location.origin + newItem.Path, this.makeDescription(newItem));
    }

    render(){
    const items = this.makeAllComponents().map(item => {
      return item;
    });
    return(
    <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[]} defaultOpenKeys={this.props.categories.edges.forEach(edge => { return edge.node.id })}
      onSelect={this.menuSelect}
      >
        {items}
      </Menu>
    </Sider>
    );
    }

}

export default DSider;
