import React from "react";
import Helmet from "react-helmet";
import CategoryList from "../components/CategoryList/CategoryList";
import ItemTable from "../components/ItemTable/ItemTable";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import Link from "gatsby-link";
import { Layout, Menu, Breadcrumb } from 'antd';
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

  makeLists(){
    const dataSources = {};
    this.props.data.allAirtableCategories.edges.forEach(edge => {
      dataSources[edge.node.id] = {
      category: edge,
      items: []
      }
    });

    this.props.data.allAirtableItems.edges.forEach(edge => {
      if(edge.node.Category){
        edge.node.Category.map(id => {
          dataSources[id].items.push(edge);
        });
      }
    });
    const itemsToReturn = [];
    for(var key in dataSources){
      if(dataSources[key].items.length > 0){
        itemsToReturn.push(<CategoryList category={dataSources[key].category} items={dataSources[key].items} />);
        }
    }
    return itemsToReturn;
  }

  render() {
  const components = this.makeLists().map(item => {
  return item;
  });
    return (
    <div>{components}
    </div>
    );
  }
}

export default Index;

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query IndexQuery {
  allAirtableCategories(
    sort: { fields: [Name], order: ASC }
  ) {
    edges {
      node {
        id,
        Name,
        Description
      }
    }
  },
  allAirtableItems(
  sort: { fields: [Name], order: ASC }
  ){
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
