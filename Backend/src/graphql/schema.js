const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    role: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input SignUpInput {
    email: String!
    password: String!
    role: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }

  type Mutation {
    signUp(input: SignUpInput!): AuthPayload!
    signIn(input: SignInInput!): AuthPayload!
  }

  type Query {
    me: User
  }
`;

module.exports = typeDefs;