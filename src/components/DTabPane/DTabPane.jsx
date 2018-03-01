import React, { Component } from "react";
import Helmet from "react-helmet";
import { Tabs} from 'antd';
const TabPane = Tabs.TabPane;
import DList from "../DList/DList";

class DTabPane extends Component{


    render(){
    return(
    <TabPane tab={this.props.category.Name} key={this.props.category.id}>
    <DList category={this.props.category} items={this.props.items} />
    </TabPane>
    );
    }

}

export default DTabPane;
