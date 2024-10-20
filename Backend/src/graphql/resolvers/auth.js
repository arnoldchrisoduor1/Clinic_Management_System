const userService = require('../../services/userService');

const authResolvers = {
  Mutation: {
    signUp: async (_, { input }) => {
      const { full_name, email, password, role } = input;
      return await userService.signUp(full_name, email, password, role);
    },
    signIn: async (_, { input }) => {
      const { email, password } = input;
      return await userService.signIn(email, password);
    },
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