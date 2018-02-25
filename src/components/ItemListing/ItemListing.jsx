import React from "react";
import Link from "gatsby-link";

class ItemListing extends React.Component {
  getPostList() {
    const postList = [];
    this.props.itemEdges.forEach(itemEdge => {
    if(itemEdge.Public && itemEdge.Enabled){
        postList.push(itemEdge);
      }
    });
    return postList;
  }
  render() {
    const postList = this.getPostList();
    return (
      <div>
        {/* Your post list here. */
        postList.map(post => (

          <a href={post.URL} key={post.id}>
            <h1>{post.Name}</h1>
          </a>
        ))}
      </div>
    );
  }
}

export default ItemListing;
