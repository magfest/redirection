import React from "react";
import Link from "gatsby-link";
import PropTypes from 'prop-types';
import copy from 'copy-to-clipboard';
import {notification} from 'antd';



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
    <Ons.ListItem key={this.props.item.node.id} tappable={true} onClick={this.clicked}>
    { this.props.item.node.Name}
    <Ons.ActionSheet isOpen={this.state.isOpen} animation='default' onCancel={this.handleCancel} isCancelable={true} title={'Options'} >
    <Ons.ActionSheetButton onClick={this.handleCopy}>Copy URL</Ons.ActionSheetButton>
    <Ons.ActionSheetButton onClick={this.handleVisit}>Visit URL</Ons.ActionSheetButton>
    <Ons.ActionSheetButton onClick={this.handleCancel} icon={'md-close'}>Cancel</Ons.ActionSheetButton>
    </Ons.ActionSheet>
    </Ons.ListItem>
        );
  }
}

ItemListItem.propTypes = {
  item: PropTypes.object
}

export default ItemListItem;
