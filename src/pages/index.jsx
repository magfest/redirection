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
    this.props.data.allAirtableCategories.edges.forEach(edge => {
    const node = this.makeComponentListing(edge.node);
    if(node != null){
      all_components.push(node);
      }
    });
    return all_components;
  }

  makeComponentListing(category){
    var approved_items = [];
    this.props.data.allAirtableItems.edges.forEach(edge => {
      if(edge.node.Category.indexOf(category.id) >= 0){
        approved_items.push(edge.node);
      }
    });
    if(approved_items.length > 0){
      return (<TabPane tab={category.Name} key={category.id}>
            <DList category={category} items={approved_items} />
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

export default Index;

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query IndexQuery {
  allAirtableCategories(
    sort: { fields: [Name], order: DESC }
  ) {
    edges {
      node {
        id,
        Name,
        Description
      }
    }
  },
  allAirtableItems{
    edges{
      node{
        id,
        Name,
        Public,
        Enabled,
        URL,
        Path,
        Description,
        Category
      }
    }
  }
}
`;
