import React from "react";
import Link from "gatsby-link";
import ItemListing from "../ItemListing/ItemListing";
import { List, Card, Icon, Button } from "antd";
const { Meta } = Card;

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
    <List
      header={<Link to={this.props.category.Name} key={this.props.category.id}><h2>{this.props.category.Name}</h2></Link>}
      bordered
      dataSource={this.props.items}
      renderItem={item => (
        <Card actions={[<Button href={item.URL} icon="link">Direct Link</Button>, <Button href={item.Path} icon="book">ShortLink</Button>]}>
          <Meta title={item.Name} description={item.Description} />
        </Card>

      )}
    />


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
