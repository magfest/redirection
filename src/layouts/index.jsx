import React from "react";
import Helmet from "react-helmet";
import "font-awesome/scss/font-awesome.scss";
import DHeader from "../components/DHeader/DHeader";
import DSider from "../components/DSider/DSider";
import { Layout } from 'antd';
const { Content } = Layout;
import config from "../../data/SiteConfig";
import FontIcon from "react-md/lib/FontIcons";
import Link from "gatsby-link";
import "./index.scss";
import "./global.scss";
import {DialogContainer, Button} from 'react-md'
import copy from 'copy-to-clipboard';

export default class MainLayout extends React.Component {

  constructor(props){
    super(props);
    this.state ={
      showSider: false,
      modalTitle: "Test",
      modalURL: "http://daredoes.work",
      modalPath: "http://daredoes.work/test",
      modalVisible: false
    };
  }

  toggleSider = () => {
  console.log('toggle');
    this.setState({
      showSider: !this.state.showSider
    });
  }


    makeModal = (title, url, bookmark) => {
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

  getChildContext = () => {
    return {modal: this.makeModal, items: this.props.data.items, categories: this.props.data.categories};
  }


  render() {
  const {children} = this.props;
  const actions = [];
  actions.push({ iconClassName: "fa fa-link", children: 'Visit', onClick: this.modalCancel });
  actions.push({ iconClassName: "fa fa-clipboard", children: 'Copy', onClick: this.modalOk });
    return (
      <Layout>
      <Helmet>
        <meta name="description" content={config.siteDescription} />
      </Helmet>
      { this.state.showSider ? <DSider modal={this.makeModal} categories={this.props.data.categories} items={this.props.data.items} /> : null}
      <Layout style={{ marginLeft: this.state.showSider ? 200 : 0}}>
      <DHeader modal={this.makeModal} popSider={this.toggleSider}>
      </DHeader>
        <Content style={{ marginTop: 64 }}>
        <DialogContainer
        id='copy-dialog'
        visible={this.state.modalVisible}
        onHide={this.hide}
        actions={actions}
        title={this.state.modalTitle}
        >
        { this.state.modalURL}

        </DialogContainer>
          {children()}
        </Content>
        </Layout>
      </Layout>
    );
  }
};

MainLayout.childContextTypes = {
  modal: React.PropTypes.func,
  items: React.PropTypes.object,
  categories: React.PropTypes.object
}
/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query IndexLayoutQuery {
  categories: allAirtableCategories(
    sort: { fields: [Name], order: ASC }
  ) {
    edges {
      node {
        id,
        Name,
        Description
      }
    }
  },
  items: allAirtableItems(
  sort: { fields: [Name], order: ASC },
  filter: { Public: {eq: true}}
  ){
    edges{
      node{
        id,
        Name,
        Enabled,
        URL,
        Path,
        Description,
        Category
      }
    }
  }
}
`;
