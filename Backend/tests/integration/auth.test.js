const request = require('supertest');
const { createTestClient } = require('apollo-server-testing');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('../../src/graphql/schema');
const resolvers = require('../../src/graphql/resolvers');

const server = new ApolloServer({ typeDefs, resolvers });
const { query, mutate } = createTestClient(server);

describe('Authentication', () => {
  it('should sign up a new user', async () => {
    const signUpMutation = `
      mutation SignUp($input: SignUpInput!) {
        signUp(input: $input) {
          token
          user {
            id
            email
            role
          }
        }
      }
    `;

    const variables = {
      input: {
        email: 'test@example.com',
        password: 'password123',
        role: 'PATIENT'
      }
    };

    const res = await mutate({ mutation: signUpMutation, variables });
    expect(res.data.signUp.token).toBeDefined();
    expect(res.data.signUp.user.email).toBe('test@example.com');
    expect(res.data.signUp.user.role).toBe('PATIENT');
  });

  it('should sign in an existing user', async () => {
    const signInMutation = `
      mutation SignIn($input: SignInInput!) {
        signIn(input: $input) {
          token
          user {
            id
            email
            role
          }
        }
      }
    `;

    const variables = {
      input: {
        email: 'test@example.com',
        password: 'password123'
      }
    };

    const res = await mutate({ mutation: signInMutation, variables });
    expect(res.data.signIn.token).toBeDefined();
    expect(res.data.signIn.user.email).toBe('test@example.com');
  });
});