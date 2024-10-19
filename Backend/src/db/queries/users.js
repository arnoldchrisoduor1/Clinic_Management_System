const db = require('../../config/database');

const userQueries = {
    createUser: async (email, passwordHash, role) => {
        console.log("Function: createUser", { email, role });
        const query = `
        INSERT INTO users (email, password_hash, user_role)
        VALUES ($1, $2, $3)
        RETURNING id, email, user_role AS role
        `;
        const values = [email, passwordHash, role];
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