import React from "react";
import Link from "gatsby-link";
import ItemListing from "../ItemListing/ItemListing";
import { List, Card, Icon, Button, Table, notification, Layout } from "antd";
import config from "../../../data/SiteConfig";
const { Meta } = Card;
import copy from 'copy-to-clipboard';

class ItemTable extends React.Component {

  state = {
      filteredInfo: null,
      sortedInfo: null,
    };
    handleChange = (pagination, filters, sorter) => {
      console.log('Various parameters', pagination, filters, sorter);
      this.setState({
        filteredInfo: filters,
        sortedInfo: sorter,
      });
    }
    clearFilters = () => {
      this.setState({ filteredInfo: null });
    }
    clearAll = () => {
      this.setState({
        filteredInfo: null,
        sortedInfo: null,
      });
    }

  copyToClipboard(e){
  if(copy(e.target.href)){
    notification.success({
      message: "Copied To Clipboard",
      description: e.target.href
    });
  }
  e.preventDefault();
  return false;
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }

  formatData(){
    const data = [];
    this.props.items.map((item, index) => {
      data.push({
        key: index,
        name: item.node.Name,
        URL: item.node.URL,
        description: item.node.Description,
        copy: item.node.Path,
        category_id: item.node.Category,
        id: item.node.id
      });
    });
    return data;
  }

  formatFilters(){
    const filters = [];
    this.props.categories.map((item, index) => {
      filters.push({
        text: item.node.Name, value: item.node.id
      });
    });
    return filters;
  }

  compareByAlph (a, b) {
   if (a > b) { return -1; }
    if (a < b) { return 1; }
     return 0;
     }

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
    {title: 'Copy', dataIndex: 'copy', key: 'copy', render: (text, record) => <Button href={record.copy} onClick={this.copyToClipboard} icon='book'></Button>, width: 75, fixed: 'left'},
    {title: 'Visit', dataIndex: 'id', key: 'id', render: (text, record) => <Button href={record.URL} icon='link'></Button>, width: 75, fixed: 'left'},
    {title: 'Name', dataIndex: 'name', key: 'name', width: 150,
    filters: this.formatFilters(), filteredValue: filteredInfo.name || null,
    defaultSortOrder: 'descend',
    onFilter: (value, record) => record.category_id.indexOf(value) >= 0, sorter: (a, b) => this.compareByAlph(a.name, b.name)},
    {title: 'URL', dataIndex: 'URL', key: 'URL', render: (text, record) => <a href={record.URL} >{record.URL}</a>, width: 150},
    {title: "Description", dataIndex: "description", key: "description"}


    ];
    return (
    <Table
      columns={columns}
      dataSource={this.formatData()} onChange={this.handleChange} pagination={false} scroll={{x: 1500 }}
    />


    );
  }
}

export default ItemTable;
