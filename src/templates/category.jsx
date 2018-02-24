import React from "react";
import Helmet from "react-helmet";
import config from "../../data/SiteConfig";
import ItemListing from "../components/ItemListing/ItemListing";

export default class CategoryTemplate extends React.Component {
  render() {
    const category = this.props.pathContext.name;
    const id = this.props.pathContext.id;
    var postEdges = [];
    if(this.props.data.allAirtableItems){
      postEdges = this.props.data.allAirtableItems.edges;
    }

    return (
      <div className="category-container">
        <Helmet
          title={`Posts in category "${category}" | ${config.siteTitle}`}
        />
        <h1>{ category } </h1>
        <ItemListing itemEdges={postEdges} />
      </div>
    );
  }
}

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query CategoryPage($id: String) {
    allAirtableItems(
      limit: 1000
      sort: { fields: [Name], order: DESC }
      filter: { Category: { eq: $id } }
    ) {
      totalCount
      edges {
        node {
          id,
          Name,
          Path
        }
      }
    }
  }
`;
