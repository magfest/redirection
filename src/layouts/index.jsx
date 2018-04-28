import React from "react";
import Helmet from "react-helmet";
import "font-awesome/scss/font-awesome.scss";
import DHeader from "../components/DHeader/DHeader";
import DSider from "../components/DSider/DSider";
import { Layout, notification } from 'antd';
const { Content } = Layout;
import config from "../../data/SiteConfig";
import FontIcon from "react-md/lib/FontIcons";
import Link from "gatsby-link";
import "./index.scss";
import "./global.scss";
import {DialogContainer, Button} from 'react-md'
import copy from 'copy-to-clipboard';
import { CSSTransition, transit } from "react-css-transition";
import PropTypes from 'prop-types';

export default class MainLayout extends React.Component {

  constructor(props){
    super(props);
    this.state ={
      showSider: false,
      modalTitle: "Test",
      modalURL: "http://daredoes.work",
      modalPath: "http://daredoes.work/test",
      modalVisible: false,
      modalDescription: "",
      closeOnClick: true,
      isCopy: true,
      categories: this.makeCategories(),
      items: this.makeItems()
    };
  }

  makeCategories = () => {
    const items = [];
    if(config.markdown){
      this.props.data.markdownCategories.edges.map(edge => {
        items.push({
          title: edge.node.frontmatter.title,
          description: "",
          id: edge.node.frontmatter.title
        });
      });
    }
    return items;
  }

  makeItems = () => {
    const items = [];
    if(config.markdown){
      this.props.data.markdownItems.edges.map(edge => {
        items.push({
          title: edge.node.frontmatter.title,
          description: "",
          path: edge.node.frontmatter.path,
          url: edge.node.frontmatter.url,
          public: edge.node.frontmatter.public,
          category: [edge.node.frontmatter.category]
        });
      });
    }
    return items;
  }

  toggleCopy = () => {
    this.setState({
      isCopy: !this.state.isCopy
    });
  }

  toggleSider = () => {
    this.setState({
      showSider: !this.state.showSider
    });
  }

  closeSider = () => {
    if(this.state.closeOnClick && this.state.showSider) this.toggleSider();
  }


    makeModal = (title, url, bookmark, description) => {
    if(this.state.isCopy){
      if(copy(bookmark))
      {
        notification.success({
        message: "URL Copied",
        description: bookmark
        });
      }
    }
    else{
      window.open(url);
    }

    /*
      this.setState({
        modalTitle: title,
        modalURL: url,
        modalPath: bookmark,
        modalVisible: true,
        modalDescription: description
      });
      */
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

  closeModal = () => {
    this.setState({
      modalVisible: false
    });
  }

  getChildContext = () => {
    return {modal: this.makeModal, items: this.state.items, categories: this.state.categories};
  }



  render() {
  const {children} = this.props;
  const actions = [];
  actions.push({ iconClassName: "fa fa-close", children: "Close", onClick: this.closeModal});
  actions.push({ iconClassName: "fa fa-clipboard", children: 'Copy', tooltipLabel: this.state.modalPath, tooltipPosition: "top", onClick: this.modalOk });
  actions.push({ iconClassName: "fa fa-link", children: 'Visit', onClick: this.modalCancel });

    return (
      <Layout>
      <Helmet>
        <meta name="description" content={config.siteDescription} />
      </Helmet>
      { this.state.showSider ? <DSider modal={this.makeModal} categories={this.state.categories} items={this.state.items} /> : null}
      <CSSTransition
        defaultStyle={{ "margin-left": 0 }}
        enterStyle={{ "margin-left": transit(200, 250, "linear")}}
        leaveStyle={{ "margin-left": transit(0, 250, "linear")}}
        activeStyle={{ "margin-left": 200 }}
        active={this.state.showSider}

      >
      <Layout className={'page ' + (this.state.closeOnClick && this.state.showSider ? " click " : "")} onClick={this.closeSider} style={{ height: '100vh'}}>
      <Content className={this.state.showSider ? "showCover" : "hideCover"}>
      </Content>

      <DHeader modal={this.makeModal} popSider={this.toggleSider} copy={this.state.isCopy} toggleCopy={this.toggleCopy}>
      </DHeader>
        <Content style={{ marginTop: 64 }}>
        <DialogContainer
        id='copy-dialog'
        visible={this.state.modalVisible}
        onHide={this.hide}
        actions={actions}
        title={this.state.modalTitle}
        height={'100vh'}
        width={'100vw'}
        >
        { this.state.modalDescription}

        </DialogContainer>
          {children()}
        </Content>
        </Layout>
        </CSSTransition>
      </Layout>
    );
  }
};

MainLayout.childContextTypes = {
  modal: PropTypes.func,
  items: PropTypes.array,
  categories: PropTypes.array
}
/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query IndexLayoutQuery {
    markdownCategories: allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "/content/categories/"}},
    sort: { fields: [frontmatter___title], order: ASC }) {
      edges {
        node {
          frontmatter {
            title
          }
        }
      }
      totalCount
    }
    markdownItems: allMarkdownRemark(
    filter: {
    fileAbsolutePath: {regex: "/content/items/"},
    frontmatter: {public: {eq: true}}
    },
    sort: { fields: [frontmatter___title], order: ASC }) {
      edges {
        node {
          frontmatter {
            title
            path
            url
            public
            enabled
            status
            category
          }
        }
      }
      totalCount
    }
  }
`;
