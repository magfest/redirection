import React, { Component } from "react";
import Helmet from "react-helmet";
import { List } from 'antd';
import copy from 'copy-to-clipboard';
import "./DListItem.scss";

class DListItem extends Component{

    constructor(props){
    super(props);

    }

    makeDescription = () => {
      return (<div>{this.props.item.url}<br />{this.props.item.description}</div>);
    }

    handleClick = (e) => {
      const new_url = window.location.origin + this.props.item.path;
      this.props.modal(this.props.item.title, this.props.item.url, new_url, this.makeDescription());
    }


    render(){
    return(

      <List.Item className="hoverable" onClick={this.handleClick}>
        { this.props.item.title }
      </List.Item>

    );
    }

}

export default DListItem;
