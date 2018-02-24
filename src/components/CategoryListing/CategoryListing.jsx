import React from "react";
import Link from "gatsby-link";

class CategoryListing extends React.Component {
  getPostList() {
    const postList = [];
    this.props.itemEdges.forEach(itemEdge => {
      postList.push({
        id: itemEdge.node.id,
        name: itemEdge.node.Name

      });
    });
    return postList;
  }
  render() {
    //const postList = this.props.data.allAirtableItems.edges;
    return (
    <div>
      <Link to={this.props.category.node.Name} key={this.props.category.node.id}>
        <h1>{this.props.category.node.Name}</h1>
      </Link>

      </div>
    );
  }
}

export default CategoryListing;

export const pageQuery = graphql`
  query CategoryListingPage($id: String) {
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
