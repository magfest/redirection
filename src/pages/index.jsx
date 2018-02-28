import React from "react";
import Helmet from "react-helmet";
import CategoryListing from "../components/CategoryListing/CategoryListing";
import ItemTable from "../components/ItemTable/ItemTable";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import Link from "gatsby-link";
import { Layout, Menu, Breadcrumb } from 'antd';
import { Flex, Drawer, List, NavBar, Icon } from 'antd-mobile';
const { Header, Content, Footer } = Layout;

class Index extends React.Component {

  makeAllComponents(){
    var all_components = [];
    this.props.data.allAirtableCategories.edges.forEach(edge => {
      all_components.push(this.makeComponentListing(edge.node));
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
      return <CategoryListing category={category} items={approved_items} key={category.id}/>
    }
    return <div></div>
  }

  render() {
    return (
    <Flex>
    <NavBar icon={<Icon type="ellipsis" />} >Basic</NavBar>
      <Drawer
        className="my-drawer"
        style={{ minHeight: document.documentElement.clientHeight }}
        enableDragHandle
        contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
      >
        Click upper-left corner
      </Drawer>

    </Flex>
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
