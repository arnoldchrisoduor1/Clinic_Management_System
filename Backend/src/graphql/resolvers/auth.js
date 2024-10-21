const userService = require('../../services/userService');

const authResolvers = {
  Mutation: {
    signUp: async (_, { input }) => {
      const { full_name, email, password, role } = input;
      console.log("Mutation:", role);
      return await userService.signUp(full_name, email, password, role);
    },
    signIn: async (_, { input }) => {
      const { email, password } = input;
      return await userService.signIn(email, password);
    },
    verifyEmail: async (_, { input }) => {
      const { code } = input;
      return await userService.verifyEmail(code);
    },
    forgotPassword: async(_, { input }) => {
      const { email } = input;
      return await userService.forgotPassword(email);
    },
    resetPassword: async(_, { input }) => {
      const { token, password } = input;
      return await userService.resetPassword(token, password);
    }
  },
  Query: {
    me: async (_, __, { userId }) => {
      if (!userId) {
        return null;
      }
      return await userService.findUserById(userId);
    },
  },
};

module.exports = authResolvers;