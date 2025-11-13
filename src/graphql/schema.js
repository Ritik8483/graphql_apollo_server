// const { gql } = require("apollo-server-express");
// const {gql} = require("@apollo/server")
const { gql } = require("graphql-tag");

const typeDefs = gql`
  type Product {
    id: ID!
    title: String!
    description: String
    price: Int
    createdAt: String
    updatedAt: String
  }

  # Queries
  type Query {
    getAllProducts: [Product]
    getProductById(id: ID!): Product
  }

  # Mutations
  type Mutation {
    addProduct(title: String!, description: String, price: Int): Product
    updateProduct(id: ID!, title: String, description: String, price: Int): Product
    deleteProduct(id: ID!): String
  }
`;

module.exports = typeDefs;
