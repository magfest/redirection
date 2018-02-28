import React from "react";
import ReactDOM from "react-dom";
import Link from "gatsby-link";
import PropTypes from 'prop-types';

import ItemListItem from "../ItemListItem/ItemListItem";
if (typeof window !== `undefined`) {
  import { List, ListItem, ListHeader } from 'react-onsenui';
}


class CategoryList extends React.Component {

  test(e){
    console.log(e.target);
  }

  renderRow = (row, index) => {
    return (<ItemListItem item={row} key={index} />);
  }

  renderHeader = () => {
    return (<ListHeader key={this.props.category.node.id}>{this.props.category.node.Name}</ListHeader>);
  }





  render() {
    return (
    <List
      dataSource={this.props.items}
      renderRow={this.renderRow}
      renderHeader={this.renderHeader}
    />
        );
  }
}

CategoryList.propTypes = {
  category: PropTypes.object,
  items: PropTypes.object
}

export default CategoryList;
