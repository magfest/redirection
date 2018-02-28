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
import copy from 'copy-to-clipboard';

export default class MainLayout extends React.Component {


  render() {
    const { children } = this.props;
    return (
      <Layout>
      <Helmet>
        <meta name="description" content={config.siteDescription} />
      </Helmet>
      <DHeader>
      </DHeader>
        <Content>
          {children()}
        </Content>
      </Layout>
    );
  }
}
/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query IndexLayoutQuery {
  allAirtableCategories(
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
  allAirtableItems(
  sort: { fields: [Name], order: ASC }
  ){
    edges{
      node{
        id,
        Name,
        Public,
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
