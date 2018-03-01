import React, { Component } from "react";
import Helmet from "react-helmet";
import { List, Modal, notification } from 'antd';
import DListItem from "../DListItem/DListItem";
import copy from 'copy-to-clipboard';
import { DialogContainer, Button } from 'react-md';
class DList extends Component{

  constructor(props){
    super(props);
  }

    renderItem = (item) => {
      return(
      <DListItem item={item} modal={this.props.modal} />
      );
    }

    render(){
    return(
    <List
    bordered
    dataSource={this.props.items}
    renderItem={this.renderItem}
    >


    </List>
    );
    }

}

export default DList;
