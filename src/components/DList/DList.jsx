import React, { Component } from "react";
import Helmet from "react-helmet";
import { List, Modal, notification } from 'antd';
import DListItem from "../DListItem/DListItem";
import copy from 'copy-to-clipboard';
import { DialogContainer, Button } from 'react-md';
class DList extends Component{

  constructor(props){
    super(props);
    this.state ={
    modalTitle: "Test",
    modalURL: "http://daredoes.work",
    modalPath: "http://daredoes.work/test",
    modalVisible: false

    }
  }



    renderItem = (item) => {
      return(
      <DListItem item={item} modal={this.makeModal} />
      );
    }

    makeModal = (title, url, bookmark) => {
    console.log(url);
      this.setState({
        modalTitle: title,
        modalURL: url,
        modalPath: bookmark,
        modalVisible: true,
      });


    }

    hide = () => {
    this.setState({ modalVisible: false });
  };

    modalOk = () => {
    console.log(this.state);
      if(copy(this.state.modalPath))
      {
        notification.success({
        message: "URL Copied",
        description: this.state.modalPath
        });
      }
    }

    modalCancel = () => {
      window.open(this.state.modalURL);
    }


    render(){
    const actions = [];
    actions.push({ secondary: true, children: 'Visit', onClick: this.modalCancel });
    actions.push({ secondary: true, children: 'Copy', onClick: this.modalOk });
    return(
    <div>
    <List
    bordered
    dataSource={this.props.items}
    renderItem={this.renderItem}
    >


    </List>
    <DialogContainer
    id='copy-dialog'
    visible={this.state.modalVisible}
    onHide={this.hide}
    actions={actions}
    title={this.state.modalTitle}
    >

    </DialogContainer>
    </div>
    );
    }

}

export default DList;
