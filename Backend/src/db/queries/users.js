const db = require('../../config/database');

const userQueries = {
    createUser: async (full_name, email, passwordHash, role, verificationToken, verificationTokenExpiresAt) => {
        console.log("Function: createUser", {full_name, email, role,  verificationTokenExpiresAt});
        const query = `
        INSERT INTO users (full_name, email, password_hash, user_role, verificationToken, verificationTokenExpiresAt)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, full_name, email, user_role AS role, verificationToken
        `;
        const values = [full_name, email, passwordHash, role, verificationToken, verificationTokenExpiresAt];
        try {
            const result = await db.query(query, values);
            console.log("createUser result:", result.rows[0]);
            return result.rows[0];
        } catch (error) {
            console.error("Error in createUser:", error);
            throw error;
        }
    },

    findUserByEmail: async (email) => {
        console.log("Function: findUserByEmail", { email });
        const query = 'SELECT id, email, user_role AS role, password_hash FROM users WHERE email = $1';
        const values = [email];
        try {
            const result = await db.query(query, values);
            console.log("findUserByEmail result:", result.rows[0]);
            return result.rows[0];
        } catch (error) {
            console.error("Error in findUserByEmail:", error);
            throw error;
        }
    },

    findUserById: async (id) => {
        console.log("Finding user by id", { id });
        const query = 'SELECT id, email, user_role AS role FROM users WHERE id = $1';
        const values = [id];
        try {
            const result = await db.query(query, values);
            console.log("findUserById result:", result.rows[0]);
            return result.rows[0];
        } catch (error) {
            console.error("Error in findUserById:", error);
            throw error;
        }
    }
};

module.exports = userQueries;