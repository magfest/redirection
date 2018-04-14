const path = require("path");
const _ = require("lodash");
const webpackLodashPlugin = require("lodash-webpack-plugin");
const fs = require('fs');
const { writeJsonSync } = require('fs-extra');

const config = require("./data/SiteConfig");

let data_json = {
  "categories": [],
  "items": []
}


exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;
};

exports.setFieldsOnGraphQLNodeType = ({ type, boundActionCreators }) => {
  const { name } = type;
  const { createNodeField } = boundActionCreators;
};

outputJSON = (publicFolder) => {
  writeJsonSync(publicFolder, data_json, {spaces: '\t'});
};

formatMarkdownCategories = (items) => {
  const newItems = [];
  items.edges.map(edge => {
      newItems.push({
        title: edge.node.frontmatter.title,
        description: "",
        id: edge.node.frontmatter.title,
      });
  });
  return newItems;
};

formatMarkdownItems = (items) => {
  const newItems = [];
  items.edges.map(edge => {
      newItems.push({
        title: edge.node.frontmatter.title,
        path: edge.node.frontmatter.path,
        url: edge.node.frontmatter.url,
        public: edge.node.frontmatter.public,
        enabled: edge.node.frontmatter.enabled,
        status: edge.node.frontmatter.status,
        category: edge.node.frontmatter.category
      });
  });
  return newItems;
};

formatAirtableCategories = (items) => {
  const newItems = [];
  items.edges.map(edge => {
    newItems.push({
      title: edge.node.Name,
      description: edge.node.Description,
      id: edge.node.id
    });
  });
  return newItems;
};

formatAirtableItems = (items) => {
  const newItems = [];
  items.edges.map(edge => {
    newItems.push({
      path: edge.node.Path,
      url: edge.node.URL
    });
  });
  return newItems;
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage, createRedirect } = boundActionCreators;
  const createRedirectItem = (item) => {
      createRedirect({
        fromPath: item.path,
        toPath: item.url
      });
  };

  return new Promise((resolve, reject) => {
    if(config.markdown){
      resolve(
        graphql(
          `
            {
              items: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/content/items/"}, frontmatter: {enabled: {eq: true}}}) {
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
              },
              categories: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/content/categories/"}}) {
                edges {
                  node {
                    frontmatter {
                      title
                    }
                  }
                }
                totalCount
              }
            }
          `
        ).then(result => {
          if (result.errors) {
            reject(result.errors)
          }
          formatMarkdownItems(result.data.items).map(item => {
            data_json['items'].push(item);
            createRedirectItem(item);
          });
          formatMarkdownCategories(result.data.categories).map(item => {
            data_json['categories'].push(item);
          });

        }));
    }
    if(config.airtable){
      resolve(
        graphql(
        `
          {
            items: allAirtableItems(
              filter: { Path: {ne: null}, Enabled: {eq: true}}
            ){
              edges{
                node{
                  Path,
                  URL,
                  Status,
                  Enabled
                }
              }
            }
          }
        `
      ).then(result => {
            if (result.errors) {
              reject(result.errors)
            }
            formatAirtableItems(result.data.items).map(item => {
              createRedirectItem(item);
            });
          })
      );
    }
  });
};

exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === "build-javascript") {
    config.plugin("Lodash", webpackLodashPlugin, null);
  }
};

function buildPrefixer(prefix, ...paths) {
  return (...subpaths) => path.join(prefix, ...paths, ...subpaths)
}

exports.onPostBuild = async ({ store, pathPrefix }, userPluginOptions) => {
  const { program } = store.getState();
  const publicFolder = buildPrefixer(program.directory, `public`);
  outputJSON(publicFolder(`data.json`));
}
