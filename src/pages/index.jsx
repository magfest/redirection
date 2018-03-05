import React from "react";
import Helmet from "react-helmet";
import CategoryListing from "../components/CategoryListing/CategoryListing";
import DList from "../components/DList/DList";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import Link from "gatsby-link";
import { Layout, Menu, Breadcrumb, Tabs } from 'antd';
const { Header, Content, Footer } = Layout;
const TabPane = Tabs.TabPane;
import "./index.scss";

class Index extends React.Component {

  makeAllComponents(){
    var all_components = [];
    this.context.categories.map(edge => {
    const node = this.makeComponentListing(edge);
    if(node != null){
      all_components.push(node);
      }
    });
    return all_components;
  }

  makeComponentListing = (category) => {
    var approved_items = [];
    this.context.items.map(edge => {
      if(edge.category){
        if(edge.category.indexOf(category.id) >= 0){
          approved_items.push(edge);
        }
      }
    });
    if(approved_items.length > 0){
      return (<TabPane tab={category.title} key={category.id}>
            <DList category={category} items={approved_items} modal={this.context.modal} />
            </TabPane>)
    }
    return null;
  }

  render() {
    const panes = this.makeAllComponents().map(item => {
    return item;
    });
    return (
    <Tabs className="tabBar">
      { panes }

    </Tabs>
    );
  }
}

Index.contextTypes = {
  modal: React.PropTypes.func,
  items: React.PropTypes.object,
  categories: React.PropTypes.object
}

export default Index;
