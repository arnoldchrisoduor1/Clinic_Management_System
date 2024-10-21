const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    full_name: String!
    email: String!
    role: String!
    isverified: Boolean!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type VeryfyPayLoad {
    user: User!
  }

  input SignUpInput {
    full_name: String!
    email: String!
    password: String!
    role: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }

  input verifyEmailInput {
    code: Int!
  }

  input forgotPasswordInput {
    email: String!
  }

  input resetPasswordInput {
    token: String!
    password: String!
  }

  type Mutation {
    signUp(input: SignUpInput!): AuthPayload!
    signIn(input: SignInInput!): AuthPayload!
    verifyEmail(input: verifyEmailInput!): VeryfyPayLoad!
    forgotPassword(input: forgotPasswordInput!): String!
    resetPassword(input: resetPasswordInput!): String!
  }

  type Query {
    me: User
  }
`;

module.exports = typeDefs;