import React from "react";
import Helmet from "react-helmet";
import CategoryListing from "../components/CategoryListing/CategoryListing";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import Link from "gatsby-link";

class Index extends React.Component {
  render() {
  console.log(this.props);
    const postEdges = this.props.data.allAirtableCategories.edges;
    return (
      <div className="index-container">
        <Helmet title={config.siteTitle} />
        {/* Your post list here. */
        postEdges.map(post => (
          <CategoryListing category={post} id={post.node.id} />
        ))}
      </div>
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
  }
}
`;
