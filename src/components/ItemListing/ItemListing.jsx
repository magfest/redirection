import React from "react";
import Link from "gatsby-link";

class ItemListing extends React.Component {
  getPostList() {
    const postList = [];
    this.props.itemEdges.forEach(itemEdge => {
      postList.push({
        path: itemEdge.node.Path,
        id: itemEdge.node.id,
        name: itemEdge.node.Name

      });
    });
    return postList;
  }
  render() {
    const postList = this.getPostList();
    return (
      <div>
        {/* Your post list here. */
        postList.map(post => (
          <Link to={post.path} key={post.id}>
            <h1>{post.name}</h1>
          </Link>
        ))}
      </div>
    );
  }
}

export default ItemListing;
