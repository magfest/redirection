import React from "react";
import Link from "gatsby-link";
import PropTypes from 'prop-types';
import copy from 'copy-to-clipboard';
import {notification} from 'antd';


import { List, ListItem, ListHeader, Button, ActionSheet, ActionSheetButton } from 'react-onsenui';

class ItemListItem extends React.Component {

  constructor(props){
    super(props);
    this.state = {
    isOpen: false
    }
  }

  handleCancel = () => {
    this.setState({isOpen: false});
  }

  handleCopy = () => {
    const elem = <a href={this.props.item.node.Path}></a>;
    console.log(elem.href);
    if(copy(this.props.item.node.Path)){
      notification.success({
        message: "Copied To Clipboard",
        description: this.props.item.node.Path
      });
    }
  }

  handleVisit = () => {
    window.open(this.props.item.node.URL);
  }

  clicked = (e) => {
  this.setState({isOpen: true});

  }
  render() {
    return (
    <ListItem key={this.props.item.node.id} tappable={true} onClick={this.clicked}>
    { this.props.item.node.Name}
    <ActionSheet isOpen={this.state.isOpen} animation='default' onCancel={this.handleCancel} isCancelable={true} title={'Options'} >
    <ActionSheetButton onClick={this.handleCopy}>Copy URL</ActionSheetButton>
    <ActionSheetButton onClick={this.handleVisit}>Visit URL</ActionSheetButton>
    <ActionSheetButton onClick={this.handleCancel} icon={'md-close'}>Cancel</ActionSheetButton>
    </ActionSheet>
    </ListItem>
        );
  }
}

ItemListItem.propTypes = {
  item: PropTypes.object
}

export default ItemListItem;
