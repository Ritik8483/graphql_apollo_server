// const { gql } = require("graphql-tag");

// const typeDefs = gql`
//   type Product {
//     id: ID!
//     title: String!
//     description: String
//     price: Int
//     createdAt: String
//     updatedAt: String
//   }

//   # Queries
//   type Query {
//     getAllProducts: [Product]
//     getProductById(id: ID!): Product
//   }

//   # Mutations
//   type Mutation {
//     addProduct(title: String, description: String, price: Int): Product
//     updateProduct(id: ID!, title: String, description: String, price: Int): Product
//     deleteProduct(id: ID!): String
//   }
// `;

// module.exports = typeDefs;



// -------------------------


const { gql } = require("graphql-tag");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    token: String
  }

  type Product {
    id: ID!
    title: String!
    description: String
    price: Int
    createdAt: String
    updatedAt: String
  }

  type Query {
    getAllProducts: [Product]
    getProductById(id: ID!): Product
    me: User  # 🔒 Protected query
  }

  type Mutation {
    addProduct(title: String, description: String, price: Int): Product
    updateProduct(id: ID!, title: String, description: String, price: Int): Product
    deleteProduct(id: ID!): String

    signup(name: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
  }
`;

module.exports = typeDefs;
