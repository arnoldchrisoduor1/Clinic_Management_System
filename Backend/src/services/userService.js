const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userQueries = require('../db/queries/users');
const { emailService } = require('../utils/mail_service');

const userService = {
  signUp: async (full_name, email, password, role) => {
    console.log('Starting signUp process', { full_name, email, role });
    try {
      const existingUser = await userQueries.findUserByEmail(email);
      if (existingUser) {
        console.log('User with this email already exists:', email);
        throw new Error('User with this email already exists');
      }

      console.log('Hashing password');
      const passwordHash = await bcrypt.hash(password, 10);
      
      console.log('Creating user');
      const user = await userQueries.createUser(full_name, email, passwordHash, role);
      console.log('User created successfully:', user);

      console.log('Generating JWT');
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      emailService(email, token)

      console.log('SignUp process completed successfully');
      return { user, token };
    } catch (error) {
      console.error('Error in signUp process:', error);
      throw error;
    }
  },

  signIn: async (email, password) => {
    const user = await userQueries.findUserByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return { user, token };
  },

  getUserById: async (userId) => {
    return await userQueries.findUserById(userId);
  }
};

module.exports = userService;