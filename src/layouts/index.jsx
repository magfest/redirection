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
      isCopy: true
    };
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
    return {modal: this.makeModal, items: this.props.data.items, categories: this.props.data.categories};
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
      { this.state.showSider ? <DSider modal={this.makeModal} categories={this.props.data.categories} items={this.props.data.items} /> : null}
      <Layout className={'page ' + (this.state.closeOnClick && this.state.showSider ? " click" : "")} onClick={this.closeSider} style={{ marginLeft: this.state.showSider ? 200 : 0, height: '100vh'}}>

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
