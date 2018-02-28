import React, { Component } from "react";
import Helmet from "react-helmet";
import { List } from 'antd';
import copy from 'copy-to-clipboard';
import "./DListItem.scss";

class DListItem extends Component{

    constructor(props){
    super(props);
    const new_url = window.location.origin + props.item.Path
    this.state = {
      url: new_url
    }

    }

    handleClick = (e) => {
      
      this.props.modal(this.props.item.Name, this.props.item.URL, this.state.url);
    }


    render(){
    return(

      <List.Item className="hoverable" onClick={this.handleClick}>
        { this.props.item.Name }
      </List.Item>

    );
    }

}

export default DListItem;
