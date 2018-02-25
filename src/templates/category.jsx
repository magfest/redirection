import React from "react";
import Helmet from "react-helmet";
import config from "../../data/SiteConfig";
import ItemListing from "../components/ItemListing/ItemListing";
import CategoryListing from "../components/CategoryListing/CategoryListing";

export default class CategoryTemplate extends React.Component {

  makeComponentListing(category){
    var approved_items = [];
    this.props.data.allAirtableItems.edges.forEach(edge => {
        approved_items.push(edge.node);
    });
    if(approved_items.length > 0){
      return <CategoryListing category={category} items={approved_items} key={category.id}/>
    }
    return <div></div>
  }


  render() {
    const category = this.props.pathContext;

    return (
      this.makeComponentListing(category)
    );
  }
}

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query CategoryPage($id: String) {
    allAirtableItems(
      sort: { fields: [Name], order: DESC }
      filter: { Category: { eq: $id } }
    ) {
      totalCount
      edges {
        node {
          id,
          Name,
          Path,
          URL,
          Public,
          Enabled
        }
      }
    }
  }
`;
