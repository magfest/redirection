import React from "react";
import Helmet from "react-helmet";
import CategoryListing from "../components/CategoryListing/CategoryListing";
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

  render() {
    const postEdges = this.makeAllComponents();
    return (
    <Layout>
      <Content>
      <div className="index-container">
        <Helmet title={config.siteTitle} />
        {/* Your post list here. */
        postEdges.map(post => (
        <div>
          {post}
          </div>
        ))}
      </div>
      </Content>
      </Layout>
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
