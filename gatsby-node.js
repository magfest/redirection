const path = require("path");
const _ = require("lodash");
const webpackLodashPlugin = require("lodash-webpack-plugin");
var webpack = require("webpack");
const path = require('path');

exports.modifyWebpackConfig = ({ config, stage }) => {

  switch (stage) {
    case "develop":

      break;

    case "build-css":
      break;

    case "build-html":
    config.loader("null", {
      test: path.resolve(__dirname, 'node_modules/react-onsenui/react-onsenui.js'),
      loader: "null-loader",
    });

      break;

    case "build-javascript":

      break;
  }

  return config;
};


exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;
};

exports.setFieldsOnGraphQLNodeType = ({ type, boundActionCreators }) => {
  const { name } = type;
  const { createNodeField } = boundActionCreators;
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage, createRedirect } = boundActionCreators;

  return new Promise((resolve, reject) => {
    //const postPage = path.resolve("src/templates/post.jsx");
    //const tagPage = path.resolve("src/templates/tag.jsx");
    const categoryPage = path.resolve("src/templates/category.jsx");
    resolve(
      graphql(
      `
        {
          allAirtableCategories{
            edges{
              node {
                id,
                Name,
                Description

              }
            }
          },
          allAirtableItems{
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
          result.data.allAirtableCategories.edges.map(edge => {
            createPage({
              path: `/${_.kebabCase(edge.node.Name)}`,
              component: categoryPage,
              context: {
                Name: edge.node.Name,
                id: edge.node.id,
                Description: edge.node.Description
              }
            });
          });
          result.data.allAirtableItems.edges.map(edge => {
            if(edge.node.Enabled){
              createRedirect({
                fromPath: edge.node.Path,
                toPath: edge.node.URL
              });
            }
          });
        })
    )
  });
};

exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === "build-javascript") {
    config.plugin("Lodash", webpackLodashPlugin, null);
  }
};
