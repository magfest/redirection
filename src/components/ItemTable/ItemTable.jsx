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
  onRowClick(e, record){
    console.log(e.target);
  }

  expandedRowRender(record){
      const data = [{
      ...record,
      key: 1
      }];
      const columns = [
      {title: 'URL', dataIndex: 'URL', key: 'URL', render: (text, record) => <a href={record.URL} >{record.URL}</a>, width: 500},
      {title: "Description", dataIndex: "description", key: "description"}

      ]
      const showHeader = false;
      return <Table columns={columns} dataSource={data} showHeader={showHeader}  pagination={false} scroll={{x: 1000 }} size='small'/>
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
    {title: 'Name', dataIndex: 'name', key: 'name', width: 300,
    filters: this.formatFilters(), filteredValue: filteredInfo.name || null,
    defaultSortOrder: 'descend',
    onFilter: (value, record) => record.category_id.indexOf(value) >= 0, sorter: (a, b) => this.compareByAlph(a.name, b.name)},
    {title: '', dataIndex: 'id', key: 'id', render: (text, record) => <div><Button size='large' href={record.URL} icon='link'></Button><Button href={record.copy} size='large' onClick={this.copyToClipboard} icon='book'></Button></div>, width: 1}


    ];
    return (
    <Table
      rowKey={record => record.id}
      columns={columns}
      dataSource={this.formatData()} onChange={this.handleChange} pagination={false}
      onRow={(record) => {
      return {
        onClick: this.onRowClick
      }
      }} expandedRowRender={this.expandedRowRender}
    />


    );
  }
}

export default ItemTable;
